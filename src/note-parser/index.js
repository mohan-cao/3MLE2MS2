import ve, * as ve_all from './VolumeEvent';
import te, * as te_all from './TempoEvent';
import mde, * as mde_all from './MeasureDivisionEvent';
import oe, * as oe_all from './OctaveEvent';
import re, * as re_all from './RestEvent';
import ne, * as ne_all from './NoteEvent';

const MML_PPQ = te_all.MML_PPQ

/**
 * Export constants as a single constant
 */
export const Constants = {
  ...ve_all,
  ...te_all,
  ...mde_all,
  ...oe_all,
  ...re_all,
  ...ne_all,
}

/**
 * Helper function to restrict a number between two values inclusive
 * @param {*} number - a number
 * @param {*} a - larger than a
 * @param {*} b - smaller than b
 */
const restrict = (number, a, b) => {
  return Math.min(Math.max(number, a), b)
}
/**
 * Lossy conversion of MML note to ticks
 * Converts notes to ticks with default note fallback
 * @param { MeasureDivisionEvent | NoteEvent | RestEvent } note - Event with length
 * @param { Number } defaultNote - Default note event with length
 */
export function noteToTicks(note, defaultNote) {
  if (note.value) return restrict(Math.floor(384 / note.value), 6, 384) * ((note.dotted) ? 1.5 : 1)
  else if (note.dotted) return restrict(Math.floor(384 / defaultNote.value), 6, 384) * 1.5
  return restrict(Math.floor(384 / defaultNote.value), 6, 384) * ((defaultNote.dotted) ? 1.5 : 1)
}

/**
 * Converts MML note to playback seconds lossily
 * @param { MeasureDivisionEvent | NoteEvent | RestEvent } note - Event with length
 * @param { Number } defaultNote - Default note event with length
 * @param { Number } bpm - Beats per minute
 */
export function noteToSeconds(note, defaultNote, bpm) {
  return noteToTicks(note, defaultNote) * 60 / (bpm * MML_PPQ)
}

/**
 * Parses track string to note objects
 * @param {string} track
 */
export default (track) => {
  let mapNoteCmdToObject = [
    mde.handleMDivChange,
    te.handleTempoChange,
    ve.handleVolumeChange,
    oe.handleOctaveChange,
    re.handleRestChange,
    ne.handleExactNoteChange,
    ne.handleNoteChange,
  ];
  let matcher = /(&?[a-z][-+#]?[0-9]*\.?|[<>])/g; // the magic sauce
  // validate
  let result = track.match(matcher);
  if (!result)
    return [];
  for (let i = 0; i < result.length; i++) {
    let validResult = result[i];
    for (let j in mapNoteCmdToObject) {
      validResult = mapNoteCmdToObject[j](validResult);
    }
    result[i] = validResult;
  }
  return result;
};

export const VolumeEvent = ve
export const TempoEvent = te
export const MeasureDivisionEvent = mde
export const OctaveEvent = oe
export const RestEvent = re
export const NoteEvent = ne