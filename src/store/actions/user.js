import {
    SET_PROFILE
} from '../types/user'

export const setProfile = (params) => ({
    type: SET_PROFILE,
    payload: params
})