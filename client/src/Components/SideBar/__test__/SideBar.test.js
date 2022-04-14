import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import SideBar from "../SideBar";
import store from "../../../redux/store";

const setIsMonthly = jest.fn();
const setIsDashboard = jest.fn();

const wrapper = (
    <BrowserRouter>
        <Provider store={store}>
            <SideBar
                selectId={[1]}
                setIsMonthly={setIsMonthly}
                setIsDashboard={setIsDashboard}
            />
        </Provider>
    </BrowserRouter>
)


jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

describe("sidebar", () => {
    test('should render', () => {
        render(wrapper)
    })
})
