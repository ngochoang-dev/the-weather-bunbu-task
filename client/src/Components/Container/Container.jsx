import React, { useState, useMemo, memo } from 'react';
import clsx from 'clsx';
import { IconContext } from 'react-icons';
import { CgClose } from 'react-icons/cg';
import { GiHamburgerMenu } from 'react-icons/gi';

import styles from './Container.module.css';
import DetailComponent from '../DetailComponent/DetailComponent';
import MainComponent from '../MainComponent/MainComponent';

function Container({
    id,
    setSelect,
    provided,
    detailForecast,
    allForecast,
}) {
    const [idOfCity, setIdOfCity] = useState(id);
    const [detailData, setDetailDate] = useState([]);
    const [dataForecast, setDataForecast] = useState([]);
    const [isCelsius, setIsCelsius] = useState(false);
    const [day, setDay] = useState(null);

    useMemo(() => {
        const result = detailForecast.find(item => Number(item.cityId) === id)
        setDetailDate(result)
    }, [detailForecast, id]);

    useMemo(() => {
        const result = allForecast.find(item => Number(item.cityId) === id)
        setDataForecast(result)
    }, [allForecast, id]);

    return (
        <div className={clsx(
            styles.container
        )} >
            <button className={clsx(styles.btn_menu)}
                {...provided.dragHandleProps}
            >
                <IconContext.Provider value={{ className: clsx(styles.icon_menu) }}>
                    <GiHamburgerMenu />
                </IconContext.Provider>
            </button>
            <DetailComponent
                isCelsius={isCelsius}
                detailForecast={detailData}
                idOfCity={idOfCity}
                setIdOfCity={setIdOfCity}
                day={day}
                setIsCelsius={setIsCelsius}
            />
            <MainComponent
                idOfCity={idOfCity}
                allForecast={dataForecast}
                isCelsius={isCelsius}
                setDay={setDay}
                setDetailDate={setDetailDate}
                datas={dataForecast}
            />
            <button className={clsx(
                styles.btn_close
            )}
                data-testid='btnClose-id'
                onClick={() => setSelect(prev => prev.filter(i => i !== id))}
            >
                <IconContext.Provider value={{ className: styles.icon_close }}>
                    <CgClose />
                </IconContext.Provider>
            </button>
        </div>
    )
}

export default memo(Container);
