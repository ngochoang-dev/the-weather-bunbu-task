import React, { useEffect } from 'react';
import clsx from 'clsx';
import { NavLink, useLocation } from 'react-router-dom';

import styles from './Sidebar.module.css';

const menuArr = [
    {
        title: 'Today',
        link: '/'
    },
    {
        title: 'Hourly',
        link: '/today/hourly'
    },
    {
        title: '10 days',
        link: '10days'
    },
    {
        title: 'Monthly',
        link: 'monthly'
    },
    {
        title: 'Dashboard',
        link: 'dashboard'
    }
]

function SideBar({ setIsMonthly, setIsDashboard }) {
    const { pathname } = useLocation();

    useEffect(() => {
        setIsMonthly(pathname === '/monthly')
        setIsDashboard(pathname === '/dashboard')
    }, [pathname, setIsMonthly, setIsDashboard]);

    return (
        <nav className={clsx(
            styles.container
        )}>
            <ul className={clsx(
                styles.list_sidebar
            )}>
                {
                    menuArr.map(({ title, link }, i) => {
                        return <li key={i}>
                            <NavLink
                                to={link}
                                className={({ isActive }) =>
                                    isActive ? clsx(styles.active) : undefined
                                }
                            >
                                {title}
                            </NavLink>
                        </li>
                    })
                }
            </ul>
        </nav>
    )
}

export default React.memo(SideBar);
