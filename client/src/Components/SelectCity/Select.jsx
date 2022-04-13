import React, {
    useState,
    useRef,
    useMemo,
    memo,
} from 'react';
import clsx from 'clsx';
import { IconContext } from 'react-icons';
import { CgClose } from 'react-icons/cg';
import { toast } from 'react-toastify';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

import styles from './Select.module.css';
import useClickOutSide from '../../customHook/useClickOutSide';

function Select({ select,
    setSelect,
    selectArr,
    setIds,
    cityId,
    openSelect,
    setOpenSelect }) {
    const selecRef = useRef();
    const [isFocused, setIsFocused] = useState(false);
    const [allCityName, setAllCityName] = useState([]);
    const [listSelect, setListSelect] = useState(selectArr);
    const [id, setId] = useState([1]);

    useClickOutSide((e) => {
        !selecRef.current.contains(e.target) &&
            setOpenSelect(false)
    })

    useMemo(() => {
        const data = select.map(index => {
            const nameFilter = selectArr.filter(item => item.id === index);
            return nameFilter[0] ? nameFilter[0] : []
        });
        selectArr.length > 0 && setAllCityName(data);

    }, [select, selectArr]);

    useMemo(() => {
        setListSelect(() => {
            const data = selectArr.filter(d => {
                return cityId ? !id.includes(d.id) && cityId !== d.id : !id.includes(d.id)
            });
            return data;
        })
    }, [selectArr, id, cityId]);

    const handleChooseCity = (item) => {
        const showToast = () => {
            return toast.error('Select up to 3 locations', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                toastId: 'error',
            })
        }
        const actionSet = () => {
            setId(prev => [...prev, item.id])
            setSelect(prev => [...prev, item.id]);
            setOpenSelect(!openSelect)
            setIds(item.id)
        }
        (allCityName.length === 3 || allCityName.length > 3) ? showToast() : actionSet()
    };

    const handleRemoveCity = (data) => {
        setSelect(prev => {
            return prev.filter(item => item !== data.id);
        });
        setId(prev => {
            return prev.filter(item => item !== data.id);
        })
        setIds(() => {
            const result = id.filter(d => d !== data.id);
            return result[result.length - 1]
        })
    }

    return (
        <div className={clsx(
            styles.container_select,
            isFocused && styles.container_select_focused
        )}
            data-testid="test-id"
            ref={selecRef}
        >
            <div className={clsx(
                styles.wrapper_select_d
            )}>
                {
                    allCityName && allCityName.map((item, i) => {
                        return <div
                            key={i}
                            className={clsx(
                                styles.city_name
                            )}>
                            {item.name}
                            <span className={clsx(
                                styles.box_icon_remove
                            )}
                                data-testid="remove-id"
                                onClick={() => handleRemoveCity(item)}
                            >
                                <IconContext.Provider
                                    value={{ className: clsx(styles.icon_remove) }}>
                                    <CgClose />
                                </IconContext.Provider>
                            </span>
                        </div>
                    })
                }
                <input
                    type="text"
                    className={clsx(
                        styles.input_text,
                        allCityName.length === 3 && styles.input_text_width
                    )}
                    placeholder={allCityName && allCityName.length === 0 ? "Choose city" : ""}
                    data-testid="input-id"
                    onFocus={() => {
                        setIsFocused(true)
                        setOpenSelect(true)
                    }}
                    onBlur={() => setIsFocused(false)}
                />
                <div className={clsx(
                    styles.select_right
                )}
                    data-testid="arrow-id"
                    onClick={() => setOpenSelect(!openSelect)}
                >
                    <IconContext.Provider value={{ className: clsx(styles.icon_arrow) }}>
                        <MdOutlineKeyboardArrowDown />
                    </IconContext.Provider>
                </div>
            </div>
            {
                openSelect &&
                <ul className={clsx(
                    styles.list_city
                )} >
                    {
                        listSelect.map((item, i) => {
                            return (
                                <li key={i}
                                    data-testid={`select-${item.id}`}
                                    onClick={() => handleChooseCity(item)}
                                >
                                    {item.name}
                                </li>
                            )
                        })
                    }
                    {
                        listSelect.length === 0 && (
                            <li >
                                No data
                            </li>
                        )
                    }
                </ul>
            }
        </div >
    )
}

export default memo(Select);
