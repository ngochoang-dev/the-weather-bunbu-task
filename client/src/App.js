import { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { IconContext } from 'react-icons';
import { TiPlus } from 'react-icons/ti';
import { WiCloudy, WiDaySunny } from 'react-icons/wi';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './css/App.css';
import styles from './App.module.css';
import Container from './Components/Container/Container'
import SelectCity from './Components/SelectCity/SelectCity';
import ModalCreate from './Components/ModalCreate/ModalCreate';
import { getAllCity, handleGetDetailForecast, getAllForecast } from './redux/actions';

const typeForecast = [
  {
    description: 'Cloudy',
    icon: <WiCloudy />
  },
  {
    description: 'Clear sky',
    icon: <WiDaySunny />
  }
];

function App() {
  const dispatch = useDispatch();
  const [selectId, setSelectId] = useState([1]);
  const [showModal, setShowModal] = useState(false);

  const { allCity,
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
    dispatch(getAllCity())
  }, [dispatch, cityId, selectId]);

  useEffect(() => {
    handleGetDetail()
  }, [handleGetDetail, cityId, selectId]);

  useEffect(() => {
    dispatch(getAllForecast(selectId))
  }, [selectId, dispatch, cityId]);

  useEffect(() => {
    if (cityId || cityId === 0) {
      setSelectId(prev => {
        if (prev.length === 3 || prev.length > 3) {
          const dummy = [...prev, cityId]
          const result = dummy.filter(i => i !== prev[prev.length - 1]);
          return result
        }
        return cityId === 1 ? prev : [...prev, cityId]
      });
    }
  }, [cityId]);

  return (
    <div className={clsx(
      styles.container
    )}>
      <div
        className={clsx(
          styles.options,
          selectId.length === 3 ? styles.options_unset : ""
        )}
      >
        <SelectCity
          select={selectId}
          setSelect={setSelectId}
          selectArr={allCity}
        />
        <button
          className={clsx(
            styles.btn_create
          )}
          onClick={() => {
            setShowModal(true)
            document.querySelector('body').classList.add('Open_modal')
          }}
        >
          <span>New Forecast</span>
          <IconContext.Provider value={{ className: clsx(styles.icon_new_forecast) }}>
            <TiPlus />
          </IconContext.Provider>
        </button>
      </div>
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
      {
        showModal && (
          <ModalCreate
            setShowModal={setShowModal}
          />
        )
      }
    </div>
  );
}

export default App;

