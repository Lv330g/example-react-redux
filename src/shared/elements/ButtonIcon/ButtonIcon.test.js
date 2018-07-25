import React from 'react';
import { shallow } from 'enzyme';
import ButtonIcon from './index';

it('Render ButtonIcon', () => {
    const component = shallow(< ButtonIcon icon='home' />);
    expect(component.find('.icon-home')).toHaveLength(1);
});