import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from 'react-redux';

import ModalSelect from "../ModalSelect";
import store from '../../../redux/store';

const setIds = jest.fn();
const setSelect = jest.fn();
const setShowModal = jest.fn();

const wrapper = (<Provider store={store}>
    <ModalSelect
        selectArr={[
            { id: 1, name: 'Hà Nội' },
            { id: 2, name: 'Sài Gòn' },
            { id: 3, name: 'Phú Quốc' },
            { id: 4, name: 'Hải Phòng' }
        ]}
        select={[1]}
        setShowModal={setShowModal}
        setSelect={setSelect}
        setIds={setIds}
    />
</Provider>)

describe("ModalSelect", () => {
    test("should select and show toast", () => {
        render(wrapper)
        const elm1 = screen.getByTestId('cityName-1');
        fireEvent.click(elm1);
        const elm2 = screen.getByTestId('cityName-2');
        fireEvent.click(elm2);
        const elm3 = screen.getByTestId('cityName-3');
        fireEvent.click(elm3);
        const elm4 = screen.getByTestId('cityName-4');
        fireEvent.click(elm4);
    })
    test("should select and delete", () => {
        render(wrapper)
        const elm1 = screen.getByTestId('delete-1');
        fireEvent.click(elm1);
        const elm2 = screen.getByTestId('delete-2');
        fireEvent.click(elm2);
        const elm3 = screen.getByTestId('delete-3');
        fireEvent.click(elm3);
        const elm4 = screen.getByTestId('delete-4');
        fireEvent.click(elm4);
    })

    test("should submit select", () => {
        render(wrapper)
        const elm = screen.getByText('Save');
        fireEvent.click(elm);
    })

    test("should open modal delete", () => {
        render(wrapper)
        const elm = screen.getByTestId('showModal-id');
        fireEvent.click(elm);
    })

    test("should cancel delete", () => {
        render(wrapper)
        const elm1 = screen.getByTestId('delete-1');
        fireEvent.click(elm1);
        const elm5 = screen.getByTestId('cancel-id');
        fireEvent.click(elm5);
    })

    test("should submit delete", () => {
        render(wrapper)
        const elm1 = screen.getByTestId('delete-1');
        fireEvent.click(elm1);
        const elm2 = screen.getByText('Confirm');
        fireEvent.click(elm2);
    })

})