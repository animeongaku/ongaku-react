import React, { Component } from 'react';
import './App.css';
import data from './data';
import MenuItemInfo from './MenuItemInfo'
import MenuItemPreferences from './MenuItemPreferences'

class App extends Component {
  state = {
    src: data[0].link,
    bgImg: data[0].img,
    isFullscreen: false
  }
  togglePlay = () => {
    this.audio[this.audio.paused ? 'play' : 'pause']();
  }
  toggleFullscreen = () => {
    const { isFullscreen } = this.state
    if (isFullscreen) {
			if (document.exitFullscreen) document.exitFullscreen();
			else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
			else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
			else if (document.msExitFullscreen) document.msExitFullscreen();
		} else {
			const e = document.documentElement;
			if (e.requestFullscreen) e.requestFullscreen();
			else if (e.webkitRequestFullscreen) e.webkitRequestFullscreen();
			else if (e.mozRequestFullScreen) e.mozRequestFullScreen();
			else if (e.msRequestFullscreen) e.msRequestFullscreen();
    }
    this.setState({isFullscreen: !isFullscreen})
  }
  render() {
    return (
      <div className="App" style={{backgroundImage: `url(${this.state.bgImg})`}}>
        <audio 
          ref={(a) => { this.audio = a }} 
          src={this.state.src} ></audio>
        <div className="top-bar">
          <MenuItemInfo />
          <MenuItemPreferences />
        </div>

        <div className="display-track">
          <div id="track-name"></div>		
        </div>

        <div className="bottom-bar">

          <div className="bottom-left">
            <div id="previous" title="Play Last">
              <img src="img/previous-button.png"/>
            </div>
            <div id="next" title="Play Next">
              <img src="img/next-button.png"/>
            </div>
          </div>

        
          <div id="wrapper">
            <div id="player">
              <button id="pButton" type="button" className="play" onClick={this.togglePlay}>
                <span className="screenReader">Toggle Play</span>
              </button>
              <div id="timeline">
                <div id="buffered-bar">
                  <div id="playhead"></div>
                </div>
              </div>
            </div>
          </div>
        
          <div className="botton-right">
            <div id="restart" title="Play Again">
              <img src="img/restart.png"/>
            </div>
            <button id="fullscreen-button" type="button" class="btn" onClick={this.toggleFullscreen} style={{backgroundImage: `url(${this.state.isFullscreen ? 'img/cancel-fullscreen.png' : 'img/go-fullscreen.png'})` }}>
              <span className="screenReader">Toggle Fullscreen</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
