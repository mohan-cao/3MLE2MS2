import React, {Component} from 'react';
import Tone, { Synth } from 'tone'
import readTrack from './tools/playback/'

export default class SynthesizerComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      synths: []
    }
  }
  componentDidMount () {
    this.setState({
      synths: new Tone.PolySynth(10, Tone.Synth).toMaster()
    })
  }
  playNotes = (e, tracks) => {
    e.preventDefault()
    if (!tracks) return
    let { synths } = this.state
    for (const i in tracks.slice(0, 10)) {
      new Tone.Part(function(time, event){
        synths.triggerAttackRelease(event.note, event.duration, time, event.velocity);
      }, tracks[i]).start(0);
    }
    Tone.Transport.start();
  }
  render() {
    let tracks = this.props.tracks ? this.props.tracks.map(x => readTrack(x)) : []
    console.log(tracks)
    return (
      <div style={{ display: 'inline-block' }}>
        <button onClick={(e) => this.playNotes(e, tracks)} disabled={!tracks.length}>Play song</button>
      </div>
    )
  }
}