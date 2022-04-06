import { render, screen, cleanup } from '@testing-library/react';
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
    test('isCelsius', () => {
        render(
            <BrowserRouter>
                <DetailComponent
                    isCelsius={true}
                    typeForecast={typeForecast}
                    handleChangeUnit={handleChangeUnit}
                />
            </BrowserRouter>
        )
        const elementShowCelsius = screen.getByTestId('celsius-id');
        expect(elementShowCelsius.innerHTML).toMatch(/C/);
    });

    test('isFahrenheit', () => {
        render(
            <BrowserRouter>
                <DetailComponent
                    isCelsius={false}
                    typeForecast={typeForecast}
                    handleChangeUnit={handleChangeUnit}
                />
            </BrowserRouter>
        )
        const elementShowCelsius = screen.getByTestId('celsius-id');
        expect(elementShowCelsius.innerHTML).toMatch(/F/);
    });

})