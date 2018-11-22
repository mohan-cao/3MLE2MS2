import * as functions from './playback'
import { Track as MidTrack } from 'jsmidgen'

const newState = () => {return {
  currentOctave: functions.defaultOctave,
  currentMDivision: functions.defaultMDivision,
  currentVolume: functions.defaultVolume,
  currentQueue: [],
  track: new MidTrack()
}}

test('dotted quarter measure division update', () => {
  functions.noteToTicks(['l', '4', '.'])
});

test('dotted 8th measure division update', () => {
  functions.noteToTicks(['l', '8', '.'])
});

test('full measure division update', () => {
  functions.noteToTicks(['l', '1', null])
});

test('flush empty queue', () => {
  const state = newState()
  functions.flushQueue(state)
  expect(state.currentQueue.length === 0)
})

test('flush 1 in queue', () => {
  const state = newState()
  state.currentQueue.push(['a', '4', '.'])
  functions.flushQueue(state)
  expect(state.currentQueue.length === 0)
})