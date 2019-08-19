import { BG_CHANGE } from '../actions/types'

const initialState = {
    bgColor: '#3fbac2'
};

export default function(state = initialState, action){
    switch(action.type){
        case BG_CHANGE:
            return {
                ...state,
                bgColor: action.payload
            }
        default:
            return state
    }
};