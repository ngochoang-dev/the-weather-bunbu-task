import React, { useEffect } from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';

import styles from './Monthly.module.css';
import { getMonthlyForecast } from '../../redux/actions';
import CalendarForecast from './CalendarForecast';


const dayOfWeek = [
    "SUN",
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
]

function MonthlyComponent({ ids, monthlyData }) {
    const dispatch = useDispatch();

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
                    />
                })
            }
        </div>
    )
}


export function Children({ data, cityName }) {
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
                dayOfWeek={dayOfWeek}
            />
        </div>
    )
}

export default MonthlyComponent;

