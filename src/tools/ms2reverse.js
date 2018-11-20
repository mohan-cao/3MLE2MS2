import ms2mmlTemplate from '../templates/ms2mml.json'

const dencoding = "iso-8859-1"
const dtitle = "Untitled"
const dsource = "Big Buck Bunny"
const keyMap = deepValueKeyMap(ms2mmlTemplate, "#text")

export default function ms2JSONToMMLConverter(json, settings={encoding: dencoding, title: dtitle, source: dsource}) {
  if (!settings.encoding) settings.encoding = dencoding;
  if (!settings.title) settings.title = dtitle;
  if (!settings.source) settings.source = dsource;
  let tracks = findAllMML(keyMap, json)

  var trackStrings = '';
  for (let i=0; i < tracks.length; i++) {
    trackStrings += `[Channel${i+1}]\n${tracks[i]}\n`;
  }
  return `[Settings]\nEncoding=${settings.encoding}\nTitle=${settings.title}\nSource=${settings.source}\nMemo=\n${trackStrings}`;
}

function findAllMML(obj, json) {
  let arr = []
  for (let iKey in obj) {
    if (typeof obj[iKey] === 'object' && obj[iKey] !== null) {
      arr.push(...findAllMML(obj[iKey], json[iKey]));
    } else if (typeof obj[iKey] === 'string') {
      let hasKey = json.hasOwnProperty(iKey);
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