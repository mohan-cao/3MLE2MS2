import React, {Component} from 'react';
import Tone, { Synth } from 'tone'
import { saveMidi } from './tools/midi2file'
import { parseTrackToNoteObjects } from './tools/playback/'


let testTrack = 't120v1o1a8&a1b2>c3dv2l64ce5f6v3g7a8b9v4>c10d11e12v5f13g14a15v6>c16d17e18v7f19g20a21v8>c22d23e24v9f25g26a27v10>c28d29e30v11f31g32a33v12>c34d35e36v13f37g38a39v14>c41d42e43f44v15g45a46g47f48e49d50c51<b52a53g54f55e56d57c58<b59a60g61f62e63dc1'
//const defaults = 't120o4v8l4s0p120'

export default class SynthesizerComponent extends Component {
  constructor() {
    super()
    this.state = {
      track: parseTrackToNoteObjects(testTrack)
    }
    window.saveMidi = saveMidi
    window.parsedTrack = parseTrackToNoteObjects(testTrack)
  }
  componentDidMount () {
    this.setState({

    })
  }
  render() {
    return (
      <div>
        <button>Test</button>
      </div>
    )
  }
}