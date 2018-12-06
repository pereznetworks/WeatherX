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
          <CustomNavbar />
          <Route exact path="/" component={CustomJumbotron} />
          <Grid>
            {/* TODO: will need to dynamically place components here */}
            <Route exact path="/" component={AboutRow} />
            <FooterRow />
          </Grid>
        </div>
      </Router>

      /* PORTING ISSUE : bootstrap classes for sizing, postion, layout are not working
           like.....col-lg .order-lg-1/2/3 .py-3 text-md-center
           need to use react-bootstrap property equavilant ?
           for now using custom css to fix these issues
          */
    );
  }
}

export default App;
