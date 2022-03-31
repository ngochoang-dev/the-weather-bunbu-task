import React from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { IconContext } from 'react-icons';
import { IoCloseSharp } from 'react-icons/io5'
import { AiOutlineCloud } from 'react-icons/ai'
import { WiCloudy, WiRaindrop } from 'react-icons/wi';
import { RiWindyLine } from 'react-icons/ri';
import { GiSunflower } from 'react-icons/gi';
import { MdGrain } from 'react-icons/md';

import styles from './Monthly.module.css';

function Detail({
    temperature,
    humidity,
    windSpeed,
    description,
    uv,
    date,
    cloudCover,
    typeForecast,
    rain,
}) {


    return (
        <div className={clsx(
            styles.wrapper
        )}>
            <button className={clsx(
                styles.btn_remove,
                'close_detail'
            )}>
                <IconContext.Provider value={{
                    className: clsx(
                        styles.icon_remove
                    )
                }}>
                    <IoCloseSharp />
                </IconContext.Provider>
            </button>
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
                                        <WiCloudy />
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
                                <RiWindyLine />
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
        </div>
    )
}

export default Detail;
