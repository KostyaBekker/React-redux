/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import './app.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './components/containers/Login';
import MainApp from './components/containers/MainApp';
import OunPage from './components/containers/OunPage';


class App extends Component {
  render() {
    // console.log(this.props.user.name);
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/"><Login /></Route>
            <Route exact path="/main__app"><MainApp /></Route>
            <Route exact path="/oun_page"><OunPage /></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect(
  null,
  { }
)(App);
