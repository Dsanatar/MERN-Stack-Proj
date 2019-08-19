//brings together all other reducers

import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import profileReducer from './profileReducer';

export default combineReducers({
    //this is the name to be referenced in the component props
    item: itemReducer,
    profile: profileReducer
});