import {
    SET_PROFILE,
} from '../types/user'

const initialState = {
    profile: {},
};

const reducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case SET_PROFILE:
            return {
                ...state,
                profile: payload
            }
            break;
        default:
            return state;
    }

}

export default reducer