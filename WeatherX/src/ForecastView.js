import React, { Component } from 'react';
import ReactMap from "react-mapbox-gl";
// import logo from './logo.svg';
import './App.css';
import './custom-grid.css';

// importing custom components
import ForecastViewHeader from './ForecastViewHeader.js'
import ForecastViewContainer from './ForcastViewContainer.js'
import MapViewContainer from './MapViewContainer.js'
import Footer from './Footer.js'

class ForecastView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      style:{active:'none'},
      styleLabel: 'none',
      loadForecastViewContainer:true
      // just assigning the 'street' style url as default, for now...
      date: new Date()
      // not using right now, but will be with timezonedb api
    };
    // needed to make `this` when with callbacks in App component jsx code
    this.toggleMapStyle = this.toggleMapStyle.bind(this);
    this.handleStyleLoad = this.handleStyleLoad.bind(this);
    this.switchViews = this.switchViews..bind(this);

  } // end constructor()

  handleStyleLoad(map){
    map.resize()
  }

  toggleMapStyle(e){
    // let mapViewType = document.getElementById('mapViewType');
    if ('Street' === e.target.value){
       this.setState({
                        style:{active:mapBoxStyle.Street},
                        styleLabel:'Street'
                        loadForecastViewContainer:false
                      });
        // mapViewType.innerHTML = 'Street';
    } else if ('Satellite' === e.target.value){
      this.setState({
                     style:{active:mapBoxStyle.Satellite},
                     styleLabel:'Satellite'
                     loadForecastViewContainer:false
                   });
       // mapViewType.innerHTML = 'Satellite';
    } else if ('Current Forecst') {
      this.setState({
                     // what do here...
                     // somehow set style to point to a forecast view, current, daily, weekly
                     // and hide MapViewContainer...
                     style:{active:none'},
                     styleLabel:'none'
                     loadForecastViewContainer:true
                   });
       // mapViewType.innerHTML = 'Satellite';
    }

  } // end toggleMapStyle() from Street to Satellite view

  switchViews(){
    // if (true) ? load this one : if not load that one
    (this.state.loadForecastViewContainer)
    ? <ForecastViewContainer
        style={this.state.style}
        onStyleLoad={this.handleStyleLoad}
      />
    : <MapViewContainer
        style={this.state.style}
        onStyleLoad={this.handleStyleLoad}
      />
    }
  } // end switchViews() between forecast view and map view

  componentDidMount(){
    // make sure first map controls input button gets focus
   this.firstInput.focus();
   // document.getElementById('mapViewType').textContent = this.state.styleLabel

 } // componentDidMount() may need to do more here...

  render() {
    return (
      <div className="App" style={{flex:1}}>
        <ForecastViewHeader this.switchViews/>
        <ViewContainer />
        {/*<div className='testDiv' style={{flex:1}} ><img className='testImg' style={{flex:1}}/></div>*/}
        <Footer />
      </div>
    );
  } // end render()

} // end App component

export default ForecastView;
