export default class MeasureDivisionEvent {
  constructor(value, dotted=false) {
    this.value = (typeof value === 'number' && value >= 1 && value <= 64) ? value : 4
    this.dotted = !!dotted
  }
  static handleMDivChange(event) {
    if (event[0] !== 'l') return event
    return (event[event.length - 1] === '.') ?
      new MeasureDivisionEvent(parseInt(event.slice(1,-1)), true) :
      new MeasureDivisionEvent(parseInt(event.slice(1))
    )
  }
}