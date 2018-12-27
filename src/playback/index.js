import parseTrackToNoteObjects from '../note-parser'
import { DEFAULT_VOL as defaultVolume, MAX_VOL as maxVolume } from '../note-parser/VolumeEvent'
import { DEFAULT_TEMPO as defaultTempo } from '../note-parser/TempoEvent'
import MeasureDivisionEvent, { DEFAULT_NOTE_DIVISION as defaultMDivision } from '../note-parser/MeasureDivisionEvent'
import { DEFAULT_OCTAVE as defaultOctave } from '../note-parser/OctaveEvent'
import StatefulEvent from '../note-parser/StatefulEvent'

/**
 * Reads notes and outputs an array of objects
 * Objects are notes with a playback time and duration in seconds, and octave (1-8)
 * @param {[StatefulEvent]} notes 
 */
export const readTrackToNotes = (notes) => {
  let state = new State([])
  try {
    for (let i=0; i < notes.length; i++) {
      if (notes[i] instanceof StatefulEvent) notes[i].run(state)
    }
  } catch (e) { console.error(e) }
  return state.playables
}

export class State {
  constructor(playables=[]) {
    this.time = 0
    this.octave = defaultOctave
    this.tempo = defaultTempo
    this.measureDivision = new MeasureDivisionEvent(defaultMDivision)
    this.volume = defaultVolume / maxVolume
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


export default function readTrackToArray(track) {
    return readTrackToNotes(parseTrackToNoteObjects(track))
}