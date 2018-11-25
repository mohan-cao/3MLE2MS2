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
 * @param { MeasureDivisionEvent | NoteEvent | RestEvent } note 
 * @param { Number } defaultNoteTicks 
 */
export function noteToTicks(note, defaultNoteTicks) {
  return ((note.value) ?
    Math.min(Math.max(6,
      Math.floor(384/note.value)
    ), 384) :
    defaultNoteTicks
  ) * (note.dotted ? 1.5 : 1)
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

/**
 * Parses track string to note objects
 * @param {string} track 
 */
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
    this.rest = 0
  }
}