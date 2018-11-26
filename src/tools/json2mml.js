import ms2mmlTemplate from '../templates/ms2mml.json'

const dencoding = "iso-8859-1"
const dtitle = "Untitled"
const dsource = "Big Buck Bunny"
const keyMap = deepValueKeyMap(ms2mmlTemplate, "#text")

const filterCommentsAndCollapse = (text) => {
  return text
  .split('\n')
  .filter(x => !x.trim().startsWith('//'))
  .map(x => x.replace(/(\/\*.*\*\/|\s)*/g,'').trim())
  .join('');
}

export default function convertJSONTo3MLE(json, settings={encoding: dencoding, title: dtitle, source: dsource}) {
  if (!settings.encoding) settings.encoding = dencoding;
  if (!settings.title) settings.title = dtitle;
  if (!settings.source) settings.source = dsource;
  let tracks = convertJSONToTrackArray(json);
  let trackStrings = '';
  for (let i=0; i < tracks.length; i++) {
    trackStrings += `[Channel${i+1}]\n${tracks[i]}\n`;
  }
  return {
    length: tracks.map(x => x.length).reduce((a,b) => a+b, 0),
    result: `[Settings]\nEncoding=${settings.encoding}\nTitle=${settings.title}\nSource=${settings.source}\nMemo=\n${trackStrings}`
  };
}

export function convertJSONToTrackArray(json) {
  let tracks = findAllMML(keyMap, json)
  if (tracks) tracks = tracks.map(x => filterCommentsAndCollapse(x))
  return tracks
}

export const extractMMLFromJSON = (json) => {
  let tracks = findAllMML(keyMap, json)
  return tracks.map(x => filterCommentsAndCollapse(x))
}

function findAllMML(obj, json) {
  let arr = []
  for (let iKey in obj) {
    if (typeof obj[iKey] === 'object' && obj[iKey] !== null) {
      arr.push(...findAllMML(obj[iKey], json[iKey]));
    } else if (typeof obj[iKey] === 'string') {
      let hasKey = json.hasOwnProperty(iKey) && json[iKey].hasOwnProperty(obj[iKey]);
      if (hasKey) arr.push(json[iKey][obj[iKey]].trim());
    }
  }
  return arr
}

function deepValueKeyMap(obj, value) {
  let returnedObjArray = {}
  for (let iKey in obj) {
    if (obj.hasOwnProperty(iKey)) {
      if (obj[iKey] === value) {
        return iKey
      } else if (typeof obj[iKey] === 'object' && obj[iKey] !== null) {
        let result = deepValueKeyMap(obj[iKey], value);
        if (result) returnedObjArray[iKey] = result;
      }
    }
  }
  return returnedObjArray;
}