import React, { Component } from 'react';

// importing sub-components
import TitleBar from './titleBar.js';
import NavBar2 from './navBar2';
import MainContent from './mainContents';

// import css styling
import '../css/grid-main2.css';
import '../css/mainContents.css';

// creates one component for all sub-components
class Middle extends Component {

  render(){
    return(
      <div className="middle">
        <TitleBar />
        <NavBar2 />
        <MainContent />
      </div>
    );
  }
}

export default Middle;
