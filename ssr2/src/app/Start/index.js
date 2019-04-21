import React, { Component } from 'react';

// importing custom components
import Middle from '../Components';
import '../Components/assets/css/App.css';
import '../Components/assets/css/grid-main2.css';


export default class Start extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
      // no state at this level yet
    };
  } // end constructor()

  render() {
    return (
      <div id="Main" className="grid-main">
        <div className="left-margin"></div>
        <Middle />
        <div className="right-margin"></div>
      </div>
    );
  } // end render()

} // end App component
