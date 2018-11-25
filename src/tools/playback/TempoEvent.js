export default class TempoEvent {
  constructor(value) { this.value = (typeof value === 'number' && value >= 32 && value <= 255) ? value : 120; }
  static handleTempoChange(event) {
    if (event[0] !== 't') return event
    return new TempoEvent(parseInt(event.slice(1)))
  }
}