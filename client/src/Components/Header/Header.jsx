import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import styles from './Header.module.css';

function Header() {
    return (
        <div className={clsx(
            styles.container
        )}>
            <Link to='/' className={clsx(
                styles.wrapper_logo
            )}>
                <div
                    className={clsx(
                        styles.logo
                    )}>
                    <img draggable={false} src='./weather-logo.png' alt='logo' />
                </div>
                <p>The weather</p>
            </Link>
        </div >
    )
}

export default Header;
