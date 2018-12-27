import parseTrackToNoteObjects from '.'
import NoteEvent from './NoteEvent'

test('parse a-g notes', () => {
  const track = 'a1b2c3d4e6f8g12'
  expect(parseTrackToNoteObjects(track)).toEqual([
    new NoteEvent('A', 1),
    new NoteEvent('B', 2),
    new NoteEvent('C', 3),
    new NoteEvent('D', 4),
    new NoteEvent('E', 6),
    new NoteEvent('F', 8),
    new NoteEvent('G', 12),
  ])
})

test('parse accidentals', () => {
  const track = 'a+1b#2c-3d-4e#6f-8g+12'
  expect(parseTrackToNoteObjects(track)).toEqual([
    new NoteEvent('A#', 1),
    new NoteEvent('B#', 2),
    new NoteEvent('Cb', 3),
    new NoteEvent('Db', 4),
    new NoteEvent('F', 6),
    new NoteEvent('E', 8),
    new NoteEvent('G#', 12),
  ])
})

test('converting back to string is working', () => {
  const track = 'a.bn60den65g'
  expect(parseTrackToNoteObjects(track).join('')).toEqual(track)
})