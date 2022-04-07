import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { FiRefreshCw } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import styles from './Sidebar.module.css';
import { getAllForecast, handleGetDetailForecast } from '../../redux/actions';
import dayjs from 'dayjs';

function SideBar({ selectId }) {
    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();
    const { allForecast } = useSelector(state => state.forecastData);

    const handleRefresh = () => {
        setToggle(!toggle);
        dispatch(getAllForecast({
            selectId,
            day: 7
        }));
        dispatch(handleGetDetailForecast({ selectId }));
        allForecast.forEach(item => {
            const { data } = item;
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const { description, cityName } =
                data.find(item => item.date === dayjs(tomorrow).format('YYYY/M/DD'));
            if (description === 'Rain') {
                toast.warn(`${cityName} - ngày mai có mưa`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        })
    }

    useEffect(() => {
        const timerId = setTimeout(() => {
            setToggle(false);
        }, 1000)
        return () => {
            clearTimeout(timerId)
        }
    }, [toggle])

    return (
        <nav className={clsx(
            styles.container
        )}>
            <ul className={clsx(
                styles.list_sidebar
            )}>
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? clsx(styles.active) : undefined
                        }
                    >
                        Today
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/today/hourly"
                        className={({ isActive }) =>
                            isActive ? clsx(styles.active) : undefined
                        }
                    >
                        Hourly
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="10days"
                        className={({ isActive }) =>
                            isActive ? clsx(styles.active) : undefined
                        }
                    >
                        10 days
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="monthly"
                        className={({ isActive }) =>
                            isActive ? clsx(styles.active) : undefined
                        }
                    >
                        Monthly
                    </NavLink>
                </li>
            </ul>
            <button className={clsx(
                styles.btn_refresh,
                toggle && styles.active_btn
            )}
                onClick={handleRefresh}
            >
                <IconContext.Provider value={{ className: clsx(styles.icon_refresh) }}>
                    <FiRefreshCw />
                </IconContext.Provider>
            </button>
        </nav>
    )
}

export default SideBar;
