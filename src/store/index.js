import { combineReducers, createStore } from 'redux'
import AppReducer from './reducers/app'
import UserReducer from './reducers/user'
import CompanyReducer from './reducers/company'

const appReducers = combineReducers({
    AppReducer: AppReducer,
    UserReducer: UserReducer,
    CompanyReducer: CompanyReducer,
});

const rootReducer = (state, action) => {
    if (action.type === 'RESET_STATE') {
        state = 'undefined'
    }

    return appReducers(state, action)
}

const store = createStore(rootReducer)
export default store

