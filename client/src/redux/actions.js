export const GET_ALL_FORECAST = 'GET_ALL_FORECAST';
export const GET_DETAIL_FORECAST = 'GET_DETAIL_FORECAST';
export const GET_ALL_FORECAST_SUCCESS = 'GET_ALL_FORECAST_SUCCESS';
export const GET_DETAIL_FORECAST_SUCCESS = 'GET_DETAIL_FORECAST_SUCCESS';

export const getAllForecast = (date, cityId) => {
    return {
        type: GET_ALL_FORECAST,
        payload: {
            date,
            cityId
        }
    }
}

export const getDetailForecast = (date, cityId) => {
    return {
        type: GET_DETAIL_FORECAST,
        payload: {
            date,
            cityId
        }
    }
}
