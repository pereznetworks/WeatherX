// importing modules
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import custom components
import CustomNavbar from './CustomNavbar';
import CustomJumbotron from './CustomJumbotron';
import AboutRow from './AboutRow';
import FooterRow from './FooterRow';

// importing css
import './App.css';
import { Grid } from 'react-bootstrap';
import './custom.css';

// main app
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={CustomNavbar} />
          <Route exact path="/" component={CustomJumbotron} />
          <Grid>
            <Route exact path="/" component={AboutRow} />
            <Route exact path="/" component={FooterRow} />
          </Grid>
        </div>
      </Router>

      /* PORTING ISSUE : bootstrap classes for sizing, postion, layout are not working
           like.....col-lg .order-lg-1/2/3 .py-3 text-md-center
           need to use react-bootstrap property equavilant ?
           for now using custom css to fix these issues
          */

      /* TODO: create custom components for simpler, reusable code
            ... with everything needed
            ... import and use in jsx code
        */
    );
  }
}

export default App;
