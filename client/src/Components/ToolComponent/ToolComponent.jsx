import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useSelector, useDispatch } from "react-redux";
import { IconContext } from 'react-icons';
import { TiPlus } from 'react-icons/ti';

import styles from './Tool.module.css';
import SelectCity from '../SelectCity/SelectCity';
import ModalCreate from '../ModalCreate/ModalCreate';
import { getAllCity } from '../../redux/actions';

function ToolComponent({
    setShowModal,
    selectId,
    setSelectId,
    showModal,
    setIds
}) {
    const dispatch = useDispatch();
    const { allCity, cityId, loading } = useSelector(state => state.forecastData);


    useEffect(() => {
        dispatch(getAllCity())
    }, [dispatch, cityId, selectId]);

    return (
        <div
            className={clsx(
                styles.options,
                selectId.length === 3 ? styles.options_unset : ""
            )}>
            <SelectCity
                setIds={setIds}
                select={selectId}
                setSelect={setSelectId}
                selectArr={allCity}
            />
            <button
                className={clsx(
                    styles.btn_create
                )}
                data-testid="openModal-id"
                onClick={() => {
                    setShowModal(true)
                    document.querySelector('body').classList.add('Open_modal')
                }}>
                <span>New Forecast</span>
                <IconContext.Provider value={{ className: clsx(styles.icon_new_forecast) }}>
                    <TiPlus />
                </IconContext.Provider>
            </button>
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
