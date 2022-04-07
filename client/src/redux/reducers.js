import { combineReducers } from 'redux';
import { toast } from "react-toastify";
import {
    GET_ALL_CITY_SUCCESS,
    POST_FORECAST,
    POST_FORECAST_SUCCESS,
    POST_FORECAST_FAIL,
    GET_DETAIL_FORECAST_SUCCESS,
    GET_ALL_FORECAST_SUCCESS,
    DELETE_CITY_SUCCESS,
    SET_LOADING,
    CHANGE_UNITS,
    GET_HOURLY_FORECAST_SUCCESS,
    GET_MONTHLY_FORECAST_SUCCESS,
    REFRESH_FORECAST_SUCCESS,

} from './actions';

const initialState = {
    loading: false,
    isDeleted: false,
    cityId: null,
    allCity: [],
    detailForecast: [],
    allForecast: [],
    hourlyData: [],
    monthlyData: [],
};

export const forecastData = (state = initialState, action) => {
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
                hideProgressBar: true,
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
                hideProgressBar: true,
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
        case DELETE_CITY_SUCCESS:
            toast.success('Xóa thành công', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return {
                ...state,
                isDeleted: true
            };
        case SET_LOADING:
            return {
                ...state,
                loading: false,
                isDeleted: false
            }
        case CHANGE_UNITS:
            const { isCelsius, id, date } = action.payload;
            const { allForecast, detailForecast } = state;
            const forecasts = [...state.allForecast];
            if (isCelsius) {
                const newDetailForecast = detailForecast.map(detail => {
                    if (detail.cityId === id) {
                        detail = {
                            ...detail,
                            temperature: Math.round((detail.temperature - 32) / 1.8)
                        }
                    }
                    return detail
                })
                const newAllForecast = allForecast.map(item => {
                    if (item.cityId === Number(id)) {
                        const newData = item.data.map(forecast => {
                            forecast.temperature = Math.round((forecast.temperature - 32) / 1.8)
                            return forecast
                        })
                        return {
                            cityId: Number(id),
                            data: newData
                        };
                    }
                    return item;
                });
                return {
                    ...state,
                    detailForecast: newDetailForecast,
                    allForecast: newAllForecast,
                }
            } else {
                const newDetailForecast = forecasts.map(item => {
                    if (item.cityId === Number(id)) {
                        const newData = item.data.find(data => data.date === date);
                        return newData
                    }
                    return []
                })
                const newAllForecast = allForecast.map(item => {
                    if (item.cityId === Number(id)) {
                        const newData = item.data.map(forecast => {
                            forecast.temperature = Math.round((forecast.temperature * 1.8) + 32)
                            return forecast
                        })
                        return {
                            cityId: Number(id),
                            data: newData
                        }
                    }
                    return item;
                })
                return {
                    ...state,
                    detailForecast: newDetailForecast,
                    allForecast: newAllForecast,
                }
            }
        case GET_HOURLY_FORECAST_SUCCESS:
            return {
                ...state,
                hourlyData: action.data
            }
        case GET_MONTHLY_FORECAST_SUCCESS:
            return {
                ...state,
                monthlyData: action.data
            }
        case REFRESH_FORECAST_SUCCESS:
            return {
                ...state,
                detailForecast: action.data
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    forecastData
})

export default rootReducer;
