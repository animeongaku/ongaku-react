import React, { Component } from 'react'
import ExpandToggle from './ExpandToggle'
import '../css/MenuItem.css'
import { MdInfoOutline } from 'react-icons/lib/md'

export default class MenuItemInfo extends Component {
  render() {
    return (
      <ExpandToggle>
        {(state, props) => (
          <div className="menuItem">
            <MdInfoOutline
              className="icons"
              size={35}
              onMouseEnter={props.toggle}
              onMouseLeave={props.toggle}
              onFocus={props.toggle}
              onBlur={props.toggle}
            />
            <div
              className="menuDropdown"
              style={{ display: state.expanded ? '' : 'none' }}
            >
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Key</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>SPACE</strong>
                    </td>
                    <td>Pause / Play</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>N</strong>
                    </td>
                    <td>Next Track</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>R</strong>
                    </td>
                    <td>Play Again</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>F</strong>
                    </td>
                    <td>Fullscreen</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>L</strong>
                    </td>
                    <td>Last Track</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>UP</strong>
                    </td>
                    <td>Volume +10%</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>DOWN</strong>
                    </td>
                    <td>Volume -10%</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>LEFT</strong>
                    </td>
                    <td>Seek -10s</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>RIGHT</strong>
                    </td>
                    <td>Seek +10s</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </ExpandToggle>
    )
  }
}
