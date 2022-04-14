import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { NavLink, useLocation } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { GiHamburgerMenu } from 'react-icons/gi';


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

function SideBar({
    isMobile,
    setIsMonthly,
    setIsDashboard }) {
    const { pathname } = useLocation();
    const [openMenu, setOpenMenu] = useState(false);

    useEffect(() => {
        setIsMonthly(pathname === '/monthly')
        setIsDashboard(pathname === '/dashboard')
    }, [pathname, setIsMonthly, setIsDashboard]);


    return (
        <nav className={clsx(
            styles.container,
            isMobile && styles.sidebar_mobile
        )}>
            {
                !isMobile && (
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
                )
            }
            {
                isMobile && (
                    <button
                        className={clsx(styles.btn_menu)}
                        onClick={() => setOpenMenu(!openMenu)}
                    >
                        <IconContext.Provider value={{ className: clsx(styles.icon_menu) }}>
                            <GiHamburgerMenu />
                        </IconContext.Provider>
                    </button>
                )
            }
            <div className={clsx(
                openMenu && styles.overlay_menu,
            )}
                onClick={() => setOpenMenu(false)}
            >
                <ul className={clsx(
                    styles.list_sidebar_mobile,
                    openMenu && styles.active
                )}>
                    {
                        menuArr.map(({ title, link }, i) => {
                            return <li key={i}>
                                <NavLink
                                    to={link}
                                    className={({ isActive }) =>
                                        isActive ? clsx(styles.active_mobile) : undefined
                                    }
                                >
                                    {title}
                                </NavLink>
                            </li>
                        })
                    }
                </ul>
            </div>
        </nav>
    )
}

export default React.memo(SideBar);
