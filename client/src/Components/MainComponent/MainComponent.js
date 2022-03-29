import React, { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs'
import { IconContext } from 'react-icons';

import styles from './MainComponent.module.css';
import LineChart from './LineChart';

function MainComponent({
    idOfCity,
    typeForecast,
    handleGetDetail,
    allForecast,
    isCelsius
}) {
    const [dataForecast, setDataForecast] = useState([]);
    const [currentForecast, setCurrentForecast] = useState(0);
    const [data, setData] = useState([])

    const humidityArr = useMemo(() => {
        return data.map(item => {
            return item.humidity
        })
    }, [data]);

    const temperature = useMemo(() => {
        if (data.length > 0)
            return data[currentForecast + 1].temperature
        return 0
    }, [data, currentForecast])

    useMemo(() => {
        let dataArr = [];
        for (let i = 0; i < data.length; i++) {
            if (i !== 0 && i !== data.length - 1) {
                dataArr.push(data[i])
            }
        }
        setDataForecast(dataArr);
    }, [data]);

    useEffect(() => {
        setCurrentForecast(0)
    }, [idOfCity]);

    useMemo(() => {
        allForecast && setData(allForecast.data)
    }, [allForecast]);

    return (
        <div className={clsx(
            styles.container,
            styles.main_container
        )}>
            <h4 className={clsx(
                styles.header,
                styles.main_header
            )}>Temperature</h4>
            <div className={clsx(
                styles.wrapper_main,
            )}>
                <LineChart
                    isCelsius={isCelsius}
                    typeForecast={typeForecast}
                    currentForecast={currentForecast}
                    temperature={temperature}
                    humidityArr={humidityArr}
                />
                <div className={clsx(
                    styles.wrapper_forecast,
                    styles.wrapper_forecast
                )}>
                    {
                        dataForecast && dataForecast.map((data, i) => {
                            const { date, cityId, humidity, description } = data;
                            return (
                                <div
                                    key={i}
                                    className={clsx(
                                        styles.box_forecast,
                                        currentForecast === i && styles.current,
                                    )}
                                    onClick={() => {
                                        setCurrentForecast(i);
                                        handleGetDetail(date, cityId)
                                    }}>
                                    <h4>
                                        {
                                            dayjs(date).format('MMM DD') === dayjs().format('MMM DD')
                                                ?
                                                "Today" :
                                                dayjs(date).format('MMM DD')
                                        }
                                    </h4>
                                    <IconContext.Provider value={{ className: clsx(styles.icon) }}>
                                        {
                                            typeForecast.map((item, i) => {
                                                if (item.description === description) {
                                                    return (
                                                        <span key={i}>
                                                            {item.icon}
                                                        </span>
                                                    )
                                                }
                                                return []
                                            })
                                        }
                                    </IconContext.Provider>
                                    <div className={clsx(styles.humidity)}>
                                        <p>Humidity</p>
                                        <span>{humidity}%</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default MainComponent;
