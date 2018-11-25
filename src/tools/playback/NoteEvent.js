const mappings = { 12: "C", 13: "C#", 14: "D", 15: "D#", 16: "E", 17: "F", 18: "F#", 19: "G", 20: "G#", 21: "A", 22: "A#", 23: "B" }
const overrides = { "B#": "C", "Cb": "B", "E#": "F", "Fb": "E" }

/**
 * Finds note from mml note number
 * Returns note and octave of note tuple
 * @param {*} number 
 */
export const numberNoteToNote = (number) => {
  for (let key in mappings) {
    if (number % key) continue
    return [mappings[key], Math.floor(number / 12)]
  }  
}

export default class NoteEvent {
  constructor(note, value, dotted=false, tied=false, octave=null) {
    this.note = note
    this.value = value
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
    let [n, octave] = numberNoteToNote(parseInt(note[2]))
    return new NoteEvent(n, null, false, note[1], octave)
  }
}