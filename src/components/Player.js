import React, { Component } from 'react'

class Player extends Component {
  render() {
    return (
      <div id="player-wrapper">
        <div id="player">
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
              value={this.props.percentComplete}
              onChange={this.props.handleTrackScrub}
              style={{
                background: `linear-gradient(to right, rgba(255, 255, 255, 0.4) ${
                  this.props.percentBuffered
                }%, rgba(0,0,0,.25) ${
                  this.props.percentBuffered
                }%, rgba(0,0,0,.25))`
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Player
