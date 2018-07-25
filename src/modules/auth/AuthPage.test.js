import React from 'react';
import { shallow } from 'enzyme';
import { AuthPage } from './AuthPage';

let props = {
    authStore: {error: false, loading: false, isAuthorized: false, user: null},
    onSignIn: jest.fn(),
    onUpdateForm: jest.fn()
};

test('AuthPage rendering', () => {
    let component = shallow(<AuthPage {...props} />);
    expect(component.find('.sign-in-email')).toHaveLength(1);
    expect(component.find('.sign-in-pass')).toHaveLength(1);
});

test('AuthPage update fields', () => {
    let component = shallow(<AuthPage {...props} />);
    component.find('.sign-in-email').simulate('change', {target: {value: 'some@email.com'}});
    expect(component.instance().state.email).toEqual('some@email.com');
    component.find('.sign-in-pass').simulate('change', {target: {value: 'somepass'}});
    expect(component.instance().state.password).toEqual('somepass');    
    component.find('.sign-in-pass').simulate('keyPress', {key: 'Enter'});
    component.find('.sign-in-button').simulate('click');
    expect(component.instance().props.onSignIn.mock.calls).toHaveLength(2);
});

test('AuthPage show error', () => {
    let component = shallow(<AuthPage {...props} />);
    expect(component.find('.error').text()).not.toContain('User email or password is incorrect');
    component.find('.sign-in-email').simulate('change', {target: {value: 'some@email.com'}});
    component.setProps({authStore: {error: true, loading: false, isAuthorized: false, user: null}});
    component.find('.sign-in-pass').simulate('change', {target: {value: 'somepass'}});
    expect(component.find('.error').text()).toContain('User email or password is incorrect');
    expect(component.instance().props.onUpdateForm.mock.calls).toHaveLength(1);
    component.setProps({authStore: {error: false, loading: true, isAuthorized: false, user: null}});    
});

test('AuthPage should redirect if Authorized', () => {
    let component = shallow(<AuthPage {...props} />);
    component.setProps({authStore: {error: true, loading: false, isAuthorized: true, user: {}}});
    expect(component.find('Redirect[to="/app"]')).toHaveLength(1);
});
