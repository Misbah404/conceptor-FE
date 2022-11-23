import {
    SET_LOADER,
} from '../types/app'

const initialState = {
    loading: false,
};

const reducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case SET_LOADER:
            return {
                ...state,
                loading: payload
            }
            break;
        default:
            return state;
    }

}

export default reducer