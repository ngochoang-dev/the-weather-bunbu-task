import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '../../../redux/store';
import ModalCreate from '../ModalCreate';

const setShowModal = jest.fn();

describe('ModalCreate', () => {
    test('input change', () => {
        render(
            <Provider store={store}>
                <ModalCreate
                    loading={true}
                    setShowModal={setShowModal}
                />
            </Provider>
        )
        const element = screen.getByTestId('input-id')
        fireEvent.change(element, { target: { value: 'enter city name' } })
        expect(element.value).toBe('enter city name')
    })

    test('input valid', () => {
        render(
            <Provider store={store}>
                <ModalCreate
                    loading={false}
                    setShowModal={setShowModal}
                />
            </Provider>
        )
        const element = screen.getByTestId('input-id')
        fireEvent.change(element, { target: { value: 'enter city name #' } })
        // expect(element.value).toBe('enter city name #')
    })

    test('fn button close', () => {
        render(
            <Provider store={store}>
                <ModalCreate
                    setShowModal={setShowModal}
                />
            </Provider>
        )
        const element = screen.getByTestId('btnClose-id');
        fireEvent.click(element);
    })
})
