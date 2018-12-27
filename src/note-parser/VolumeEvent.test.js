import parseTrackToNoteObjects from '.'
import VolumeEvent from './VolumeEvent'

test('parse volume changes', () => {
  const track = 'v0v8v15v16'
  expect(parseTrackToNoteObjects(track)).toEqual([
    new VolumeEvent(0),
    new VolumeEvent(8),
    new VolumeEvent(15),
    new VolumeEvent(8),
  ])
})

test('deal with tie edge case', () => {
  const track = 'v0&v8'
  expect(parseTrackToNoteObjects(track)).toEqual([
    new VolumeEvent(0),
    new VolumeEvent(8),
  ])
})

test('converting back to string is working', () => {
  const track = 'v0v8v15'
  expect(parseTrackToNoteObjects(track).join('')).toEqual(track)
})