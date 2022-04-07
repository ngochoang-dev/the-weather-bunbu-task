export const POST_FORECAST = 'POST_FORECAST';
export const POST_FORECAST_SUCCESS = 'POST_FORECAST_SUCCESS';
export const POST_FORECAST_FAIL = 'POST_FORECAST_FAIL';
export const GET_ALL_CITY = 'GET_ALL_CITY';
export const GET_ALL_CITY_SUCCESS = 'GET_ALL_CITY_SUCCESS';
export const GET_DETAIL_FORECAST = 'GET_DETAIL_FORECAST';
export const GET_DETAIL_FORECAST_SUCCESS = 'GET_DETAIL_FORECAST_SUCCESS';
export const GET_ALL_FORECAST = 'GET_ALL_FORECAST';
export const GET_MONTHLY_FORECAST = 'GET_MONTHLY_FORECAST';
export const GET_MONTHLY_FORECAST_SUCCESS = 'GET_MONTHLY_FORECAST_SUCCESS';
export const GET_ALL_FORECAST_SUCCESS = 'GET_ALL_FORECAST_SUCCESS';
export const DELETE_CITY = 'DELETE_CITY';
export const DELETE_CITY_SUCCESS = 'DELETE_CITY_SUCCESS';
export const SET_LOADING = 'SET_LOADING';
export const CHANGE_UNITS = 'CHANGE_UNITS';
export const GET_HOURLY_FORECAST = 'GET_HOURLY_FORECAST';
export const GET_HOURLY_FORECAST_SUCCESS = 'GET_HOURLY_FORECAST_SUCCESS';
export const REFRESH_FORECAST = 'REFRESH_FORECAST';
export const REFRESH_FORECAST_SUCCESS = 'REFRESH_FORECAST_SUCCESS';


export const createForecast = (data) => {
    return {
        type: POST_FORECAST,
        payload: data
    }
}

export const getAllCity = () => {
    return {
        type: GET_ALL_CITY,
    }
}

export const handleGetDetailForecast = (payload) => {
    return {
        type: GET_DETAIL_FORECAST,
        payload,
    }
}

export const getAllForecast = (payload) => {
    return {
        type: GET_ALL_FORECAST,
        payload
    }
}

export const deleteCity = (payload) => {
    return {
        type: DELETE_CITY,
        payload
    }
}

export const resetLoading = () => {
    return {
        type: SET_LOADING
    }
}

export const changeUnit = (payload) => {
    return {
        type: CHANGE_UNITS,
        payload,
    }
}

export const getHourlyForecast = (payload) => {
    return {
        type: GET_HOURLY_FORECAST,
        payload
    }
}

export const getMonthlyForecast = (payload) => {
    return {
        type: GET_MONTHLY_FORECAST,
        payload
    }
}

export const refreshForecast = (payload) => {
    return {
        type: REFRESH_FORECAST,
        payload
    }
}