import ms2mmlTemplate from '../templates/ms2mml.json'

const maxChannels = 10

const positionAfterChannelText = (matchedStart) => {
  const textLength = matchedStart[0].length;
  return matchedStart.index + textLength;
}

const filterCommentsAndCollapse = (text) => {
  return text
  .split('\n')
  .filter(x => !x.trim().startsWith('//'))
  .map(x => x.replace(/(\/\*.*\*\/|\s)*/g,'').trim())
  .join('');
}

export const extractMMLFrom3MLE = (text) => {
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
      filterCommentsAndCollapse(
        text.slice(positionAfterChannelText(matched[i]), matched[i+1].index)
      )
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
  let newTemplate = JSON.parse(JSON.stringify(ms2mmlTemplate));
  let textArr = extractMMLFrom3MLE(text).slice(0,maxChannels);
  for (let i = 0; i < maxChannels; i++) {
    if (i < textArr.length) deepValueSingleReplace(newTemplate, "#text", textArr[i]);
    else deepValueSingleReplace(newTemplate, "#text", undefined);
  }
  return {result: newTemplate, length: textArr.map(x => x.length).reduce((a,b) => a+b, 0)};
}