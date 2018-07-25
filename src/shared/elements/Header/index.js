import React from 'react';
import { connect } from 'react-redux';
//used lib components
import { RaisedButton, Popover } from 'material-ui';
// used redux actions
import { authSignOut } from './../../../actions/auth';

const styles = {
    profileBtn: {
        backgroundColor: '#3a465a',
        padding: '0 10px',
        color: '#FFFFFF',
        fontSize: 14
    },
    activeBtn: {
        backgroundColor: '#202938',
    },
    profileDropdown: {
        backgroundColor: '#3a465a',
        color: '#FFFFFF',
        marginTop: 9,
        width: 185
    }
}
export class AppHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openedDropdown: false
        }
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }
    render() {
        return [
            <div className='header flex-row flex-space-between flex-align-center' key='header'>
                <div className='profile-info flex-row flex-align-center'>
                    <img className='profile-dropdown--avatar'
                        src={(this.props.user && this.props.user.avatar_url)} 
                        onError={event =>{}} alt=""/>
                    <RaisedButton 
                        buttonStyle={this.state.openedDropdown ? {...styles.profileBtn, ...styles.activeBtn} : styles.profileBtn}
                        onClick={this.toggleDropdown}
                        >
                        {this.props.user ? `${this.props.user.first_name} ${this.props.user.last_name}` : ''}
                    </RaisedButton>
                </div>
            </div>,
            <Popover
                key='popover'
                style={styles.profileDropdown}
                open={this.state.openedDropdown}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal:'right' ,vertical:'bottom'}}
                targetOrigin={{horizontal:'right',vertical:'top'}}
                useLayerForClickAway={false}
                onRequestClose={this.handleRequestClose}>
                <div>
                    <RaisedButton 
                        fullWidth={true}
                        buttonStyle={styles.profileBtn}
                        labelColor='#ffffff'
                        className='sign-out-button' 
                        label="Sign out"
                        onClick={this.props.signOut} />
                </div>
            </Popover>
        ]
    }
    toggleDropdown(event) {
        this.setState({
            openedDropdown: !this.state.openedDropdown,
            anchorEl: event.currentTarget,
        });

    }
    handleRequestClose() {
        this.setState({openedDropdown: false});
    }
}
export default connect(
    state => ({
        user: state.auth.user
    }), 
    dispatch => ({
        signOut: () => dispatch(authSignOut())
    })
)(AppHeader);