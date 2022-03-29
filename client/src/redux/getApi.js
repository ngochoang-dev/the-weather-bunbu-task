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
    const { selectId } = payload;
    const id = JSON.stringify(selectId)
    return fetch(`${process.env.REACT_APP_URL}/forecast-detail?today=${dayjs().format('YYYY/M/DD')}&&cityId=${id}`)
        .then(response => response.json())
}

export const handleGetAllForecast = ({ payload }) => {
    const id = JSON.stringify(payload)
    return fetch(`${process.env.REACT_APP_URL}/forecast?today=${dayjs().format('YYYY/M/DD')}&&cityId=${id}`)
        .then(response => response.json())
}

export const handleDeleteCity = ({ payload }) => {
    return fetch(`${process.env.REACT_APP_URL}/delete-city?id=${payload}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
}
