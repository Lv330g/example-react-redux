import React, { Component } from 'react';
import { connect } from 'react-redux';
//used lib components
import { Redirect } from 'react-router-dom';

//redux actions
import { authValidate } from './../../actions/auth'
//used components
import AppHeader from './../../shared/elements/Header';

export class MainLayoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      haveActiveToken: window.localStorage.getItem('auth_headers') ? JSON.parse(window.localStorage.getItem('auth_headers'))['access-token'] : null,
      mounting: true
    };
  }
  componentDidMount() {
    if (this.state.haveActiveToken && !this.props.authStore.user) this.props.onCheckUser();
    this.setState({mounting: false})
  }
  render() {
    if (!this.state.haveActiveToken || this.props.authStore.error) return <Redirect to='/sign-in' />
    return (
      <div className="main-layout">
        <AppHeader />
        <div className='main-layout--content'>
          lol
        </div>
      </div>
    );
  }
}
export default connect(
  state => ({
    authStore: state.auth
  }),
  dispatch => ({
    onCheckUser: () => dispatch(authValidate())
  })
)(MainLayoutPage);