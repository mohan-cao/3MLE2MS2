import React, {Component} from 'react'
import Tone from 'tone'
import readTrack from './tools/playback/'
import SampleLibrary from './tools/instrument'
import PauseSymbol from './res/pause.svg'
import PlaySymbol from './res/play.svg'
import StopSymbol from './res/stop.svg'

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
      divisions: 0
    }
    window.Tone = Tone
  }
  componentDidMount () {
    SampleLibrary.load({ instruments: 'piano' }).then(x => {
        this.setState({
          synths: x.toMaster(),
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
    const { playback, divisions, duration, elapsedTime } = this.state
    let multiplier = (divisions && divisions < 1) ? 1/divisions : 1
    let playbackBar = (
      <input style={{ verticalAlign: 'middle', marginRight: 10 }}
        ref={(slider) => { this.slider = slider }}
        type="range"
        name="points"
        onChange={(e) => this.seek(e.currentTarget.value / multiplier)}
        min="0" max={ (duration) ? duration * multiplier : 0 } step={ (divisions) ? divisions * multiplier : 0 } />
    )

    return (
      <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>

        <button style={{ verticalAlign: 'middle' }} onClick={this.togglePlayback} disabled={!!tracks && !tracks.length}>
          {(playback==='started') ?
          <img src={PauseSymbol} style={{ height: '0.7em' }} alt='Pause' /> :
          <img src={PlaySymbol} style={{ height: '0.7em' }} alt='Play' />}
        </button>

        <button style={{ verticalAlign: 'middle', marginRight: 10 }} onClick={this.stopPlayback} disabled={!!tracks && !tracks.length}>
          <img src={StopSymbol} style={{ height: '0.7em' }} alt='Play' />
        </button>
        
        { playbackBar }

        <span style={{ verticalAlign: 'middle', fontSize: '0.7em', lineHeight: '0.7em' }}>
          {`${Math.floor(elapsedTime/60)}:${('0'+Math.floor(elapsedTime)%60).slice(-2)}/${Math.floor(duration/60)}:${('0'+Math.floor(duration)%60).slice(-2)}`}
        </span>

      </div>
    )
  }
}