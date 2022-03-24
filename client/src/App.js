import { useState } from 'react';
import { WiCloudy, WiDaySunny } from 'react-icons/wi';
import './App.css';
import Container from './Components/Container/Container'
import SelectCity from './Components/SelectCity/SelectCity';

const typeForecast = [
  {
    description: 'Cloudy',
    icon: <WiCloudy />
  },
  {
    description: 'Clear sky',
    icon: <WiDaySunny />
  }
]

function App() {
  const [select, setSelect] = useState([1]);

  return (
    <div className="App">
      <div className="Options">
        <SelectCity
          select={select}
          setSelect={setSelect}
        />
        <button
          className='Btn_create'
        >
          Create new
        </button>
      </div>
      {
        select.map(id => {
          return <Container
            key={id}
            id={id}
            typeForecast={typeForecast}
          />
        })
      }
    </div>
  );
}

export default App;
