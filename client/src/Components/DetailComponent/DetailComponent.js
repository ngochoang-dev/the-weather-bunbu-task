import React, { useEffect } from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { IconContext } from "react-icons";
import styles from './DetailComponent.module.css';
import Select from './Select';
import { getDetailForecast } from '../../redux/actions';

function DetailComponent({
    typeForecast,
    idOfCity,
    setIdOfCity
}) {
    const dispatch = useDispatch();
    const {
        cityId,
        cityName,
        description,
        humidity,
        temperature,
        windSpeed,
    } = useSelector(state => state.forecastData.detailForecast);

    useEffect(() => {
        dispatch(getDetailForecast(dayjs().format('YYYY/M/DD'), idOfCity));
    }, [dispatch, idOfCity]);
    return (
        <div className={clsx(
            styles.container
        )}>
            <Select
                cityId={cityId}
                cityName={cityName}
                setIdOfCity={setIdOfCity}
            />
            <div className={clsx(
                styles.wrapper_date
            )}>
                <span>{dayjs().format('h:m A, ddd, MMM D, YYYY')}</span>
            </div>
            <div className={clsx(
                styles.wrapper_detail
            )}>
                <div className={clsx(
                    styles.temperature
                )}>
                    <IconContext.Provider value={{
                        className: clsx(
                            styles.icon
                        )
                    }}>
                        {
                            typeForecast.map((item, i) => {
                                if (item.description === description) {
                                    return <span key={i}>{item.icon}</span>
                                }
                                return []
                            })
                        }
                    </IconContext.Provider>
                    <p>
                        {temperature}
                        <span>&deg;F</span>
                    </p>
                </div>
                <div className={clsx(
                    styles.status
                )}>
                    <p>{description}</p>
                </div>
                <div className={clsx(
                    styles.sub_status
                )}>
                    <div className={clsx(
                        styles.box_sub_status
                    )}>
                        <span>Humidity</span>
                        <p>{humidity}%</p>
                    </div>
                    <div className={clsx(
                        styles.box_sub_status
                    )}>
                        <span>Wind speed</span>
                        <p>{windSpeed} km/j</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailComponent;
