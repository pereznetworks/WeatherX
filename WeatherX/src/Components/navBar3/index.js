import React, { Component } from 'react';

export default class NavBar3 extends Component {

// passing props, navState object,
// each element in object refers to a html element by true/false, render/dont render
// passing bound handler methods
// hanldeNavSubmit makes api call to back-end server
// hanldeNavClick used to render/not render: Home, GeoLocaton form, or About

  constructor(props) {
    super(props);
    this.handleNavClick = this.handleNavClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNavSubmit = this.handleNavSubmit.bind(this);
  }

  handleNavClick(event) {
    this.props.handleNavClick(event);
  }

  handleInputChange(e){
    this.props.handleInputChange(e);
  }

  handleNavSubmit(event) {
    this.props.handleNavSubmit(event);
    this.props.handleNavClick(event);
  }

  render() {
            if (this.props.navState.home){
              return(
                <div id="navBar3" className=".middle-grid-item-1">
                  <form id="geoLocation" action="" >
                    <input
                      type="submit"
                      value=""
                      className="geo-button"
                      id="geoLocation-Submit"
                      title="Find Me"
                      onClick={this.handleNavSubmit}/>
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
                      onClick={this.handleNavSubmit}/>
                  </form>
                </div>
             );
            } else {
              return (
                <div id="navBar3">
                  <form id="geoLocation" action="">
                    <div className="backHome-div">
                      <input
                        type="button"
                        className="geo-button"
                        id="backHome-button"
                        title="backHome"
                        onClick={this.props.handleNavClick}></input>
                    </div>
                  </form>
                </div>
              );
            }
    }
}
