import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './custom-grid.css';

class App extends Component {
  render() {
    return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a>
      </div>
      <div className="grid-container">
        <div className="header">
          <h2>Header</h2>
          <h3>CSS Template using Grid</h3>
          <p>In this example, we have created a header, three equal columns and a footer. On smaller screens, the columns will stack on top of each other.</p>
          <p>Resize the browser window to see the responsive effect.</p>
        </div>
        <div class="left">Column</div>
        <div class="middle">Column</div>
        <div class="right">Column</div>
        <div className="footer">
          <p><strong>Note:</strong></p>
          <p>If you are using Internet Explorer or Edge, that's too bad for you.</p>
        </div>
      </div>
     </div>
    );
  }
}

export default App;
