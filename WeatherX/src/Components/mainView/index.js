import React, { Component } from 'react';

import MainViewHdr from './mainViewHeader.js';
import TableHdr from './tableHeader.js';
import TableDays from './tableDays.js';
import TableWeek from './tableWeek.js';
import About from "./about.js";


export default class MainView extends Component {

  // passing props, navState object,
  // each element in object refers to a html element by true/false, render/dont render
  // passing bound handler methods
  // hanldeNavSubmit makes api call to back-end server
  // hanldeNavClick used to render/not render: Home, GeoLocaton form, or About

    constructor(props) {
      super(props);
      this.handleNavClick = this.handleNavClick.bind(this);
      this.handleNavSubmit = this.handleNavSubmit.bind(this);
    }

    handleNavClick(event) {
      this.props.handleNavClick(event);
    }


    handleNavSubmit(event) {
      this.props.handleNavSubmit(event);
    }

    showMeThisOne(){
      this.props.showMeThisOne();
    }

  render() {

    if (this.props.navState.mainView){
      return(
        <div id="mainView" title='mainView'>
          <MainViewHdr navState={this.props.navState} />
          <TableHdr />
          <TableDays />
          <TableWeek />
        </div>
      );
    } if (this.props.navState.about){
      return (
        <About />
      );
    } else {
      return null;
    }

  }
}
