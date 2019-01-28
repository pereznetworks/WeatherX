import React, { Component } from 'react';
// import ReactMap from "react-mapbox-gl";
// import logo from '../imgs/logo.svg';

export default class GeoCoding extends Component {

  constructor(props) {
    super(props);
    this.handleNavClick = this.handleNavClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNavSubmit = this.handleNavSubmit.bind(this);
  }

  handleNavClick(e){
    this.props.handleNavClick(e);
  }

  handleInputChange(e){
    this.props.handleInputChange(e);
  }

  handleNavSubmit(e){
    this.props.handleNavSubmit(e);
    this.props.handleNavClick(e);
  }

  render() {
    return(
            <div className="geocoding-div">
              <input
                type="text"
                id="geoCoding-TextInput"
                placeholder="Enter a location"
                onChange={this.handleInputChange}/>
              <input
                type="submit"
                value=""
                id="geoCoding-TextSubmit"
                title="Submit Search"
                onClick={this.props.handleNavSubmit}/>
            </div>
    );
  }
}


/* <input
  type="button"
  className="geo-button"
  id="geoCoding-Submit"
  title="Click me to enter a location"
  onClick={this.props.handleNavClick}/>
<label className="geo-button-label" id="geoCoding-Label">
 Type location
</label> */
