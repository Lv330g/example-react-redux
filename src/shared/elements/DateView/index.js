import React, {Component} from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

export default class DateView extends Component {
    render() {
        return (
            <Moment className='date-time' format={this.props.format || 'DD MMM/HH:mm'} tz={this.props.timezone}>
                {this.props.date}
            </Moment>    
        );
    }
}