import { Track as MidTrack } from 'jsmidgen'
import VolumeEvent from './VolumeEvent'
import TempoEvent from './TempoEvent'
import MeasureDivisionEvent from './MeasureDivisionEvent'
import OctaveEvent from './OctaveEvent'
import RestEvent from './RestEvent'
import NoteEvent from './NoteEvent';

/**
 * CONSTANTS
 */
export const defaultTempo = 120
export const defaultOctave = 4
export const defaultMDivision = 96 // 96 = 1 quarter note
export const defaultVolume = 63 //default 64, velocity = 0 - 127
export const mmlPPQ = 96

/**
 * Lossy conversion of MML note to ticks
 * Converts notes to ticks with default note tick fallback
 */
export function noteToTicks(note, defaultNoteTicks) {
  return ((note[1]) ?
    Math.min(Math.max(6,
      Math.floor(384/parseInt(note[1]))
    ), 384) :
    defaultNoteTicks
  ) * (note[2] === '.' ? 1.5 : 1)
}

/**
 * Converts MML note to playback seconds lossily
 * @param {*} note 
 * @param {*} defaultNoteTicks 
 * @param {*} bpm 
 */
export function noteToSeconds(note, defaultNoteTicks, bpm) {
  return noteToTicks(note, defaultNoteTicks) * 60 / (bpm * mmlPPQ)
}

function handleTempoChange(intermed) {
  if (!intermed[0] === 't' && !intermed[1] === 't') return
  if (intermed[0] === 't') {
    return new TempoEvent(parseInt(intermed.slice(1)))
  }
  return new TempoEvent(parseInt(intermed.slice(2)))
}

export const parseTrackToNoteObjects = (track) => {
  let mapNoteCmdToObject = [
    MeasureDivisionEvent.handleMDivChange,
    TempoEvent.handleTempoChange,
    VolumeEvent.handleVolumeChange,
    OctaveEvent.handleOctaveChange,
    RestEvent.handleRestChange,
    NoteEvent.handleExactNoteChange,
    NoteEvent.handleNoteChange,
  ]
  let matcher = /(&?[a-z][-+#]?[0-9]*\.?|[<>])/g // the magic sauce
  // validate
  let result = track.match(matcher)
  for (let i=0; i < result.length; i++) {
    let validResult = result[i]
    for (let j in mapNoteCmdToObject) {
      validResult = mapNoteCmdToObject[j](validResult)
    }
    result[i] = validResult
  }
  return result
}

export class State {
  constructor() {
    this.octave = defaultOctave
    this.measureDivision = defaultMDivision
    this.volume = defaultVolume
    this.previousNote = null
  }
}