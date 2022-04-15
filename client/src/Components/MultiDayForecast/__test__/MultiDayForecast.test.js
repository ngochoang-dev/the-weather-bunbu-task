import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import dayjs from 'dayjs';

import MultiDayForecast, { Children } from '../MultiDayForecast';
import store from '../../../redux/store';

describe('MultiDayForecast', () => {
    test('should render', () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <MultiDayForecast
                        allForecast={[
                            {
                                cityId: 1,
                                data: [{
                                    cityId: "1",
                                    cityName: "Hà Nội",
                                    cloudCover: "68",
                                    date: "2022/3/27",
                                    description: "Clear sky",
                                    humidity: 39,
                                    rain: "51",
                                    temperature: "3",
                                    windSpeed: "11.74"
                                },
                                {
                                    cityId: "2",
                                    cityName: "HCM",
                                    cloudCover: "68",
                                    date: dayjs().format('MMM DD'),
                                    description: "Clear sky",
                                    humidity: 39,
                                    rain: "51",
                                    temperature: "3",
                                    windSpeed: "11.74"
                                },
                                {
                                    cityId: "3",
                                    cityName: "Da Nang",
                                    cloudCover: "68",
                                    date: "2022/3/27",
                                    description: "Clear sky",
                                    humidity: 39,
                                    rain: "51",
                                    temperature: "3",
                                    windSpeed: "11.74"
                                }]
                            }
                        ]}
                        selectId={[1]}
                    />
                </Provider>
            </BrowserRouter>
        )
    })

    test('should render Children', () => {
        render(
            <Children
                data={[{
                    cityId: "1",
                    cityName: "Hà Nội",
                    cloudCover: "68",
                    date: "2022/3/27",
                    description: "Clear sky",
                    humidity: 39,
                    rain: "51",
                    temperature: "3",
                    windSpeed: "11.74"
                },
                {
                    cityId: "2",
                    cityName: "HCM",
                    cloudCover: "68",
                    date: "2022/3/27",
                    description: "Clear sky",
                    humidity: 39,
                    rain: "51",
                    temperature: "3",
                    windSpeed: "11.74"
                }]}
            />
        )
        const swElm = screen.getByTestId('switch-id');
        fireEvent.click(swElm)
    })
})