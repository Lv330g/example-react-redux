import React, {Component} from 'react';

export default class Toggle extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    render() {
        return <div className='toggle--container' onClick={this.onClick}>
            <div className='toggle--label'>{this.props.label}</div>
            <div className='flex-row flex-align-center'>
                <div onClick={this.clickPrevent}>
                    { this.props.children}
                </div>
                <div className={`toggle--handle ${this.props.toggled ? 'toggled' : ''}`}>
                    <div className={`toggle--circle ${this.props.toggled ? 'toggled' : ''}`}></div>
                </div>
            </div>
        </div>
    }
    onClick() {
        if (this.props.onToggle) this.props.onToggle(!this.props.toggled);
    }
    clickPrevent(event) {
        event.stopPropagation();
    }
}