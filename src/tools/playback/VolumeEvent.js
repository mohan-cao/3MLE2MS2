export default class VolumeEvent {
  constructor(value) { this.value = (typeof value === 'number' && value >= 0 && value <= 15) ? value : 8; }
  static handleVolumeChange(event) {
    if (event[0] !== 'v') return event
    return new VolumeEvent(parseInt(event.slice(1)))
  }
}