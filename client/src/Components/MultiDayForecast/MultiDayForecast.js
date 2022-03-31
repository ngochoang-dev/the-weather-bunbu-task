import React, { useEffect } from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import styles from './Multiday.module.css'
import SummaryComponent from '../SummaryComponent/SummaryComponent';
import { getAllForecast } from '../../redux/actions';

function MultiDayForecast({ selectId, typeForecast }) {
    const location = useLocation();
    const dispatch = useDispatch();
    const data = useSelector(state => state.forecastData.allForecast);
    let search = window.location.search;
    let id = new URLSearchParams(search).get('id');
    let ids = id ? id : selectId;

    useEffect(() => {
        dispatch(getAllForecast({
            selectId: ids,
            day: 10
        }))
    }, [dispatch, selectId, ids, location]);

    return (
        <div className={clsx(
            styles.main
        )}>
            {
                data && data.map(({ data }, i) => {
                    const newData = [...data];
                    newData.pop();
                    newData.shift();
                    return <Children
                        key={i}
                        data={newData}
                        typeForecast={typeForecast}
                    />
                })
            }
        </div>
    )
}


function Children({ typeForecast, data }) {

    const handleChangeUnit = () => {

    }

    return (
        <div className={clsx(
            styles.container
        )}>
            <div className={clsx(
                styles.header
            )}>
                <h3>10 Day Weather - <span>{data[0].cityName}</span></h3>
                <span>As of {dayjs().format('h:m A')}</span>
            </div>
            <div className={clsx(
                styles.btn_change_list
            )}>
                <label className={clsx(
                    styles.switch
                )}>
                    <input type="checkbox"
                        onChange={(e) => handleChangeUnit()} />
                    <span></span>
                </label>
            </div>
            {
                data && data.map((item, i) => {
                    return <SummaryComponent
                        key={i}
                        {...item}
                        isMultiDay
                        typeForecast={typeForecast}
                    />
                })
            }
        </div>
    )
}

export default MultiDayForecast;
