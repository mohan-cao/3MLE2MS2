export default class RestEvent {
  constructor(value, dotted=false) {
    this.value = (typeof value === 'number' && value >= 1 && value <= 64) ? value : null
    this.dotted = !!dotted
  }
  static handleRestChange(event) {
    if (event[0] !== 'r') return event
    return (event[event.length - 1] === '.') ?
      new RestEvent(parseInt(event.slice(1,-1)), true) :
      new RestEvent(parseInt(event.slice(1))
    )
  }
}