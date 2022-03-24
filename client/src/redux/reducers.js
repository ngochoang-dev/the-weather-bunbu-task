import { combineReducers } from 'redux';
import {
    GET_ALL_FORECAST_SUCCESS,
    GET_DETAIL_FORECAST_SUCCESS
} from './actions';

const initialState = {
    allForecast: [],
    detailForecast: {
        cityId: '',
        cityName: '',
        description: '',
        humidity: '',
        temperature: '',
        windSpeed: '',
    },
};

const forecastData = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_FORECAST_SUCCESS:
            return {
                ...state,
                allForecast: action.data
            }
        case GET_DETAIL_FORECAST_SUCCESS:
            return {
                ...state,
                detailForecast: { ...action.data }
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    forecastData
})

export default rootReducer;
