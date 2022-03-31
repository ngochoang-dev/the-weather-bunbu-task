import React, { useEffect } from 'react';
import clsx from 'clsx';
import { IconContext } from 'react-icons';
import ReactDOMServer from "react-dom/server";

import styles from './Monthly.module.css';
import Detail from './Detail';
import dayjs from 'dayjs';

function CalendarForecast({ data, typeForecast }) {

    function insertAfter(e, data) {
        const index = Number(e.currentTarget.dataset.index);
        let i;
        if (index <= 7) {
            i = 7
        }
        if (7 < index && index <= 14) {
            i = 14
        }
        if (14 < index && index <= 21) {
            i = 21
        }
        if (21 < index && index <= 28) {
            i = 28
        }
        if (28 < index && index <= 35) {
            i = 35
        }
        const isElem = document.getElementById('wrapper_detail');
        if (isElem) {
            isElem.remove()
        }
        const html = ReactDOMServer.renderToString(<Detail
            {...data}
            typeForecast={typeForecast}
        />)
        const newElement = document.createElement('div');
        newElement.innerHTML = html;
        newElement.id = 'wrapper_detail';
        const referenceNode = document.querySelector(`button[data-index="${i}"`);
        referenceNode.parentNode.insertBefore(newElement, referenceNode.nextSibling);
    }

    useEffect(() => {
        document.querySelector('body').onclick = (e) => {
            if (e.target.classList.contains('close_detail')) {
                const isElem = document.getElementById('wrapper_detail');
                isElem.remove();
            }
        }
    }, []);

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
                    data && data.map((item, i) => {
                        const { temperature, description, date } = item;
                        return (
                            <button
                                key={i}
                                className={clsx(
                                    styles.btn_day
                                )} data-index={i + 1}
                                onClick={(e) => insertAfter(e, item)}
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
            </div>
        </div>
    )
}

export default CalendarForecast;
