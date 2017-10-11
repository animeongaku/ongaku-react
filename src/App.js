import React, { Component } from 'react';
import './App.css';
import data from './data';
import MenuItemInfo from './MenuItemInfo'

class App extends Component {
  state = {
    src: data[0].link,
    bgImg: data[0].img
  }
  togglePlay = () => {
    this.audio[this.audio.paused ? 'play' : 'pause']();
	}
  render() {
    return (
      <div className="App" style={{backgroundImage: `url(${this.state.bgImg})`}}>
        <audio 
          ref={(a) => { this.audio = a }} 
          src={this.state.src} ></audio>
        <div className="top-bar">
          <MenuItemInfo />
          <div className="top-right">
            <a  data-placement="left" data-container="body" data-placement="left" type="button" data-html="true" data-toggle="popover" data-trigger="click"><img className="preferences-button" title="Select Preferences" src="img/options.jpg"/></a>
            <div id="popover-title">
              Preferences
            </div>
            <div id="popover-body">
              <div className="opening">
                <div>Opening</div>
                <div className="toggle-btn active">
                  <input type="checkbox"  checked className="cb-value cb-op" />
                  <span className="round-btn"></span>
                </div>
              </div>
              <div className="ending">
                <div>Ending</div>
                <div className="toggle-btn active">
                  <input type="checkbox"  checked className="cb-value cb-ed" />
                  <span className="round-btn"></span>
                </div>

              </div>
              <div className="ost">
                <div>OST</div>
                <div className="toggle-btn active">
                  <input type="checkbox"  checked className="cb-value cb-ost" />
                  <span className="round-btn"></span>
                </div>
              </div>
              <a className="github-button" href="https://github.com/anshumanv/ongaku" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star Anshuman-Verma/ongaku on GitHub">Star</a>
              <a className="github-button" href="https://github.com/anshumanv/ongaku/fork" data-icon="octicon-repo-forked" data-size="large" data-show-count="true" aria-label="Fork Anshuman-Verma/ongaku on GitHub">Fork</a>
            </div>
          </div>
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
            <div id="fullscreen-button" title="Toggle Fullscreen">
              <img src="img/go-fullscreen.png"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
