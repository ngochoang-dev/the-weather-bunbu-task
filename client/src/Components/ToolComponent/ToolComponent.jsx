import React, { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useDispatch } from "react-redux";
import { IconContext } from 'react-icons';
import { TiPlus } from 'react-icons/ti';
import { FiRefreshCw } from 'react-icons/fi';
import { toast } from 'react-toastify';

import styles from './Tool.module.css';
import Select from '../SelectCity/Select';
import ModalCreate from '../ModalCreate/ModalCreate';
import {
    getAllCity,
    handleGetDetailForecast,
    getAllForecast
} from '../../redux/actions';

function ToolComponent({
    ids,
    isMobile,
    isRadar,
    selectId,
    setSelectId,
    setIds,
    isMonthly,
    isDashboard,
    allCity,
    cityId,
    loading,
    allForecast,
    arrSelectShow,
    setArrSelectShow
}) {
    const timerRef = useRef();
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [openSelect, setOpenSelect] = useState(false);

    useEffect(() => {
        dispatch(getAllCity())
    }, [dispatch, cityId, selectId]);

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
            description === 'Rain' &&
                toast.warn(`${cityName} - ngày mai có mưa`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
        })
    }

    const handleToggle = () => {
        timerRef.current = setTimeout(() => {
            setToggle(false);
        }, 1000)
    }

    useEffect(() => {
        handleToggle()
        return () => {
            clearTimeout(timerRef.current)
        }
    }, [toggle]);

    return (
        <div
            className={clsx(
                styles.options,
                selectId.length === 3 ? styles.options_unset : "",
                isRadar && styles.hiden
            )}>
            {
                !isDashboard && <Select
                    ids={ids}
                    setIds={setIds}
                    select={selectId}
                    setSelect={setSelectId}
                    selectArr={allCity}
                    cityId={cityId}
                    openSelect={openSelect}
                    isMonthly={isMonthly}
                    setOpenSelect={setOpenSelect}
                    arrSelectShow={arrSelectShow}
                    setArrSelectShow={setArrSelectShow}
                />
            }
            <div className={clsx(
                styles.wrapper_right,
                isDashboard && styles.set_width,
                isMobile && styles.position_top
            )}>
                {
                    !isDashboard && (
                        <button className={clsx(
                            styles.btn_refresh,
                            toggle && styles.active_btn
                        )}
                            data-testid='refresh-id'
                            onClick={handleRefresh}
                        >
                            <span className={styles.title_refresh}>Refresh</span>
                            <IconContext.Provider value={{ className: clsx(styles.icon_refresh) }}>
                                <FiRefreshCw />
                            </IconContext.Provider>
                        </button>
                    )
                }
                <button
                    className={clsx(
                        styles.btn_create
                    )}
                    data-testid="openModal-id"
                    onClick={() => {
                        setShowModal(true)
                        document.querySelector('body').classList.add('Open_modal')
                    }}>
                    <span>New city</span>
                    <IconContext.Provider value={{ className: clsx(styles.icon_new_forecast) }}>
                        <TiPlus />
                    </IconContext.Provider>
                </button>
            </div>
            {
                showModal && (
                    <ModalCreate
                        setShowModal={setShowModal}
                        loading={loading}
                    />
                )
            }
        </div>
    )
}

export default ToolComponent;
