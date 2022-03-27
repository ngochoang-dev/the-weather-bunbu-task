import {
    POST_FORECAST,
    POST_FORECAST_SUCCESS,
    POST_FORECAST_FAIL,
    GET_ALL_CITY,
    GET_ALL_CITY_SUCCESS,
} from './actions';
import { call, put, takeEvery } from 'redux-saga/effects';


const handlePostForecast = (payload) => {
    return fetch(`http://localhost:5000/create-new-forecast`, {
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
    return fetch(`http://localhost:5000/get-all-city`).then(response => response.json());
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


function* rootSaga() {
    yield takeEvery(POST_FORECAST, createForecast);
    yield takeEvery(GET_ALL_CITY, getAllCity);
}

export default rootSaga;
