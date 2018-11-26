import StatefulEvent from './StatefulEvent';

export const DEFAULT_TEMPO = 120
export const MIN_TEMPO = 32
export const MAX_TEMPO = 255
export const MML_PPQ = 96

export default class TempoEvent extends StatefulEvent {
  constructor(value) {
    super(value);
    this.value = (typeof value === 'number' && value >= MIN_TEMPO && value <= MAX_TEMPO) ? value : DEFAULT_TEMPO;
  }
  static handleTempoChange(event) {
    if (event[0] !== 't') return event
    return new TempoEvent(parseInt(event.slice(1)))
  }
  run(state) {
    state.tempo = this.value
  }
}