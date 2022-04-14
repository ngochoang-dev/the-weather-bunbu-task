import React, { useEffect, useMemo, useState, memo } from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs'
import { useNavigate } from "react-router-dom";
import { IconContext } from 'react-icons';
import { BsFillArrowRightSquareFill } from 'react-icons/bs';

import styles from './MainComponent.module.css';
import LineChart from './LineChart';
import { typeForecast } from '../../contants';

function MainComponent({
    isMobile,
    idOfCity,
    allForecast,
    isCelsius,
    setDay,
    setDetailDate,
    datas
}) {
    let navigate = useNavigate();
    const [dataForecast, setDataForecast] = useState([{
        cityId: "1",
        cityName: "Hà Nội",
        cloudCover: "73",
        date: "2022/4/07",
        description: "Clear sky",
        temperature: "38"
    }]
    );
    const [currentForecast, setCurrentForecast] = useState(0);
    const [data, setData] = useState([]);
    // const [isMobile, setIsMobile] = useState(false);

    const humidityArr = useMemo(() => {
        return data.map(item => {
            return item.humidity
        })
    }, [data]);

    const temperature = useMemo(() => {
        return data.length > 0 ? data[currentForecast + 1].temperature : 0
    }, [data, currentForecast])

    useMemo(() => {
        let dataArr = [];
        for (let i = 0; i < data.length; i++) {
            i !== 0 && i !== data.length - 1 &&
                dataArr.push(data[i])
        }
        setDataForecast(dataArr);
    }, [data]);

    useEffect(() => {
        setCurrentForecast(0)
    }, [idOfCity]);

    useMemo(() => {
        allForecast && setData(() => {
            return allForecast.data.sort((a, b) =>
                new Date(a.date) - new Date(b.date)
            );
        })
    }, [allForecast]);

    const handleGetDetail = (date) => {
        setDay(date)
        const newData = datas.data.find(item => item.date === date);
        setDetailDate(newData)
    };

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
                                    data-testid="forecast-id"
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
                                                return item.description === description ? (
                                                    <span key={i}>
                                                        {item.icon}
                                                    </span>
                                                ) : []
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
                onClick={() => navigate(`/10days?id=${dataForecast[0].cityId}`)}
            >
                <IconContext.Provider value={{ className: clsx(styles.icon_arrow) }}>
                    <BsFillArrowRightSquareFill />
                </IconContext.Provider>
            </button>
        </div>
    )
}

export default memo(MainComponent);
