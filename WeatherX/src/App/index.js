import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route, Redirect} from "react-router-dom";

// import custom css
import './css/App.css';
import './css/grid-main2.css';

// importing custom components
import Middle from './Components';

// wrapping all components in a grid section, "middle"
class Grid extends Component {

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

// implementing a simple Router
// this is just a front-end ...so there is a Redirect
// any trying to add location or other weather query strings to the url ... 
// will simply be redirect back to the root or home route
class App extends Component {
  render(){
    return (
      <Router>
          <Switch>
            <Route exact path="/" component={Grid} />
            <Route path="/*" render={() =>
              (<Redirect to={"/"}/>)
            }
            />
          </Switch>
      </Router>
    )
  }
};

export default App;
