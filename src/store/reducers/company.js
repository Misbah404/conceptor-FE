import {
    ADD_COMPANY,
    UPDATE_COMPANY,
    SET_COMPANIES,
    SET_SELECTED_COMPANY,
} from '../types/company'

const initialState = {
    selected_company: {},
    companies: []
};

const reducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case ADD_COMPANY:
            return {
                ...state,
                companies: [...state.companies, payload]
            }
            break;
        case UPDATE_COMPANY:
            let companies = state.companies.filter(company => company.id !== payload.id);
            return {
                ...state,
                companies: [...companies, payload]
            }
            break;
        case SET_COMPANIES:
            return {
                ...state,
                companies: payload
            }
            break;
        case SET_SELECTED_COMPANY:
            return {
                ...state,
                selected_company: payload
            }
            break;
        default:
            return state;
    }

}

export default reducer