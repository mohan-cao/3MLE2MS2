import { parseTrackToNoteObjects }from './playback/playback'
import RestEvent from './playback/RestEvent';
import NoteEvent from './playback/NoteEvent';
import MeasureDivisionEvent from './playback/MeasureDivisionEvent';

export const halveTrackNotes = (track) => {
  const notes = parseTrackToNoteObjects(track)
  for (let i=0; i<notes.length; i++) {
    if (notes[i] instanceof NoteEvent || notes[i] instanceof RestEvent || notes[i] instanceof MeasureDivisionEvent) {
      if (notes[i].value >= 64) throw new Error(`Note resolution failed at note ${notes[i]} in ...(${notes.slice(Math.max(i-1,0), Math.min(i+2, notes.length-1)).join('')})...! Reimport your MML track with lower quantization (i.e. 1/32)`)
      notes[i].value *= 2
    }
  }
  return notes.join('')
}

export const doubleTrackNotes = (track) => {
  const notes = parseTrackToNoteObjects(track)
  const state = new State()
  notes.splice(0, 0, new MeasureDivisionEvent(4))
  for (let i=0; i<notes.length; i++) {
    if (notes[i] instanceof MeasureDivisionEvent) {
      notes[i].value /= ((notes[i].value > 1) ? 2 : 1)
      state.measureDivision = notes[i].value / 2
    }
    if (notes[i].value) {
      if (notes[i] instanceof NoteEvent) {
        notes[i].tied = true
        notes.splice(i, 0, new NoteEvent(notes[i].note, notes[i].value, notes[i].dotted, notes[i].tied, notes[i].octave))
        i++
      } else if (notes[i] instanceof RestEvent) {
        notes.splice(i, 0, new RestEvent(notes[i].value, notes[i].dotted))
        i++
      }
    } else if (state.measureDivision === 0.5) {
      if (notes[i] instanceof NoteEvent) {
        notes[i].tied = true
        notes.splice(i, 0, new NoteEvent(notes[i].note, notes[i].value, notes[i].dotted, notes[i].tied, notes[i].octave))
        i++
      } else if (notes[i] instanceof RestEvent) {
        notes.splice(i, 0, new RestEvent(notes[i].value, notes[i].dotted))
        i++
      }
    }
  }
  return notes.join('')
}

class State {
  constructor() {
    this.measureDivision = MeasureDivisionEvent.DEFAULT_NOTE_DIVISION / 2 // double length
  }
}