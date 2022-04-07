import React, { useState } from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { IconContext } from 'react-icons';
import { IoIosArrowDown } from 'react-icons/io'
import { AiOutlineCloud } from 'react-icons/ai'
import { WiCloudy, WiHumidity, WiRaindrop } from 'react-icons/wi';
import { FaTemperatureHigh } from 'react-icons/fa';
import { RiWindyLine } from 'react-icons/ri';
import { GiSunflower } from 'react-icons/gi';
import { MdGrain } from 'react-icons/md'


import styles from './Summary.module.css';
import SummaryChildren from './SummaryChildren';

function SummaryComponent({
    temperature,
    humidity,
    windSpeed,
    description,
    hour,
    uv,
    date,
    cloudCover,
    typeForecast,
    isMultiDay,
    rain
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
                {
                    isMultiDay ? (
                        showDetail ? (
                            <div className={clsx(
                                styles.box_multi_day
                            )}>
                                <div className={clsx(
                                    styles.box
                                )}>
                                    <div className={clsx(
                                        styles.box_info_basic
                                    )}>
                                        <h4 className={clsx(
                                            styles.header_detail
                                        )}>
                                            {dayjs(date).format('MMM DD') === dayjs().format('MMM DD')
                                                ?
                                                "Today" :
                                                dayjs(date).format('MMM DD')} | Day
                                        </h4>
                                        <div className={clsx(
                                            styles.detail_basic
                                        )}>
                                            <h3>{temperature}°</h3>
                                            <IconContext.Provider value={{
                                                className: clsx(
                                                    styles.icon_desc_multi_day
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
                                            <div className={clsx(
                                                styles.container_info_basic
                                            )}>
                                                <div className={clsx(
                                                    styles.wrappper_info_basic
                                                )}>
                                                    <IconContext.Provider value={{
                                                        className: clsx(
                                                            styles.icon_info_basic
                                                        )
                                                    }}>
                                                        <WiRaindrop />
                                                    </IconContext.Provider>
                                                    <span>
                                                        {rain}%
                                                    </span>
                                                </div>
                                                <div className={clsx(
                                                    styles.wrappper_info_basic
                                                )}>
                                                    <IconContext.Provider value={{
                                                        className: clsx(
                                                            styles.icon_info_basic
                                                        )
                                                    }}>
                                                        <RiWindyLine />
                                                    </IconContext.Provider>
                                                    <span>{windSpeed} km/j</span>
                                                </div>
                                            </div>
                                        </div>
                                        <span className={clsx(
                                            styles.sub_title
                                        )}>{description}. Low 71F. Winds ESE at 5 to 10 mph.</span>
                                    </div>
                                </div>
                                <div className={clsx(
                                    styles.wrapper_detail,
                                    styles.wrapper_detail_multiday
                                )}>
                                    <ul className={clsx(
                                        styles.list_details,
                                        styles.list_details_multiday
                                    )}>
                                        <li className={clsx(styles.item_detail)}>
                                            <IconContext.Provider value={{ className: clsx(styles.icon_detail) }}>
                                                <WiCloudy />
                                            </IconContext.Provider>
                                            <div className={clsx(
                                                styles.field_detail
                                            )}>
                                                <span>Humidity</span>
                                                <p>{humidity}%</p>
                                            </div>
                                        </li>
                                        <li className={clsx(styles.item_detail)}>
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
                                        <li className={clsx(styles.item_detail)}>
                                            <IconContext.Provider value={{ className: clsx(styles.icon_detail) }}>
                                                <AiOutlineCloud />
                                            </IconContext.Provider>
                                            <div className={clsx(
                                                styles.field_detail
                                            )}>
                                                <span>Cloud Cover</span>
                                                <p>{cloudCover}%</p>
                                            </div>
                                        </li>
                                        <li className={clsx(styles.item_detail)}>
                                            <IconContext.Provider value={{ className: clsx(styles.icon_detail) }}>
                                                <MdGrain />
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
                            </div>
                        ) : (
                            <SummaryChildren
                                isMultiDay={isMultiDay}
                                date={date}
                                hour={hour}
                                temperature={temperature}
                                typeForecast={typeForecast}
                                description={description}
                                humidity={humidity}
                                windSpeed={windSpeed}
                            />
                        )
                    ) :
                        (
                            <SummaryChildren
                                isMultiDay={isMultiDay}
                                date={date}
                                hour={hour}
                                temperature={temperature}
                                typeForecast={typeForecast}
                                description={description}
                                humidity={humidity}
                                windSpeed={windSpeed}
                            />
                        )
                }
                <button className={clsx(
                    styles.btn_extend,
                    showDetail && styles.btn_extend_rotate,
                    isMultiDay && showDetail && styles.btn_extend_top
                )}>
                    <IconContext.Provider value={{ className: clsx(styles.icon_arrow) }}>
                        <IoIosArrowDown />
                    </IconContext.Provider>
                </button>
            </div>
            {showDetail && !isMultiDay && (
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
                                <RiWindyLine />
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
                                <WiHumidity />
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
                                <AiOutlineCloud />
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
                                <MdGrain />
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
