import parseTrackToNoteObjects from '.'
import OctaveEvent, {OCTAVE_UP, OCTAVE_DOWN} from './OctaveEvent'

test('parse octave changes', () => {
  const track = 'o0o1o8o9<>'
  expect(parseTrackToNoteObjects(track)).toEqual([
    new OctaveEvent(0),
    new OctaveEvent(1),
    new OctaveEvent(8),
    new OctaveEvent(null),
    new OctaveEvent(OCTAVE_DOWN),
    new OctaveEvent(OCTAVE_UP),
  ])
})

test('handle stupid edge-case with ties', () => {
  const track = 'o0&o2'
  expect(parseTrackToNoteObjects(track)).toEqual([
    new OctaveEvent(0),
    new OctaveEvent(2),
  ])
})

test('converting back to string is working', () => {
  const track = 'o0o1o8<>'
  expect(parseTrackToNoteObjects(track).join('')).toEqual(track)
})