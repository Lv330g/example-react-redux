import React, {Component} from 'react';

export default class Input extends Component {
    render() {
        return <div className='input--container'>
            {!!this.props.label && <div className='input--label'>{this.props.label}</div>}
            <input className='input--value' type={this.props.type || 'text'} 
                value={this.props.value} onChange={this.props.onChange}
                placeholder={this.props.placeholder}/>
        </div>
    }
}