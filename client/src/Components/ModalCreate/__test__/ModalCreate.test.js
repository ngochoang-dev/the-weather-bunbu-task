import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import store from '../../../redux/store';
import ModalCreate from '../ModalCreate';

afterEach(cleanup);

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
})

test('detail snapshot', () => {
    const tree = renderer.create(
        <Provider store={store}>
            <ModalCreate />
        </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
})
