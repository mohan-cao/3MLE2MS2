import saveAs from 'file-saver';
/**
 * Converts a UTF-16 (javascript) string to a blob
 * @param {String} string 
 */
export function string2Blob(string) {
  return new Blob([new Uint8Array(Array.from(string).map(x => x[0].charCodeAt(0)))])
}
/**
 * Saves the midi using file-saver
 * @param {Blob | string} obj - blob or string
 * @param {string} [fileName='output.mid'] - fileName, default is output.mid
 */
export function saveMidi(obj, fileName='output.mid') {
  if (!(obj instanceof Blob)) saveAs(string2Blob(obj), fileName)
  else saveAs(obj, fileName)
}