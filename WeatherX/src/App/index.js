import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route} from "react-router-dom";

// import custom css
import './css/App.css';
import './css/grid-main2.css';

// importing custom components
import Middle from './Components';

class Grid extends Component {

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

}; // end component

class App extends Component {
  render(){
    return (
      <Router>
          <Switch>
            <Route path="/" component={Grid} />
          </Switch>
      </Router>
    )
  }
};

export default App;
