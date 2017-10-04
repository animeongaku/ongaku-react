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
      </div>
    );
  }
}

export default App;
