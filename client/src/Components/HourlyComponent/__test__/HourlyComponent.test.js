import { render, screen, fireEvent } from '@testing-library/react';
import HourlyComponent, { Children } from '../HourlyComponent';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import { WiCloudy, WiDaySunny } from 'react-icons/wi';

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


describe('HourlyComponent', () => {
    test('should render HourlyComponent', () => {
        render(
            <Provider store={store}>
                <HourlyComponent />
            </Provider>
        )
    })

    test('should render Children', () => {
        render(
            <Provider store={store}>
                <Children
                    data={[{
                        hour: 1,
                        humidity: 1,
                        temperature: 1,
                        windSpeed: 1
                    }]}
                    typeForecast={typeForecast}
                />
            </Provider>
        )
    })

    test('switch view', () => {
        render(
            <Provider store={store}>
                <Children
                    data={[]}
                />
            </Provider>
        )
        const elm = screen.getByTestId('switch-id')
        fireEvent.click(elm)
    })
})