import actionsTypes from './actionTypes';
import * as apis from '../../apis'

export const getHome = () => async (dispatch) => {
    try {
        const response = await apis.getHome()
        if (response?.data.err === 0) {
            dispatch({
                type: actionsTypes.GET_HOME,
                homeData: response.data.data.items
            })
        } else {
            dispatch({
                type: actionsTypes.GET_HOME,
                homeData: null
            })
        }
    } catch (err) {
        dispatch({
            type: actionsTypes.GET_HOME,
            homeData: null
        })
    }
}

