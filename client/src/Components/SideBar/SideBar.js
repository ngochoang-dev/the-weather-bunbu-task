import React from 'react';
import clsx from 'clsx';
import { NavLink, Outlet } from 'react-router-dom';

import styles from './Sidebar.module.css'

function SideBar() {
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
                        to="tenday"
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
            <Outlet />
        </nav>
    )
}

export default SideBar;
