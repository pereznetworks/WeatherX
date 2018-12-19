import React, { Component } from 'react';
import ReactMap from "react-mapbox-gl";
// import logo from './logo.svg';
import './App.css';
import './custom-grid.css';

import accessToken from './config.js';
// importing mapbox accessToken from separate gitgnored file

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

function MapView(props){

  return (<Map
            className='middle'
            style={props.style.active}
            containerStyle={containerStyle}
            center={[-122.420679,37.772537]}
            zoom={[13]}
            hash={true}
          ></Map>
  );
} // end MapView component: renders 'core' ReactMap component

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      style:{active:'mapbox://styles/pereznetworks/cjplq61wx05gd2sqjpnwkbxoo'},
      styleLabel: 'Street',
      // just assigning the 'street' style url as default, for now...
      date: new Date()
      // not using right now, but will be with timezonedb api
    };
    // needed to make `this` when with callbacks in App component jsx code
    this.toggleMapStyle = this.toggleMapStyle.bind(this);
    this.handleStyleLoad = this.handleStyleLoad.bind(this);
  } // end constructor()

  handleStyleLoad(map){
    map.resize()
  }

  toggleMapStyle(e){
    // let mapViewType = document.getElementById('mapViewType');
    if ('Street' === e.target.value){
       this.setState({
                        style:{active:mapBoxStyle.Street},
                        styleLabel:'Street'
                      });
        // mapViewType.innerHTML = 'Street';
    } else if ('Satellite' === e.target.value){
      this.setState({
                     style:{active:mapBoxStyle.Satellite},
                     styleLabel:'Satellite'
                   });
       // mapViewType.innerHTML = 'Satellite';
    }
  } // end toggleMapStyle() from Street to Satellite view

  componentDidMount(){
    // make sure first map controls input button gets focus
   this.firstInput.focus();
   // document.getElementById('mapViewType').textContent = this.state.styleLabel

 } // componentDidMount() may need to do more here...

  render() {
    return (
      <div className="App" style={{flex:1}}>
        <header className="header" style={{flex:1}}>
        <a className="App-link" href="http://dap-dev.herokuapp.com" target="_blank" rel="noopener noreferrer">
          Mapping by Daniel's AppWorks
        </a>
        <form className="map-controls">
          <input type='button' value='Street' className="buttonLeft"
          onClick={this.toggleMapStyle}
          ref={(input) => { this.firstInput = input; }} />
          <input type='button' value='Satellite' className="buttonRight"
          onClick={this.toggleMapStyle} />
        </form>
        </header>
        <MapView
          style={this.state.style}
          onStyleLoad={this.handleStyleLoad}
        />
        {/*<div className='testDiv' style={{flex:1}} ><img className='testImg' style={{flex:1}}/></div>*/}
        <footer className="footer" style={{flex:1}}>
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
        </footer>
      </div>
    );
  } // end render()

} // end App component

export default App;
