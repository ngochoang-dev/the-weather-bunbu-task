import { combineReducers } from 'redux';
import {
    GET_ALL_CITY_SUCCESS,
    POST_FORECAST,
    POST_FORECAST_SUCCESS
} from './actions';

const initialState = {
    loading: false,
    cityId: null,
    allCity: []
};

const forecastData = (state = initialState, action) => {
    switch (action.type) {
        case POST_FORECAST:
            return {
                ...state,
                loading: true
            }
        case GET_ALL_CITY_SUCCESS:
            return {
                ...state,
                loading: false,
                allCity: [...action.data]
            }
        case POST_FORECAST_SUCCESS:
            return {
                ...state,
                loading: false,
                cityId: action.data
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    forecastData
})

export default rootReducer;
