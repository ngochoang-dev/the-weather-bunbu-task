import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '../../../redux/store';
import Dashboard from '../Dashboard';

const setSelectId = jest.fn();
const setShowModalDelete = jest.fn();

describe('Dashboard', () => {
    test('should render', () => {
        render(
            <Provider store={store}>
                <Dashboard
                    selectId={[1]}
                    setSelectId={setSelectId}
                    allCity={[
                        { id: 1, name: 'Ha Noi' },
                        { id: 2, name: 'Phu Tho' }
                    ]}
                    isDeleted={true}
                    showModalDelete={false}
                    setShowModalDelete={setShowModalDelete}
                />
            </Provider>)
    })


    test('should allCity length equal 0', () => {
        render(
            <Provider store={store}>
                <Dashboard
                    selectId={[1]}
                    setSelectId={setSelectId}
                    allCity={[]}
                    isDeleted={true}
                    showModalDelete={false}
                    setShowModalDelete={setShowModalDelete}
                />
            </Provider>)
    })

    test('should click delete', () => {
        render(
            <Provider store={store}>
                <Dashboard
                    selectId={[1]}
                    setSelectId={setSelectId}
                    allCity={[
                        { id: 1, name: 'Ha Noi' },
                        { id: 2, name: 'Phu Tho' }
                    ]}
                    isDeleted={true}
                    showModalDelete={false}
                    setShowModalDelete={setShowModalDelete}
                />
            </Provider>)
        const elm1 = screen.getByTestId("delete-1")
        const elm2 = screen.getByTestId("delete-1")
        fireEvent.click(elm1)
        fireEvent.click(elm2)
    })

    test('should click cancel', () => {
        render(
            <Provider store={store}>
                <Dashboard
                    selectId={[1]}
                    setSelectId={setSelectId}
                    allCity={[
                        { id: 1, name: 'Ha Noi' },
                        { id: 2, name: 'Phu Tho' }
                    ]}
                    isDeleted={true}
                    showModalDelete={true}
                    setShowModalDelete={setShowModalDelete}
                />
            </Provider>)
        const elm1 = screen.getByTestId("delete-1")
        fireEvent.click(elm1)
        const elm2 = screen.getByTestId("cancel-id")
        fireEvent.click(elm2)
    })

    test('should click confirm delete', () => {
        render(
            <Provider store={store}>
                <Dashboard
                    selectId={[1]}
                    setSelectId={setSelectId}
                    allCity={[
                        { id: 1, name: 'Ha Noi' },
                        { id: 2, name: 'Phu Tho' }
                    ]}
                    isDeleted={true}
                    showModalDelete={true}
                    setShowModalDelete={setShowModalDelete}
                />
            </Provider>)
        const elm1 = screen.getByTestId("delete-1")
        fireEvent.click(elm1)
        const elm2 = screen.getByTestId("confirm-id")
        fireEvent.click(elm2)
    })

})
