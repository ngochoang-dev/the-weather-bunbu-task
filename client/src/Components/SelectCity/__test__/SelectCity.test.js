import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from 'react-redux';

import SelectCity from "../SelectCity";
import store from "../../../redux/store";

const setSelect = jest.fn();
const setIds = jest.fn();

const wrapper = (
    <Provider store={store}>
        <SelectCity
            select={[1]}
            setSelect={setSelect}
            selectArr={[
                { id: 1, name: 'Hà Nội' },
                { id: 2, name: '"Sài Gòn"' }
            ]}
            setIds={setIds}
        />
    </Provider>
)

describe('SelectCity', () => {
    test('should render', () => {
        render(wrapper)
    })
    test('should  selectArr length 0', () => {
        render(<SelectCity
            select={[1]}
            setSelect={setSelect}
            selectArr={[]}
            setIds={setIds}
        />)
    })

    test('should  select length 3', () => {
        render(<SelectCity
            select={[1, 2, 3]}
            setSelect={setSelect}
            selectArr={[]}
            setIds={setIds}
        />)
    })

    test('should not have all city name', () => {
        render(<SelectCity
            select={[3]}
            setSelect={setSelect}
            selectArr={[
                { id: 1, name: 'Hà Nội' },
            ]}
            setIds={setIds}
        />)
    })

    test('should chose city', () => {
        render(wrapper)
        const elm = screen.getByText('Choose City')
        fireEvent.click(elm)
    })

    test('should remove city', () => {
        render(wrapper)
        const elm0 = screen.getByTestId('removeCity-0')
        fireEvent.click(elm0)
    })
})