import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '../../../redux/store';
import ModalCreate from '../ModalCreate';

afterEach(cleanup);

const setShowModal = jest.fn();

describe('ModalCreate', () => {
    test('input change', () => {
        render(
            <Provider store={store}>
                <ModalCreate />
            </Provider>
        )
        const element = screen.getByTestId('input-id')
        fireEvent.change(element, { target: { value: 'enter city name' } })
        expect(element.value).toBe('enter city name')
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
