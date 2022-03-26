import React, { useRef, useState, useMemo } from 'react';
import clsx from 'clsx';
import { IconContext } from 'react-icons';
import { CgClose } from 'react-icons/cg';

import styles from './Select.module.css';
import useClickOutSide from '../../customHook/useClickOutSide';

function SelectCity({ select, setSelect, selectArr }) {
    const selectRef = useRef();
    const [showSelect, setShowSelect] = useState(false);

    useClickOutSide(e => {
        if (selectRef.current) {
            if (!selectRef.current.contains(e.target)) {
                setShowSelect(false)
            }
        }
    });

    const handleChooseCity = (cityId) => {
        if (select.includes(cityId)) {
            const newSelect = select.filter(item => item !== cityId);
            return setSelect(newSelect)
        }
        setSelect(prev => [...prev, cityId,])
    };

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
            styles.wrapper_select
        )}>
            <div className={clsx(
                styles.select
            )}
                ref={selectRef}
            >
                <div className={clsx(
                    styles.current_city
                )}
                    onClick={() => setShowSelect(!showSelect)}
                >
                    <span>
                        Choose City
                    </span>
                </div>
                {
                    showSelect && showSelect && (
                        <ul className={clsx(
                            styles.list_city
                        )}>
                            {
                                selectArr.map(item => {
                                    return (
                                        <li
                                            style={
                                                select.includes(item.id) ? {
                                                    color: '#039BE5'
                                                }
                                                    : {}
                                            }
                                            key={item.id}
                                            onClick={() => handleChooseCity(item.id)}
                                        >
                                            {item.name}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    )
                }
            </div>
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
