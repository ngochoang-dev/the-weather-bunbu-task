import React, { useState, useMemo } from 'react';
import clsx from 'clsx';
import { IconContext } from 'react-icons';
import { CgClose } from 'react-icons/cg';

import styles from './Select.module.css';
import ModalSelect from './ModalSelect';

function SelectCity({ select, setSelect, selectArr, setIds }) {
    const [showModal, setShowModal] = useState(false);

    const handleRemoveCity = (id) => {
        setSelect(prev => prev.filter(item => item !== id))
        setIds(prev => prev === id ? select[select.length - 2] : prev)
    }

    const allCityName = useMemo(() => {
        const handleCityName = () => {
            return select.map(index => {
                const nameFilter = selectArr.filter(item => item.id === index);
                return nameFilter[0] ? nameFilter[0] : []
            });
        }
        return selectArr.length > 0 ? handleCityName() : null
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
                setIds={setIds}
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
                                    data-testid={`removeCity-${i}`}
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
