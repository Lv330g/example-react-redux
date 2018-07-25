const initialState = {
    error: false, 
    loading: false, 
    isAuthorized: false, 
    user: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'UPDATED_AUTH_FORM':
        return {
            ...state,
            error: false
        };
        case 'SIGN_IN_START':
        case 'SIGN_OUT_START':
        return {
            ...state,
            error: false,
            loading: true
        };
        case 'SIGN_IN_SUCCESS':
        return {
            error: false,
            loading: false,
            isAuthorized: true,
            user: action.payload
        };
        case 'SIGN_IN_ERROR':
        case 'SIGN_OUT_END':
        return {
            error: true,
            loading: false,
            isAuthorized: false,
            user: null
        };
        default:
        return state
    }
}