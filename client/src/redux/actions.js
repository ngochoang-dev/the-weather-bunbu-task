export const LOADING = 'LOADING';
export const LOADING_SUCCESS = 'LOADING_SUCCESS';
export const POST_FORECAST = 'POST_FORECAST';
export const POST_FORECAST_SUCCESS = 'POST_FORECAST_SUCCESS';
export const GET_ALL_CITY = 'GET_ALL_CITY';
export const GET_ALL_CITY_SUCCESS = 'GET_ALL_CITY_SUCCESS';

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

