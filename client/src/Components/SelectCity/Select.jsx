import React, {
    useState,
    useRef,
    useMemo,
    memo,
    useEffect
} from 'react';
import clsx from 'clsx';
import { IconContext } from 'react-icons';
import { CgClose } from 'react-icons/cg';
import { toast } from 'react-toastify';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

import styles from './Select.module.css';
import useClickOutSide from '../../customHook/useClickOutSide';

function Select({
    ids,
    select,
    setSelect,
    selectArr,
    setIds,
    cityId,
    openSelect,
    setOpenSelect,
    isMonthly,
    arrSelectShow,
    setArrSelectShow }) {
    const selecRef = useRef();
    const [isFocused, setIsFocused] = useState(false);
    const [allCityName, setAllCityName] = useState([]);
    const [listSelect, setListSelect] = useState(selectArr);
    const [newCityId, setNewCityId] = useState(null);
    const [selectOne, setSelectOne] = useState(() => ids ? [ids] : []);

    useClickOutSide((e) => {
        !selecRef.current.contains(e.target) &&
            setOpenSelect(false)
    })

    useMemo(() => {
        let data;
        !isMonthly ?
            data = select.map(index => {
                const nameFilter = selectArr.find(item => item.id === index);
                return nameFilter ? nameFilter : []
            }) :
            data = selectOne.map(index => {
                const nameFilter = selectArr.find(item => item.id === index);
                return nameFilter ? nameFilter : []
            });
        selectArr.length > 0 && setAllCityName(data);
    }, [select, selectArr, isMonthly, selectOne]);


    useMemo(() => {
        !isMonthly ?
            setListSelect(() => {
                const data = selectArr.filter(d => {
                    return newCityId ?
                        !arrSelectShow.includes(d.id) && newCityId !== d.id
                        : !arrSelectShow.includes(d.id)
                });
                return data;
            }) :
            setListSelect(() => {
                const data = selectArr.filter(d => {
                    return !selectOne.includes(d.id)
                });
                return data;
            })
    }, [selectArr, arrSelectShow, newCityId, isMonthly, selectOne]);

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

        const setSelectGroupA = () => {
            setArrSelectShow(prev => [...prev, item.id])
            setSelect(prev => [...prev, item.id]);
            setOpenSelect(!openSelect)
        }

        const setSelectGroupB = () => {
            setIds(item.id)
            setOpenSelect(!openSelect)
            setSelectOne([item.id])
        }

        const actionSet = () => {
            !isMonthly ?
                setSelectGroupA()
                :
                setSelectGroupB()
        }
        (allCityName.length === 3 || allCityName.length > 3)
            ? showToast() :
            actionSet()
    };

    const handleRemoveCity = (data) => {
        const setSelectGroupA = () => {
            setSelect(prev => {
                return prev.filter(item => item !== data.id);
            });
            setArrSelectShow(prev => {
                return prev.filter(item => item !== data.id);
            })
            setIds(() => {
                const result = arrSelectShow.filter(d => d !== data.id);
                return result[result.length - 1]
            })
            setNewCityId(null)
        }

        const setSelectGroupB = () => {
            setIds(0)
            setSelectOne([])
            setNewCityId(null)
        }

        !isMonthly ? setSelectGroupA() : setSelectGroupB()
    }

    useEffect(() => {
        isMonthly && setIds(selectOne[0])
    }, [isMonthly, setIds, selectOne]);

    useEffect(() => {
        setNewCityId(cityId)
    }, [cityId]);


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
