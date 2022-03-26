import React from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { IconContext } from "react-icons";

import styles from './DetailComponent.module.css';

function DetailComponent({
    detailForecast,
    typeForecast,
}) {

    const {
        cityName,
        description,
        humidity,
        temperature,
        windSpeed,
    } = detailForecast;

    return (
        <div className={clsx(
            styles.container,
            'Detail_container'
        )}>
            <div className={clsx(
                "Wrapper_title_detail"
            )}>
                <h4 className={clsx(
                    styles.your_city
                )}>
                    Your city
                    <span>{cityName}</span>
                </h4>
                <div className={clsx(
                    styles.wrapper_date
                )}>
                    <span>{dayjs().format('h:m A, ddd, MMM D, YYYY')}</span>
                </div>
            </div>
            <div className={clsx(
                'Wrapper_detail'
            )}>
                <div className={clsx(
                    styles.temperature
                )}>
                    <IconContext.Provider value={{
                        className: clsx(
                            styles.icon,
                            'icon_status'
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
                        "Temperature"
                    )}>
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
