import React, {Component} from 'react';
import { CircularProgress, Popover } from 'material-ui';

export default class MultiSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false
        }
        this.deselectAll = this.deselectAll.bind(this);
        this.openDropdown = this.openDropdown.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }
    render() {
        const selectedLabels = [];
        if (this.props.selected) {
            this.props.selected.forEach(element => {
                if (this.props.optionValue) {
                    let emenentObject = this.props.options.find(item => item[this.props.optionValue] === element);
                    if (emenentObject) selectedLabels.push(emenentObject[this.props.optionLabel]);
                } else {
                    selectedLabels.push(element);
                }
            })
        }
        const style = {
            dropdown: {
                margin: 0,
                boxSizing: 'border-box',
                width: this.props.width || 'auto',
            },
            wrapper: {
                width: this.props.width ? this.props.width - 40 : 'auto'
            }
        }
        return [
            this.props.label && <div className='select--label' key='select-label'>{this.props.label}</div>,
            <div key='select-wrapper'
                className={`multiselect--wrapper ${this.state.opened ? 'opened' : ''}`}
                style={style.wrapper}
                onClick={this.openDropdown}>
                    {this.props.selected && this.props.selected.length ?
                        selectedLabels.map((label, key) => {
                            return <div key={key} className='chip'>
                                <div className='label capitalize'>{label}</div>
                                <i className='icon-cross light-grey' onClick={ev => this.deleteItem(ev, key)} />
                            </div>
                        })
                        : <span className='placeholder'>{this.props.placeholder || 'Select options'}</span>}
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
                    <div onClick={this.deselectAll} className={`${this.props.selected.length ? '' : 'selected' } select--item deselect-item`}>
                        {this.props.placeholder || 'Select options'}
                    </div>
                    <div className='select--body light-scroll'>
                        {this.props.loading && <div className='loading text-center'><CircularProgress size={35} thickness={4} /></div>}
                        {this.props.options && this.props.options.map((option, key) => {
                            return <div key={key} 
                                onClick={ev => this.chooseItem(ev, this.props.optionValue ? option[this.props.optionValue] : option)} 
                                className={`${this.isSelected(this.props.optionValue ? option[this.props.optionValue] : option)} select--item capitalize`}>
                                {this.props.optionLabel ? option[this.props.optionLabel] : option}
                            </div>
                        })}
                    </div>
            </Popover>
        ]
    }
    isSelected(option) {
        return this.props.selected.find(item => item === option) ? 'selected': '';
    }
    chooseItem(event, option) {
        event.stopPropagation();
        let selectedArray = [...this.props.selected];
        let index = this.props.selected.indexOf(option);
        if (index !== -1) {
            selectedArray.splice(index, 1);
        } else {
            selectedArray.push(option);
        }
        if (this.props.onChange) this.props.onChange(selectedArray);
    }
    deleteItem(event, index) {
        event.stopPropagation();
        let selectedArray = [...this.props.selected];
        selectedArray.splice(index, 1);
        this.props.onChange(selectedArray);
    }
    deselectAll() {
        this.props.onChange([]);
        this.handleRequestClose();
    }
    openDropdown(event) {
        if (this.props.onOpen && !this.state.opened) this.props.onOpen(); 
        this.setState({opened: true, anchorEl: event.currentTarget});
    }
    handleRequestClose() {
        this.setState({opened: false});
    }
}