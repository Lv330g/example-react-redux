import React from 'react';
import { shallow } from 'enzyme';
import DateView from './index';

test('Render DateView', () => {
    const component = shallow(<DateView date='2018/01/24' timezone='Eroupe-Kiev'/>);
    expect(component.find('.date-time')).toHaveLength(1);
});