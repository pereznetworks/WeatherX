import React, { Component } from 'react';
// import ReactMap from "react-mapbox-gl";
// import logo from '../imgs/logo.svg';

export default class GeoLocation extends Component {

  constructor(props) {
    super(props);
    this.handleNavSubmit = this.handleNavSubmit.bind(this);
  }

  handleNavSubmit(e){
    this.props.handleNavSubmit(e);
  }

  render() {
    return(
            <div className="geolocation-div">
              <input
                type="button"
                className="geo-button"
                id="geoLocation-Submit"
                title="Find Me"
                onClick={this.props.handleNavSubmit}></input>
              <label
                className="geo-button-label"
                id="geoLocation-Label"
                title="Find Me"
                onClick={this.props.handleNavSubmit}>
               Find Me
              </label>
            </div>


    );
  }
}
