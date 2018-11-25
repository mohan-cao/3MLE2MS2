export default class MeasureDivisionEvent {
  constructor(value, dotted=false) {
    this.value = parseInt(value)
    this.dotted = !!dotted
  }
  static handleMDivChange(event) {
    if (event[0] !== 'l') return event
    return (event[event.length - 1] === '.') ? new MeasureDivisionEvent(event.slice(1,-1), true) : new MeasureDivisionEvent(event.slice(1))
  }
}