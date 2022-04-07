import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import { WiCloudy, WiDaySunny } from 'react-icons/wi';

import DetailComponent from '../DetailComponent';
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

const handleChangeUnit = jest.fn();

afterEach(cleanup);

describe('DetailComponent', () => {
    test('isCelsius is true', () => {
        render(
            <BrowserRouter>
                <DetailComponent
                    isCelsius={true}
                    typeForecast={typeForecast}
                    handleChangeUnit={handleChangeUnit}
                />
            </BrowserRouter>
        )
        const elm = screen.getByTestId('celsius-id');
        expect(elm.innerHTML).toMatch(/C/);
    });

    test('isCelsius is false', () => {
        render(
            <BrowserRouter>
                <DetailComponent
                    isCelsius={false}
                    typeForecast={typeForecast}
                    handleChangeUnit={handleChangeUnit}
                />
            </BrowserRouter>
        )
        const elm = screen.getByTestId('celsius-id');
        expect(elm.innerHTML).toMatch(/F/);
    });

    test('fn handleChangeUnit', () => {
        render(
            <BrowserRouter>
                <DetailComponent
                    isCelsius={false}
                    typeForecast={typeForecast}
                    handleChangeUnit={handleChangeUnit}
                />
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
                <DetailComponent
                    isCelsius={false}
                    typeForecast={typeForecast}
                    handleChangeUnit={handleChangeUnit}
                />
            </BrowserRouter>
        )
        const navigateElm = screen.getByTestId('navigate-id')
        fireEvent.click(navigateElm);
    });
})