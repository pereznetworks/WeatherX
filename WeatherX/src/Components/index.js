import React, { Component } from 'react';

// importing sub-components
import TitleBar from './titleBar.js';
import NavBar from './navBar';
import MainContent from './mainContents.js';

// import css styling
import '../css/grid-main.css';

// creates one component for all sub-components
class Middle extends Component {

  render(){
    return(
      <div className="middle">
        <TitleBar />
        <NavBar />
        <MainContent />
      </div>
    );
  }
}

export default Middle;
