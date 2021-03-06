import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from './DetailComponent.module.css';
import { typeForecast } from '../../contants';
import { changeUnit } from '../../redux/actions';


function DetailComponent({
    isCelsius,
    detailForecast,
    setIsCelsius,
    day
}) {
    let navigate = useNavigate();

    const dispatch = useDispatch();

    const [data, setData] = useState({
        cityId: "",
        cityName: "",
        description: "",
        humidity: "",
        temperature: "",
        windSpeed: "",
        date: "",
    })

    const {
        cityId,
        cityName,
        description,
        humidity,
        temperature,
        windSpeed,
        date,
    } = data;

    useEffect(() => {
        detailForecast && setData(detailForecast)
    }, [detailForecast]);

    const handleChangeUnit = (e, id, time) => {
        const date = day ? day : time
        dispatch(changeUnit({
            isCelsius: e.target.checked,
            id,
            date
        }));
        setIsCelsius(e.target.checked);
    }

    return (
        <div className={clsx(
            styles.container,
            styles.detail_container
        )}>
            <div className={clsx(
                styles.wrapper_title_detail
            )}>
                <h4 className={clsx(
                    styles.your_city
                )}>
                    <span>{cityName}</span>
                    <div className={clsx(
                        styles.wrapper_switch
                    )}>
                        <label className={clsx(
                            styles.switch
                        )}
                            data-testid="labelCheckbox-id"
                        >
                            <input type="checkbox"
                                onChange={(e) => handleChangeUnit(e, cityId, date)} />
                            <span></span>
                        </label>
                        <span data-testid='celsius-id'>&deg;{isCelsius ? 'C' : 'F'}</span>
                    </div>
                </h4>
                <div className={clsx(
                    styles.wrapper_date
                )}>
                    <span>{dayjs().format('h:m A, ddd, MMM D, YYYY')}</span>
                </div>
            </div>
            <div className={clsx(
                styles.wrapper_detail
            )}
                data-testid="navigate-id"
                onClick={() => navigate(`/today/hourly?id=${cityId}`)}
            >
                <div className={clsx(
                    styles.temperature
                )}>
                    <IconContext.Provider value={{
                        className: clsx(
                            styles.icon,
                            styles.icon_status
                        )
                    }}>
                        {
                            typeForecast.map((item, i) => {
                                return item.description === description ?
                                    <span key={i}>{item.icon}</span> :
                                    []
                            })
                        }
                    </IconContext.Provider>
                    <p className={clsx(
                        styles.temperature
                    )}>
                        {temperature}
                        <span>&deg;{isCelsius ? 'C' : 'F'}</span>
                    </p>
                </div>
                <div className={clsx(
                    styles.status
                )}>
                    <span className={clsx(
                        styles.temperature_status
                    )}>
                        {temperature}
                        <p>&deg;{isCelsius ? 'C' : 'F'}</p>
                    </span>
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
