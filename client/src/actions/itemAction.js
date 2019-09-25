//where we make the requests to the backend
import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DEL_ITEM, ITEMS_LOADING } from './types';

// bring in helper function to get Token and put in header
import { tokenConfig } from './authAction';
import { returnErrors } from './errorAction';


//this gets called from the component to be passed to the reducer
//return calls the reducer with the sent action
export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios  
        .get('/api/items')
        .then(res => 
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            }))
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addItem = item => (dispatch, getState) => {
    axios
        .post('/api/items', item, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            }))
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const delItem = id => (dispatch, getState) => {
    axios
        .delete(`/api/items/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: DEL_ITEM,
                payload: id
            }))
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};


export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    };
};