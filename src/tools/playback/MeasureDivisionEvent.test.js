import * as functions from './playback'
import MeasureDivisionEvent from './MeasureDivisionEvent'

test('parse measure division changes', () => {
  const track = 'l1l1.l4l6l8l12l16l48l64'
  expect(functions.parseTrackToNoteObjects(track)).toEqual([
    new MeasureDivisionEvent(1),
    new MeasureDivisionEvent(1, true),
    new MeasureDivisionEvent(4),
    new MeasureDivisionEvent(6),
    new MeasureDivisionEvent(8),
    new MeasureDivisionEvent(12),
    new MeasureDivisionEvent(16),
    new MeasureDivisionEvent(48),
    new MeasureDivisionEvent(64),
  ])
})

test('handle stupid error-ridden ties in front of the change', () => {
  const track = 'l2&l1'
  expect(functions.parseTrackToNoteObjects(track)).toEqual([
    new MeasureDivisionEvent(2),
    new MeasureDivisionEvent(1)
  ])
})

test('converting back to string is working', () => {
  const track = 'l1l1.l4l6l8l12l16l48l64'
  expect(functions.parseTrackToNoteObjects(track).join('')).toEqual(track)
})