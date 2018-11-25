export const OCTAVE_UP = 'UP'
export const OCTAVE_DOWN = 'DOWN'

export default class OctaveEvent {
  constructor(value) {
    this.value = (value === OCTAVE_UP || value === OCTAVE_DOWN) ? value : (typeof value === 'number' && value > 0 && value <= 8) ? value : null;
  }
  static handleOctaveChange(event) {
    if (event[0] !== 'o' && event[0] !== '<' && event[0] !== '>') return event
    if (event[0] === '>') return new OctaveEvent(OCTAVE_UP)
    else if (event[0] === '<') return new OctaveEvent(OCTAVE_DOWN)
    else return new OctaveEvent(
        parseInt(event.slice(1))
    )
  }
}