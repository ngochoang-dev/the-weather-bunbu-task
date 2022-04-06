import {
    POST_FORECAST,
    POST_FORECAST_SUCCESS,
    POST_FORECAST_FAIL,
    GET_ALL_CITY,
    GET_ALL_CITY_SUCCESS,
    GET_DETAIL_FORECAST,
    GET_DETAIL_FORECAST_SUCCESS,
    GET_ALL_FORECAST,
    GET_ALL_FORECAST_SUCCESS,
    DELETE_CITY,
    DELETE_CITY_SUCCESS,
    GET_HOURLY_FORECAST,
    GET_HOURLY_FORECAST_SUCCESS,
    GET_MONTHLY_FORECAST,
    GET_MONTHLY_FORECAST_SUCCESS

} from './actions';
import {
    handlePostForecast,
    handleGetAllCity,
    handleGetDetailForecast,
    handleGetAllForecast,
    handleDeleteCity,
    handleGetHourlyForecast,
    handleGetMonthlyForecast

} from './getApi';
import { call, put, takeEvery } from 'redux-saga/effects';


export function* createForecast({ payload }) {
    try {
        const data = yield call(handlePostForecast, payload);
        yield put({ type: POST_FORECAST_SUCCESS, data: data.cityId })
    } catch (error) {
        yield put({ type: POST_FORECAST_FAIL, data: error })
    }
}

export function* getAllCity() {
    const data = yield call(handleGetAllCity);
    yield put({ type: GET_ALL_CITY_SUCCESS, data: data.data })
}

export function* getDetailForecast(payload) {
    const data = yield call(handleGetDetailForecast, payload);
    yield put({ type: GET_DETAIL_FORECAST_SUCCESS, data: data.data })
}

export function* getAllForecast(payload) {
    const data = yield call(handleGetAllForecast, payload);
    yield put({ type: GET_ALL_FORECAST_SUCCESS, data: data.data })
}

export function* deleteCity(payload) {
    const data = yield call(handleDeleteCity, payload);
    yield put({
        type: DELETE_CITY_SUCCESS, data: data.data
    })
}

export function* getHourlyForecast(payload) {
    const data = yield call(handleGetHourlyForecast, payload);
    yield put({
        type: GET_HOURLY_FORECAST_SUCCESS, data: data.data
    })
}

export function* getMonthlyForecast(payload) {
    const data = yield call(handleGetMonthlyForecast, payload);
    yield put({
        type: GET_MONTHLY_FORECAST_SUCCESS, data: data.data
    })
}


function* rootSaga() {
    yield takeEvery(POST_FORECAST, createForecast);
    yield takeEvery(GET_ALL_CITY, getAllCity);
    yield takeEvery(GET_DETAIL_FORECAST, getDetailForecast);
    yield takeEvery(GET_ALL_FORECAST, getAllForecast);
    yield takeEvery(DELETE_CITY, deleteCity);
    yield takeEvery(GET_HOURLY_FORECAST, getHourlyForecast);
    yield takeEvery(GET_MONTHLY_FORECAST, getMonthlyForecast);
}

export default rootSaga;
