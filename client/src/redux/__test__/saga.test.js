import { runSaga } from 'redux-saga';
import {
    getMonthlyForecast,
    getHourlyForecast,
    deleteCity,
    getAllForecast,
    getDetailForecast,
    getAllCity,
    createForecast
} from '../saga'

jest.mock("axios");


describe("sagas", () => {
    test("should test getMonthlyForecast", async () => {

        const dispatched = [];
        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },
            getMonthlyForecast,
            {
                payload: {
                    selectId: [0]
                }
            }
        ).toPromise();
        expect(dispatched[0].type).toEqual("GET_MONTHLY_FORECAST_SUCCESS");
        expect(dispatched[0].data).toEqual([{
            cityId: 0,
            data: []
        }]);
    })

    test("should test getHourlyForecast", async () => {
        const dispatched = [];
        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },
            getHourlyForecast,
            {
                payload: {
                    selectId: [0]
                }
            }
        ).toPromise();
        expect(dispatched[0].type).toEqual("GET_HOURLY_FORECAST_SUCCESS");
    })

    test("should test deleteCity", async () => {
        const dispatched = [];
        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },
            deleteCity,
            {
                payload: {
                    selectId: [0]
                }
            }
        ).toPromise();
        expect(dispatched[0].type).toEqual("DELETE_CITY_SUCCESS");
    })

    test("should test getAllForecast", async () => {
        const dispatched = [];
        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },
            getAllForecast,
            {
                payload: {
                    selectId: [0]
                }
            }
        ).toPromise();
        expect(dispatched[0].type).toEqual("GET_ALL_FORECAST_SUCCESS");
        expect(dispatched[0].data).toEqual(
            [{ cityId: 0, data: [] }]
        );
    })
    test("should test getDetailForecast", async () => {
        const dispatched = [];
        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },
            getDetailForecast,
            {
                payload: {
                    selectId: [0]
                }
            }
        ).toPromise();
        expect(dispatched[0].type).toEqual("GET_DETAIL_FORECAST_SUCCESS");
        expect(dispatched[0].data).toEqual([]);
    })

    test("should test getAllCity", async () => {
        const dispatched = [];
        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },
            getAllCity,
            {
                payload: {
                    selectId: [0]
                }
            }
        ).toPromise();
        expect(dispatched[0].type).toEqual("GET_ALL_CITY_SUCCESS");
    })

    test("should test createForecast", async () => {
        const dispatched = [];
        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },
            createForecast,
            {
                payload: "Ha Noi"
            }
        ).toPromise();
        expect(dispatched[0].type).toEqual("POST_FORECAST_FAIL");
    })
})