import React from 'react';
import clsx from 'clsx';
import { useSelector } from "react-redux";
import { IconContext } from 'react-icons';
import { TiPlus } from 'react-icons/ti';

import styles from './Tool.module.css';
import SelectCity from '../SelectCity/SelectCity';
import ModalCreate from '../ModalCreate/ModalCreate';

function ToolComponent({
    setShowModal,
    selectId,
    setSelectId,
    showModal
}) {
    const { allCity, } = useSelector(state => state.forecastData);

    return (
        <div
            className={clsx(
                styles.options,
                selectId.length === 3 ? styles.options_unset : ""
            )}
        >
            <SelectCity
                select={selectId}
                setSelect={setSelectId}
                selectArr={allCity}
            />
            <button
                className={clsx(
                    styles.btn_create
                )}
                onClick={() => {
                    setShowModal(true)
                    document.querySelector('body').classList.add('Open_modal')
                }}
            >
                <span>New Forecast</span>
                <IconContext.Provider value={{ className: clsx(styles.icon_new_forecast) }}>
                    <TiPlus />
                </IconContext.Provider>
            </button>
            {
                showModal && (
                    <ModalCreate
                        setShowModal={setShowModal}
                    />
                )
            }
        </div>
    )
}

export default ToolComponent;
