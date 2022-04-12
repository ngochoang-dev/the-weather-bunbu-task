import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

import ToolComponent from '../ToolComponent';
import store from '../../../redux/store';

const setShowModal = jest.fn();
const setSelectId = jest.fn();
const setIds = jest.fn();


describe('ToolComponent', () => {
    test('should render', () => {
        render(<Provider store={store}>
            <ToolComponent
                setShowModal={setShowModal}
                selectId={[1]}
                setSelectId={setSelectId}
                setIds={setIds}
                showModal={false}
            />
        </Provider>)
    })

    test('should selectId length 3', () => {
        render(<Provider store={store}>
            <ToolComponent
                setShowModal={setShowModal}
                selectId={[1, 2, 3]}
                setSelectId={setSelectId}
                setIds={setIds}
                showModal={false}
            />
        </Provider>)
    })

    test('should showModal true', () => {
        render(<Provider store={store}>
            <ToolComponent
                setShowModal={setShowModal}
                selectId={[1, 2, 3]}
                setSelectId={setSelectId}
                setIds={setIds}
                showModal={true}
            />
        </Provider>)
    })

    test('should click modal', () => {
        render(<Provider store={store}>
            <ToolComponent
                setShowModal={setShowModal}
                selectId={[1, 2, 3]}
                setSelectId={setSelectId}
                setIds={setIds}
                showModal={false}
            />
        </Provider>)

        const elm = screen.queryByTestId('openModal-id');
        fireEvent.click(elm)
    })
})