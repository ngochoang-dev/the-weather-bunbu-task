import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Container from '../Container';
import { BrowserRouter } from "react-router-dom";
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

const setSelect = jest.fn();

describe('container component', () => {
    test('should render', () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Container
                        id={1}
                        provided={{}}
                        detailForecast={[{
                            cityId: 1,
                            data: []
                        }]}
                        allForecast={[{
                            cityId: 1,
                            data: []
                        }]}
                        typeForecast={typeForecast}
                        setSelect={setSelect}
                    />
                </Provider>
            </BrowserRouter>
        )
    })

    test('btnClose', () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Container
                        id={1}
                        provided={{}}
                        detailForecast={[{
                            cityId: 1,
                            data: []
                        }]}
                        allForecast={[{
                            cityId: 1,
                            data: []
                        }]}
                        typeForecast={typeForecast}
                        setSelect={setSelect}
                    />
                </Provider>
            </BrowserRouter>
        )
        const elm = screen.getByTestId('btnClose-id');
        fireEvent.click(elm)
    })

})