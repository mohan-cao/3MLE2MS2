import { noteToSeconds, noteToTicks, MeasureDivisionEvent, NoteEvent } from '.'

test('dotted quarter measure division', () => {
  expect(noteToTicks(new MeasureDivisionEvent(4, true))).toBe(144)
});

test('dotted 8th measure division', () => {
  expect(noteToTicks(new MeasureDivisionEvent(8, '.'))).toBe(72)
});

test('full measure division', () => {
  expect(noteToTicks(new MeasureDivisionEvent(1))).toBe(384)
});

test('full measure note', () => {
  expect(noteToTicks(new NoteEvent("c", 1))).toBe(384)
});

test('full measure note seconds', () => {
  expect(noteToSeconds(new NoteEvent("c", 1), 4, 120)).toBe(2)
});