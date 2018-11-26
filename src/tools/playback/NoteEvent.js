import StatefulEvent from './StatefulEvent';
import { noteToSeconds } from './playback';

const mappings = { 0: "C", 1: "C#", 2: "D", 3: "D#", 4: "E", 5: "F", 6: "F#", 7: "G", 8: "G#", 9: "A", 10: "A#", 11: "B" }
const overrides = { "B#": "C", "Cb": "B", "E#": "F", "Fb": "E" }

/**
 * Finds note from mml note number
 * Returns note and octave of note tuple
 * @param {*} number 
 */
export const numberNoteToNote = (number) => {
  let octave = Math.floor(number / 12);
  return [mappings[number%12], octave]
}

export default class NoteEvent extends StatefulEvent {
  constructor(note, value, dotted=false, tied=false, octave=null) {
    super(note, value)
    this.note = note
    this.value = (typeof value === 'number' && value > 0 && value <= 64) ? value : null
    if (dotted) this.dotted = !!dotted
    if (tied) this.tied = !!tied
    if (octave) this.octave = octave
  }
  static handleNoteChange(event) {
    if (!event) return event
    let note = event.toString().match(/^(&)?([a-g][-+#]?)([0-9]*)?(\.)?/)
    if (!note) return event
    let n = note[2].toUpperCase().replace('-', 'b').replace('+', "#")
    if (overrides.hasOwnProperty(n)) n = overrides[n]
    return new NoteEvent(n, note[3] ? parseInt(note[3]) : null, note[4], note[1])
  }
  static handleExactNoteChange(event) {
    if (!event) return event
    let note = event.toString().match(/^(&)?n([0-9]*)/)
    if (!note) return event
    let res = numberNoteToNote(parseInt(note[2]))
    if (!res) throw new Error('wtf happened with note ' + event)
    return new NoteEvent(res[0], null, false, note[1], res[1])
  }
  run(state) {
    let noteSeconds = noteToSeconds(this, state.measureDivision, state.tempo)
    let noteActual = this.note.toString() + ((this.octave) ? this.octave : state.octave)
    if (this.tied) {
      state.addTie(noteActual, noteSeconds)
    } else {
      // actually play the bloody note
      state.playNote(noteActual, noteSeconds)
    }
  }
}