import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

// import login from '../../redux/actionsAuth';
import actionGetUser from '../../redux/actionsUser';
import '../../app.css';

// eslint-disable-next-line react/prefer-stateless-function
class OunPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameSingUp: '',
      surnameSingUp: '',
      roleSingUp: 1,
      nameCustomer: '',
      loading: true,
    };
  }

  componentDidMount = () => {
    this.props.getUser(() => {
      this.setState({ loading: false });
    });
  }

  hendelChangeSelect = (key, value) => {
    this.setState({ [key]: value });
  };

  editUser = (nameSingUp, surnameSingUp, roleSingUp, nameCustomer) => {
    const body = {
      name: nameSingUp,
      surname: surnameSingUp,
      name_customer: nameCustomer,
      role: roleSingUp
    };
    this.props.editUser(body, () => {
      document.querySelector('.link').click();
    });

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
      )
    }
  };

  render() {
    const {
      nameSingUp,
      surnameSingUp,
      roleSingUp,
      nameCustomer,
      loading,
    } = this.state;
    if (loading) {
      return (
        <p>Loading...</p>
      );
    }
    return (
      <div className="form__wrap__login">
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
          <Button
            variant="contained"
            onClick={() => this.editUser(nameSingUp, surnameSingUp, roleSingUp, nameCustomer)}
            disabled={
              !nameSingUp
              || !surnameSingUp
            }
          >
            Edit
          </Button>
        </div>
        <Link className="link" to="/main__app" />
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
)(OunPage);
