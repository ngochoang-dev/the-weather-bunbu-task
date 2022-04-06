import {
    POST_FORECAST,
    GET_ALL_CITY,
    GET_DETAIL_FORECAST,
    GET_ALL_FORECAST,
    GET_MONTHLY_FORECAST,
    DELETE_CITY,
    SET_LOADING,
    CHANGE_UNITS,
    GET_HOURLY_FORECAST,
    createForecast,
    getAllCity,
    handleGetDetailForecast,
    getAllForecast,
    deleteCity,
    resetLoading,
    changeUnit,
    getHourlyForecast,
    getMonthlyForecast,
} from '../actions';



describe('actions', () => {
    test('has a type of POST_FORECAST', () => {
        const expected = {
            type: POST_FORECAST,
            payload: undefined,
        }
        expect(createForecast()).toEqual(expected);
    })

    test('has a type of GET_ALL_CITY', () => {
        const expected = {
            type: GET_ALL_CITY,
        }
        expect(getAllCity()).toEqual(expected);
    })

    test('has a type of GET_DETAIL_FORECAST', () => {
        const expected = {
            type: GET_DETAIL_FORECAST,
            payload: undefined,
        }
        expect(handleGetDetailForecast()).toEqual(expected);
    })

    test('has a type of GET_ALL_FORECAST', () => {
        const expected = {
            type: GET_ALL_FORECAST,
            payload: undefined,
        }
        expect(getAllForecast()).toEqual(expected);
    })

    test('has a type of DELETE_CITY', () => {
        const expected = {
            type: DELETE_CITY,
            payload: undefined,
        }
        expect(deleteCity()).toEqual(expected);
    })

    test('has a type of SET_LOADING', () => {
        const expected = {
            type: SET_LOADING,
        }
        expect(resetLoading()).toEqual(expected);
    })

    test('has a type of CHANGE_UNITS', () => {
        const expected = {
            type: CHANGE_UNITS,
            payload: undefined,
        }
        expect(changeUnit()).toEqual(expected);
    })

    test('has a type of GET_HOURLY_FORECAST', () => {
        const expected = {
            type: GET_HOURLY_FORECAST,
            payload: undefined,
        }
        expect(getHourlyForecast()).toEqual(expected);
    })

    test('has a type of GET_MONTHLY_FORECAST', () => {
        const expected = {
            type: GET_MONTHLY_FORECAST,
            payload: undefined,
        }
        expect(getMonthlyForecast()).toEqual(expected);
    })
})