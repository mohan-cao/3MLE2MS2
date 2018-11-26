import * as functions from './playback'
export default function readTrackToArray(track) {
    return functions.readTrackToNotes(functions.parseTrackToNoteObjects(track))
}