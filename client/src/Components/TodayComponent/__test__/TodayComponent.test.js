import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import TodayComponent from '../TodayComponent';
import store from '../../../redux/store';

const setSelectId = jest.fn();

describe('TodayComponent', () => {
    test('should render', () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <TodayComponent
                        selectId={[1]}
                        setSelectId={setSelectId}
                    />
                </Provider>
            </BrowserRouter>
        )
    })

    test('should render drag', () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <TodayComponent
                        selectId={[1]}
                        setSelectId={setSelectId}
                    />
                </Provider>
            </BrowserRouter>
        )


    })
})