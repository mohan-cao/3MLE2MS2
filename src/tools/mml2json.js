import ms2mmlTemplate from '../templates/ms2mml.json'

const maxChannels = 10

const positionAfterChannelText = (matchedStart) => {
  const textLength = matchedStart[0].length;
  return matchedStart.index + textLength;
}

const extractMMLFromText = (text) => {
  let matched = [];
  let mmlTextArr = [];
  let matcher = /\[Channel[0-9]+\]/g;
  let strMatched;
  // regex match + index position all the channels
  do {
    strMatched = matcher.exec(text);
    if (strMatched) matched.push(strMatched);
  } while (strMatched)
  if (!matched || matched.length === 0) throw Error('Does not contain tracks!');
  // push in ending marker for last channel
  matched.push({ index: text.lastIndexOf('[3MLE EXTENSION]') })
  // extract the text
  for (let i = 0; i < matched.length-1; i++) {
    mmlTextArr.push(
      text.slice(
        positionAfterChannelText(matched[i]),
        matched[i+1].index
      ).replace(/\s/g, '')
    )
  }
  return mmlTextArr;
}

function deepValueSingleReplace(obj, value, replace) {
  for (let iKey in obj) {
    if (obj.hasOwnProperty(iKey)) {
      if (obj[iKey] === value) {
        obj[iKey] = replace;
        return true;
      } else if (typeof obj[iKey] === 'object' && obj[iKey] !== null) {
        if (deepValueSingleReplace(obj[iKey], value, replace)) return true;
      }
    }
  }
  return false;
}

export default function convert3MLEToJSON(text) {
  const newTemplate = JSON.parse(JSON.stringify(ms2mmlTemplate));
  let textArr = extractMMLFromText(text);
  for (let i = 0; i < maxChannels; i++) {
    if (i < textArr.length) deepValueSingleReplace(newTemplate, "#text", textArr[i]);
    else deepValueSingleReplace(newTemplate, "#text", undefined);
  }
  return newTemplate;
}