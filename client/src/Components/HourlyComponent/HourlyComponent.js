import React, { useEffect } from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux';

import styles from './Hourly.module.css';
import SummaryComponent from '../SummaryComponent/SummaryComponent';
import { getHourlyForecast } from '../../redux/actions';
import BarChart from '../BarChart/BarChart';

function HourlyComponent({ typeForecast, selectId }) {
    const dispatch = useDispatch();
    const data = useSelector(state => state.forecastData.hourlyData);
    let search = window.location.search;
    let id = new URLSearchParams(search).get('id');
    let ids = id ? id : selectId;

    useEffect(() => {
        dispatch(getHourlyForecast(ids));
    }, [dispatch, ids]);

    return (
        <div className={clsx(
            styles.main
        )}>
            {
                data.map(({ data, cityName }, i) => {
                    return <Children
                        key={i}
                        cityName={cityName}
                        data={data}
                        typeForecast={typeForecast}
                    />
                })
            }
        </div>
    )
}


function Children({ typeForecast, cityName, data }) {

    const handleChangeUnit = () => {

    }

    return (
        <div className={clsx(
            styles.container
        )}>
            <div className={clsx(
                styles.header
            )}>
                <h3>Hourly Weather <span>- {cityName}</span></h3>
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
            {/* <BarChart /> */}
            {
                data && data.map((item, i) => {
                    return <SummaryComponent
                        key={i}
                        {...item}
                        typeForecast={typeForecast}
                    />
                })
            }
        </div>
    )
}

export default HourlyComponent;
