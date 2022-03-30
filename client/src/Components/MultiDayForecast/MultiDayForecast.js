import React, { useEffect } from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';

import styles from './Multiday.module.css'
import SummaryComponent from '../SummaryComponent/SummaryComponent';
import { getAllForecast } from '../../redux/actions';

function MultiDayForecast({ selectId, typeForecast }) {
    const dispatch = useDispatch();
    const data = useSelector(state => state.forecastData.allForecast);

    useEffect(() => {
        dispatch(getAllForecast({
            selectId,
            day: 10
        }))
    }, [dispatch, selectId]);

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
