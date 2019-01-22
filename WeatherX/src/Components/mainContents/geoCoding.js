import React, { Component } from 'react';
// import ReactMap from "react-mapbox-gl";
// import logo from '../imgs/logo.svg';

export default class GeoCoding extends Component {
  render() {
    return(
            <div className="geocoding-div">
              <input
                type="button"
                className="geo-button"
                id="geoCoding-Submit"
                title="Click me to enter a location"
                onClick={this.props.handleNavSubmit}/>
              <label className="geo-button-label" id="geoCoding-Label">
               Type location
              </label>
              <input
                type="text"
                id="geoCoding-TextInput"
                title="type a location and click me"
                placeholder="Enter a location"/>
              <input
                type="button"
                id="geoCoding-TextSubmit"
                title="Search"/>
            </div>
    );
  }
}
