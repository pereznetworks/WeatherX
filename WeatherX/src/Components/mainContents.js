import React, { Component } from 'react';
// import ReactMap from "react-mapbox-gl";
// import logo from '../imgs/logo.svg';

class MainContents extends Component {
  render() {
    return(

            <div id="main-content">

              <form id="geoLocation" action="">
                <div className="geo-div">
                  <label id="geoLocation-Label">
                    <input
                      type="button"
                      className="geo-button"
                      id="geoLocation-submit"
                      onClick={this.props.handleNavSubmit}/>
                   Find Me<
                  /label>
                </div>
                <div className="geo-div">
                  <label id="geoCoding-Label">
                    <input
                      type="button"
                      className="geo-button"
                      id="geoCoding-submit"
                      onClick={this.props.handleNavSubmit}/>
                   Enter location
                  </label>
                </div>
              </form>

              <p id="imgPlacholder" alt=""></p>
            </div>

    );
  }
}

export default MainContents;

/*
<input
    type="button"
    className="tempType"
    id="tempTypeC"
    href='/'
    value="˚C" />
<input
    type="button"
    className="tempType"
    id="tempTypeF"
    href='/'
    value="˚F"
    autoFocus/>
*/
