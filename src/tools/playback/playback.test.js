import * as functions from './playback'

import MeasureDivisionEvent from './MeasureDivisionEvent'
import NoteEvent from './NoteEvent'
import RestEvent from './RestEvent';

test('dotted quarter measure division', () => {
  expect(functions.noteToTicks(new MeasureDivisionEvent(4, true))).toBe(144)
});

test('dotted 8th measure division', () => {
  expect(functions.noteToTicks(new MeasureDivisionEvent(8, '.'))).toBe(72)
});

test('full measure division', () => {
  expect(functions.noteToTicks(new MeasureDivisionEvent(1))).toBe(384)
});

test('full measure note', () => {
  expect(functions.noteToTicks(new NoteEvent("c", 1))).toBe(384)
});

test('full measure note seconds', () => {
  expect(functions.noteToSeconds(new NoteEvent("c", 1), 4, 120)).toBe(2)
});

test('parse n notes', () => {
  const track = 'l1n64&n64n48n58'
  const noteObjs = functions.parseTrackToNoteObjects(track)
  const tones = functions.readTrackToNotes(noteObjs)
  expect(noteObjs).toEqual([
    new MeasureDivisionEvent(1),
    new NoteEvent('E', null, false, false, 5),
    new NoteEvent('E', null, false, true, 5),
    new NoteEvent('C', null, false, false, 4),
    new NoteEvent('A#', null, false, false, 4),
  ])
  expect(tones).toEqual([
    {"duration": 4, "note": "E5", "time": 0, "velocity": 8/15},
    {"duration": 2, "note": "C4", "time": 4, "velocity": 8/15},
    {"duration": 2, "note": "A#4", "time": 6, "velocity": 8/15}
  ])
})

test('parse default (dance) notes', () => {
  const track = 'l1.aa.l2.bn58l4c.'
  const noteObjs = functions.parseTrackToNoteObjects(track)
  const tones = functions.readTrackToNotes(noteObjs)
  expect(noteObjs).toEqual([
    new MeasureDivisionEvent(1, true),
    new NoteEvent('A', null),
    new NoteEvent('A', null, true),
    new MeasureDivisionEvent(2, true),
    new NoteEvent('B', null),
    new NoteEvent('A#', null, false, false, 4),
    new MeasureDivisionEvent(4, false),
    new NoteEvent('C', null, true),
  ])
  expect(tones).toEqual([
    {"duration": 3, "note": "A4", "time": 0, "velocity": 8/15},
    {"duration": 3, "note": "A4", "time": 3, "velocity": 8/15},
    {"duration": 1.5, "note": "B4", "time": 6, "velocity": 8/15},
    {"duration": 1.5, "note": "A#4", "time": 7.5, "velocity": 8/15},
    {"duration": 0.75, "note": "C4", "time": 9, "velocity": 8/15}
  ])
})

test('parse normal track', () => {
  const track = `t120v1o1a8&a1b2>c3dv2l64ce5f6v3g7a8b9v4>c10d11e12v5f13g14a15v6>c16d17e
  18v7f19g20a21v8>c22d23e24v9f25g26a27v10>c28d29e30v11f31g32a33v12>c34d3
  5e36v13f37g38a39v14>c41d42e43f44v15g45a46g47f48e49d50c51<b52a53g54f55e
  56d57c58<b59a60g61f62e63dc1r4b4`
  const noteObjs = functions.parseTrackToNoteObjects(track)
  const tones = functions.readTrackToNotes(noteObjs)
  expect(noteObjs.length).toBe(95)
  expect(tones).toEqual([{"duration": 2.25, "note": "A1", "time": 0, "velocity": 0.06666666666666667}, {"duration": 1, "note": "B1", "time": 2.25, "velocity": 0.06666666666666667}, {"duration": 0.6666666666666666, "note": "C2", "time": 3.25, "velocity": 0.06666666666666667}, {"duration": 0.5, "note": "D2", "time": 3.9166666666666665, "velocity": 0.06666666666666667}, {"duration": 0.03125, "note": "C2", "time": 4.416666666666666, "velocity": 0.13333333333333333}, {"duration": 0.3958333333333333, "note": "E2", "time": 4.447916666666666, "velocity": 0.13333333333333333}, {"duration":
  0.3333333333333333, "note": "F2", "time": 4.843749999999999, "velocity": 0.13333333333333333},
  {"duration": 0.28125, "note": "G2", "time": 5.177083333333332, "velocity": 0.2}, {"duration": 0.25, "note": "A2", "time": 5.458333333333332, "velocity": 0.2}, {"duration": 0.21875, "note": "B2", "time": 5.708333333333332, "velocity": 0.2}, {"duration": 0.19791666666666666, "note": "C3", "time": 5.927083333333332, "velocity": 0.26666666666666666}, {"duration": 0.17708333333333334, "note": "D3", "time": 6.124999999999999, "velocity": 0.26666666666666666}, {"duration": 0.16666666666666666, "note": "E3", "time": 6.302083333333332, "velocity": 0.26666666666666666}, {"duration": 0.15104166666666666, "note": "F3", "time": 6.468749999999999, "velocity": 0.3333333333333333}, {"duration": 0.140625, "note": "G3", "time": 6.619791666666666, "velocity": 0.3333333333333333}, {"duration": 0.13020833333333334, "note": "A3", "time": 6.760416666666666, "velocity": 0.3333333333333333}, {"duration": 0.125, "note": "C4", "time": 6.890624999999999, "velocity": 0.4}, {"duration": 0.11458333333333333, "note": "D4", "time": 7.015624999999999, "velocity": 0.4}, {"duration": 0.03125, "note": "E4", "time": 7.130208333333332, "velocity": 0.4}, {"duration": 0.10416666666666667, "note": "F4", "time": 7.161458333333332, "velocity": 0.4666666666666667}, {"duration": 0.09895833333333333, "note": "G4", "time": 7.265624999999999, "velocity": 0.4666666666666667}, {"duration": 0.09375, "note": "A4", "time": 7.364583333333332, "velocity": 0.4666666666666667}, {"duration": 0.08854166666666667, "note": "C5", "time": 7.458333333333332,
  "velocity": 0.5333333333333333}, {"duration": 0.08333333333333333, "note": "D5", "time": 7.546874999999999, "velocity": 0.5333333333333333}, {"duration": 0.08333333333333333, "note": "E5", "time": 7.630208333333332, "velocity": 0.5333333333333333}, {"duration": 0.078125, "note": "F5", "time": 7.713541666666665, "velocity": 0.6}, {"duration": 0.07291666666666667, "note": "G5", "time": 7.791666666666665, "velocity": 0.6}, {"duration": 0.07291666666666667, "note": "A5", "time": 7.864583333333332, "velocity": 0.6}, {"duration": 0.06770833333333333, "note": "C6", "time": 7.937499999999999, "velocity": 0.6666666666666666}, {"duration": 0.06770833333333333, "note": "D6", "time": 8.005208333333332, "velocity": 0.6666666666666666}, {"duration": 0.0625, "note": "E6", "time": 8.072916666666666, "velocity": 0.6666666666666666}, {"duration": 0.0625, "note": "F6", "time": 8.135416666666666, "velocity": 0.7333333333333333}, {"duration": 0.0625, "note": "G6", "time": 8.197916666666666, "velocity": 0.7333333333333333}, {"duration": 0.057291666666666664, "note": "A6", "time": 8.260416666666666, "velocity": 0.7333333333333333}, {"duration":
  0.057291666666666664, "note": "C7", "time": 8.317708333333332, "velocity": 0.8}, {"duration": 0.6666666666666666, "note": "D7", "time": 8.374999999999998, "velocity": 0.8}, {"duration": 0.052083333333333336, "note": "E7", "time": 9.041666666666664, "velocity": 0.8}, {"duration": 0.052083333333333336, "note": "F7", "time": 9.093749999999998, "velocity": 0.8666666666666667}, {"duration": 0.052083333333333336, "note": "G7", "time": 9.145833333333332, "velocity": 0.8666666666666667}, {"duration": 0.046875, "note": "A7", "time": 9.197916666666666, "velocity": 0.8666666666666667}, {"duration": 0.046875, "note": "C8", "time": 9.244791666666666, "velocity": 0.9333333333333333}, {"duration": 0.046875, "note": "D8", "time": 9.291666666666666, "velocity": 0.9333333333333333}, {"duration": 0.041666666666666664, "note": "E8", "time": 9.338541666666666, "velocity": 0.9333333333333333}, {"duration": 0.041666666666666664, "note": "F8", "time": 9.380208333333332, "velocity": 0.9333333333333333}, {"duration": 0.041666666666666664, "note": "G8", "time": 9.421874999999998, "velocity": 1}, {"duration": 0.041666666666666664, "note": "A8", "time": 9.463541666666664, "velocity": 1}, {"duration": 0.041666666666666664, "note": "G8", "time":
  9.50520833333333, "velocity": 1}, {"duration": 0.041666666666666664, "note": "F8", "time": 9.546874999999996, "velocity": 1}, {"duration": 0.036458333333333336, "note": "E8", "time": 9.588541666666663, "velocity": 1}, {"duration": 0.036458333333333336, "note": "D8", "time": 9.624999999999996, "velocity": 1}, {"duration": 0.036458333333333336, "note": "C8", "time": 9.66145833333333, "velocity": 1}, {"duration": 0.036458333333333336, "note": "B7", "time": 9.697916666666664, "velocity": 1}, {"duration": 0.036458333333333336, "note": "A7", "time": 9.734374999999998, "velocity": 1}, {"duration": 0.036458333333333336, "note": "G7", "time": 9.770833333333332, "velocity": 1}, {"duration": 0.03125, "note": "F7", "time": 9.807291666666666, "velocity": 1}, {"duration": 0.03125, "note": "E7", "time": 9.838541666666666, "velocity": 1}, {"duration": 0.03125, "note": "D7", "time": 9.869791666666666, "velocity": 1}, {"duration": 0.03125, "note": "C7",
  "time": 9.901041666666666, "velocity": 1}, {"duration": 0.03125, "note": "B6", "time": 9.932291666666666, "velocity": 1}, {"duration": 0.03125, "note": "A6", "time": 9.963541666666666, "velocity": 1}, {"duration": 0.03125, "note": "G6", "time": 9.994791666666666, "velocity": 1}, {"duration": 0.03125, "note": "F6", "time": 10.026041666666666, "velocity": 1}, {"duration": 0.03125, "note": "E6", "time": 10.057291666666666, "velocity": 1}, {"duration": 0.03125, "note": "D6", "time": 10.088541666666666, "velocity": 1}, {"duration": 2, "note": "C6", "time": 10.119791666666666, "velocity": 1}, {"duration": 0.5, "note": "B6", "time": 12.619791666666666, "velocity": 1 }])
})

test('parse another normal, slightly broken track', () => {
  const track = 'l4r32gaf+&l16f+.&f+64r64ef+l8g.a.ba&a32.r64f+.'
  const noteObjs = functions.parseTrackToNoteObjects(track)
  const tones = functions.readTrackToNotes(noteObjs)
  expect(noteObjs).toEqual([
    new MeasureDivisionEvent(4),
    new RestEvent(32),
    new NoteEvent('G', null),
    new NoteEvent('A', null),
    new NoteEvent('F#', null),
    new MeasureDivisionEvent(16),
    new NoteEvent('F#', null, true),
    new NoteEvent('F#', 64, false, true),
    new RestEvent(64),
    new NoteEvent('E', null),
    new NoteEvent('F#', null),
    new MeasureDivisionEvent(8),
    new NoteEvent('G', null, true),
    new NoteEvent('A', null, true),
    new NoteEvent('B', null),
    new NoteEvent('A', null),
    new NoteEvent('A', 32, true, true),
    new RestEvent(64),
    new NoteEvent('F#', null, true),
  ])
  expect(tones).toEqual([
    {"duration": 0.5, "note": "G4", "time": 0.0625, "velocity": 8/15},
    {"duration": 0.5, "note": "A4", "time": 0.5625, "velocity": 8/15},
    {"duration": 0.5, "note": "F#4", "time": 1.0625, "velocity": 8/15},
    {"duration": 0.21875, "note": "F#4", "time": 1.5625, "velocity": 8/15},
    {"duration": 0.125, "note": "E4", "time": 1.8125, "velocity": 8/15},
    {"duration": 0.125, "note": "F#4", "time": 1.9375, "velocity": 8/15},
    {"duration": 0.375, "note": "G4", "time": 2.0625, "velocity": 8/15},
    {"duration": 0.375, "note": "A4", "time": 2.4375, "velocity": 8/15},
    {"duration": 0.25, "note": "B4", "time": 2.8125, "velocity": 8/15},
    {"duration": 0.34375, "note": "A4", "time": 3.0625, "velocity": 8/15},
    {"duration": 0.375, "note": "F#4", "time": 3.4375, "velocity": 8/15}
  ])
})