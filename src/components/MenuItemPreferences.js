import React, { Component } from 'react'
import ExpandToggle from './ExpandToggle'
import '../css/MenuItem.css'
import { MdSettings } from 'react-icons/lib/md'
import { iconSize } from '../constants'

export default class MenuItemPreferences extends Component {
  render() {
    const { togglePreferenceState, preferenceState } = this.props
    return (
      <ExpandToggle>
        {(state, props) => (
          <button className="btn" title="Preferences" onClick={props.toggle}>
            <MdSettings className="icons" size={iconSize} />
            <div
              className="menuDropdown padded"
              style={{ display: state.expanded ? '' : 'none' }}
            >
              <div className="opening">
                <div>Opening</div>
                <div
                  className={`toggle-btn ${
                    preferenceState.opening ? 'active' : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    className="cb-value cb-op"
                    name="opening"
                    checked={preferenceState.opening}
                    onChange={togglePreferenceState}
                  />
                  <span className="round-btn" />
                </div>
              </div>
              <div className="ending">
                <div>Ending</div>
                <div
                  className={`toggle-btn ${
                    preferenceState.ending ? 'active' : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    className="cb-value cb-ed"
                    name="ending"
                    checked={preferenceState.ending}
                    onChange={togglePreferenceState}
                  />
                  <span className="round-btn" />
                </div>
              </div>
              <div className="ost">
                <div>OST</div>
                <div
                  className={`toggle-btn ${
                    preferenceState.ost ? 'active' : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    className="cb-value cb-ost"
                    name="ost"
                    checked={preferenceState.ost}
                    onChange={togglePreferenceState}
                  />
                  <span className="round-btn" />
                </div>
              </div>
              <div className="favourites">
                <div>Favourites</div>
                <div
                  className={`toggle-btn ${
                    preferenceState.favourites ? 'active' : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    className="cb-value cb-ost"
                    name="favourites"
                    checked={preferenceState.favourites}
                    onChange={togglePreferenceState}
                  />
                  <span className="round-btn" />
                </div>
              </div>

              <div className="github-container">
                <a
                  className="github-button"
                  href="https://github.com/anshumanv/ongaku"
                  data-icon="octicon-star"
                  data-size="large"
                  data-show-count="true"
                  aria-label="Star Anshuman-Verma/ongaku on GitHub"
                >
                  Star
                </a>
                <a
                  className="github-button"
                  href="https://github.com/anshumanv/ongaku/fork"
                  data-icon="octicon-repo-forked"
                  data-size="large"
                  data-show-count="true"
                  aria-label="Fork Anshuman-Verma/ongaku on GitHub"
                >
                  Fork
                </a>
              </div>
            </div>
          </button>
        )}
      </ExpandToggle>
    )
  }
}
