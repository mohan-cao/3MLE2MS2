export default class TempoEvent {
  constructor(value) { this.value = parseInt(value); }
  static handleTempoChange(event) {
    if (event[0] !== 't') return event
    return new TempoEvent(event.slice(1))
  }
}