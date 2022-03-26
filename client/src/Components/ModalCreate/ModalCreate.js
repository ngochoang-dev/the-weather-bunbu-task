import React, { useState, memo } from 'react';
import clsx from 'clsx';
import { IconContext } from 'react-icons';
import { CgCloseR } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Modal.module.css';
import { createForecast } from '../../redux/actions';


function ModalCreate({
    setShowModal,
}) {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.forecastData.loading);
    const [cityName, setCityName] = useState('');

    const handleCreate = () => {
        if (cityName)
            dispatch(createForecast({ cityName: cityName }))
        setCityName('')
    }

    return (
        <div className={clsx(
            styles.overlay
        )}>
            <div className={clsx(
                styles.modal
            )}>
                <span className={clsx(styles.btn_close)}
                    onClick={() => setShowModal(false)}
                >
                    <IconContext.Provider value={{ className: clsx(styles.icon_close) }}>
                        <CgCloseR />
                    </IconContext.Provider>
                </span>
                <div className={clsx(
                    styles.form_gr
                )}>
                    <label>Nhập tên thành phố</label>
                    <input type="text"
                        ref={e => e ? e.focus() : null}
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)} />
                </div>
                <button
                    className={clsx(
                        styles.btn_create
                    )}
                    onClick={handleCreate}
                >
                    Tạo mới
                </button>
            </div>
            {
                loading && (
                    <div className="loading">
                        <svg viewBox="25 25 50 50">
                            <circle cx="50" cy="50" r="20"></circle>
                        </svg>
                    </div>
                )
            }
        </div>
    )
}

export default memo(ModalCreate);
