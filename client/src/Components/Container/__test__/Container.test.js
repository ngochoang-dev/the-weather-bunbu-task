import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';

import { typeForecast } from '../../../contants';
import store from '../../../redux/store';
import Container from '../Container';

const setSelect = jest.fn();
const setDay = jest.fn();
const setArrSelectShow = jest.fn();

describe('container component', () => {
    test('should render', () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Container
                        isMobile={true}
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
                        day={'2022/12/2'}
                        setDay={setDay}
                        selectId={[1]}
                        arrSelectShow={[1]}
                        setArrSelectShow={setArrSelectShow}
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
                        selectId={[1]}
                        arrSelectShow={[1]}
                        setArrSelectShow={setArrSelectShow}
                    />
                </Provider>
            </BrowserRouter>
        )
        const elm = screen.getByTestId('btnClose-id');
        fireEvent.click(elm)
    })
})