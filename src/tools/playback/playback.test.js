import * as functions from './playback'

import MeasureDivisionEvent from './MeasureDivisionEvent'
import NoteEvent from './NoteEvent'

test('dotted quarter measure division', () => {
  expect(functions.noteToTicks(new MeasureDivisionEvent(4, true))).toBe(144)
});

test('dotted 8th measure division', () => {
  expect(functions.noteToTicks(new MeasureDivisionEvent(8, '.'))).toBe(72)
});

test('full measure division', () => {
  expect(functions.noteToTicks(new MeasureDivisionEvent(1))).toBe(384)
});

test('parse n notes', () => {
  const track = 'l1n64&n64n48'
  expect(functions.parseTrackToNoteObjects(track)).toEqual([
    new MeasureDivisionEvent(1),
    new NoteEvent('E', null, false, false, 5),
    new NoteEvent('E', null, false, true, 5),
    new NoteEvent('C', null, false, false, 4)
  ])
})

test('parse normal track', () => {
  const track = `t120v1o1a8&a1b2>c3dv2l64ce5f6v3g7a8b9v4>c10d11e12v5f13g14a15v6>c16d17e
  18v7f19g20a21v8>c22d23e24v9f25g26a27v10>c28d29e30v11f31g32a33v12>c34d3
  5e36v13f37g38a39v14>c41d42e43f44v15g45a46g47f48e49d50c51<b52a53g54f55e
  56d57c58<b59a60g61f62e63dc1r4`
  expect(functions.parseTrackToNoteObjects(track).length).toBe(94)
})