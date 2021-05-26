import React, {Component} from 'react';
//import {BrowserRouter, Switch, Route} from 'react-router-dom';
import HomePage from './screens/HomePage.js';

import {Provider} from 'react-redux'

class App extends Component {
  render() {
    return (
      <HomePage/>
    )
  }
}

export default App;
