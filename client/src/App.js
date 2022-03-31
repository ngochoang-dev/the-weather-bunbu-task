import React, { useState, useEffect } from 'react';
import { WiCloudy, WiDaySunny } from 'react-icons/wi';
import { useSelector } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import './css/App.css';
import SideBar from './Components/SideBar/SideBar';
import ToolComponent from './Components/ToolComponent/ToolComponent';
import TodayComponent from './Components/TodayComponent/TodayComponent';
import HourlyComponent from './Components/HourlyComponent/HourlyComponent';
import MultiDayForecast from './Components/MultiDayForecast/MultiDayForecast';
import MonthlyComponent from './Components/MonthlyComponent/MonthlyComponent';


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

  const { cityId } = useSelector(state => state.forecastData);

  useEffect(() => {
    if (cityId || cityId === 0) {
      setSelectId(prev => {
        if (prev.length === 3 || prev.length > 3) {
          const dummy = [cityId, ...prev]
          const result = dummy.filter(i => i !== prev[prev.length - 1]);
          return result
        }
        return cityId === 1 ? prev : [cityId, ...prev]
      });
    }
  }, [cityId, setSelectId]);

  return (
    <div className="App">
      <ToastContainer />
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
        <Route path="monthly"
          element={<MonthlyComponent
            selectId={selectId}
            typeForecast={typeForecast}
          />}
        />
      </Routes>
    </div>
  );
}

export default App;

