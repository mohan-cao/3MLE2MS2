import StatefulEvent from './StatefulEvent';

export const DEFAULT_NOTE_DIVISION = 4
export const MIN_NOTE_DIVISION = 1
export const MAX_NOTE_DIVISION = 64

export default class MeasureDivisionEvent extends StatefulEvent {
  constructor(value, dotted=false) {
    super(value)
    this.value = (typeof value === 'number' && value >= MIN_NOTE_DIVISION && value <= MAX_NOTE_DIVISION) ? value : DEFAULT_NOTE_DIVISION
    this.dotted = !!dotted
  }
  static handleMDivChange(event) {
    if (event[0] !== 'l') return event
    return (event[event.length - 1] === '.') ?
      new MeasureDivisionEvent(parseInt(event.slice(1,-1)), true) :
      new MeasureDivisionEvent(parseInt(event.slice(1))
    )
  }
  run(state) {
    state.measureDivision = this //(this.dotted) ? 2*this.value/3 : this.value;
  }
}