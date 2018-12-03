import RestEvent from './RestEvent'
import * as functions from './playback'

test('parse rest notes', () => {
  const track = 'r1r1.r4r6r8r12r16r48r64r'
  expect(functions.parseTrackToNoteObjects(track)).toEqual([
    new RestEvent(1),
    new RestEvent(1, true),
    new RestEvent(4),
    new RestEvent(6),
    new RestEvent(8),
    new RestEvent(12),
    new RestEvent(16),
    new RestEvent(48),
    new RestEvent(64),
    new RestEvent(null),
  ])
})

test('deal with tie edge case', () => {
  const track = 'r1&r1.'
  expect(functions.parseTrackToNoteObjects(track)).toEqual([
    new RestEvent(1),
    new RestEvent(1, true),
  ])
})

test('converting back to string is working', () => {
  const track = 'r1r1.r4r6r8r12r16r48r64r'
  expect(functions.parseTrackToNoteObjects(track).join('')).toEqual(track)
})