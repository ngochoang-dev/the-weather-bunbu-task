import dayjs from 'dayjs';

export const handlePostForecast = (payload) => {
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

export const handleGetAllCity = () => {
    return fetch(`${process.env.REACT_APP_URL}/get-all-city`).then(response => response.json());
}

export const handleGetDetailForecast = ({ payload }) => {
    const { selectId, currDay } = payload;
    const id = JSON.stringify(selectId);
    const date = currDay ? currDay : dayjs().format('YYYY/M/DD')
    return fetch(`${process.env.REACT_APP_URL}/forecast-detail?today=${date}&&cityId=${id}`)
        .then(response => response.json())
}

export const handleGetAllForecast = ({ payload }) => {
    const { selectId, day } = payload;
    const id = typeof selectId === 'string' ? JSON.stringify([+selectId]) : JSON.stringify(selectId)
    return fetch(`${process.env.REACT_APP_URL}/forecast?today=${dayjs().format('YYYY/M/DD')}&&cityId=${id}&&day=${day}`)
        .then(response => response.json())
}

export const handleDeleteCity = ({ payload }) => {
    return fetch(`${process.env.REACT_APP_URL}/delete-city?id=${payload}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
}

export const handleGetHourlyForecast = ({ payload }) => {
    const ids = JSON.stringify(payload)
    return fetch(`${process.env.REACT_APP_URL}/today/hourly?cityId=${ids}&&date=${dayjs().format('YYYY/M/DD')}`)
        .then(response => response.json())
}

export const handleGetMonthlyForecast = ({ payload }) => {
    const { selectId } = payload;
    const id = JSON.stringify(selectId)
    return fetch(`${process.env.REACT_APP_URL}/forecast-monthly?cityId=${id}`)
        .then(response => response.json())
}
