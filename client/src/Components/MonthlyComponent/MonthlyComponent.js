import React, { useEffect, useState, useMemo } from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Monthly.module.css';
import { getMonthlyForecast } from '../../redux/actions';
import CalendarForecast from './CalendarForecast';

function MonthlyComponent({ selectId, typeForecast, ids, setIds }) {
    const dispatch = useDispatch();
    const { monthlyData, cityId } = useSelector(state => state.forecastData);

    useEffect(() => {
        dispatch(getMonthlyForecast({
            selectId: [ids]
        }))
    }, [dispatch, ids]);


    return (
        <div className={clsx(
            styles.main
        )}>
            {
                monthlyData.map(({ data, cityName }, i) => {
                    return <Children
                        key={i}
                        data={data}
                        cityName={cityName}
                        typeForecast={typeForecast}
                    />
                })
            }
        </div>
    )
}


function Children({ typeForecast, data, cityName }) {
    return (
        <div className={clsx(
            styles.container
        )}>
            <div className={clsx(
                styles.header
            )}>
                <h3>Monthly Weather - <span>{cityName}</span></h3>
                <span>As of {dayjs().format('h:m A')}</span>
            </div>
            <CalendarForecast
                data={data}
                typeForecast={typeForecast}
            />
        </div>
    )
}

export default MonthlyComponent;

