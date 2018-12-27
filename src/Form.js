import React, { Component } from 'react'
import saveAs from 'file-saver'
import RefreshIcon from './RefreshIcon'
import WarningIcon from '@material-ui/icons/Warning'
import InfoIcon from '@material-ui/icons/Info'

import { getHandlerBuilder, getMMLExtension, allValidMMLs, mmlExtension, ms2Extension } from './tools/exthelper'
import { convertTrackArrayToJSON, convert3MLEToTrackArray } from './tools/mml2json';
import { json2fullxml } from './tools/json2xml'
import xml2json from './tools/xml2json'
import { convertTrackArrayTo3MLE, convertJSONToTrackArray } from './tools/json2mml';

import './Form.css';
import SynthesizerComponent from './Synthesiser';
import { Button, Typography } from '@material-ui/core';
import { Slider } from '@material-ui/lab';
import { halveTrackNotes, doubleTrackNotes } from './tempo/notemanipulator';

const MMLHandler = (event, intermediate) => {
  let tracks = convert3MLEToTrackArray(event.target.result)
  for(let i in tracks) {
    tracks[i] = intermediate(tracks[i])
  }
  let {result, length} = convertTrackArrayToJSON(tracks);
  return { length: length, result: json2fullxml(result), mml: tracks };
}
const MS2MMLHandler = (event, intermediate, name) => {
  let json = xml2json(event.target.result);
  let trackArray = convertJSONToTrackArray(json)
  for (let i in trackArray) {
    trackArray[i] = intermediate(trackArray[i])
  }
  return {...convertTrackArrayTo3MLE(trackArray, { title: name }), mml: trackArray };
}
const getHandler = getHandlerBuilder(MMLHandler, MS2MMLHandler);

/**
 * Scales notes in track
 */
const scaleTrack = (mml, scaleTrack) => {
  return (scaleTrack === 0) ? halveTrackNotes(mml) : (scaleTrack === 2) ? doubleTrackNotes(mml) : mml
}

export default class Form extends Component {

  constructor() {
    super();
    this.state = {
      file: null,
      result: '',
      scaleTrack: 1,
    };
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
    let errors = []
    const intermediateFunctions = (track) => {
      try {
        return scaleTrack(track, this.state.scaleTrack)
      } catch(e) {
        errors.push(e.message)
        return ''
      }
    }
    const fileReader = new FileReader();
    const { name, type, text } = this.state.file;
    fileReader.onload = (event) => {
      let handler = getHandler(type)
      let { result, length, mml } = handler(event, intermediateFunctions, name)
      this.setState({
        result: result,
        length: length,
        changed: false,
        mml: mml,
        errors: errors,
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
    saveAs(new File([this.state.download.text], this.state.download.name, {type: "text/plain;charset=utf-8"}))
  }

  render() {
    const { changed, result, length, download, mml, file, scaleTrack, errors } = this.state;
    const buttonMsg = (file) ? 'Generate ' + (file.type === mmlExtension ? 'MS2MML' : '3MLE MML') : 'Please select a file to upload';
    const downloadMsg = (!length || length <= 0) ? 'Download...nothing?' :
    (length <= 3000) ? 'Download (Novice)' :
    (length <= 5000) ? 'Download (Intermediate)' :
    (length <= 10000) ? 'Download (Advanced)' : 'Download (Impossible)';
    return (
      <form className={"Form-div " + this.props.className}>
        <div className="Form-leftDiv">
          <Button className="button" variant="outlined" color="primary" component="label">Select any MML/MS2MML file<input name="file-input" id="file-input" type="file" accept={allValidMMLs} onChange={this.uploadFile} /></Button>
          <div><Typography color="primary">&#x25bc;</Typography></div>
          <div className="buttonDiv">
            <Button className="button" variant="outlined" color="primary" onClick={this.convert} disabled={!file}>
              {(changed) ? <RefreshIcon style={{ height: '0.8em', fill: 'currentColor', paddingRight: 10 }} /> : <div />}
              {buttonMsg}
            </Button>
          </div>
          <div style={{ width: '50%', padding: 10 }}>
            <Typography style={{ marginBottom: 5 }}>Note length: {(scaleTrack > 1) ? 'Doubled' : (scaleTrack < 1) ? 'Halved' : '1-to-1'}</Typography>
            <Slider value={scaleTrack} onChange={(e, value) => this.setState({ changed: (!!result), scaleTrack: value })} min={0} max={2} step={1} />
          </div>
          {
            (download) ? 
            <div>
              <div><Typography color="primary">&#x25bc;</Typography></div>
              <Button className="button" variant="outlined" color="secondary" onClick={this.download}>{downloadMsg}</Button>
              { (length > 10000) ?
                <Typography color="error" variant="body1"><WarningIcon style={{ fontSize: '1em', marginRight: 5 }}/>{'This song is unplayable in-game with ' + Math.round(length/1000) + 'K characters'}</Typography> :
                <Typography variant="body1"><InfoIcon style={{ fontSize: '1em', marginRight: 5 }}/>Total length: {length} characters</Typography>
              }
              { (file && file.type === mmlExtension) ? <Typography variant="body1"><InfoIcon style={{ fontSize: '1em', marginRight: 5 }}/>Maximum 10 tracks allowed</Typography> : ''}
              { (errors) ? errors.map(x => <Typography color="error" variant="body1" key={x}><WarningIcon style={{ fontSize: '1em', marginRight: 5 }}/>{x}</Typography>) : ''}
            </div>
            : <div />
          }
        </div>
        <div className="Form-rightDiv">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h1" style={{ marginRight: 20, fontSize: '2em' }}>Preview</Typography>
            { (mml && mml.length) ? <SynthesizerComponent tracks={mml} /> : <div /> }
          </div>
          <textarea className="Form-textResult" value={result} readOnly />
        </div>
      </form>
    )
  }

}