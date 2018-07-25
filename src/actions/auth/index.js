import authApi from './../../api/auth-api';

export const authSignIn = (email, password) => {
    return dispatch => {
        dispatch({ type: 'SIGN_IN_START', payload: { email, password }});
        return authApi.signIn(email, password).then(user => {
            dispatch({ type: 'SIGN_IN_SUCCESS', payload: user });
        }, err => {
            dispatch({ type: 'REMOVE_USER'});        
            dispatch({ type: 'SIGN_IN_ERROR', payload: err })
        });
    }
}

export const authValidate = () => {
    return dispatch => {
        dispatch({ type: 'SIGN_IN_START'});
        authApi.checkUser().then(user => {
            dispatch({ type: 'SIGN_IN_SUCCESS', payload: user });
        }, err => {     
            dispatch({ type: 'SIGN_IN_ERROR', payload: err })
        });
    }
}

export const authSignOut = () => {
    return dispatch => {
        dispatch({ type: 'SIGN_OUT_START'});
        authApi.signOut().then(() => dispatch({ type: 'SIGN_OUT_END'}));
    }
}