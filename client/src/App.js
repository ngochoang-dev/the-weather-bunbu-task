import { useState, useEffect, useCallback } from 'react';
import { IconContext } from 'react-icons';
import { TiPlus } from 'react-icons/ti';
import { WiCloudy, WiDaySunny } from 'react-icons/wi';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './css/App.css';
import './css/Responsive.css';
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
  const [selectId, setSelect] = useState([1, 2]);
  const [showModal, setShowModal] = useState(false);

  const { allCity, detailForecast, allForecast } = useSelector(state => state.forecastData);
  const id = useSelector(state => state.forecastData.cityId);

  useEffect(() => {
    dispatch(getAllCity())
  }, [dispatch, id]);

  useEffect(() => {
    if (id || id === 0)
      setSelect([id]);
  }, [id]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(selectId);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSelect(items);
  }

  const handleGetDetail = useCallback(() => {
    dispatch(handleGetDetailForecast({ selectId }))
  }, [selectId, dispatch]);

  useEffect(() => {
    handleGetDetail()
  }, [handleGetDetail, id]);

  useEffect(() => {
    dispatch(getAllForecast(selectId))
  }, [selectId, dispatch]);


  return (
    <div className="App">
      <div className={`Options ${selectId.length === 3 ? "Option_unset" : ""}`}>
        <SelectCity
          select={selectId}
          setSelect={setSelect}
          selectArr={allCity}
        />
        <button
          className='Btn_create'
          onClick={() => setShowModal(true)}
        >
          <span>New Forecast</span>
          <IconContext.Provider value={{ className: 'icon_new_forecast' }}>
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
                            setSelect={setSelect}
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

