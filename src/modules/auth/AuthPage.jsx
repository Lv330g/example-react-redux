import React, { Component } from 'react';
import { connect } from 'react-redux';
//used lib components
import { Redirect } from 'react-router-dom';
import { TextField, RaisedButton, LinearProgress } from 'material-ui';
//used components
import { authSignIn } from './../../actions/auth'

export class AuthPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        email: '',
        password: '',
        haveActiveToken: false
        }
        this.state.haveActiveToken = window.localStorage.getItem('auth_headers') ? JSON.parse(window.localStorage.getItem('auth_headers'))['access-token'] : null;
        this.signIn = this.signIn.bind(this);
        this.updateField = this.updateField.bind(this);
        this.onPressEnter = this.onPressEnter.bind(this);
    }
    render() {
    if (this.props.authStore.isAuthorized || this.state.haveActiveToken) return <Redirect to='/app'/>
    return (
        <div className='text-center signin-wrapper'>
            <div className='signin-form text-left padding'>
                <TextField 
                    inputStyle={{color: '#FFFFFF'}}
                    floatingLabelStyle={{color: '#ffcd50'}}
                    floatingLabelText='Enter Email' 
                    type='email' fullWidth={true}
                    className='sign-in-email'
                    value={this.state.email} 
                    disabled={this.props.authStore.loading}                        
                    onChange={ev =>this.updateField('email', ev)}
                    onKeyPress={this.onPressEnter}/>
                <TextField 
                    inputStyle={{color: '#FFFFFF'}}
                    floatingLabelStyle={{color: '#ffcd50'}}
                    floatingLabelText='Enter Password'
                    type='password' fullWidth={true}
                    className='sign-in-pass'
                    value={this.state.password} 
                    disabled={this.props.authStore.loading}
                    onChange={ev =>this.updateField('password', ev)}
                    onKeyPress={this.onPressEnter}/>
                <div className='error'>{ this.props.authStore.error && this.state.email && this.state.password && 'User email or password is incorrect' }</div>
                <RaisedButton 
                    fullWidth={true} className='sign-in-button'
                    onClick={this.signIn} type="submit"
                    disabled={!this.state.email || !this.state.password || !!this.props.authStore.error || this.props.authStore.loading}
                    label="SIGN IN" primary={true} />
                { this.props.authStore.loading ? <LinearProgress /> : ''}
            </div>
        </div>
    )}
    signIn() {
        this.props.onSignIn(this.state.email, this.state.password);
    }
    updateField(key, event) {
        let field = {};
        field[key] = event.target.value;
        this.setState(field);
        if (this.props.authStore.error) this.props.onUpdateForm();
    }
    onPressEnter(event) {
        if (event.key === 'Enter' && this.state.email && this.state.password 
            && !this.props.authStore.error && !this.props.authStore.loading) {
                this.signIn(this.state.email, this.state.password);
        }
    }
}
export default connect(
  state => ({
    authStore: state.auth
  }),
  dispatch => ({
    onSignIn: (email, password) => dispatch(authSignIn(email, password)),
    onUpdateForm: () => dispatch({type: 'UPDATED_AUTH_FORM'})
  })
)(AuthPage);