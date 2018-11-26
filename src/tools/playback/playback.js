import VolumeEvent, { DEFAULT_VOL as defaultVolume} from './VolumeEvent'
import TempoEvent, { DEFAULT_TEMPO as defaultTempo, MML_PPQ } from './TempoEvent'
import MeasureDivisionEvent, { DEFAULT_NOTE_DIVISION as defaultMDivision } from './MeasureDivisionEvent'
import OctaveEvent, { DEFAULT_OCTAVE as defaultOctave } from './OctaveEvent'
import RestEvent from './RestEvent'
import NoteEvent from './NoteEvent';

/**
 * CONSTANTS
 */

const restrict = (number, a, b) => {
  return Math.min(Math.max(number, a), b)
}

/**
 * Lossy conversion of MML note to ticks
 * Converts notes to ticks with default note fallback
 * @param { MeasureDivisionEvent | NoteEvent | RestEvent } note - Event with length
 * @param { Number } defaultNote - Default note value
 */
export function noteToTicks(note, defaultNote) {
  return restrict(Math.floor(384 / ((note.value) ? note.value : defaultNote)), 6, 384) * ((note.dotted) ? 1.5 : 1)
}

/**
 * Converts MML note to playback seconds lossily
 * @param { MeasureDivisionEvent | NoteEvent | RestEvent } note - Event with length
 * @param { Number } defaultNote - Default note value
 * @param { Number } bpm - Beats per minute
 */
export function noteToSeconds(note, defaultNote, bpm) {
  return noteToTicks(note, defaultNote) * 60 / (bpm * MML_PPQ)
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
  if (!result) return []
  for (let i=0; i < result.length; i++) {
    let validResult = result[i]
    for (let j in mapNoteCmdToObject) {
      validResult = mapNoteCmdToObject[j](validResult)
    }
    result[i] = validResult
  }
  return result
}

/**
 * Reads notes and outputs an array of objects
 * Objects are notes with a playback time and duration in seconds, and octave (1-8)
 * @param {[StatefulEvent]} notes 
 */
export const readTrackToNotes = (notes) => {
  let state = new State([])
  for (let k in notes) {
    notes[k].run(state)
  }
  return state.playables
}

export class State {
  constructor(playables=[]) {
    this.time = 0
    this.octave = defaultOctave
    this.tempo = defaultTempo
    this.measureDivision = defaultMDivision
    this.volume = defaultVolume
    this.previousNote = null
    this.rest = 0
    this.playables = [...playables]
  }
  playNote(note, value) {
    this.time += this.rest
    this.rest = 0
    this.playables.push({ note: note, duration: value, time: this.time, velocity: this.volume })
    this.time += value
    this.previousNote = note
  }
  addTie(note, value) {
    if (!this.previousNote || !this.playables.length) return this.playNote(note, value)
    if (this.previousNote === note && this.playables.slice(-1)[0].note === note) {
      this.playables[this.playables.length - 1].duration += value
      this.time += value
      this.rest = 0
      this.previousNote = note
    } else {
      this.playNote(note, value)
    }
  }
  addRest(value) {
    this.rest += value
    this.previousNote = 'R'
  }
}