import React, { useEffect } from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';

import styles from './Multiday.module.css'
import SummaryComponent from '../SummaryComponent/SummaryComponent';
import { getAllForecast } from '../../redux/actions';

function MultiDayForecast({ selectId }) {
    const dispatch = useDispatch();
    const data = useSelector(state => state.forecastData.allForecast);

    useEffect(() => {
        dispatch(getAllForecast({
            selectId,
            day: 10
        }))
    }, [dispatch, selectId]);

    console.log(data);

    return (
        <div className={clsx(
            styles.container
        )}>
            <div className={clsx(
                styles.header
            )}>
                <h3>10 Day Weather</h3>
                <span>As of {dayjs().format('h:m A')}</span>
            </div>
        </div>
    )
}

export default MultiDayForecast;
