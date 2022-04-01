import React, { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import styles from './Multiday.module.css'
import SummaryComponent from '../SummaryComponent/SummaryComponent';
import { getAllForecast } from '../../redux/actions';
import BarChart from '../BarChart/BarChart';

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
    const [isBarChart, setIsBarChart] = useState(false)

    const labels = useMemo(() => {
        return data.map(item => {
            return dayjs(item.date).format('MMM DD') === dayjs().format('MMM DD')
                ?
                "Today" :
                dayjs(item.date).format('MMM DD')
        })
    }, [data]);

    const temperature = useMemo(() => {
        return data.map(item => item.temperature)
    }, [data]);

    const humidity = useMemo(() => {
        return data.map(item => item.humidity)
    }, [data]);

    const windSpeed = useMemo(() => {
        return data.map(item => Number(item.windSpeed))
    }, [data])


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
                        onChange={(e) => setIsBarChart(!isBarChart)} />
                    <span></span>
                </label>
            </div>
            {
                isBarChart ? (
                    <BarChart
                        labels={labels}
                        temperature={temperature}
                        humidity={humidity}
                        windSpeed={windSpeed}
                    />
                ) :
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
