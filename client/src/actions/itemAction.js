//where we make the requests to the backend
import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DEL_ITEM, ITEMS_LOADING } from './types';


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
};

export const addItem = item => dispatch => {
    axios
        .post('/api/items', item)
        .then(res =>
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            }))
};

export const delItem = id => dispatch => {
    axios
        .delete(`/api/items/${id}`)
        .then(res =>
            dispatch({
                type: DEL_ITEM,
                payload: id
            }));
};


export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    };
};