import React, { useState } from 'react';
import { WiCloudy, WiDaySunny } from 'react-icons/wi';
import { Routes, Route } from "react-router-dom";

import './css/App.css';
import SideBar from './Components/SideBar/SideBar';
import ToolComponent from './Components/ToolComponent/ToolComponent';
import TodayComponent from './Components/TodayComponent/TodayComponent';
import HourlyComponent from './Components/HourlyComponent/HourlyComponent';
import MultiDayForecast from './Components/MultiDayForecast/MultiDayForecast';

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
  const [selectId, setSelectId] = useState([1]);
  const [showModal, setShowModal] = useState(false);


  return (
    <div className="App">
      <ToolComponent
        showModal={showModal}
        selectId={selectId}
        setSelectId={setSelectId}
        setShowModal={setShowModal}
      />
      <SideBar />
      <Routes>
        <Route path="/"
          element={
            <TodayComponent
              typeForecast={typeForecast}
              selectId={selectId}
              setSelectId={setSelectId}
            />}
        />
        <Route path="today/hourly"
          element={<HourlyComponent
            selectId={selectId}
            typeForecast={typeForecast}
          />}
        />
        <Route path="tenday"
          element={<MultiDayForecast
            selectId={selectId}
            typeForecast={typeForecast}
          />}
        />
      </Routes>
    </div>
  );
}

export default App;

