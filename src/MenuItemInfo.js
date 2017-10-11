import React, { Component } from "react";
import MenuItem from "./components/MenuItem";

export default class MenuItemInfo extends Component {
  render() {
    return (
      <MenuItem>
        {(state, props) => (
          <div className="menuItem">
            <button
              className="btn"
              type="button"
              style={{ backgroundImage: "url(img/info.png)" }}
              onMouseEnter={props.toggle}
              onMouseLeave={props.toggle}
              onFocus={props.toggle}
              onBlur={props.toggle}
            >
              <span className="screenReader">Information</span>
            </button>
            <div
              className="menuDropdown"
              style={{ display: state.expanded ? "" : "none" }}
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
      </MenuItem>
    );
  }
}
