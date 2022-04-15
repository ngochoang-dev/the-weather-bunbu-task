import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';

import store from '../../../redux/store';
import DetailComponent from '../DetailComponent';
import { typeForecast } from '../../../contants';

const handleChangeUnit = jest.fn();
const setIsCelsius = jest.fn();

afterEach(cleanup);

describe('DetailComponent', () => {
    test('isCelsius is true', () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <DetailComponent
                        isCelsius={true}
                        typeForecast={typeForecast}
                        handleChangeUnit={handleChangeUnit}
                    />
                </Provider>
            </BrowserRouter>
        )
        const elm = screen.getByTestId('celsius-id');
        expect(elm.innerHTML).toMatch(/C/);
    });

    test('isCelsius is false', () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <DetailComponent
                        isCelsius={false}
                        typeForecast={typeForecast}
                        handleChangeUnit={handleChangeUnit}
                    />
                </Provider>
            </BrowserRouter>
        )
        const elm = screen.getByTestId('celsius-id');
        expect(elm.innerHTML).toMatch(/F/);
    });

    test('fn handleChangeUnit have day', () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <DetailComponent
                        day={'2022/12/2'}
                        isCelsius={false}
                        typeForecast={typeForecast}
                        handleChangeUnit={handleChangeUnit}
                        setIsCelsius={setIsCelsius}
                    />
                </Provider>
            </BrowserRouter>
        )
        const labelCheckbox = screen.getByTestId('labelCheckbox-id')
        const elm = screen.getByTestId('celsius-id');
        fireEvent.click(labelCheckbox);
        expect(elm.innerHTML).toMatch(/F/);
    });

    test('fn handleChangeUnit', () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <DetailComponent
                        isCelsius={false}
                        typeForecast={typeForecast}
                        handleChangeUnit={handleChangeUnit}
                        setIsCelsius={setIsCelsius}
                    />
                </Provider>
            </BrowserRouter>
        )
        const labelCheckbox = screen.getByTestId('labelCheckbox-id')
        const elm = screen.getByTestId('celsius-id');
        fireEvent.click(labelCheckbox);
        expect(elm.innerHTML).toMatch(/F/);
    });

    test('fn navigate', () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <DetailComponent
                        isCelsius={false}
                        typeForecast={typeForecast}
                        handleChangeUnit={handleChangeUnit}
                    />
                </Provider>
            </BrowserRouter>
        )
        const navigateElm = screen.getByTestId('navigate-id')
        fireEvent.click(navigateElm);
    });
})