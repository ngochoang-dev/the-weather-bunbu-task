import {
    POST_FORECAST,
    POST_FORECAST_SUCCESS,
    GET_ALL_CITY,
    GET_ALL_CITY_SUCCESS,
} from './actions';
import { call, put, takeEvery } from 'redux-saga/effects';


const handlePostForecast = (payload) => {
    return fetch(`${process.env.REACT_APP_URL}/create-new-forecast`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
        .then(response => response.json())
}

const handleGetAllCity = () => {
    return fetch(`${process.env.REACT_APP_URL}/get-all-city`).then(response => response.json());
}

function* createForecast(action) {
    const data = yield call(handlePostForecast, action.payload);
    yield put({ type: POST_FORECAST_SUCCESS, data: data.cityId })
}

function* getAllCity() {
    const data = yield call(handleGetAllCity);
    yield put({ type: GET_ALL_CITY_SUCCESS, data: data.data })
}


function* rootSaga() {
    yield takeEvery(POST_FORECAST, createForecast);
    yield takeEvery(GET_ALL_CITY, getAllCity);
}

export default rootSaga;
