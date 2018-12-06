import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import {
  Grid,
  Row,
  Col,
  Nav,
  NavItem,
  Navbar,
  Jumbotron
} from 'react-bootstrap';
import './custom.css';
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={CustomNavbar} />
          <Route exact path="/" component={CustomJumbotron} />
          <Grid>
            <Route exact path="/" component={MainRow} />
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

function CustomNavbar() {
  return (
    <Navbar inverse collapseOnSelect fixedTop id="navbar-bg">
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#brand" id="font-color-white">
            Home
          </a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={1} href="#about" id="font-color-white">
            About
          </NavItem>
          <NavItem eventKey={2} href="#recipes" id="font-color-white">
            Recipes
          </NavItem>
          <NavItem eventKey={3} href="#pantry" id="font-color-white">
            Pantry
          </NavItem>
          <NavItem eventKey={4} href="#cookware" id="font-color-white">
            Cookware
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={5} href="#setupMyKitchen" id="font-color-white">
            setup up your own Kitchen
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

function CustomJumbotron() {
  return (
    <Jumbotron
      className="jumbotron jumbotron-fluid bg-info text-white mb-0"
      id="jumbotron-custom"
    >
      <div className="jumbotron-container text-sm-center pt-5">
        <h1 id="jumbotron-h1" className="display-2">
          The Chef's Kitchen
        </h1>
        <p className="lead">THE APP for Chefs and anyone who loves to cook!</p>
      </div>
    </Jumbotron>
  );
}

function MainRow() {
  return (
    <Row>
      {/* TODO: need to dynamically place components here based on events
       */}

      <Col xs={6} md={4} className="col-lg order-lg-2">
        <h3 class="mb-4">Features</h3>
        <p>Find Recipes </p>
        <p>Source Local Ingredients</p>
        <p>Source cookware, utencils and appliances</p>
        <p>Watch vedios of recipes by chefs and cooks from around the world!</p>
        <p>then....</p>
        <p>Create your own Kitchen:</p>
        <p>
          {' '}
          ... Save, organize and come back to your favorite recipes, links to
          sources for local ingredients and cookware and links to your favorite
          recipe videos
        </p>
      </Col>
      <Col xs={6} md={4} className="col-lg order-lg-1">
        <h3 class="mb-4">About The Chef's Kitchen</h3>
        <p>
          Built by me, Daniel Perez, for my Captsone Project, to finish my
          Full-Stack JavaScript TechDegree at Team Treehouse
        </p>
        <p>
          Inspired by my wife, who is a great chef, it is an excellent way to
          showcase all the latest software technologies made possible by our
          ever connected world!
        </p>
        <p>
          With this app, a chef will be able to get recipes, source local
          ingredients, cookware and even watch videos of the recipes being made.
        </p>
      </Col>
      <Col xs={6} md={4} className="col-lg order-lg-3">
        <h3 class="mb-4">A list to get started</h3>
        <div class="list-group">
          <a href="#Lasagna" class="list-group-item list-group-item-action">
            Lasagna
          </a>
          <a href="#Peking Duck" class="list-group-item list-group-item-action">
            Peking Duck
          </a>
          <a href="#HowToClams" class="list-group-item list-group-item-action">
            How to cook Clams
          </a>
          <a
            href="#AboutLambCurry"
            class="list-group-item list-group-item-action"
          >
            Lamb Curry
          </a>
          <a href="#PoachAnEgg" class="list-group-item list-group-item-action">
            Poach an Egg
          </a>
          <a
            href="#HowToHandleLobster"
            class="list-group-item list-group-item-action"
          >
            How to handle Lobster
          </a>
        </div>
      </Col>
    </Row>
  );
}

function FooterRow() {
  return (
    <Row id="footer" className="py-3">
      <Col xs={12} md={12} class="col text-md-center">
        <a href="../../public/index.html">
          <small>
            &copy; Daniel Perez, Capstone Project for FSJS Tech Degree from Team
            Treehouse
          </small>
        </a>
      </Col>
    </Row>
  );
}
export default App;
