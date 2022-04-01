import React, { useState, useMemo } from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { IconContext } from 'react-icons';

import styles from './Monthly.module.css';
import Detail from './Detail';

function CalendarForecast({ data, typeForecast }) {

    const [calendar, setCalendar] = useState([]);
    const [indexColumn, setIndexColumn] = useState(null);
    const [dataDetail, setDataDetail] = useState([]);

    useMemo(() => {
        for (let i = 1; i <= 5; i++) {
            const result = data.slice((i - 1) * 7, i * 7);
            setCalendar(prev => [...prev, result])
        }
    }, [data]);

    const handleClick = (data, index) => {
        setIndexColumn(index)
        setDataDetail(data)
    }

    return (
        <div className={clsx(
            styles.calendar_container
        )}>
            <div className={clsx(
                styles.day_of_month
            )}>
                <span>SUN</span>
                <span>MON</span>
                <span>TUE</span>
                <span>WED</span>
                <span>THU</span>
                <span>FRI</span>
                <span>SAT</span>
            </div>
            <div className={clsx(
                styles.day_grid_wrapper
            )}>
                {
                    calendar && calendar.map((arr, index) => {
                        return <React.Fragment key={index}>
                            {
                                arr.map((item, i) => {
                                    const { temperature, description, date } = item;
                                    return (
                                        <button
                                            key={i}
                                            className={clsx(
                                                styles.btn_day,
                                                dayjs(date).format('M')
                                                !== dayjs().format('M')
                                                && styles.outside
                                            )}
                                            onClick={() => handleClick(item, index)}
                                        >
                                            <span className={clsx(styles.day)}>
                                                {dayjs(date).format('DD')}
                                            </span>
                                            <IconContext.Provider value={{
                                                className: clsx(
                                                    styles.icon_temperature
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
                                            <p className={clsx(styles.temperature_calendar)}>{temperature}°</p>
                                        </button>
                                    )
                                })
                            }
                            {
                                indexColumn === index && <Detail
                                    {...dataDetail}
                                    typeForecast={typeForecast}
                                    setIndexColumn={setIndexColumn}
                                />
                            }
                        </React.Fragment>
                    })
                }
            </div>
        </div>
    )
}

export default CalendarForecast;
