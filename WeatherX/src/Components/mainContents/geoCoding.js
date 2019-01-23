import React, { Component } from 'react';
// import ReactMap from "react-mapbox-gl";
// import logo from '../imgs/logo.svg';

export default class GeoCoding extends Component {

  constructor(props) {
    super(props);
    this.handleNavClick = this.handleNavClick.bind(this);
    this.handleNavSubmit = this.handleNavSubmit.bind(this);
  }

  handleNavClick(e){
    this.props.handleNavClick(e);
  }

  handleNavSubmit(e){
    this.props.handleNavSubmit(e);
  }

  render() {
    return(
            <div className="geocoding-div">
              <input
                type="button"
                className="geo-button"
                id="geoCoding-Submit"
                title="Click me to enter a location"
                onClick={this.props.handleNavClick}/>
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
                title="Submit Search"
                onClick={this.props.handleNavSubmit}/>
            </div>
    );
  }
}
