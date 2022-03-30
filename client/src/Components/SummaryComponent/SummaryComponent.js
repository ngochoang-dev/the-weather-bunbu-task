import React, { useState } from 'react';
import clsx from 'clsx';
import { IconContext } from 'react-icons';
import { IoIosArrowDown } from 'react-icons/io'
import { WiCloudy, WiHumidity } from 'react-icons/wi';
import { FaTemperatureHigh } from 'react-icons/fa';
import { RiWindyLine } from 'react-icons/ri';
import { GiHeavyRain, GiSunflower } from 'react-icons/gi';

import styles from './Summary.module.css';

function SummaryComponent({
    temperature,
    humidity,
    windSpeed,
    description,
    hour,
    uv,
    cloudCover,
    typeForecast
}) {

    const [showDetail, setShowDetail] = useState(false);

    return (
        <div className={clsx(
            styles.container
        )}>
            <div className={clsx(
                styles.wrapper
            )}
                onClick={() => setShowDetail(!showDetail)}
            >
                <div className={clsx(
                    styles.box
                )}>
                    <div className={clsx(
                        styles.day_name
                    )}>
                        <p>{hour}</p>
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
                        <p>humidity: <span>{humidity}</span>%</p>
                    </div>
                    <div className={clsx(
                        styles.wind_speed
                    )}>
                        <p>wind speed: <span>{windSpeed}</span>km/j</p>
                    </div>
                </div>
                <button className={clsx(
                    styles.btn_extend,
                    showDetail && styles.btn_extend_rotate
                )}>
                    <IconContext.Provider value={{ className: clsx(styles.icon_arrow) }}>
                        <IoIosArrowDown />
                    </IconContext.Provider>
                </button>
            </div>
            {showDetail && (
                <div className={clsx(
                    styles.wrapper_detail
                )}>
                    <ul className={clsx(styles.list_details)}>
                        <li>
                            <IconContext.Provider value={{ className: clsx(styles.icon_detail) }}>
                                <FaTemperatureHigh />
                            </IconContext.Provider>
                            <div className={clsx(
                                styles.field_detail
                            )}>
                                <span>Feels Like</span>
                                <p>{temperature}</p>
                            </div>
                        </li>
                        <li>
                            <IconContext.Provider value={{ className: clsx(styles.icon_detail) }}>
                                <WiHumidity />
                            </IconContext.Provider>
                            <div className={clsx(
                                styles.field_detail
                            )}>
                                <span>Wind</span>
                                <p>{windSpeed} km/j</p>
                            </div>
                        </li>
                        <li>
                            <IconContext.Provider value={{ className: clsx(styles.icon_detail) }}>
                                <RiWindyLine />
                            </IconContext.Provider>
                            <div className={clsx(
                                styles.field_detail
                            )}>
                                <span>Humidity</span>
                                <p>{humidity}%</p>
                            </div>
                        </li>
                        <li>
                            <IconContext.Provider value={{ className: clsx(styles.icon_detail) }}>
                                <GiSunflower />
                            </IconContext.Provider>
                            <div className={clsx(
                                styles.field_detail
                            )}>
                                <span>UV Index</span>
                                <p>{uv} of 10</p>
                            </div>
                        </li>
                        <li>
                            <IconContext.Provider value={{ className: clsx(styles.icon_detail) }}>
                                <WiCloudy />
                            </IconContext.Provider>
                            <div className={clsx(
                                styles.field_detail
                            )}>
                                <span>Cloud Cover</span>
                                <p>{cloudCover}%</p>
                            </div>
                        </li>
                        <li>
                            <IconContext.Provider value={{ className: clsx(styles.icon_detail) }}>
                                <GiHeavyRain />
                            </IconContext.Provider>
                            <div className={clsx(
                                styles.field_detail
                            )}>
                                <span>Rain Amount</span>
                                <p>0 in</p>
                            </div>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default SummaryComponent;
