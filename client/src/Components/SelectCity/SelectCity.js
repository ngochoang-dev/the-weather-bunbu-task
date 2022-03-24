import React, { useRef, useState, useMemo } from 'react';
import clsx from 'clsx';
import styles from './Select.module.css';
import useClickOutSide from '../../customHook/useClickOutSide';

const selectArr = [
    {
        id: 1,
        name: 'Hà Nội'
    },
    {
        id: 2,
        name: 'Đà Nẵng'
    }, {
        id: 3,
        name: 'Sài Gòn'
    },
    {
        id: 4,
        name: 'Phú Quốc'
    }
]

function SelectCity() {
    const selectRef = useRef();
    const [showSelect, setShowSelect] = useState(false);
    const [select, setSelect] = useState([]);

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

        setSelect(prev => [...prev, cityId])
    };


    const allCityName = useMemo(() => {
        const nameCity = select.map(index => {
            const nameFilter = selectArr.filter(item => item.id === index);
            return nameFilter[0].name
        });

        return nameCity.join(', ')
    }, [select]);


    return (
        <div className={clsx(
            styles.wrapper_select
        )}>
            <label className={clsx(
                styles.select_label
            )}>
                Choose City
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
                    <span>
                        {allCityName ? allCityName : 'Choose City'}
                    </span>
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
                                            style={
                                                select.includes(item.id) ? {
                                                    color: 'red'
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
        </div>
    )
}

export default SelectCity