import {
    SET_LOADER,
} from '../types/app'

export const setLoader = (params) => ({
    type: SET_LOADER,
    payload: params
})