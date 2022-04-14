import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch } from 'react-redux';
import "react-toastify/dist/ReactToastify.css";

import './css/App.css';
import SideBar from './Components/SideBar/SideBar';
import ToolComponent from './Components/ToolComponent/ToolComponent';
import TodayComponent from './Components/TodayComponent/TodayComponent';
import HourlyComponent from './Components/HourlyComponent/HourlyComponent';
import MultiDayForecast from './Components/MultiDayForecast/MultiDayForecast';
import MonthlyComponent from './Components/MonthlyComponent/MonthlyComponent';
import { getAllForecast, handleGetDetailForecast } from './redux/actions';
import Dashboard from './Components/Dashboard/Dashboard';


function App() {
  const dispatch = useDispatch();
  const [ids, setIds] = useState(1);
  const [selectId, setSelectId] = useState([1]);
  const [isMobile, setIsMobile] = useState(false);
  const [isMonthly, setIsMonthly] = useState(false);
  const [isDashboard, setIsDashboard] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const { cityId, allCity, isDeleted } = useSelector(state => state.forecastData);

  useEffect(() => {
    (cityId || cityId === 0) &&
      setSelectId(prev => {
        const firstCondition = () => {
          const dummy = [cityId, ...prev]
          const result = dummy.filter(i => i !== prev[prev.length - 1]);
          return result
        }
        const secondCondition = () => {
          return cityId === 1 ? prev : [...prev, cityId]
        }
        return (prev.length === 3 || prev.length > 3)
          ? firstCondition() :
          secondCondition()
      });
    setIds(prev => cityId ? cityId : prev)
  }, [cityId, setSelectId]);

  useEffect(() => {
    const timerId = setInterval(() => {
      dispatch(getAllForecast({
        selectId,
        day: 7
      }));
      dispatch(handleGetDetailForecast({ selectId }));
    }, 21600000);

    return () => clearInterval(timerId)
  }, [dispatch, selectId]);

  const handleOnDragEnd = (result) => {
    const actionDragEnd = (result) => {
      const items = Array.from(selectId);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setSelectId(items);
    }
    result.destination && actionDragEnd(result);
  }

  const handleReSize = () => {
    setIsMobile(window.screen.width < 644)
  }

  useEffect(() => {
    setIsMobile(window.screen.width < 644)
    window.addEventListener("resize", handleReSize)
    return () => {
      setIsMobile(false)
      window.removeEventListener("resize", handleReSize)
    }
  }, []);


  return (
    <div className="App">
      <ToastContainer />
      <SideBar
        isMobile={isMobile}
        selectId={selectId}
        setIsMonthly={setIsMonthly}
        setIsDashboard={setIsDashboard}
      />
      <ToolComponent
        ids={ids}
        isMobile={isMobile}
        selectId={selectId}
        setSelectId={setSelectId}
        setIds={setIds}
        isMonthly={isMonthly}
        isDashboard={isDashboard}
      />
      <Routes>
        <Route path="/"
          element={
            <TodayComponent
              isMobile={isMobile}
              selectId={selectId}
              setSelectId={setSelectId}
              handleOnDragEnd={handleOnDragEnd}
            />}
        />
        <Route path="today/hourly"
          element={<HourlyComponent
            selectId={selectId}
          />}
        />
        <Route path="10days"
          element={<MultiDayForecast
            selectId={selectId}
          />}
        />
        <Route path="monthly"
          element={<MonthlyComponent
            ids={ids}
          />}
        />
        <Route path="dashboard"
          element={<Dashboard
            setSelectId={setSelectId}
            allCity={allCity}
            isDeleted={isDeleted}
            showModalDelete={showModalDelete}
            setShowModalDelete={setShowModalDelete}
          />}
        />
      </Routes>
    </div>
  );
}

export default App;
