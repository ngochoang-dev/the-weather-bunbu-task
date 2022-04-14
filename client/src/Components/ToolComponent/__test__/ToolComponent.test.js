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
                isDashboard={false}
            />
        </Provider>)
    })

    test('should render isDashboard', () => {
        render(<Provider store={store}>
            <ToolComponent
                setShowModal={setShowModal}
                selectId={[1]}
                setSelectId={setSelectId}
                setIds={setIds}
                showModal={false}
                isDashboard={true}
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
                isDashboard={false}
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
                isDashboard={false}
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
                isDashboard={false}
            />
        </Provider>)

        const elm = screen.queryByTestId('openModal-id');
        fireEvent.click(elm)
    })


    test('should click refresh', () => {
        render(<Provider store={store}>
            <ToolComponent
                setShowModal={setShowModal}
                selectId={[1, 2, 3]}
                setSelectId={setSelectId}
                setIds={setIds}
                showModal={false}
                isDashboard={false}
            />
        </Provider>)

        const elm = screen.queryByTestId('refresh-id');
        fireEvent.click(elm)
    })
})