import { j2xParser as Parser } from 'fast-xml-parser';

//default options need not to set
const defaultOptions = {
    attributeNamePrefix : "@_",
    ignoreAttributes : false,
    cdataTagName: "__cdata", //default is false
    cdataPositionChar: "\\c",
    format: true,
    indentBy: "  ",
    supressEmptyNode: false
};

export function json2xml(json, options=defaultOptions) {
  const parser = new Parser(options);
  return parser.parse(json);
}

export function json2fullxml(json, options=defaultOptions) {
  return '<?xml version="1.0" encoding="utf-8"?>\n'+json2xml(json, options);
}