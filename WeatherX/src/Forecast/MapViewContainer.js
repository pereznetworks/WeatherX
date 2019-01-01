import React, { Component } from 'react';
import ReactMap from "react-mapbox-gl";
// import logo from './logo.svg';
import '../css/App.css';
import '../css/custom-grid.css';
import accessToken from '../config.js';

const Map = ReactMap({
  accessToken
}); // required: make accessToken part of 'core' ReactMap component

const mapBoxStyle = {
    Street:'mapbox://styles/pereznetworks/cjplq61wx05gd2sqjpnwkbxoo',
    Satellite:'mapbox://styles/pereznetworks/cjpm56zv704q72rovbn43q8b9',
}; // decalred out here because other Component functions need to access it

const containerStyle = {
  height: '90vh',
  width: '100vw'
}; // might change the way I set this up ...

class MapViewContainer extends Component {

  render() {
        return (<Map
            className='middle'
            style={props.style.active}
            containerStyle={containerStyle}
            center={[-122.420679,37.772537]}
            zoom={[13]}
            hash={true}
          ></Map>
        );
  }
} // end MapView component: renders 'core' ReactMap component
