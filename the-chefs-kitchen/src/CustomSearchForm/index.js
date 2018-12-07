// importing modules
import React, { Component } from 'react';

// importing css
import '../App.css';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import '../custom.css';

// custom form component: adapted from react.bootstrap.io/component/forms
class SearchForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: ''
    };
  }

  getValidationState() {
    // replace this with real input validation
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(e) {
    // place call to get route, path and component here
    e.preventDefault();
  }

  /* TODO: on search form submit...
        the searchForm's handleSubmit function will...
          be pass the search term to a apicall function
        respective calls to api's will be made and results returned
        results will be passed to a resultsFunction
         resultsFunction  depending on the type of media will...
         pass results to either a map, video or json parsing function to be parsed...
         the html formatted results will then ...
         be passed the ResultsRow component and rendered
  */

  render() {
    return (
      <Form inline id="formCmpnt" onSubmit={this.handleSubmit}>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="try a meal, an ingredient or a cookware item"
            onChange={this.handleChange}
            id="searchInput"
          />
          <Button type="submit">Search</Button>
          <FormControl.Feedback />
        </FormGroup>
      </Form>
    );
  }
}

export default SearchForm;
