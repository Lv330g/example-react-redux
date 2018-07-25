import React from 'react';
import { FlatButton } from 'material-ui';

export default class ButtonIcon extends React.Component {
    render () {
        return <FlatButton onClick={this.props.onClick}
            style={{
                padding: 8, fontSize: this.props.size || 'inherit', lineHeight: 'auto',
                height: this.props.size * 2 || 'auto', width: this.props.size * 2 || 'auto', minWidth: 'auto', borderRadius: '50%'}}>
                <i className={`icon-${this.props.icon} ${this.props.className}`}>
                    <span className='path1'/><span className='path2'/><span className='path3'/>
                </i>
            </FlatButton>
    }
} 