import React from 'react';
import { shallow } from 'enzyme';
import Preloader from './index';

test ('Render Preloader component without crashing', () => {
    const component = shallow(< Preloader />);
    expect(component.find('.preloader')).toHaveLength(1);
});