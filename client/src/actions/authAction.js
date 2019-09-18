import axios from 'axios';
import { returnErrors } from './errorAction';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

// check token and load user
// make request to api/auth/user
export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    // fetch user
    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            // payload should contains user and token
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
};

// setup config/headers and token 
export const tokenConfig = getState => {

    // get token from localStorage
    const token = getState().auth.token;

    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // check token before adding to header
    if(token) {
        // defined in middleware/auth
        config.headers['x-auth-token'] = token;
    }

    return config;
}