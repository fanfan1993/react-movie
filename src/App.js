import React, { Component } from 'react';
//import logo from './logo.svg';
import Home from './pages/Home/home';
import Detail from './pages/Detail/detail';
import Search from './pages/Search/search'

import Me from './pages/Me/me'
import {connect} from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div className="App">
      {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
         <Router>
            <div>
              <Route exact path='/' component={Home}/>
              <Route path='/home' component={Home}/>
              <Route path='/me' component={Me}/>
              <Route path='/subject/:id' component={Detail}/>
              <Route path='/search' component={Search}/>
            </div>  
         </Router>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(
  mapDispatchToProps
)(App);
