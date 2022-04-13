import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

import CalendarForecast from '../CalendarForecast';
import store from '../../../redux/store';

const dayOfWeek = [
    "SUN",
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
]
describe('calendarForecast', () => {
    test('should render CalendarForecast', () => {
        render(
            <Provider store={store}>
                <CalendarForecast
                    dayOfWeek={dayOfWeek}
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
                        cityId: "1",
                        cityName: "Hà Nội",
                        cloudCover: "68",
                        date: "2022/3/27",
                        description: "Clear sky",
                        humidity: 39,
                        rain: "51",
                        temperature: "3",
                        windSpeed: "11.74"
                    }]}
                />
            </Provider>
        )
    })


})