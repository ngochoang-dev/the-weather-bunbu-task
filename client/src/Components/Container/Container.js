import React, { useState, useEffect, useCallback } from 'react';
import dayjs from 'dayjs';
import DetailComponent from '../DetailComponent/DetailComponent';
import MainComponent from '../MainComponent/MainComponent';


function Container({ typeForecast, id }) {
    const [idOfCity, setIdOfCity] = useState(id);

    const [detailForecast, setDetailForecast] = useState({
        cityId: '',
        cityName: '',
        description: '',
        humidity: '',
        temperature: '',
        windSpeed: '',
    });

    const handleGetDetailForecast = useCallback((date) => {
        fetch(`http://localhost:5000/forecast-detail?today=${dayjs(date).format('YYYY/M/DD')}&&cityId=${id}`)
            .then(response => response.json())
            .then(data => {
                setDetailForecast({
                    ...data.data
                });
            })
    }, [id])

    useEffect(() => {
        // dispatch(getDetailForecast(dayjs().format('YYYY/M/DD'), idOfCity));
        handleGetDetailForecast()
    }, [
        // dispatch, 
        handleGetDetailForecast,
        id
    ]);

    return (
        <div className="Container">
            <DetailComponent
                detailForecast={detailForecast}
                idOfCity={idOfCity}
                setIdOfCity={setIdOfCity}
                typeForecast={typeForecast}
            />
            <MainComponent
                idOfCity={idOfCity}
                typeForecast={typeForecast}
                handleGetDetailForecast={handleGetDetailForecast}
            />
        </div>
    )
}

export default Container;
