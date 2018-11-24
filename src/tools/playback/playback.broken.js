import { Track as MidTrack } from 'jsmidgen'

/**
 * CONSTANTS
 */
export const defaultTempo = 120
export const defaultOctave = 4
export const defaultMDivision = mmlNoteToMidiTicks(4) // 512 / 4
export const defaultVolume = 63 //default 64, velocity = 0 - 127

/**
 * Resolve MML note to midi ticks
 * jsmidgen uses 128 ticks/quarterbeat = 512 tick measure
 * MML uses 384 tick measure
 */
export function mmlNoteToMidiTicks(note) {
  return 512 * Math.floor(384/note) / 384
} 

/**
 * Lossy conversion of MML note to midi note to more accurately simulate MML
 * Converts notes to ticks with default note tick fallback
 */
export function noteToTicks(note, defaultNoteTicks) {
  return ((note[1]) ?
    Math.min(Math.max(8, mmlNoteToMidiTicks(parseInt(note[1]))), 768) :
    defaultNoteTicks
  ) * (note[2] === '.' ? 1.5 : 1)
}

/**
 * Modifies volume
 */
export function volumeChanger(note, state) {
  if (!note || note[0] !== 'v') return
  const parsedVolume = parseInt(note[1])
  state.currentVolume = Math.round(Math.min(Math.max(0, parsedVolume), 15) / 15) * 127
}

/**
 * Modifies tempo
 */
export function tempoChanger(note, state) {
  if (!note || note[0] !== 't') return
  const parsedTempo = parseInt(note[1])
  state.track.setTempo(Math.min(Math.max(0, parsedTempo), 255))
}

/**
 * Modifies measure divisions
 */
export function measureChanger(note, state) {
  if (!note || note[0] !== 'l') return
  state.currentMDivision = noteToTicks(note, defaultMDivision)
}

/**
 * Modifies octave
 */
export function octaveChanger(arr, state) {
  if (!arr || (arr[0] !== 'o' && arr[0] !== '<' && arr[0] !== '>')) return
  if (arr[0] === '<') {
    state.currentOctave -= (state.currentOctave === 1) ? 0 : 1
  } else if (arr[0] === '>') {
    state.currentOctave += (state.currentOctave === 8) ? 0 : 1
  } else {
    const parsedOctave = parseInt(arr[1])
    state.currentOctave = Math.min(Math.max(1, parsedOctave), 8)
  }
  flushQueue(state)
}

/**
 * Flushes the queue into the midi track
 */
export function flushQueue(state) {
  if (!state || !state.track) throw new Error('No track! Why would you flush your queue into the void?')
  let note = null
  let cumulTicks = 0
  while (state.currentQueue && state.currentQueue.length) {
    // do lookback for same notes, assume that all elements on the queue are the same octave :D
    cumulTicks = 0;
    do {
      note = state.currentQueue.pop()
      cumulTicks += noteToTicks(note, state.currentMDivision)
    } while (
      state.currentQueue && state.currentQueue.length &&
      note[3] === '&' &&  // only merge notes if current note is a tie
      state.currentQueue[state.currentQueue.length-1][0] === note[0]  // only merge notes if notes are the same
    );
    // put the note on the track
    const keyboardNote = note[0].replace('+', "#").replace('-', 'b') + state.currentOctave
    state.track.addNote(0, keyboardNote, cumulTicks, 0, state.currentVolume)
  }
}

/**
 * Parses rests
 */
export function restParser(arr, state) {
  if (!arr || arr[0] !== 'r') return
  if (state.currentQueue) flushQueue(state)
  const dotted = arr[2] === '.'
  const ticks = ((arr[1]) ?
    Math.min(Math.max(8, mmlNoteToMidiTicks(parseInt(arr[1])), 768)) :
    state.currentMDivision
  ) * (dotted ? 1.5 : 1)
  state.track.addNoteOff(0, '', ticks);
}

/**
 * Parses notes
 */
export function noteParser(arr, state) {
  if (!arr) return
  state.currentQueue.push(arr)
  if (arr[3] === '&') {
    return
  }
  flushQueue(state)
}

export const parseTrackToTextCmdArray = (track) => {
  let tempoMatcher = /(t)([0-9]*)/
  let volumeMatcher = /(v)([0-9]*)/
  let measureAndRestMatcher = /(r|l)([0-9]*)(\.)?/
  //let measureMatcher = /(l)([0-9]*)(\.)?/
  let octaveMatcher = /(o)([0-9]*)/
  //let restMatcher = /(r)([0-9]*)?(\.?)/
  let noteMatcher = /^(&)?([na-g][-+#]?)([0-9]*)?(\.)?/
  let octaveChangeMatcher = /([<>])/
  let matcher = /([tvlopsrna-g][-+#]?[0-9]*\.?&?|[<>])/g // the magic sauce
  // validate
  let result = track.match(matcher)
  for (let i=0; i < result.length; i++) {
    let validResult = tempoMatcher.exec(result[i])
    validResult = (!validResult) ? volumeMatcher.exec(result[i]) : validResult
    validResult = (!validResult) ? measureAndRestMatcher.exec(result[i]) : validResult
    //validResult = (!validResult) ? measureMatcher.exec(result[i]) : validResult
    validResult = (!validResult) ? octaveMatcher.exec(result[i]) : validResult
    //validResult = (!validResult) ? restMatcher.exec(result[i]) : validResult
    validResult = (!validResult) ? noteMatcher.exec(result[i]) : validResult
    validResult = (!validResult) ? octaveChangeMatcher.exec(result[i]) : validResult
    if (!validResult)
      result.splice(i, 1)
    else
      result[i] = validResult.slice(1)
  }
  return result
}

export const parseTextCmdArrayToMidiNotes = (textArr) => {
  let state = {
    currentOctave: defaultOctave,
    currentMDivision: defaultMDivision,
    currentVolume: defaultVolume,
    currentQueue: [],
    track: new MidTrack()
  }
  state.track.setTempo(defaultTempo)
  for (let i=0; i < textArr; i++) {
    tempoChanger(textArr[i], state)
    volumeChanger(textArr[i], state)
    measureChanger(textArr[i], state)
    octaveChanger(textArr[i], state)
    restParser(textArr[i], state)
    noteParser(textArr[i], state)
  }
  flushQueue(state)
}