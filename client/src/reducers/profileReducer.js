import { ICON_CHANGE } from '../actions/types'

const initialState = {
    icon: 0
};

export default function(state = initialState, action){
    switch(action.type){
        case ICON_CHANGE:
            return {
                ...state,
                icon: action.payload
            }
        default:
            return state
    }
};