import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import actionAuth from '../../redux/actionsAuth';
import '../../app.css';

// eslint-disable-next-line react/prefer-stateless-function
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      password: '',
      nameSingUp: '',
      surnameSingUp: '',
      phoneSingUp: '',
      inputSingUp: '',
      roleSingUp: 1,
      nameCustomer: '',
      passwordSingUp: '',
      confirmPassword: '',
      showPasswordSingUp: false,
      showConfirmPassword: false,
      showPassword: false,
      status: 'singUp',
      showFailInputSingUp: false,
      showFailPasswordSingUp: false,
      showFailConfirmPassword: false,
      showFailPhoneSingUp: false
    };
  }

  hendelChangeSelect = (key, value) => {
    this.setState({ [key]: value });
    this.setState({ showFailPasswordSingUp: false });
    this.setState({ showFailConfirmPassword: false });
    this.setState({ showFailInputSingUp: false });
    this.setState({ showFailPhoneSingUp: false });
  };

  handleClickShowPassword = () => {
    this.setState({ ...this.state, showPassword: !this.state.showPassword });
  };

  handleClickShowPasswordSingUp = () => {
    this.setState({ ...this.state, showPasswordSingUp: !this.state.showPasswordSingUp });
  };

  handleClickShowConfirmPassword = () => {
    this.setState({ ...this.state, showConfirmPassword: !this.state.showConfirmPassword });
  };

  isValidSingUp = () => {
    const { confirmPassword, passwordSingUp, inputSingUp, phoneSingUp } = this.state;
    let isValidLoginSingUp = true;
    let isValidPasswordSingUp = true;
    let isValidConfirmPassword = true;
    let isValidPhoneSingUp = true;
    const regPhone = /^380\d{3}\d{2}\d{2}\d{2}$/;
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    const regPas = /([a-z]+[A-Z]+[0-9]+|[a-z]+[0-9]+[A-Z]+|[A-Z]+[a-z]+[0-9]+|[A-Z]+[0-9]+[a-z]+|[0-9]+[a-z]+[A-Z]+|[0-9]+[A-Z]+[a-z]+)/;
    if ((reg.test(inputSingUp) === false) || (inputSingUp === '')) {
      this.setState({ showFailInputSingUp: true });
      isValidLoginSingUp = false;
    }
    if ((regPas.test(passwordSingUp) === false) || (passwordSingUp === '') || (passwordSingUp.length !== 8)) {
      this.setState({ showFailPasswordSingUp: true });
      isValidPasswordSingUp = false;
    }
    if ((passwordSingUp !== confirmPassword) || (confirmPassword === '')) {
      isValidPasswordSingUp = false;
      isValidConfirmPassword = false;
      this.setState({ showFailConfirmPassword: true });
    }
    if ((regPhone.test(phoneSingUp) === false) || (phoneSingUp === '')) {
      this.setState({ showFailPhoneSingUp: true });
      // console.log('не корректный телефон');
      isValidPhoneSingUp = false;
    }
    if (isValidLoginSingUp && isValidPasswordSingUp && isValidConfirmPassword && isValidPhoneSingUp) {
      return true;
    }
  }

  loginUser = (email, password) => {

    const body = {
      email,
      password
    };

    this.props.login(body, () => {
      document.querySelector('.link').click();
    });
  };

  loginSingUp = (body) => {
    console.log(body);
    if (this.isValidSingUp()) {
      this.props.auth(body);
      this.setState({
        input: '',
        password: ''
      });
      // console.log('loginSingUp', 'OK');
      this.setState({ status: 'logIn' });
    }
  };

  hendelChangeRole = (roleSingUp) => {
    this.setState({
      roleSingUp,
      nameCustomer: ''
    });
  };

  renderNameCustomer = (roleSingUp, nameCustomer) => {
    if (roleSingUp === 1) {
      return (
        <TextField
          label="Name Customer"
          onChange={e => this.hendelChangeSelect('nameCustomer', e.target.value)}
          value={nameCustomer}
        />
      );
    }
  };

  editStatus = (status) => {
    this.setState({
      status,
      input: '',
      password: '',
      nameSingUp: '',
      inputSingUp: '',
      surnameSingUp: '',
      roleSingUp: '',
      phoneSingUp: '',
      passwordSingUp: '',
      nameCustomer: '',
      confirmPassword: '',
      showPasswordSingUp: false,
      showConfirmPassword: false,
      showPassword: false,
      showFailInputSingUp: false,
      showFailPasswordSingUp: false,
      showFailConfirmPassword: false,
      showFailPhoneSingUp: false
    });
  }

  renderMain = () => {
    const {
      input,
      password,
      showPassword,
      status,
      confirmPassword,
      showConfirmPassword,
      nameSingUp,
      surnameSingUp,
      phoneSingUp,
      roleSingUp,
      inputSingUp,
      passwordSingUp,
      showPasswordSingUp,
      showFailInputSingUp,
      showFailPasswordSingUp,
      showFailConfirmPassword,
      nameCustomer,
      showFailPhoneSingUp
    } = this.state;
    if (status === 'logIn') {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <TextField
            label="Email"
            className="isValidEmail"
            onChange={e => this.hendelChangeSelect('input', e.target.value)}
            value={input}
          />
          <FormControl>
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              style={{ width: '165px' }}
              type={showPassword ? 'text' : 'password'}
              value={password}
              label="Password"
              className="isValidPassword"
              onChange={e => this.hendelChangeSelect('password', e.target.value)}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    onClick={this.handleClickShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )}
            />
          </FormControl>
          <Button
            variant="contained"
            onClick={() => this.loginUser(input, password)}
            disabled={
              !input
              || !password
            }
          >
            Enter
          </Button>
        </div>
      );
    }
    if (status === 'singUp') {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <TextField
            label="Name"
            onChange={e => this.hendelChangeSelect('nameSingUp', e.target.value)}
            value={nameSingUp}
          />
          <TextField
            label="Surname"
            onChange={e => this.hendelChangeSelect('surnameSingUp', e.target.value)}
            value={surnameSingUp}
          />
          {this.renderNameCustomer(roleSingUp, nameCustomer)}
          <TextField
            label="Email"
            className="isValidEmailSingUp"
            onChange={e => this.hendelChangeSelect('inputSingUp', e.target.value)}
            value={inputSingUp}
          />
          <span
            style={{
              color: 'red',
              display: showFailInputSingUp ? 'block' : 'none',
              width: '168px',
            }}
          >
            Введите корректный e-mail
          </span>
          <TextField
            label="Phone"
            placeholder="380..."
            onChange={e => this.hendelChangeSelect('phoneSingUp', e.target.value)}
            value={phoneSingUp}
          />
          <span
            style={{
              color: 'red',
              display: showFailPhoneSingUp ? 'block' : 'none',
              width: '168px',
            }}
          >
            Введите корректный телефон
          </span>
          <FormControl className="data__form__judging" size="small">
            <InputLabel>Role</InputLabel>
            <Select
              value={roleSingUp}
              onChange={e => this.hendelChangeRole(e.target.value)}
              label="Role"
            >
              <MenuItem value={1}>Поставщик</MenuItem>
              <MenuItem value={2}>Заказчик</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              style={{ width: '165px' }}
              type={showPasswordSingUp ? 'text' : 'password'}
              value={passwordSingUp}
              label="Password"
              className="isValidPasswordSingUp"
              onChange={e => this.hendelChangeSelect('passwordSingUp', e.target.value)}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    onClick={this.handleClickShowPasswordSingUp}
                  >
                    {showPasswordSingUp ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )}
            />
          </FormControl>
          <span
            style={{
              color: 'red',
              display: showFailPasswordSingUp ? 'block' : 'none',
              width: '168px',
            }}
          >
            Пароль должен состоять из цифр, латинских
             букв верхнего и нижнего регистра, и 8-ми символов
          </span>
          <FormControl>
            <InputLabel htmlFor="standard-adornment-password">Confirm password</InputLabel>
            <Input
              style={{ width: '165px' }}
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              label="Confirm password"
              className="isValidConfirmPassword"
              onChange={e => this.hendelChangeSelect('confirmPassword', e.target.value)}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    onClick={this.handleClickShowConfirmPassword}
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )}
            />
          </FormControl>
          <span
            style={{
              color: 'red',
              display: showFailConfirmPassword ? 'block' : 'none',
              width: '168px',
              margin: '0 0 25px 0',
            }}
          >
            Пароли не совпадают
          </span>
          <Button
            variant="contained"
            onClick={() => this.loginSingUp({
              name: nameSingUp,
              surname: surnameSingUp,
              name_customer: nameCustomer,
              email: inputSingUp,
              phone: phoneSingUp,
              role: roleSingUp,
              password: passwordSingUp,
              password_confirmation: confirmPassword
            })}
            disabled={
              !nameSingUp
              || !inputSingUp
              || !surnameSingUp
              || !roleSingUp
              || !phoneSingUp
              || !passwordSingUp
              || !confirmPassword
            }
          >
            Registration
          </Button>
        </div>
      );
    }
  }

  render() {
    const { status } = this.state;
    return (
      <div className="form__wrap__login">
        <div>
          <Button
            variant="contained"
            onClick={() => this.editStatus('logIn')}
            style={{ color: status === 'logIn' ? 'white' : 'black', marginRight: '3px' }}
          >
            Log In
          </Button>
          <Button
            variant="contained"
            onClick={() => this.editStatus('singUp')}
            style={{ color: status === 'singUp' ? 'white' : 'black' }}
          >
            Sing Up
          </Button>
        </div>
        { this.renderMain() }
        <Link className="link" to="/main__app" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth,
});

export default connect(
  mapStateToProps,
  actionAuth
)(Login);
