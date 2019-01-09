// react components
import React, { Component } from 'react';

// css styling
import '../../css/App.css';
import '../../css/grid-main.css';

export default class GeoLocationCodingForm extends Component {

  constructor(props) {
    super(props);
    this.handleNavSubmit = this.handleNavSubmit.bind(this);
  }

  handleNavSubmit(e){
    this.props.handleNavSubmit(e);
  }

  render() {

    if (this.props.navState.geoLocationCodingForm === true && this.props.navState.geoLocation === true){
      return(
            <form id="geoLocationCoding-Form" style={{display:"inline"}}>
              <p
                 id="geoLocation-Label"
                 style={{display:"inline"}}
                 onClick={this.props.handleNavSubmit}>To enable geolocation services, click here -></p>
              <input
                 type="button"
                 id="geoLocation-submit"
                 style={{display:"inline"}}
                 onClick={this.props.handleNavSubmit}/>
              <input type="text" id="geoCoding-input" placeholder="Enter a location & click here ->" style={{display:"none"}}/>
              <input type="button" id="geoCoding-submit" style={{display:"none"}}/>
            </form>
        );
    } else if (this.props.navState.geoLocationCodingForm === true && this.props.navState.geoCoding === true ){
      return(
            <form id="geoLocationCoding-Form" style={{display:"inline"}}>
              <p id="geoLocation-Label" style={{display:"none"}}>To enable geolocation services, click here -></p>
              <input type="button" id="geoLocation-submit" style={{display:"none"}}/>
              <input
                    type="text"
                    id="geoCoding-input"
                    placeholder="Enter a location & click here ->"
                    style={{display:"inline"}}
                    onClick={this.props.handleNavSubmit}/>
              <input
                    type="button"
                    id="geoCoding-submit"
                    style={{display:"inline"}}
                    onClick={this.props.handleNavSubmit}/>
            </form>
        );
    } else {
      return null;
    }
  }
} // this component will be passed this.props.navState, .handleNavSubmit
