import React, { Component } from 'react'
import ExpandToggle from './components/ExpandToggle'
import './MenuItem.css'

export default class MenuItemPreferences extends Component {
  render() {
    return (
      <ExpandToggle>
        {(state, props) => (
          <div className="menuItem">
            <button
              className="btn"
              type="button"
              style={{ backgroundImage: 'url(img/options.jpg)' }}
              onClick={props.toggle}
            >
              <span className="screenReader">Preferences</span>
            </button>
            <div
              className="menuDropdown"
              style={{ display: state.expanded ? '' : 'none' }}
            >
              <div className="opening">
                <div>Opening</div>
                <div className="toggle-btn active">
                  <input type="checkbox" checked className="cb-value cb-op" />
                  <span className="round-btn" />
                </div>
              </div>
              <div className="ending">
                <div>Ending</div>
                <div className="toggle-btn active">
                  <input type="checkbox" checked className="cb-value cb-ed" />
                  <span className="round-btn" />
                </div>
              </div>
              <div className="ost">
                <div>OST</div>
                <div className="toggle-btn active">
                  <input type="checkbox" checked className="cb-value cb-ost" />
                  <span className="round-btn" />
                </div>
              </div>
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
        )}
      </ExpandToggle>
    )
  }
}
