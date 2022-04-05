import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";

import styles from './DetailComponent.module.css';

function DetailComponent({
    isCelsius,
    detailForecast,
    typeForecast,
    handleChangeUnit,
}) {
    let navigate = useNavigate();

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
                        )}>
                            <input type="checkbox"
                                onChange={(e) => handleChangeUnit(e, cityId, date)} />
                            <span></span>
                        </label>
                        <span data-testid='isCelsius'>&deg;{isCelsius ? 'C' : 'F'}</span>
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
                                if (item.description === description) {
                                    return <span key={i}>{item.icon}</span>
                                }
                                return []
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
