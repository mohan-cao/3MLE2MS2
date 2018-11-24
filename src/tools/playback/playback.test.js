import * as functions from './playback'

const newState = () => {return {
  currentOctave: functions.defaultOctave,
  currentMDivision: functions.defaultMDivision,
  currentVolume: functions.defaultVolume,
  currentQueue: []
}}

test('dotted quarter measure division update', () => {
  expect(functions.noteToTicks(['l', '4', '.'])).toBe(144)
});

test('dotted 8th measure division update', () => {
  expect(functions.noteToTicks(['l', '8', '.'])).toBe(48)
});

test('full measure division update', () => {
  expect(functions.noteToTicks(['l', '1', undefined])).toBe(384)
});

test('parse n notes', () => {
  const track = 'l1n64'
  expect(functions.parseTrackToTextCmdArray(track)).toBe([['l', '1'], [undefined, 'n', '64'], ['&', 'n', '64']])
})