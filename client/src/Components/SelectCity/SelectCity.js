import React, { useState, useMemo } from 'react';
import clsx from 'clsx';
import { IconContext } from 'react-icons';
import { CgClose } from 'react-icons/cg';

import styles from './Select.module.css';
import ModalSelect from './ModalSelect';

function SelectCity({ select, setSelect, selectArr }) {
    const [showModal, setShowModal] = useState(false);

    const handleRemoveCity = (id) => {
        setSelect(prev => {
            return prev.filter(item => item !== id)
        })
    }

    const allCityName = useMemo(() => {
        if (selectArr.length > 0) {
            const nameCity = select.map(index => {
                const nameFilter = selectArr.filter(item => item.id === index);
                return nameFilter[0] ? nameFilter[0] : []
            });
            return nameCity
        }
        return null
    }, [select, selectArr]);

    return (
        <div className={clsx(
            styles.wrapper_select,
            styles.wrapper_select_city_width,
            select.length === 3 && styles.wrapper_select_city
        )}>
            <div className={clsx(
                styles.select
            )}>
                <div className={clsx(
                    styles.current_city
                )}
                    onClick={() => {
                        document.querySelector('body').classList.add('Open_modal')
                        setShowModal(true)
                    }}>
                    <span>
                        Choose City
                    </span>
                </div>
            </div>
            {showModal && <ModalSelect
                select={select}
                selectArr={selectArr}
                setShowModal={setShowModal}
                setSelect={setSelect}
            />}
            <div className={clsx(
                styles.wrapper_list_city
            )}>
                <ul>
                    {
                        allCityName && allCityName.map((item, i) => {
                            return <li
                                key={i}
                            >
                                {item.name}
                                <span
                                    onClick={() => handleRemoveCity(item.id)}
                                >
                                    <IconContext.Provider
                                        value={{ className: clsx(styles.icon_remove) }}>
                                        <CgClose />
                                    </IconContext.Provider>
                                </span>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default SelectCity;
