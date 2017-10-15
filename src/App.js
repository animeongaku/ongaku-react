import React, { Component } from 'react'
import './App.css'
import { openings, endings, osts, shuffle } from './data'
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
    this.setState({ currentTrackIndex, src: track.link, bgImg: track.img })
  }
  previousTrack = () => {
    const currentTrackIndex =
      --this.state.currentTrackIndex % this.state.data.length
    const track = this.state.data[currentTrackIndex]
    this.setState({ currentTrackIndex, src: track.link, bgImg: track.img })
  }
  restartTrack = () => {
    this.audio.currentTime = 0
  }
  rewindTrack = () => {
    this.audio.currentTime = Math.max(0, this.audio.currentTime - 10)
  }
  forwardTrack = () => {
    const { duration, currentTime } = this.audio
    this.audio.currentTime = Math.min(duration, currentTime + 10)
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
    console.log(keyCode)
    switch (keyCode) {
      case 32: // space
        this.togglePlay()
        break
      case 78: // n
        this.nextTrack()
        break
      case 82: // r
        this.restartTrack()
        break
      case 70: // f
        this.toggleFullscreen()
        break
      case 76: // l
        this.previousTrack()
        break
      case 37: // left arrow
        this.rewindTrack()
        break
      case 38: // up arrow
        this.volumeUp()
        break
      case 39: // right arrow
        this.forwardTrack()
        break
      case 40: // down arrow
        this.volumeDown()
        break
      default:
        return
    }
  }
  allFalse = obj => {
    const checkStatus = element => {
      return element === false
    }
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
            <button
              className="btn"
              type="button"
              onClick={this.previousTrack}
              style={{ backgroundImage: 'url(img/previous-button.png)' }}
            >
              <span className="screenReader">Play Last</span>
            </button>
            <button
              className="btn"
              type="button"
              onClick={this.nextTrack}
              style={{ backgroundImage: 'url(img/next-button.png)' }}
            >
              <span className="screenReader">Play Next</span>
            </button>
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
              <div id="timeline">
                <div
                  id="buffered-bar"
                  style={{ flexBasis: `${this.state.percentBuffered}%` }}
                />
                <div
                  id="playhead"
                  style={{ left: `${this.state.percentComplete}%` }}
                />
              </div>
            </div>
          </div>

          <div className="botton-right">
            <button
              id="restart"
              className="btn"
              onClick={this.restartTrack}
              style={{ backgroundImage: `url(img/restart.png)` }}
            >
              <span className="screenReader">Restart track</span>
            </button>
            <button
              id="fullscreen-button"
              type="button"
              className="btn"
              onClick={this.toggleFullscreen}
              style={{
                backgroundImage: `url(${this.state.isFullscreen
                  ? 'img/cancel-fullscreen.png'
                  : 'img/go-fullscreen.png'})`
              }}
            >
              <span className="screenReader">Toggle Fullscreen</span>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default App
