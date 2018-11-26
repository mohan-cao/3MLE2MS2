import React, {Component} from 'react';
import Tone from 'tone'
import readTrack from './tools/playback/'
import SampleLibrary from './tools/instrument';

export default class SynthesizerComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      synths: [],
      lastInput: [],
      tracks: [],
      duration: 0,
      elapsedTime: 0,
    }
    window.Tone = Tone
  }
  componentDidMount () {
    this.setState({
      synths: SampleLibrary.load({ instruments: 'piano' }).toMaster(),
      updater: new Tone.Clock(function(time){
        this.setState({ elapsedTime: time })
      }, 1)
    })
  }
  componentWillUnmount() {
    this.state.updater.dispose()
  }
  playNotes = (e) => {
    e.preventDefault()
    Tone.Transport.stop()
    const { synths } = this.state
    let { tracks } = this.props
    tracks = tracks ? tracks.map(x => readTrack(x)) : []
    this.setState({
      tracks: tracks,
      duration: tracks.map(x => x.slice(-1)[0])
                      .map(x => (x && x.hasOwnProperty('time') ? x.time : 0))
                      .reduce((a, b) => (a > b) ? a : b, 0)
    })
    for (const i in tracks.slice(0, 10)) {
      new Tone.Part(function(time, event){
        synths.triggerAttackRelease(event.note, event.duration, time, event.velocity);
      }, tracks[i]).start(0);
    }
    Tone.Transport.start();
  }
  render() {
    const { tracks } = this.props
    return (
      <div style={{ display: 'inline-block' }}>
        <button onClick={this.playNotes} disabled={!!tracks && !tracks.length}>Play song</button>
        <span>{this.state.elapsedTime}</span>
      </div>
    )
  }
}