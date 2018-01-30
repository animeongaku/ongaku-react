import React, { Component } from 'react'
import '../css/App.css'
import { openings, endings, osts, shuffle } from '../data'
import { keys } from '../constants'
import MenuItemInfo from './MenuItemInfo'
import MenuItemPreferences from './MenuItemPreferences'

const initialData = shuffle([...openings, ...endings, ...osts])

class App extends Component {
  state = {
    data: initialData,
    currentTrackIndex: 0,
    trackName: initialData[0].name,
    src: initialData[0].link,
    bgImg: initialData[0].img,
    isFullscreen: false,
    isPlaying: false,
    percentComplete: 0,
    percentBuffered: 0,
    preference: {
      opening: true,
      ending: true,
      ost: true
    }
  }
  togglePlay = () => {
    this.setState({ isPlaying: !this.audio.paused }, () => {
      this.audio[this.state.isPlaying ? 'pause' : 'play']()
    })
  }
  toggleFullscreen = () => {
    const { isFullscreen } = this.state
    if (isFullscreen) {
      if (document.exitFullscreen) document.exitFullscreen()
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen()
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen()
      else if (document.msExitFullscreen) document.msExitFullscreen()
    } else {
      const e = document.documentElement
      if (e.requestFullscreen) e.requestFullscreen()
      else if (e.webkitRequestFullscreen) e.webkitRequestFullscreen()
      else if (e.mozRequestFullScreen) e.mozRequestFullScreen()
      else if (e.msRequestFullscreen) e.msRequestFullscreen()
    }
    this.setState({ isFullscreen: !isFullscreen })
  }
  nextTrack = () => {
    const currentTrackIndex =
      ++this.state.currentTrackIndex % this.state.data.length
    const track = this.state.data[currentTrackIndex]
    this.setState({
      currentTrackIndex,
      src: track.link,
      bgImg: track.img,
      trackName: track.name
    })
  }
  previousTrack = () => {
    const currentTrackIndex =
      --this.state.currentTrackIndex % this.state.data.length
    const track = this.state.data[currentTrackIndex]
    this.setState({
      currentTrackIndex,
      src: track.link,
      bgImg: track.img,
      trackName: track.name
    })
  }
  restartTrack = () => {
    this.audio.currentTime = 0
  }
  rewindTrack = () => {
    this.audio.currentTime = Math.max(0, this.audio.currentTime - 10) || 0
    this.showTempTrackDisplay(
      <span className="icon iconRewind">
        {this.formatCurrentTime(parseInt(this.audio.currentTime, 10))}
      </span>
    )
  }
  forwardTrack = () => {
    const { duration, currentTime } = this.audio
    this.audio.currentTime = Math.min(duration, currentTime + 10) || 0
    this.showTempTrackDisplay(
      <span className="icon iconFastforward">
        {this.formatCurrentTime(parseInt(this.audio.currentTime, 10))}
      </span>
    )
  }
  formatCurrentTime = currentTime => {
    const mins = Math.floor(currentTime / 60)
      .toString()
      .padStart(2, '0')
    const secs = (currentTime - mins * 60).toString().padStart(2, '0')
    return `${mins}:${secs}`
  }
  timeUpdate = e => {
    const { currentTime, duration } = e.target
    const percentComplete = (currentTime / duration * 100).toFixed(2)
    this.setState({ percentComplete })
  }
  progressUpdate = e => {
    const { buffered, duration } = e.target
    if (buffered.length) {
      const lastTimeRangeIndex = buffered.length - 1
      const percentBuffered = buffered.end(lastTimeRangeIndex) / duration * 100
      this.setState({ percentBuffered })
    }
  }
  handleKeyboardEvents = ({ keyCode }) => {
    switch (keyCode) {
      case keys.SPACE:
        this.togglePlay()
        break
      case keys.N:
        this.nextTrack()
        break
      case keys.R:
        this.restartTrack()
        break
      case keys.F:
        this.toggleFullscreen()
        break
      case keys.L:
        this.previousTrack()
        break
      case keys.LEFT_ARROW:
        this.rewindTrack()
        break
      case keys.UP_ARROW:
        this.volumeUp()
        break
      case keys.RIGHT_ARROW:
        this.forwardTrack()
        break
      case keys.DOWN_ARROW:
        this.volumeDown()
        break
      default:
        return
    }
  }
  allFalse = obj => {
    const checkStatus = element => element === false
    const values = Object.values(obj)
    const status = values.every(checkStatus)
    return status
  }
  togglePreference = e => {
    const { name } = e.target
    let { preference } = this.state
    preference[name] = !preference[name]
    if (this.allFalse(preference)) {
      preference[name] = true
    }
    const data = shuffle([
      ...(preference.opening ? openings : []),
      ...(preference.ending ? endings : []),
      ...(preference.ost ? osts : [])
    ])
    this.setState({ preference, data })
  }
  showTempTrackDisplay = tempDisplayStr => {
    this.setState({ trackName: tempDisplayStr }, () => {
      clearTimeout(this.trackDisplayQueue)
      this.trackDisplayQueue = setTimeout(() => {
        this.setState({
          trackName: this.state.data[this.state.currentTrackIndex].name
        })
      }, 1000)
    })
  }
  volumeUp = () => {
    this.audio.volume = Math.min(
      1,
      Math.round((this.audio.volume + 0.1) * 10) / 10
    )
    this.showTempTrackDisplay(
      <span className="icon iconVolumeUp">
        {parseInt(this.audio.volume * 100, 10)}
      </span>
    )
  }
  volumeDown = () => {
    this.audio.volume = Math.max(
      0,
      Math.round((this.audio.volume - 0.1) * 10) / 10
    )
    this.showTempTrackDisplay(
      <span className="icon iconVolumeDown">
        {parseInt(this.audio.volume * 100, 10)}
      </span>
    )
  }
  handleTrackScrub = e => {
    this.audio.currentTime = e.target.value / 100 * this.audio.duration
  }
  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyboardEvents)
  }
  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyboardEvents)
  }
  trackDisplayQueue = undefined
  render() {
    return (
      <div
        className="App"
        style={{ backgroundImage: `url(${this.state.bgImg})` }}
      >
        <audio
          ref={a => {
            this.audio = a
          }}
          src={this.state.src}
          onCanPlay={() => {
            if (this.audio.paused) {
              this.togglePlay()
            }
          }}
          onTimeUpdate={this.timeUpdate}
          onProgress={this.progressUpdate}
        />
        <div className="top-bar">
          <MenuItemInfo />
          <MenuItemPreferences
            togglePreferenceState={this.togglePreference}
            preferenceState={this.state.preference}
          />
        </div>

        <div className="display-track">
          {this.state.trackName && (
            <div id="track-name">{this.state.trackName}</div>
          )}
        </div>

        <div className="bottom-bar">
          <div className="bottom-left">
            <div id="previous" onClick={this.previousTrack} title="Play Last">
              <i className="fa fa-backward fa-2x" />
            </div>
            <div id="next" onClick={this.nextTrack} title="Play Next">
              <i className="fa fa-forward fa-2x" />
            </div>
          </div>

          <div id="wrapper">
            <div id="player">
              <button
                id="pButton"
                type="button"
                className={`btn ${this.state.isPlaying ? 'play' : 'pause'}`}
                onClick={this.togglePlay}
              >
                <span className="screenReader">Toggle Play</span>
              </button>
              <div className="timelineWrap">
                <label htmlFor="timeline" className="screenReader">
                  Track timeline
                </label>
                <input
                  id="timeline"
                  name="timeline"
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={this.state.percentComplete}
                  onChange={this.handleTrackScrub}
                  style={{
                    background: `linear-gradient(to right, rgba(0,0,0,.5) ${
                      this.state.percentBuffered
                    }%, rgba(0,0,0,.25) ${
                      this.state.percentBuffered
                    }%, rgba(0,0,0,.25))`
                  }}
                />
              </div>
            </div>
          </div>

          <div className="botton-right">
            <div id="restart" title="Play Again">
              <i
                className="fa fa-refresh fa-2x"
                onClick={this.restartTrack}
                title="Play Again"
              />
            </div>
            <div id="fullscreen-button" title="Toggle Fullscreen">
              <i
                className="fa fa-arrows-alt fa-2x"
                onClick={this.toggleFullscreen}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
