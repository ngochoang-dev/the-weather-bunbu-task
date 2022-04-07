import { useEffect, useCallback, memo } from 'react';
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
    typeForecast,
    selectId,
    setSelectId
}) {
    const dispatch = useDispatch();

    const {
        detailForecast,
        allForecast,
        cityId } = useSelector(state => state.forecastData);

    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(selectId);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setSelectId(items);
    }

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
                                                        typeForecast={typeForecast}
                                                        setSelect={setSelectId}
                                                        provided={provided}
                                                        detailForecast={detailForecast}
                                                        allForecast={allForecast}
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
