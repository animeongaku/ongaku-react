import React, { Component } from 'react'
import './App.css'
import data from './data'
import MenuItemInfo from './MenuItemInfo'
import MenuItemPreferences from './MenuItemPreferences'

class App extends Component {
  state = {
    currentTrackIndex: 0,
    tracksLength: data.length,
    src: data[0].link,
    bgImg: data[0].img,
    isFullscreen: false,
    isPlaying: false,
    percentComplete: 0,
    percentBuffered: 0
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
    const currentTrackIndex = ++this.state.currentTrackIndex % data.length
    const track = data[currentTrackIndex]
    this.setState({ currentTrackIndex, src: track.link, bgImg: track.img })
  }
  previousTrack = () => {
    const currentTrackIndex = --this.state.currentTrackIndex % data.length
    const track = data[currentTrackIndex]
    this.setState({ currentTrackIndex, src: track.link, bgImg: track.img })
  }
  restartTrack = () => {
    this.audio.currentTime = 0
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
          onCanPlay={this.togglePlay}
          onTimeUpdate={this.timeUpdate}
          onProgress={this.progressUpdate}
        />
        <div className="top-bar">
          <MenuItemInfo />
          <MenuItemPreferences />
        </div>

        <div className="display-track">
          <div id="track-name" />
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
