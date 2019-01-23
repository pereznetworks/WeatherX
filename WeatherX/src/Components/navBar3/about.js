import React, { Component } from 'react';
// import ReactMap from "react-mapbox-gl";
// import logo from '../imgs/logo.svg';

export default class About extends Component {

  constructor(props) {
    super(props);
    this.handleNavSubmit = this.handleNavSubmit.bind(this);
  }

  handleNavSubmit(e){
    this.props.handleNavSubmit(e);
  }

  render() {
    return(
            <div className="about-button-div">
              <input
                type="button"
                className="about-button"
                id="about-Submit"
                title="About WeatherX"
                onClick={this.handleNavSubmit}/>
              <label
                className="about-button-label"
                id="about-Button-Label"
                onClick={this.handleNavSubmit}>
               About WeatherX
              </label>
            </div>
    );
  }
}
