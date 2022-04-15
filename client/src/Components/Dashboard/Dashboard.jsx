import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { IconContext } from 'react-icons';
import { IoMdTrash } from 'react-icons/io';
import { useDispatch } from 'react-redux';

import styles from './Dashboard.module.css';
import { deleteCity, resetLoading } from '../../redux/actions';

function Dashboard({
    setSelectId,
    allCity,
    isDeleted,
    showModalDelete,
    setShowModalDelete
}) {
    const dispatch = useDispatch();
    const [idDelete, setIdDelete] = useState(null);

    const handleConfirmDelete = () => {
        dispatch(deleteCity(idDelete))
    }

    const handleConfirm = useCallback(() => {
        setShowModalDelete(false);
        setSelectId(prev => {
            return prev.filter(i => i !== idDelete)
        })
    }, [idDelete, setSelectId, setShowModalDelete])

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
                                    <td style={{ width: 100 }}>{index + 1}</td>
                                    <td>{name}</td>
                                    <td style={{ width: 100 }}>
                                        <button className={clsx(
                                            styles.btn_delete
                                        )}
                                            data-testid={`delete-${id}`}
                                            onClick={() => {
                                                setIdDelete(id)
                                                setShowModalDelete(true)
                                            }}
                                        >
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
                                <td style={{ width: 100 }}>...</td>
                                <td>...</td>
                                <td style={{ width: 100 }}>...</td>
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
                                )}
                                    data-testid="confirm-id"
                                    onClick={handleConfirmDelete}>
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
