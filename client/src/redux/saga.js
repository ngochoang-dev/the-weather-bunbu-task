import {
    POST_FORECAST,
    POST_FORECAST_SUCCESS,
    POST_FORECAST_FAIL,
    GET_ALL_CITY,
    GET_ALL_CITY_SUCCESS,
    GET_DETAIL_FORECAST,
    GET_DETAIL_FORECAST_SUCCESS,
    GET_ALL_FORECAST,
    GET_ALL_FORECAST_SUCCESS
} from './actions';
import dayjs from 'dayjs';
import { call, put, takeEvery } from 'redux-saga/effects';


const handlePostForecast = (payload) => {
    return fetch(`${process.env.REACT_APP_URL}/create-new-forecast`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.json()
            } else {
                throw response;
            }
        })
        .catch(error => { throw error });
}

const handleGetAllCity = () => {
    return fetch(`${process.env.REACT_APP_URL}/get-all-city`).then(response => response.json());
}

const handleGetDetailForecast = ({ payload }) => {
    const { selectId } = payload;
    const id = JSON.stringify(selectId)
    return fetch(`${process.env.REACT_APP_URL}/forecast-detail?today=${dayjs().format('YYYY/M/DD')}&&cityId=${id}`)
        .then(response => response.json())
}

const handleGetAllForecast = ({ payload }) => {
    const id = JSON.stringify(payload)
    return fetch(`${process.env.REACT_APP_URL}/forecast?today=${dayjs().format('YYYY/M/DD')}&&cityId=${id}`)
        .then(response => response.json())
}


function* createForecast(action) {
    try {
        const data = yield call(handlePostForecast, action.payload);
        yield put({ type: POST_FORECAST_SUCCESS, data: data.cityId })
    } catch (error) {
        yield put({ type: POST_FORECAST_FAIL, data: error })
    }
}

function* getAllCity() {
    const data = yield call(handleGetAllCity);
    yield put({ type: GET_ALL_CITY_SUCCESS, data: data.data })
}

function* getDetailForecast(payload) {
    const data = yield call(handleGetDetailForecast, payload);
    yield put({ type: GET_DETAIL_FORECAST_SUCCESS, data: data.data })
}

function* getAllForecast(payload) {
    const data = yield call(handleGetAllForecast, payload);
    yield put({ type: GET_ALL_FORECAST_SUCCESS, data: data.data })
}


function* rootSaga() {
    yield takeEvery(POST_FORECAST, createForecast);
    yield takeEvery(GET_ALL_CITY, getAllCity);
    yield takeEvery(GET_DETAIL_FORECAST, getDetailForecast);
    yield takeEvery(GET_ALL_FORECAST, getAllForecast);
}

export default rootSaga;
