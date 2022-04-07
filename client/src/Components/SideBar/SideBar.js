import React from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { FiRefreshCw } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Sidebar.module.css';
import { refreshForecast } from '../../redux/actions';

function SideBar({ selectId }) {
    const dispatch = useDispatch();

    const handleRefresh = () => {
        dispatch(refreshForecast({ selectId }))
    }

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
                styles.btn_refresh
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
