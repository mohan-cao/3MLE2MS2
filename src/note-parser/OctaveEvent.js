import StatefulEvent from "./StatefulEvent";

export const OCTAVE_UP = 'UP'
export const OCTAVE_DOWN = 'DOWN'
export const DEFAULT_OCTAVE = 4
export const MIN_OCTAVE = 0
export const MAX_OCTAVE = 8

export default class OctaveEvent extends StatefulEvent {
  constructor(value) {
    super(value)
    this.value = (value === OCTAVE_UP || value === OCTAVE_DOWN) ? value :
    (typeof value === 'number' && value >= MIN_OCTAVE && value <= MAX_OCTAVE) ? value : null;
  }
  static handleOctaveChange(event) {
    if (event[0] !== 'o' && event[0] !== '<' && event[0] !== '>' &&
        event[1] !== 'o' && event[1] !== '<' && event[1] !== '>') return event
    if (event[0] === '&') event = event.slice(1)
    if (event[0] === '>') return new OctaveEvent(OCTAVE_UP)
    else if (event[0] === '<') return new OctaveEvent(OCTAVE_DOWN)
    else return new OctaveEvent(
        parseInt(event.slice(1))
    )
  }
  run(state) {
    if (this.value === OCTAVE_UP && state.octave < MAX_OCTAVE) state.octave++
    else if (this.value === OCTAVE_DOWN && state.octave > MIN_OCTAVE) state.octave--
    else if (typeof this.value === 'number') state.octave = this.value
  }
  toString() {
    switch(this.value) {
      case OCTAVE_UP:
      return '>'
      case OCTAVE_DOWN:
      return '<'
      case null:
      return ''
      default:
      return 'o' + this.value
    }
  }
}