import React, { Component } from 'react';
// import ReactMap from "react-mapbox-gl";
// import logo from '../imgs/logo.svg';

export default class GeoCoding extends Component {
  render() {
    return(
            <div className="geo-button-div">
              <input
                type="button"
                className="geo-button"
                id="geoCoding-submit"
                onClick={this.props.handleNavSubmit}/>
              <label className="geo-button-Label" id="geoCoding-Label">
               Type location
              </label>
            </div>
    );
  }
}
