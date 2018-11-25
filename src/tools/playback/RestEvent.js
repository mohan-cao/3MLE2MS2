export default class RestEvent {
  constructor(value, dotted=false) {
    this.value = parseInt(value)
    this.dotted = !!dotted
  }
  static handleRestChange(event) {
    if (event[0] !== 'r') return event
    return (event[event.length - 1] === '.') ? new RestEvent(event.slice(1,-1), true) : new RestEvent(event.slice(1))
  }
}