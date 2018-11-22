import saveAs from 'file-saver';
/**
 * Converts a UTF-16 (javascript) string to a blob
 * @param {String} string 
 */
export function string2Blob(string) {
  return new Blob([new Uint8Array(Array.from(string).map(x => x[0].charCodeAt(0)))])
}
/**
 * Saves the midi using 
 * @param {Blob} blob 
 */
export function saveMidi(blob) {
  saveAs(blob, "output.mid")
}