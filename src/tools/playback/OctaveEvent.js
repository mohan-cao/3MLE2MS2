export const OCTAVE_UP = 'UP'
export const OCTAVE_DOWN = 'DOWN'

export default class OctaveEvent {
  constructor(value) { this.value = value; }
  static handleOctaveChange(event) {
    if (event[0] !== 'o' && event[0] !== '<' && event[0] !== '>') return event
    if (event[0] === '>') return new OctaveEvent(OCTAVE_UP)
    else if (event[0] === '<') return new OctaveEvent(OCTAVE_DOWN)
    else return new OctaveEvent(
        Math.max(0, Math.min(8, parseInt(event.slice(1))))
    )
  }
}