import parser from 'fast-xml-parser';
import he from 'he';

const defaultOptions = {
  attributeNamePrefix : "@_",
  ignoreAttributes : false,
  ignoreNameSpace : false,
  allowBooleanAttributes : true,
  parseNodeValue : true,
  parseAttributeValue : true,
  trimValues: true,
  cdataTagName: "__cdata", //default is 'false'
  cdataPositionChar: "\\c",
  localeRange: "", //To support non english character in tag/attribute values.
  parseTrueNumberOnly: false,
  attrValueProcessor: a => he.decode(a, {isAttributeValue: true}),//default is a=>a
  tagValueProcessor : a => he.decode(a) //default is a=>a
};

export default function xml2json(xmlData, options=defaultOptions) {
  if( parser.validate(xmlData) === true) { //optional (it'll return an object in case it's not valid)
    return parser.parse(xmlData, options);
  }
  return {}
}
