import { ICON_CHANGE } from './types'

export const changeIcon = icon => dispatch => {
    dispatch({
        type: ICON_CHANGE,
        payload: icon
    })
};
