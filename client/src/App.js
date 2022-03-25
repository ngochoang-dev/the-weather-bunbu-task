import { useState, useEffect } from 'react';
import { WiCloudy, WiDaySunny } from 'react-icons/wi';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Container from './Components/Container/Container'
import SelectCity from './Components/SelectCity/SelectCity';
import ModalCreate from './Components/ModalCreate/ModalCreate';
import { getAllCity } from './redux/actions';

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
  const [select, setSelect] = useState([1]);
  const [showModal, setShowModal] = useState(false);

  const selectArr = useSelector(state => state.forecastData.allCity);
  const id = useSelector(state => state.forecastData.cityId);

  useEffect(() => {
    dispatch(getAllCity())
  }, [dispatch, id]);

  useEffect(() => {
    if (id || id === 0)
      setSelect([id]);
  }, [id])


  return (
    <div className="App">
      <div className="Options">
        <SelectCity
          select={select}
          setSelect={setSelect}
          selectArr={selectArr}
        />
        <button
          className='Btn_create'
          onClick={() => setShowModal(true)}
        >
          New Forecast
        </button>
      </div>
      {
        select.map(id => {
          return <Container
            key={id}
            id={id}
            typeForecast={typeForecast}
            setSelect={setSelect}
          />
        })
      }
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
