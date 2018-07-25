import React from 'react';
import { shallow } from 'enzyme';
import { AppHeader } from './index';

test('Render Header', () => {
    const component = shallow(< AppHeader />);
    expect(component.find('.profile-info')).toHaveLength(1);
});

test('Render Header with user props', () => {
    const props = {
        user: {
            avatar_url: '',
            firs_name: 'Dean', 
            last_name: 'Winchester' 
        }
    };
    const component = shallow(< AppHeader {...props} />);
    expect(component.find('.profile-info')).toHaveLength(1);
});

test('Header toggle dropdown', () => {
    const props = {
        user: {
            avatar_url: '',
            firs_name: 'Dean', 
            last_name: 'Winchester' 
        }
    };
    const component = shallow(< AppHeader {...props} />);
    expect(component.instance().state.openedDropdown).toEqual(false);
    component.find('.profile-info RaisedButton').simulate('click', {});
    expect(component.instance().state.openedDropdown).toEqual(true);
    component.instance().handleRequestClose();
    expect(component.instance().state.openedDropdown).toEqual(false);
});