import React, { useState, useEffect, useCallback, memo } from 'react';
import dayjs from 'dayjs';
import { IconContext } from 'react-icons';
import { CgClose } from 'react-icons/cg';
import DetailComponent from '../DetailComponent/DetailComponent';
import MainComponent from '../MainComponent/MainComponent';


function Container({ typeForecast, id, setSelect }) {
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
        fetch(`http://localhost:5000/forecast-detail?today=${dayjs(date).format('YYYY/M/DD')}&&cityId=${idOfCity}`)
            .then(response => response.json())
            .then(data => {
                setDetailForecast({
                    ...data.data
                });
            })
    }, [idOfCity])

    useEffect(() => {
        handleGetDetailForecast()
    }, [
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
            <button className="Btn_close"
                onClick={() => setSelect(prev => prev.filter(i => i !== id))}
            >
                <IconContext.Provider value={{ className: 'icon_close' }}>
                    <CgClose />
                </IconContext.Provider>
            </button>
        </div>
    )
}

export default memo(Container);
