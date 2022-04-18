import { useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import styles from './Today.module.css';
import Container from '../Container/Container'
import {
    handleGetDetailForecast,
    getAllForecast
} from '../../redux/actions';

function TodayComponent({
    isMobile,
    selectId,
    arrSelectShow,
    setSelectId,
    handleOnDragEnd,
    setArrSelectShow
}) {
    const dispatch = useDispatch();

    const {
        detailForecast,
        allForecast,
        cityId } = useSelector(state => state.forecastData);

    const handleGetDetail = useCallback(() => {
        dispatch(handleGetDetailForecast({ selectId }))
    }, [selectId, dispatch]);

    useEffect(() => {
        handleGetDetail()
    }, [handleGetDetail, cityId, selectId]);

    useEffect(() => {
        dispatch(getAllForecast({
            selectId,
            day: 7
        }))
    }, [selectId, dispatch, cityId]);

    return (
        <div className={clsx(
            styles.container
        )}>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="weather">
                    {(provided) => (
                        <div  {...provided.droppableProps}
                            ref={provided.innerRef}>
                            {
                                selectId.map((id, index) => {
                                    return (
                                        <Draggable key={id} draggableId={`dragableId-${id}`} index={index}>
                                            {(provided) => (
                                                <div ref={provided.innerRef}
                                                    {...provided.draggableProps}>
                                                    <Container
                                                        id={id}
                                                        isMobile={isMobile}
                                                        setSelect={setSelectId}
                                                        selectId={selectId}
                                                        arrSelectShow={arrSelectShow}
                                                        provided={provided}
                                                        detailForecast={detailForecast}
                                                        allForecast={allForecast}
                                                        setArrSelectShow={setArrSelectShow}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    )
                                })
                            }
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default TodayComponent;
