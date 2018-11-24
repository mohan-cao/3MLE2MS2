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

export const parseTrackToTextCmdArray = (track) => {
  let tempoMatcher = /(t)([0-9]*)/
  let volumeMatcher = /(v)([0-9]*)/
  let measureAndRestMatcher = /(r|l)([0-9]*)(\.)?/
  let octaveMatcher = /(o)([0-9]*)/
  let noteMatcher = /^(&)?([na-g][-+#]?)([0-9]*)?(\.)?/
  let octaveChangeMatcher = /([<>])/
  let matcher = /([tvlopsrna-g][-+#]?[0-9]*\.?&?|[<>])/g // the magic sauce
  // validate
  let result = track.match(matcher)
  for (let i=0; i < result.length; i++) {
    let validResult = tempoMatcher.exec(result[i])
    validResult = (!validResult) ? volumeMatcher.exec(result[i]) : validResult
    validResult = (!validResult) ? measureAndRestMatcher.exec(result[i]) : validResult
    validResult = (!validResult) ? octaveMatcher.exec(result[i]) : validResult
    validResult = (!validResult) ? noteMatcher.exec(result[i]) : validResult
    validResult = (!validResult) ? octaveChangeMatcher.exec(result[i]) : validResult
    if (!validResult)
      result.splice(i, 1)
    else
      result[i] = validResult.slice(1)
  }
  return result
}