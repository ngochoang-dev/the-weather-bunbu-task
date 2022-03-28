import { combineReducers } from 'redux';
import { toast } from "react-toastify";
import {
    GET_ALL_CITY_SUCCESS,
    POST_FORECAST,
    POST_FORECAST_SUCCESS,
    POST_FORECAST_FAIL,
    GET_DETAIL_FORECAST_SUCCESS,
    GET_ALL_FORECAST_SUCCESS,
} from './actions';

const initialState = {
    loading: false,
    cityId: null,
    allCity: [],
    detailForecast: [],
    allForecast: [],
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
            toast.success('Tạo thành công', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return {
                ...state,
                loading: false,
                cityId: action.data
            }
        case POST_FORECAST_FAIL:
            toast.error('Tên thành phố đã tồn tại', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return {
                ...state,
                loading: false,
            }
        case GET_DETAIL_FORECAST_SUCCESS:
            return {
                ...state,
                detailForecast: action.data
            }
        case GET_ALL_FORECAST_SUCCESS:
            return {
                ...state,
                allForecast: action.data
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    forecastData
})

export default rootReducer;
