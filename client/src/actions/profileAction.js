import { BG_CHANGE } from './types'

export const changeBgColor = color => dispatch => {
    dispatch({
        type: BG_CHANGE,
        payload: color
    })
};
