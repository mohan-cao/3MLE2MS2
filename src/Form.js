import React, { Component } from 'react';
import parser from 'fast-xml-parser'
import saveAs from 'file-saver'
import RefreshIcon from './RefreshIcon'

import { getHandlerBuilder, getMMLExtension, allValidMMLs, mmlExtension, ms2Extension } from './tools/exthelper'
import convert3MLEToJSON from './tools/mml2json';
import { json2fullxml } from './tools/json2xml'
import xml2json from './tools/xml2json'
import convertMS2JSONTo3MLE from './tools/json2mml';

import './Form.css';

const MMLHandler = (event) => {
  let {result, length} = convert3MLEToJSON(event.target.result);
  return {length: length, result: json2fullxml(result)};
}
const MS2MMLHandler = (event, name) => {
  let json = xml2json(event.target.result);
  return convertMS2JSONTo3MLE(json, { title: name });
}
const getHandler = getHandlerBuilder(MMLHandler, MS2MMLHandler);

export default class Form extends Component {

  constructor() {
    super();
    this.state = {
      file: null,
      result: ''
    };
    window.parser = parser;
  }

  uploadFile = (event) => {
    const file = event.target.files[0];
    const validType = getMMLExtension(file);
    if (!validType) {
      this.setState({ file: null })
      return false;
    }
    this.setState({
      changed: true,
      file: {
        name: file.name.split('.')[0],
        type: validType,
        text: file
      }
    })
  }

  convert = (e) => {
    e.preventDefault();
    if (!this.state.file) {
      window.alert("Please select a valid MS2MML/3MLE file");
      return;
    }
    const fileReader = new FileReader();
    const { name, type, text } = this.state.file;
    fileReader.onload = (event) => {
      let handler = getHandler(type)
      let { result, length } = handler(event, name)
      this.setState({
        result: result,
        length: length,
        changed: false,
        download: {
          text: result,
          name: name + '.' + (type === mmlExtension ? ms2Extension : mmlExtension)
        }
      })
    }
    fileReader.readAsText(text);
  }

  download = (e) => {
    e.preventDefault()
    saveAs(this.state.download.text, this.state.download.name)
  }

  render() {
    const { changed, result, length, download } = this.state;
    const buttonMsg = (this.state.file) ? 'Generate ' + (this.state.file.type === mmlExtension ? 'MS2MML' : '3MLE MML') : 'Please select a file to upload';
    const downloadMsg = (!length || length <= 0) ? 'Download...nothing?' :
    (length <= 3000) ? 'Download (Novice)' :
    (length <= 5000) ? 'Download (Intermediate)' :
    (length <= 10000) ? 'Download (Advanced)' : 'Download (Impossible)';
    return (
      <form className={"Form-div " + this.props.className}>
        <div className="Form-leftDiv">
          <div className="buttonDiv"><label className="label" htmlFor="file-input">Select any MML/MS2MML file</label></div>
          <div><p className="arrowDown">&#x25bc;</p></div>
          <div><input name="file-input" id="file-input" type="file" accept={allValidMMLs} onChange={this.uploadFile} /></div>
          <div className="buttonDiv">
            <button className="label" onClick={this.convert} disabled={!this.state.file}>
              {(changed) ? <RefreshIcon style={{ height: '0.8em', fill: 'currentColor', paddingRight: 10 }} /> : <div />}
              {buttonMsg}
            </button>
          </div>
          {
            (download) ? 
            <div>
              <div><p className="arrowDown">&#x25bc;</p></div>
              <div className="buttonDiv"><button className="label" onClick={this.download}>{downloadMsg}</button></div>
              { (this.state.file && this.state.file.type === mmlExtension) ? <p style={{ fontSize: '0.5em' }}>Max. 10 tracks allowed</p> : <div />}
            </div>
            : <div />
          }
        </div>
        <div className="Form-rightDiv">
          <h1>Preview</h1>
          <textarea className="Form-textResult" value={result} readOnly/>
        </div>
      </form>
    )
  }

}