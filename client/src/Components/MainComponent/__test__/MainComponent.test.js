import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import MainComponent from '../MainComponent';
import { typeForecast } from '../../../contants';

const setDay = jest.fn();
const handleGetDetail = jest.fn();
const setDataAllForecast = jest.fn();
const setDetailDate = jest.fn();

describe('MainComponent', () => {
    test('should render', () => {
        render(
            <BrowserRouter>
                <MainComponent
                    isMobile={true}
                    idOfCity={1}
                    setDay={setDay}
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
                            cityId: "2",
                            cityName: "Da Nang",
                            cloudCover: "73",
                            date: "2022/4/07",
                            description: "Clear sky",
                            temperature: "38"
                        }]
                    }}
                    datas={{
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
                            cityId: "2",
                            cityName: "Da Nang",
                            cloudCover: "73",
                            date: "2022/4/07",
                            description: "Clear sky",
                            temperature: "38"
                        }]
                    }}
                    isCelsius={false}
                    setDetailDate={setDetailDate}
                    setDataAllForecast={setDataAllForecast}
                />
            </BrowserRouter>
        )
    })

    test('should click', () => {
        render(
            <BrowserRouter>
                <MainComponent
                    isMobile={false}
                    idOfCity={1}
                    setDay={setDay}
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
                            cityId: "2",
                            cityName: "Da Nang",
                            cloudCover: "73",
                            date: "2022/4/07",
                            description: "Clear sky",
                            temperature: "38"
                        },
                        {
                            cityId: "3",
                            cityName: "HCm",
                            cloudCover: "73",
                            date: "2022/4/07",
                            description: "Clear sky",
                            temperature: "38"
                        }]
                    }}
                    datas={{
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
                            cityId: "2",
                            cityName: "Da Nang",
                            cloudCover: "73",
                            date: "2022/4/07",
                            description: "Clear sky",
                            temperature: "38"
                        }]
                    }}
                    isCelsius={false}
                    setDetailDate={setDetailDate}
                    setDataAllForecast={setDataAllForecast}
                />
            </BrowserRouter>
        )
        const elm = screen.getByTestId('forecast-id');
        const elmRedirect = screen.getByTestId('redirect-id');
        fireEvent.click(elm)
        fireEvent.click(elmRedirect)
    })
})
