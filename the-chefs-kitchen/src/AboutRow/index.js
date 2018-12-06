// importing modules
import React, { Component } from 'react';

// importing css
import '../App.css';
import { Row, Col } from 'react-bootstrap';
import '../custom.css';

// the custom component
class AboutRow extends Component {
  render() {
    return (
      <Row>
        {/* TODO: need to dynamically place components here based on events
         */}

        <Col xs={6} md={4} className="col-lg order-lg-2">
          <h3 class="mb-4">Features</h3>
          <p>Find Recipes </p>
          <p>Source Local Ingredients</p>
          <p>Source cookware, utencils and appliances</p>
          <p>
            Watch vedios of recipes by chefs and cooks from around the world!
          </p>
          <p>then....</p>
          <p>Create your own Kitchen:</p>
          <p>
            ... Save, organize and come back to your favorite recipes, links to
            sources for local ingredients and cookware and links to your
            favorite recipe videos
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
            ingredients, cookware and even watch videos of the recipes being
            made.
          </p>
        </Col>
        <Col xs={6} md={4} className="col-lg order-lg-3">
          <h3 class="mb-4">A list to get started</h3>
          <div class="list-group">
            <a href="#Lasagna" class="list-group-item list-group-item-action">
              Lasagna
            </a>
            <a
              href="#Peking Duck"
              class="list-group-item list-group-item-action"
            >
              Peking Duck
            </a>
            <a
              href="#HowToClams"
              class="list-group-item list-group-item-action"
            >
              How to cook Clams
            </a>
            <a
              href="#AboutLambCurry"
              class="list-group-item list-group-item-action"
            >
              Lamb Curry
            </a>
            <a
              href="#PoachAnEgg"
              class="list-group-item list-group-item-action"
            >
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
}

export default AboutRow;
