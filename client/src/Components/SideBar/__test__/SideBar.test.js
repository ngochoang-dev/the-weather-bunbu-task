import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import SideBar from "../SideBar";
import store from "../../../redux/store";

const setIsMonthly = jest.fn();
const setIsDashboard = jest.fn();


jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

describe("sidebar", () => {
    test('should render', () => {
        render(<BrowserRouter>
            <Provider store={store}>
                <SideBar
                    isMobile={false}
                    setIsMonthly={setIsMonthly}
                    setIsDashboard={setIsDashboard}
                />
            </Provider>
        </BrowserRouter>)
    })

    test('should render isMobile true', () => {
        render(<BrowserRouter>
            <Provider store={store}>
                <SideBar
                    isMobile={true}
                    setIsMonthly={setIsMonthly}
                    setIsDashboard={setIsDashboard}
                />
            </Provider>
        </BrowserRouter>)

        const menu = screen.getByTestId('menu-id');
        const overlay = screen.getByTestId('overlay-id');
        fireEvent.click(menu);
        fireEvent.click(overlay);
    })


    test('should click menu', () => {
        render(<BrowserRouter>
            <Provider store={store}>
                <SideBar
                    isMobile={true}
                    setIsMonthly={setIsMonthly}
                    setIsDashboard={setIsDashboard}
                />
            </Provider>
        </BrowserRouter>)

        const menu = screen.getByText('Today');
        fireEvent.click(menu);
    })

})
