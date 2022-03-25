import React, { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs'
import { IconContext } from 'react-icons';
import styles from './MainComponent.module.css';
import LineChart from './LineChart';

function MainComponent({
    idOfCity,
    typeForecast,
    handleGetDetailForecast
}) {

    const [dataForecast, setDataForecast] = useState([]);
    const [currentForecast, setCurrentForecast] = useState(0);

    const [allForecast, setAllForecast] = useState([])

    const humidityArr = useMemo(() => {
        return allForecast.map(item => {
            return item.humidity
        })
    }, [allForecast]);

    const temperature = useMemo(() => {
        if (allForecast.length > 0)
            return allForecast[currentForecast + 1].temperature
    }, [allForecast, currentForecast])


    useMemo(() => {
        let dataArr = [];
        for (let i = 0; i < allForecast.length; i++) {
            if (i !== 0 && i !== allForecast.length - 1) {
                dataArr.push(allForecast[i])
            }
        }
        setDataForecast(dataArr);
    }, [allForecast]);


    useEffect(() => {
        setCurrentForecast(0)
    }, [idOfCity]);

    useEffect(() => {
        fetch(`http://localhost:5000/forecast?today=${dayjs().format('YYYY/M/DD')}&&cityId=${idOfCity}`)
            .then(response => response.json())
            .then(data => {
                setAllForecast(data.data);
            })
    }, [idOfCity]);

    return (
        <div className={clsx(
            styles.container
        )}>
            <h4 className={styles.header}>Temperature</h4>
            <LineChart
                typeForecast={typeForecast}
                currentForecast={currentForecast}
                temperature={temperature}
                humidityArr={humidityArr}
            />
            <div className={clsx(
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
                                    handleGetDetailForecast(date, cityId)
                                }}
                            >
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
    )
}

export default MainComponent;
