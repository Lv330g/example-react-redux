import React from 'react';
import { Popover } from 'material-ui';

export default class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false
        }
        this.openDropdown = this.openDropdown.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }
    render() {
        const style = {
            dropdown: {
                margin: 0,
                boxSizing: 'border-box',
                width: this.props.width || 'auto'
            },
            wrapper: {
                width: this.props.width ? this.props.width - 40 : 'auto'
            }
        }
        return [
            this.props.label && <div className='select-label'>{this.props.label}</div>,
            <div key='select-wrapper'
                className={`select--wrapper ${this.state.opened ? 'opened' : ''}`}
                style={style.wrapper}
                onClick={this.openDropdown}>
                    {this.props.selected || this.props.placeholder || 'Select option'}
            </div>,
            <Popover
                key='select-body'
                style={style.dropdown}
                open={this.state.opened}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal:'left' ,vertical:'bottom'}}
                targetOrigin={{horizontal:'left',vertical:'top'}}
                useLayerForClickAway={false}
                onRequestClose={this.handleRequestClose}>
                    <div className='select--body'>
                        {this.props.options && this.props.options.map((option, key) => {
                            return <div key={key} 
                                onClick={ev => this.chooseItem(ev, option)} 
                                className={`${option === this.props.selected ? 'selected' : ''} select--item`}>
                                {option}
                            </div>
                        })}
                    </div>
            </Popover>
        ]
    }
    chooseItem(event, option) {
        event.stopPropagation();
        if (this.props.onChange) this.props.onChange(option);
        this.handleRequestClose();
    }
    openDropdown(event) {
        this.setState({opened: true, anchorEl: event.currentTarget});
    }
    handleRequestClose() {
        this.setState({opened: false});
    }
} 