export default class VolumeEvent {
  constructor(value) { this.value = parseInt(value); }
  static handleVolumeChange(event) {
    if (event[0] !== 'v') return event
    return new VolumeEvent(event.slice(1))
  }
}