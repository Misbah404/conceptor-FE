import {
    ADD_COMPANY,
    UPDATE_COMPANY,
    SET_COMPANIES,
    SET_SELECTED_COMPANY,
} from '../types/company'

export const addCompany = (params) => ({
    type: ADD_COMPANY,
    payload: params
})

export const updateCompany = (params) => ({
    type: UPDATE_COMPANY,
    payload: params
})

export const setCompanies = (params) => ({
    type: SET_COMPANIES,
    payload: params
})

export const setSelectedCompany = (params) => ({
    type: SET_SELECTED_COMPANY,
    payload: params
})