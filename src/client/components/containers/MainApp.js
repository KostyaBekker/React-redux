/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MainBlock from './MainBlock';
import actionGetUser from '../../redux/actionsUser';

import './main.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      showNavSelect: false
    };
  }

  componentDidMount = () => {
    this.props.getUser(() => {
      this.setState({ loading: false })
    });
  }

  logOut = () => {
    // this.handleClose();
    localStorage.removeItem('appToken');
    document.querySelector('.linkOut').click();
    this.setState({ showNavSelect: false })
  };

  ounPage = () => {
    document.querySelector('.linkOunPage').click();
    this.setState({ showNavSelect: false })
  };

  openNav = () => {
    this.setState({ showNavSelect: this.state.showNavSelect ? false : true });
  };

  render() {
    const { showNavSelect, loading } = this.state;
    if (loading) {
      return (
        <p>Loading...</p>
      );
    }
    return (
      <div className="main">
        <div className="main__header">
          <div className="logo__search__block">
            <div className="logo">
              <h1>Exprts</h1>
            </div>
            <div className="search">
              <input
                placeholder="Поиск эксперов, навыки"
              />
            </div>
          </div>
          <div className="nav_block">
            <div className="nav">
              <a href="">Эксперты</a>
            </div>
            <div className="nav">
              <a href="">Вопросы</a>
            </div>
            <div className="nav">
              <a href="">О нас</a>
            </div>
            <div className="nav__project">
              <a href="">Создать проект</a>
            </div>
            <div
              className="avatar"
              onClick={() => this.openNav()}
            >
              <div
                style={{
                  display: showNavSelect ? 'block' : 'none',
                }}
                className="select__block"
              >
                <ul>
                  <li
                    onClick={() => this.ounPage()}
                  >
                    Личный кабинет
                  </li>
                  <li
                    onClick={() => this.logOut()}
                  >
                    Выйти
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Link className="linkOut" to="/" />
        <Link className="linkOunPage" to="/oun_page" />
        <MainBlock />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  actionGetUser
)(Main);
