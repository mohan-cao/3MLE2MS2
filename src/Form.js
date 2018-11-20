import React, { Component } from 'react';
import parser from 'fast-xml-parser'
import RefreshIcon from './RefreshIcon'

import { getHandlerBuilder, getMMLExtension, allValidMMLs } from './tools/exthelper'
import convert3MLEToJSON from './tools/mml2json';
import { json2fullxml } from './tools/json2xml'
import xml2json from './tools/xml2json'
import ms2JSONToMMLConverter from './tools/ms2reverse';

import './Form.css';

const MMLHandler = (event) => {
  let json = convert3MLEToJSON(event.target.result);
  return json2fullxml(json);
}
const MS2MMLHandler = (event, name) => {
  let json = xml2json(event.target.result);
  return ms2JSONToMMLConverter(json, { title: name });
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
      let result = handler(event, name)
      this.setState({
        result: result,
        changed: false,
        download: {
          url: 'data:text/plain;charset=utf-8,' + encodeURIComponent(result),
          name: name + '.' + (type === 'mml' ? 'ms2mml' : 'mml')
        }
      })
    }
    fileReader.readAsText(text);
  }

  render() {
    const { changed, result, download } = this.state;
    const buttonMsg = (this.state.file) ? 'Generate ' + (this.state.file.type === 'mml' ? 'MS2MML' : '3MLE MML') : 'Please select a file to upload';
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
              <div className="buttonDiv"><a href={download.url} className="label" download={download.name} onClick={this.download}>Download</a></div>
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