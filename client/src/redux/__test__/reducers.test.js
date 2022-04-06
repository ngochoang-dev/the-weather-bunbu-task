import { forecastData } from '../reducers';
import {
    createForecast,
    getAllCity,
    handleGetDetailForecast,
    getHourlyForecast,
    getMonthlyForecast,
    POST_FORECAST_SUCCESS,
    POST_FORECAST_FAIL,
    DELETE_CITY_SUCCESS,
    SET_LOADING,
    CHANGE_UNITS,
    GET_ALL_CITY_SUCCESS,
    POST_FORECAST,
    GET_DETAIL_FORECAST_SUCCESS,
    GET_ALL_FORECAST_SUCCESS,
    GET_HOURLY_FORECAST_SUCCESS,
    GET_MONTHLY_FORECAST_SUCCESS
} from '../actions';


describe('reducers', () => {
    test('should handle POST_FORECAST', () => {
        const initialState = {
            loading: true,
        }
        const reducerReturnValue = forecastData(initialState, { type: POST_FORECAST })
        expect(reducerReturnValue.loading).toEqual(true)
    });

    test('should handle GET_ALL_CITY_SUCCESS', () => {
        const initialState = {
            loading: false,
            allCity: []
        }
        const reducerReturnValue = forecastData(initialState, {
            type: GET_ALL_CITY_SUCCESS,
            data: []
        })
        expect(reducerReturnValue.loading).toEqual(false)
        expect(reducerReturnValue.allCity).toEqual([])
    });

    test('should handle POST_FORECAST_SUCCESS', () => {
        const initialState = {
            loading: false,
            cityId: null,
        }
        const reducerReturnValue = forecastData(initialState, {
            type: POST_FORECAST_SUCCESS,
            cityId: null
        })
        expect(reducerReturnValue.loading).toEqual(false)
        expect(reducerReturnValue.cityId).toEqual(undefined)
    });

    test('should handle POST_FORECAST_FAIL', () => {
        const initialState = {
            loading: false,
        }
        const reducerReturnValue = forecastData(initialState, {
            type: POST_FORECAST_FAIL
        })
        expect(reducerReturnValue.loading).toEqual(false)
    });

    test('should handle GET_DETAIL_FORECAST_SUCCESS', () => {
        const initialState = {
            detailForecast: [],
        }
        const reducerReturnValue = forecastData(initialState, {
            type: GET_DETAIL_FORECAST_SUCCESS
        })
        expect(reducerReturnValue.detailForecast).toEqual(undefined)
    });

    test('should handle GET_ALL_FORECAST_SUCCESS', () => {
        const initialState = {
            allForecast: [],
        }
        const reducerReturnValue = forecastData(initialState, {
            type: GET_ALL_FORECAST_SUCCESS
        })
        expect(reducerReturnValue.allForecast).toEqual(undefined)
    });

    test('should handle DELETE_CITY_SUCCESS', () => {
        const initialState = {
            isDeleted: true,
        }
        const reducerReturnValue = forecastData(initialState, {
            type: DELETE_CITY_SUCCESS
        })
        expect(reducerReturnValue.isDeleted).toEqual(true)
    });

    test('should handle SET_LOADING', () => {
        const initialState = {
            loading: false,
            isDeleted: false,
        }
        const reducerReturnValue = forecastData(initialState, {
            type: SET_LOADING
        })
        expect(reducerReturnValue.loading).toEqual(false)
        expect(reducerReturnValue.isDeleted).toEqual(false)
    });

    test('should handle CHANGE_UNITS isCelsius: true', () => {
        const initialState = {
            detailForecast: [],
            allForecast: [],
        }
        const reducerReturnValue = forecastData(initialState, {
            type: CHANGE_UNITS,
            payload: {
                isCelsius: true
            },
        })
        expect(reducerReturnValue.detailForecast).toEqual([])
        expect(reducerReturnValue.allForecast).toEqual([])
    });

    test('should handle CHANGE_UNITS isCelsius: false', () => {
        const initialState = {
            detailForecast: [],
            allForecast: [],
        }
        const reducerReturnValue = forecastData(initialState, {
            type: CHANGE_UNITS,
            payload: {
                isCelsius: false,
            },
        })
        expect(reducerReturnValue.detailForecast).toEqual([])
        expect(reducerReturnValue.allForecast).toEqual([])
    });

    test('should handle GET_HOURLY_FORECAST_SUCCESS', () => {
        const initialState = {
            hourlyData: [],
        }
        const reducerReturnValue = forecastData(initialState, {
            type: GET_HOURLY_FORECAST_SUCCESS
        })
        expect(reducerReturnValue.hourlyData).toEqual(undefined)
    });

    test('should handle GET_MONTHLY_FORECAST_SUCCESS', () => {
        const initialState = {
            monthlyData: [],
        }
        const reducerReturnValue = forecastData(initialState, {
            type: GET_MONTHLY_FORECAST_SUCCESS
        })
        expect(reducerReturnValue.monthlyData).toEqual(undefined)
    });
})
