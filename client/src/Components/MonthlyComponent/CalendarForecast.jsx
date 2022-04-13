import React, { useState, useMemo, useEffect } from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { IconContext } from 'react-icons';

import styles from './Monthly.module.css';
import Detail from './Detail';
import { typeForecast } from '../../contants';

function CalendarForecast({ dayOfWeek, data }) {

    const [calendar, setCalendar] = useState([]);
    const [indexColumn, setIndexColumn] = useState(null);
    const [dataDetail, setDataDetail] = useState([]);
    const [isCurrentDay, setIsCurrentDay] = useState('')

    useMemo(() => {
        let newdata = [];
        data.sort((a, b) => new Date(a.date) - new Date(b.date));
        for (let i = 1; i <= 5; i++) {
            const result =
                data.slice((i - 1) * 7, i * 7);
            newdata.push(result);
        }
        setCalendar(newdata)
    }, [data]);

    const handleClick = (data, index, day) => {
        setIndexColumn(index)
        setDataDetail(data)
        setIsCurrentDay(day)
    }

    useEffect(() => {
        const handle = (currData, index) => {
            handleClick(currData, index)
            setIsCurrentDay(dayjs(currData.date).format('DD'))
        }
        calendar.forEach((arr, index) => {
            const currData = arr.find((d) => d.date === dayjs().format('YYYY/M/DD'));
            currData && handle(currData, index)
        })
    }, [calendar]);

    useEffect(() => {
        data.length === 0 && setIndexColumn(null)
    }, [data])

    return (
        <div className={clsx(
            styles.calendar_container
        )}>
            <div className={clsx(
                styles.day_of_month
            )}>
                {
                    dayOfWeek.map((name, i) => {
                        return <span key={i}>{name}</span>
                    })
                }
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
                                            onClick={() =>
                                                handleClick(item, index, dayjs(date).format('DD'))}
                                        >
                                            <span
                                                className={clsx(
                                                    styles.day,
                                                    isCurrentDay === dayjs(date).format('DD')
                                                    && styles.active
                                                )}
                                            >
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
