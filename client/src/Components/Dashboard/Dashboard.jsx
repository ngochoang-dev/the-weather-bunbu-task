import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { IconContext } from 'react-icons';
import { IoMdTrash } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Dashboard.module.css';
import { deleteCity, resetLoading } from '../../redux/actions';

function Dashboard({
    setSelectId
}) {
    const dispatch = useDispatch();
    const { allCity, isDeleted } = useSelector(state => state.forecastData);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [idDelete, setIdDelete] = useState(null);

    const handleConfirmDelete = () => {
        dispatch(deleteCity(idDelete))
    }

    const handleConfirm = useCallback(() => {
        setShowModalDelete(false);
        setSelectId(prev => {
            return prev.filter(i => i !== idDelete)
        })
    }, [idDelete, setSelectId])

    useEffect(() => {
        isDeleted && handleConfirm()
        return () => {
            dispatch(resetLoading())
        }
    }, [isDeleted, dispatch, handleConfirm]);

    return (
        <div className={clsx(
            styles.container
        )}>
            <table>
                <tbody>
                    <tr>
                        <th>STT</th>
                        <th>City Name</th>
                        <th></th>
                    </tr>
                    {
                        allCity.map(({ id, name }, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{name}</td>
                                    <td style={{ width: 150 }}>
                                        <button className={clsx(
                                            styles.btn_delete
                                        )}
                                            onClick={() => {
                                                setIdDelete(id)
                                                setShowModalDelete(true)
                                            }}
                                        >
                                            Delete
                                            <IconContext.Provider value={{ className: clsx(styles.icon_delete) }}>
                                                <IoMdTrash />
                                            </IconContext.Provider>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {
                        allCity.length === 0 && (
                            <tr>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
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
                                    data-testid="cancel-id"
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
    )
}

export default Dashboard;
