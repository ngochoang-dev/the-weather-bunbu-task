import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import MainComponent from '../MainComponent';
import { typeForecast } from '../../../contants';

const handleGetDetail = jest.fn();
const setDataAllForecast = jest.fn();

describe('MainComponent', () => {
    test('should render', () => {
        render(
            <BrowserRouter>
                <MainComponent
                    idOfCity={1}
                    typeForecast={typeForecast}
                    handleGetDetail={handleGetDetail}
                    allForecast={{
                        cityId: 1,
                        data: [{
                            cityId: "1",
                            cityName: "Hà Nội",
                            cloudCover: "73",
                            date: "2022/4/07",
                            description: "Clear sky",
                            temperature: "38"
                        },
                        {
                            cityId: "1",
                            cityName: "Hà Nội",
                            cloudCover: "73",
                            date: "2022/4/07",
                            description: "Clear sky",
                            temperature: "38"
                        }]
                    }}
                    setDataAllForecast={setDataAllForecast}
                    isCelsius={false}
                />
            </BrowserRouter>
        )
    })
})
