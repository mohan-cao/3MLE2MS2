import React, {Component} from 'react'
import Tone from 'tone'

import readTrack from './tools/playback/'
import SampleLibrary, { defaultInstrument } from './tools/instrument'
import PauseSymbol from './res/PauseIcon'
import PlaySymbol from './res/PlayIcon'
import StopSymbol from './res/StopIcon'
import LoadingSymbol from './res/AudioIcon'

import './Synthesiser.css'

/**
 * The most awful component I've ever made.
 * Please don't copy paste this, I beg you
 */
export default class SynthesizerComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      synths: [],
      tracks: [],
      duration: 0,
      elapsedTime: 0,
      playback: false,
      divisions: 0,
      loading: true,
    }
  }
  componentDidMount () {
    this.changeInstrument()
  }
  changeInstrument = (instrument=defaultInstrument) => {
    Tone.Transport.stop()
    Tone.Transport.cancel()
    this.setState({ tracks: null, playback: false, loading: true }, () => {
      SampleLibrary.load({ instruments: instrument }).then(x => {
        console.log("Loaded " + instrument)
        this.setState({
          synths: x.toMaster(),
          loading: false,
        })
      })
    })
    
  }
  componentWillUnmount() {
    Tone.Transport.stop()
    Tone.Transport.cancel()
    Tone.Transport.dispose()
  }
  scheduleTrack = () => {
    const { synths, tracks } = this.state
    if (this.props.tracks === tracks) {
      return
    }
    Tone.Transport.stop()
    Tone.Transport.cancel()
    let newTracks = (this.props.tracks) ? this.props.tracks.map(x => readTrack(x)) : []
    let duration = newTracks.map(x => x.slice(-1)[0])
                            .map(x => (x && x.hasOwnProperty('time') ? x.time : 0))
                            .reduce((a, b) => (a > b) ? a : b, 0)
    this.setState({
      tracks: this.props.tracks,
      duration: duration,
      divisions: duration / 50
    })
    for (const i in newTracks.slice(0, 10)) {
      new Tone.Part(function(time, event){
        synths.triggerAttackRelease(event.note, event.duration, time, event.velocity);
      }, newTracks[i]).start(0)
    }
    Tone.Transport.scheduleRepeat(() => {
      const seconds = Tone.Transport.seconds
      this.setState({ elapsedTime: seconds });
      this.slider.value = seconds * ((this.state.divisions && this.state.divisions < 1) ? 1/this.state.divisions : 1)
    }, 1, 0);
    Tone.Transport.schedule(() => {
      this.setState({ playback: false, elapsedTime: 0 })
      Tone.Transport.stop()
    }, duration)
  }
  togglePlayback = (e) => {
    e.preventDefault()
    this.scheduleTrack()
    if (this.state.playback === 'started') {
      Tone.Transport.pause()
      this.setState({ playback: 'paused' })
      return
    }
    Tone.Transport.seconds = (this.state.elapsedTime ? this.state.elapsedTime : 0)
    Tone.Transport.start()
    this.setState({ playback: 'started' })
  }
  stopPlayback = (e) => {
    e.preventDefault()
    Tone.Transport.stop()
    Tone.Transport.cancel()
    this.setState({ tracks: null, playback: false, elapsedTime: 0, duration: 0, divisions: 0 })
    return
  }
  seek = (value) => {
    let playback = this.state.playback
    if (playback === 'started') {
      Tone.Transport.pause()
      playback = 'paused'
    }
    this.setState({ playback: playback, elapsedTime: value })
  }
  render() {
    const { tracks } = this.props
    const { playback, divisions, duration, elapsedTime, loading } = this.state
    const multiplier = (divisions && divisions < 1) ? 1/divisions : 1
    const disabled = !tracks || !tracks.length || loading

    let playbackBar = (
      <div style={{ display: 'inline-block', verticalAlign: 'top', marginRight: 10 }}><input className='synthesiser-range'
        ref={(slider) => { this.slider = slider }}
        type="range"
        name="points"
        onChange={(e) => this.seek(e.currentTarget.value / multiplier)}
        disabled={disabled}
        min="0" max={ (duration) ? duration * multiplier : 0 } step={ (divisions) ? divisions * multiplier : 0 } /></div>
    )

    return (
      <div className="Synthesiser">
        {
          (loading) ?
          <button className="non-clickable margin-right-10" disabled={true}><LoadingSymbol style={{ height: '1em', marginRight: '0.3em', fill: 'currentColor' }} alt='Loading' />Loading</button> :
          <div style={{ display: 'inline-block' }}>
            <button className="clickable" onClick={this.togglePlayback} disabled={disabled}>
              {
                ((playback==='started') ?
                <PauseSymbol style={{ height: '1em', fill: 'currentColor' }} /> :
                <PlaySymbol style={{ height: '1em', fill: 'currentColor' }} />)
              }
            </button>

            <button className="clickable margin-right-10" onClick={this.stopPlayback} disabled={disabled}>
              <StopSymbol style={{ height: '1em', fill: 'currentColor' }} />
            </button>
          </div>
        }
        
        { playbackBar }

        <span className="orange-text" style={{ verticalAlign: 'middle', fontSize: '0.7em', lineHeight: '0.7em', marginRight: 10 }}>
          {`${Math.floor(elapsedTime/60)}:${('0'+Math.floor(elapsedTime)%60).slice(-2)}/${Math.floor(duration/60)}:${('0'+Math.floor(duration)%60).slice(-2)}`}
        </span>

        <div className="box">
          <select defaultValue={defaultInstrument} onChange={(e) => this.changeInstrument(e.currentTarget.value)}>
            { SampleLibrary.list.map(x => <option key={x} value={x}>{x}</option> ) }
          </select>
        </div>

      </div>
    )
  }
}