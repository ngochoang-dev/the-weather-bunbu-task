import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '../../../redux/store';
import Dashboard from '../Dashboard';

const setSelectId = jest.fn();

describe('Dashboard', () => {
    test('should render', () => {
        render(
            <Provider store={store}>
                <Dashboard
                    setSelectId={setSelectId}
                    allCity={[
                        { id: 1, name: 'Ha Noi' },
                        { id: 2, name: 'Phu Tho' }
                    ]}
                    isDeleted={true}
                />
            </Provider>)
    })


    test('should allCity length equal 0', () => {
        render(
            <Provider store={store}>
                <Dashboard
                    setSelectId={setSelectId}
                    allCity={[]}
                    isDeleted={true}
                />
            </Provider>)
    })

    test('should click delete', () => {
        render(
            <Provider store={store}>
                <Dashboard
                    setSelectId={setSelectId}
                    allCity={[
                        { id: 1, name: 'Ha Noi' },
                        { id: 2, name: 'Phu Tho' }
                    ]}
                    isDeleted={true}
                />
            </Provider>)
    })

    const elm1 = screen.getByTestId("delete-1")
    const elm2 = screen.getByTestId("delete-2")
    fireEvent.click(elm1)
    fireEvent.click(elm2)


})
