import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { IconContext } from 'react-icons';
import { CgCloseR } from 'react-icons/cg';
import { IoMdTrash } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from './Select.module.css';
import { deleteCity, resetLoading } from '../../redux/actions';

function ModalSelect({
    setShowModal,
    selectArr,
    select,
    setSelect }) {
    const dispatch = useDispatch();
    const isDeleted = useSelector(state => state.forecastData.isDeleted);

    const [id, setId] = useState(null)
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [idSelect, setIdSelect] = useState(select)

    const handleChooseCity = (cityId) => {
        if (idSelect.includes(cityId)) {
            const newSelect = idSelect.filter(item => item !== cityId);
            return setIdSelect(newSelect)
        }
        setIdSelect(prev => {
            if (prev.length < 3) {
                return [...prev, cityId]
            } else {
                toast.error('Select up to 3 locations', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    toastId: 'error',
                })
                return prev
            }
        })
    };

    const handleActionDelete = (id) => {
        setId(id)
        setShowModalDelete(true)
        document.querySelector('body').classList.add('Open_modal')
    }

    const handleConfirmDelete = () => {
        dispatch(deleteCity(id))
    }

    useEffect(() => {
        if (isDeleted) {
            setShowModalDelete(false);
            setSelect(prev => {
                return prev.filter(i => i !== id)
            })
            setIdSelect(prev => {
                return prev.filter(i => i !== id)
            })
        }
        return () => {
            dispatch(resetLoading())
        }
    }, [isDeleted, dispatch, id, setSelect]);

    useEffect(() => {
        return () => document.querySelector('body').classList.remove('Open_modal')
    }, []);

    const handleSubmit = () => {
        setSelect(idSelect);
        setShowModal(false);
    }

    return (
        <div className={clsx(
            styles.overlay
        )}>
            <ToastContainer />
            <div className={clsx(
                styles.modal
            )}>
                <span className={clsx(styles.btn_close)}
                    onClick={() => setShowModal(false)}
                >
                    <IconContext.Provider value={{ className: clsx(styles.icon_close) }}>
                        <CgCloseR />
                    </IconContext.Provider>
                </span>
                <h4 className={clsx(
                    styles.header
                )}>All City</h4>
                <ul className={clsx(
                    styles.list_city
                )}>
                    {
                        selectArr && selectArr.map(({ name, id }, i) => {
                            return (
                                <li key={i}>
                                    <label className={clsx(
                                        styles.checkbox
                                    )}>
                                        <input type="checkbox"
                                            checked={idSelect.includes(id)}
                                            onChange={() => handleChooseCity(id)} />
                                        <span className={clsx(
                                            styles.name_city
                                        )}>{name}</span>
                                    </label>
                                    <span className={clsx(styles.btn_remove)}
                                        onClick={() => handleActionDelete(id)}>
                                        <IconContext.Provider value={{ className: clsx(styles.icon_delete) }}>
                                            <IoMdTrash />
                                        </IconContext.Provider>
                                    </span>
                                </li>
                            )
                        })
                    }
                </ul>
                <button className={clsx(
                    styles.btn_submit
                )}
                    onClick={handleSubmit}
                >
                    Save
                </button>
                {
                    showModalDelete && (
                        <div className={clsx(
                            styles.overlay_modal_delete
                        )}>
                            <div className={clsx(
                                styles.modal_confirm
                            )}>
                                <div className={clsx(
                                    styles.modal_header
                                )}>
                                    <h4>Delete city</h4>
                                </div>
                                <div className={clsx(
                                    styles.modal_body
                                )}>
                                    <p>You definitely want to delete ?</p>
                                </div>
                                <div className={clsx(
                                    styles.modal_footer
                                )}>
                                    <button className={clsx(
                                        styles.btn_modal_cancle
                                    )}
                                        onClick={() => setShowModalDelete(false)}>
                                        Cancel
                                    </button>
                                    <button className={clsx(
                                        styles.btn_modal_confirm
                                    )} onClick={handleConfirmDelete}>
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ModalSelect;
