export const POST_FORECAST = 'POST_FORECAST';
export const POST_FORECAST_SUCCESS = 'POST_FORECAST_SUCCESS';
export const POST_FORECAST_FAIL = 'POST_FORECAST_FAIL';
export const GET_ALL_CITY = 'GET_ALL_CITY';
export const GET_ALL_CITY_SUCCESS = 'GET_ALL_CITY_SUCCESS';
export const GET_DETAIL_FORECAST = 'GET_DETAIL_FORECAST';
export const GET_DETAIL_FORECAST_SUCCESS = 'GET_DETAIL_FORECAST_SUCCESS';
export const GET_ALL_FORECAST = 'GET_ALL_FORECAST';
export const GET_ALL_FORECAST_SUCCESS = 'GET_ALL_FORECAST_SUCCESS';

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

