import * as functions from './playback'
import TempoEvent from './TempoEvent'

test('parse tempo changes', () => {
  const track = 't31t32t60t120t240t255t256'
  expect(functions.parseTrackToNoteObjects(track)).toEqual([
    new TempoEvent(120),
    new TempoEvent(32),
    new TempoEvent(60),
    new TempoEvent(120),
    new TempoEvent(240),
    new TempoEvent(255),
    new TempoEvent(120),
  ])
})