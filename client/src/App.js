import { useState } from 'react';
import { WiCloudy, WiDaySunny } from 'react-icons/wi';
import './App.css';
import DetailComponent from './Components/DetailComponent/DetailComponent';
import MainComponent from './Components/MainComponent/MainComponent';
import SelectCity from './Components/SelectCity/SelectCity';

function App() {
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

  const [idOfCity, setIdOfCity] = useState(1);

  return (
    <div className="App">
      <SelectCity />
      <DetailComponent
        idOfCity={idOfCity}
        setIdOfCity={setIdOfCity}
        typeForecast={typeForecast}
      />
      <MainComponent
        idOfCity={idOfCity}
        typeForecast={typeForecast}
      />
    </div>
  );
}

export default App;
