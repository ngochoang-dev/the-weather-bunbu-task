import React, { useState, memo, useEffect } from 'react';
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
    const [isValid, setIsValid] = useState(false);

    const handleCreate = () => {
        if (cityName && !isValid) {
            dispatch(createForecast({ cityName: cityName }))
            setCityName('')
        }
    }

    useEffect(() => {
        return document.querySelector('body').classList.remove('Open_modal')
    }, []);

    useEffect(() => {
        if (loading)
            setShowModal(false)
    }, [loading, setShowModal]);

    function removeAscent(str) {
        if (str === null || str === undefined) return str;
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        return str;
    }

    const handleInputChange = (e) => {
        const regex = /^[a-zA-Z0-9 ]*$/;
        (!regex.test(removeAscent(e.target.value)) || e.target.value.length === 20) ?
            setIsValid(true) :
            setIsValid(false)
        setCityName(e.target.value)
    }

    return (
        <div className={clsx(
            styles.overlay
        )}>
            <div className={clsx(
                styles.modal,
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
                        onChange={(e) => handleInputChange(e)}
                        maxLength="20"
                    />
                    <span className={clsx(
                        styles.label_valid,
                        isValid && styles.active
                    )}>Tên chỉ chứa chữ cái và số, tối đa 20 ký tự</span>
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
