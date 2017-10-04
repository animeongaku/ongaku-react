import React, { Component } from 'react';
import './App.css';
import data from './data';

class App extends Component {
  state = {
    src: data[0].link
  }
  togglePlay = () => {
    this.audio[this.audio.paused ? 'play' : 'pause']();
	}
  render() {
    return (
      <div className="App">
        <audio 
          ref={(a) => { this.audio = a }} 
          src={this.state.src} ></audio>
        <button type="button" onClick={this.togglePlay}>Play/pause</button>
        <div className="top-bar">
			    <img src="img/info.png" className="infoImg" />
          <div id="top-left" className="top-left" >
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Key</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>SPACE</strong></td>
                <td>Pause / Play</td>
              </tr>
              <tr>
                <td><strong>N</strong></td>
                <td>Next Track</td>
              </tr>
              <tr>
                <td><strong>R</strong></td>
                <td>Play Again</td>
              </tr>
              <tr>
                <td><strong>F</strong></td>
                <td>Fullscreen</td>
              </tr>
              <tr>
                <td><strong>L</strong></td>
                <td>Last Track</td>
              </tr>
              <tr>
                <td><strong>UP</strong></td>
                <td>Volume +10%</td>
              </tr>
              <tr>
                <td><strong>DOWN</strong></td>
                <td>Volume -10%</td>
              </tr>
              <tr>
                <td><strong>LEFT</strong></td>
                <td>Seek -10s</td>
              </tr>
              <tr>
                <td><strong>RIGHT</strong></td>
                <td>Seek +10s</td>
              </tr>
            </tbody>
          </table>
          </div>

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
              <button id="pButton" className="play" title="Toggle Play"></button>
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
