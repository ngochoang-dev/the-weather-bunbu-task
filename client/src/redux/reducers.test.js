import { forecastData } from './reducers';
import {
    createForecast,
    getAllCity,
    handleGetDetailForecast,
    POST_FORECAST_SUCCESS,
    POST_FORECAST_FAIL,
    DELETE_CITY_SUCCESS,
} from './actions';

const mockForecast = jest.fn();


describe('reducers', () => {
    test('should handle POST_FORECAST', () => {
        mockForecast.mockReturnValue(true)
        const initialState = {
            loading: false,
        }
        const action = createForecast();
        expect(forecastData(initialState, action)).toEqual({
            loading: mockForecast(),
        })
    });

    test('should handle GET_ALL_CITY_SUCCESS', () => {
        mockForecast.mockReturnValue([])
        const initialState = {
            loading: false,
            allCity: []
        }
        const action = getAllCity();
        expect(forecastData(initialState, action)).toEqual({
            loading: false,
            allCity: mockForecast()
        })
    });

    test('should handle POST_FORECAST_SUCCESS', () => {
        mockForecast.mockReturnValue(null)
        const initialState = {
            loading: false,
            cityId: null
        }
        const action = () => {
            return {
                type: POST_FORECAST_SUCCESS,
            }
        };
        expect(forecastData(initialState, action)).toEqual({
            loading: false,
            cityId: mockForecast()
        })
    });

    test('should handle POST_FORECAST_FAIL', () => {
        const initialState = {
            loading: false,
        }
        const action = () => {
            return {
                type: POST_FORECAST_FAIL,
            }
        };
        expect(forecastData(initialState, action)).toEqual({
            loading: false,
        })
    });

    test('should handle GET_DETAIL_FORECAST_SUCCESS', () => {
        mockForecast.mockReturnValue([])
        const initialState = {
            detailForecast: [],
        }
        const action = handleGetDetailForecast();
        expect(forecastData(initialState, action)).toEqual({
            detailForecast: mockForecast(),
        })
    });

    test('should handle GET_ALL_FORECAST_SUCCESS', () => {
        mockForecast.mockReturnValue([])
        const initialState = {
            detailForecast: [],
        }
        const action = handleGetDetailForecast();
        expect(forecastData(initialState, action)).toEqual({
            detailForecast: mockForecast(),
        })
    });

    // test('should handle DELETE_CITY_SUCCESS', () => {
    //     const initialState = {
    //         isDeleted: true,
    //     }
    //     const action = () => {
    //         return {
    //             type: DELETE_CITY_SUCCESS
    //         }
    //     };
    //     expect(forecastData(initialState, action)).toEqual({
    //         isDeleted: true,
    //     })
    // });

})
