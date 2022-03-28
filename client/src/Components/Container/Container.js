import React, { useState, useMemo, memo } from 'react';
import { IconContext } from 'react-icons';
import { CgClose } from 'react-icons/cg';
import { GiHamburgerMenu } from 'react-icons/gi';

import DetailComponent from '../DetailComponent/DetailComponent';
import MainComponent from '../MainComponent/MainComponent';


function Container({
    typeForecast,
    id,
    setSelect,
    provided,
    detailForecast,
    allForecast }) {

    const [idOfCity, setIdOfCity] = useState(id);
    const [detailData, setDetailDate] = useState([])

    useMemo(() => {
        const result = detailForecast.find(item => Number(item.cityId) === id)
        setDetailDate(result)
    }, [detailForecast, id]);

    const forecast = useMemo(() => {
        return allForecast.find(item => Number(item.cityId) === id)
    }, [allForecast, id]);

    const handleGetDetail = (date) => {
        const data = forecast.data.find(item => item.date === date);
        setDetailDate(data)
    };

    return (
        <div className="Container" >
            <button className="Btn_menu"
                {...provided.dragHandleProps}
            >
                <IconContext.Provider value={{ className: 'icon_menu' }}>
                    <GiHamburgerMenu />
                </IconContext.Provider>
            </button>
            <DetailComponent
                detailForecast={detailData}
                idOfCity={idOfCity}
                setIdOfCity={setIdOfCity}
                typeForecast={typeForecast}
            />
            <MainComponent
                idOfCity={idOfCity}
                typeForecast={typeForecast}
                allForecast={forecast}
                handleGetDetail={handleGetDetail}
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
