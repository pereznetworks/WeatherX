import React, { Component } from 'react';

// import logo from './logo.svg';
import './App.css';
import './custom-grid.css';

class InitalHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
      // not using at this level yet
    };
  } // end constructor()


  componentDidMount(){
    // make sure first map controls input button gets focus
   this.firstInput.focus();

 } // end componentDidMount() may need to do more here...

  render() {
    return (
        <header className="header" style={{flex:1}}>
        <a href="/" className="App-link" >Welcome to WeatherX</a>
        <form className="map-controls">
          <input type='text' value='' placeholder=' Please type in a City, State or Zip Code, then press' className="typeInALocationInputLeft"
          ref={(input) => { this.firstInput = input; }} />
          <input type='submit' value='Get Forecast' className="submitLocationButtonMiddle"/>
          <input type='button' value='or Use My Location' className="useMyLocationButtonRight" />
        </form>
        </header>
    );
  } // end render()

} // end App component

export default InitalHeader;
