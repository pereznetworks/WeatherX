// importing modules
import React, { Component } from 'react';

// importing css
import '../App.css';
import { Nav, NavItem, Navbar } from 'react-bootstrap';
import '../custom.css';

// the custom component
class CustomNavbar extends Component {
  render() {
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
}

export default CustomNavbar;
