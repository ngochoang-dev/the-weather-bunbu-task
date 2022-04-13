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


function App() {
  const dispatch = useDispatch();
  const [selectId, setSelectId] = useState([1]);
  const [showModal, setShowModal] = useState(false);
  const [ids, setIds] = useState(selectId[0]);

  const { cityId } = useSelector(state => state.forecastData);

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

  return (
    <div className="App">
      <ToastContainer />
      <ToolComponent
        showModal={showModal}
        selectId={selectId}
        setSelectId={setSelectId}
        setShowModal={setShowModal}
        setIds={setIds}
      />
      <SideBar selectId={selectId} />
      <Routes>
        <Route path="/"
          element={
            <TodayComponent
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
      </Routes>
    </div>
  );
}

export default App;

