import React, { useState, useMemo, memo } from 'react';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { IconContext } from 'react-icons';
import { CgClose } from 'react-icons/cg';
import { GiHamburgerMenu } from 'react-icons/gi';

import styles from './Container.module.css';
import DetailComponent from '../DetailComponent/DetailComponent';
import MainComponent from '../MainComponent/MainComponent';
import { changeUnit } from '../../redux/actions';

function Container({
    typeForecast,
    id,
    setSelect,
    provided,
    detailForecast,
    allForecast
}) {
    const dispatch = useDispatch();
    const [idOfCity, setIdOfCity] = useState(id);
    const [detailData, setDetailDate] = useState([]);
    const [dataForecast, setDataForecast] = useState([]);
    const [isCelsius, setIsCelsius] = useState(false);


    useMemo(() => {
        const result = detailForecast.find(item => Number(item.cityId) === id)
        setDetailDate(result)
    }, [detailForecast, id]);

    useMemo(() => {
        const result = allForecast.find(item => Number(item.cityId) === id)
        setDataForecast(result)
    }, [allForecast, id]);

    const handleGetDetail = (date) => {
        const newData = dataForecast.data.find(item => item.date === date);
        setDetailDate(newData)
    };

    const handleChangeUnit = (e, id, date) => {
        if (e.target.checked) {
            dispatch(changeUnit({
                isCelsius: e.target.checked,
                id,
                date
            }))
        } else {
            dispatch(changeUnit({
                isCelsius: e.target.checked,
                id,
                date
            }))
        }
        setIsCelsius(e.target.checked)
    }

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
                typeForecast={typeForecast}
                setIdOfCity={setIdOfCity}
                handleChangeUnit={handleChangeUnit}
            />
            <MainComponent
                idOfCity={idOfCity}
                typeForecast={typeForecast}
                allForecast={dataForecast}
                handleGetDetail={handleGetDetail}
                isCelsius={isCelsius}
            />
            <button className={clsx(
                styles.btn_close
            )}
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
