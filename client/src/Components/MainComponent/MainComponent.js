import React, { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs'
import { useNavigate } from "react-router-dom";
import { IconContext } from 'react-icons';
import { BsFillArrowRightSquareFill } from 'react-icons/bs';

import styles from './MainComponent.module.css';
import LineChart from './LineChart';

function MainComponent({
    idOfCity,
    typeForecast,
    handleGetDetail,
    allForecast,
    isCelsius,
}) {
    let navigate = useNavigate();
    const [dataForecast, setDataForecast] = useState([]);
    const [currentForecast, setCurrentForecast] = useState(0);
    const [data, setData] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

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

    const handleReSize = () => {
        setIsMobile(window.screen.width < 644)
    }

    useEffect(() => {
        setIsMobile(window.screen.width < 644)
        window.addEventListener("resize", handleReSize)
        return () => {
            setIsMobile(false)
            window.removeEventListener("resize", handleReSize)
        }
    }, []);

    return (
        <div className={clsx(
            styles.container,
            styles.main_container
        )}>
            <h4 className={clsx(
                styles.header,
            )}> {isMobile ? "7 day forecast" : "Temperature"}</h4>
            <div className={clsx(
                styles.wrapper_main,
            )}>
                {
                    !isMobile && (
                        <LineChart
                            isCelsius={isCelsius}
                            typeForecast={typeForecast}
                            currentForecast={currentForecast}
                            temperature={temperature}
                            humidityArr={humidityArr}
                        />
                    )
                }
                <div className={clsx(
                    styles.wrapper_forecast,
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
            <button className={clsx(
                styles.btn_redirect
            )}
                onClick={() => navigate(`/tenday?id=${dataForecast[0].cityId}`)}
            >
                <IconContext.Provider value={{ className: clsx(styles.icon_arrow) }}>
                    <BsFillArrowRightSquareFill />
                </IconContext.Provider>
            </button>
        </div>
    )
}

export default MainComponent;
