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
        title: 'Radar',
        link: 'radar'
    },
    {
        title: 'Dashboard',
        link: 'dashboard'
    },
]

function SideBar({
    isMobile,
    setIsMonthly,
    setIsDashboard,
    setIsRadar }) {
    const { pathname } = useLocation();
    const [openMenu, setOpenMenu] = useState(false);

    useEffect(() => {
        setIsMonthly(pathname === '/monthly')
        setIsRadar(pathname === '/radar')
        setIsDashboard(pathname === '/dashboard')
    }, [pathname,
        setIsMonthly,
        setIsDashboard,
        setIsRadar]);


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
                        data-testid="menu-id"
                        className={clsx(styles.btn_menu)}
                        onClick={() => {
                            setOpenMenu(true)
                            document.querySelector('body').classList.add('Open_modal')
                        }}
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
                data-testid="overlay-id"
                onClick={() => {
                    setOpenMenu(false)
                    document.querySelector('body').classList.remove('Open_modal')
                }}
            >
            </div>
            <ul className={clsx(
                styles.list_sidebar_mobile,
                openMenu && styles.active_sidebar_mobile,
            )}>
                <div className={clsx(
                    styles.wrapper_logo
                )}>
                    <div
                        className={clsx(
                            styles.logo
                        )}>
                        <img draggable={false} src='./weather-logo.png' alt='logo' />
                    </div>
                    <p>The weather</p>
                </div>
                {
                    menuArr.map(({ title, link }, i) => {
                        return <li key={i}>
                            <NavLink
                                to={link}
                                onClick={() => {
                                    setOpenMenu(false)
                                    document.querySelector('body').classList.remove('Open_modal')
                                }}
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
        </nav>
    )
}

export default React.memo(SideBar);
