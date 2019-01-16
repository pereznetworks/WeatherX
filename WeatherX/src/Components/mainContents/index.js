import React, { Component } from 'react';
// import ReactMap from "react-mapbox-gl";
// import logo from '../imgs/logo.svg';

import GeoLocation from "./geoLocation.js";
import GeoCoding from "./geoCoding.js";
import About from "./about.js"

export default class MainContents extends Component {
  render() {
    return(

            <div id="main-content">

              <form id="geoLocation" action="">
                <GeoLocation />
                <GeoCoding />
                <About />
              </form>


            </div>

    );
  }
}

// <p id="imgPlacholder" alt=""></p>
