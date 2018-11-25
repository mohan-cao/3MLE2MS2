import * as functions from './playback'
import OctaveEvent, {OCTAVE_UP, OCTAVE_DOWN} from './OctaveEvent'

test('parse octave changes', () => {
  const track = 'o0o1o8o9<>'
  expect(functions.parseTrackToNoteObjects(track)).toEqual([
    new OctaveEvent(null),
    new OctaveEvent(1),
    new OctaveEvent(8),
    new OctaveEvent(null),
    new OctaveEvent(OCTAVE_DOWN),
    new OctaveEvent(OCTAVE_UP),
  ])
})