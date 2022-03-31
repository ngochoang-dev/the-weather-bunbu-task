import React from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { IconContext } from 'react-icons';
import { RiCloudWindyLine } from 'react-icons/ri';
import { WiHumidity } from 'react-icons/wi';



import styles from './Summary.module.css';

function SummaryChildren({
    isMultiDay,
    date,
    hour,
    temperature,
    typeForecast,
    description,
    humidity,
    windSpeed
}) {
    return (
        <div className={clsx(
            styles.box
        )}>
            <div className={clsx(
                styles.day_name
            )}>
                <p>{isMultiDay ?
                    dayjs(date).format('MMM DD') === dayjs().format('MMM DD')
                        ?
                        "Today" :
                        dayjs(date).format('MMM DD')
                    : hour}</p>
            </div>
            <div className={clsx(
                styles.temperature
            )}>
                <p>{temperature}°</p>
            </div>
            <div className={clsx(
                styles.description
            )}>
                <IconContext.Provider value={{ className: clsx(styles.icon_description) }}>
                    {
                        typeForecast.map((item, i) => {
                            if (item.description === description) {
                                return <span key={i}>{item.icon}</span>
                            }
                            return []
                        })
                    }
                </IconContext.Provider>
                <span>{description}</span>
            </div>
            <div className={clsx(
                styles.humidity
            )}>
                <p>
                    <span>humidity:</span>
                    <IconContext.Provider value={{
                        className: clsx(
                            styles.icon_h_w
                        )
                    }}>
                        <WiHumidity />
                    </IconContext.Provider>
                    <span>{humidity}</span>%</p>
            </div>
            <div className={clsx(
                styles.wind_speed
            )}>
                <p>
                    <span>wind speed: </span>
                    <IconContext.Provider value={{
                        className: clsx(
                            styles.icon_h_w
                        )
                    }}>
                        <RiCloudWindyLine />
                    </IconContext.Provider>
                    <span>{windSpeed}</span>km/j</p>
            </div>
        </div>
    )
}

export default SummaryChildren