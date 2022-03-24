import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import styles from './DetailComponent.module.css';
import useClickOutSide from '../../customHook/useClickOutSide';


const selectArr = [
    {
        id: 1,
        name: 'Việt Nam'
    },
    {
        id: 2,
        name: 'Trung Quốc'
    }, {
        id: 3,
        name: 'Ấn Độ'
    },
    {
        id: 4,
        name: 'Thái Lan'
    }
]

function Select({ cityId, cityName, setIdOfCity }) {
    const selectRef = useRef();

    const [showSelect, setShowSelect] = useState(false);

    useClickOutSide(e => {
        if (selectRef.current) {
            if (!selectRef.current.contains(e.target)) {
                setShowSelect(false)
            }
        }
    })

    return (
        <div className={clsx(
            styles.wrapper_select
        )}>
            <label className={clsx(
                styles.select_label
            )}>
                Your city
            </label>
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
                    <span>{cityName}</span>
                </div>
                {
                    showSelect && (
                        <ul className={clsx(
                            styles.list_city
                        )}>
                            {
                                selectArr.map(item => {
                                    return (
                                        <li
                                            key={item.id}
                                            style={
                                                Number(cityId) === item.id ?
                                                    { color: '#039BE5' } :
                                                    {}
                                            }
                                            onClick={() => {
                                                setShowSelect(false)
                                                setIdOfCity(item.id)
                                            }}>
                                            {item.name}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    )
                }
            </div>
        </div>
    )
}

export default Select;
