import StatefulEvent from "./StatefulEvent";

export const DEFAULT_VOL = 8
export const MIN_VOL = 0
export const MAX_VOL = 15

export default class VolumeEvent extends StatefulEvent {
  constructor(value) { super(value); this.value = (typeof value === 'number' && value >= MIN_VOL && value <= MAX_VOL) ? value : DEFAULT_VOL; }
  static handleVolumeChange(event) {
    if (event[0] !== 'v' && event[1] !== 'v') return event
    return new VolumeEvent(parseInt(event.slice((event[0] === '&') ? 2 : 1)))
  }
  run(state) {
    state.volume = this.value / MAX_VOL
  }
  toString() {
    return 'v' + this.value;
  }
}