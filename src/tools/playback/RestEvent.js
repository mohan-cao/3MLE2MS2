import StatefulEvent from "./StatefulEvent";
import { noteToSeconds } from "./playback";

export default class RestEvent extends StatefulEvent {
  constructor(value, dotted=false) {
    super(value)
    this.value = (typeof value === 'number' && value >= 1 && value <= 64) ? value : null
    this.dotted = !!dotted
  }
  static handleRestChange(event) {
    if (event[0] !== 'r' && event[1] !== 'r') return event
    if (event[0] === '&') event = event.slice(1)
    return (event[event.length - 1] === '.') ?
      new RestEvent(parseInt(event.slice(1,-1)), true) :
      new RestEvent(parseInt(event.slice(1))
    )
  }
  run(state) {
    state.addRest(noteToSeconds(this, state.measureDivision, state.tempo))
  }
  toString() {
    return ((this.value) ? 'r' + this.value : 'r') + (this.dotted ? '.' : '')
  }
}