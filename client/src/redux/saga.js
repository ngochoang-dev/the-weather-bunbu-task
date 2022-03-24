import {
    GET_ALL_FORECAST,
    GET_ALL_FORECAST_SUCCESS,
    GET_DETAIL_FORECAST,
    GET_DETAIL_FORECAST_SUCCESS
} from './actions';
import { call, put, takeEvery } from 'redux-saga/effects';


const handleGetForecast = (payload) => {
    return fetch(`http://localhost:5000/forecast?today=${payload.date}&&cityId=${payload.cityId}`)
        .then(response => response.json())
}

const handleGetDetailForecast = (payload) => {
    return fetch(`http://localhost:5000/forecast-detail?today=${payload.date}&&cityId=${payload.cityId}`)
        .then(response => response.json())
}

function* getAllForecast(action) {
    const data = yield call(handleGetForecast, action.payload);
    yield put({ type: GET_ALL_FORECAST_SUCCESS, data: data.data })
}

function* getDetailForecast(action) {
    const data = yield call(handleGetDetailForecast, action.payload);
    yield put({ type: GET_DETAIL_FORECAST_SUCCESS, data: data.data })
}

function* rootSaga() {
    yield takeEvery(GET_ALL_FORECAST, getAllForecast);
    yield takeEvery(GET_DETAIL_FORECAST, getDetailForecast);
}

export default rootSaga;
