import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

import Select from '../Select';
import store from '../../../redux/store';

const setSelect = jest.fn();
const setIds = jest.fn();
const setOpenSelect = jest.fn();

const wrapper = (
    <Provider store={store}>
        <Select
            select={[1, 2, 3]}
            setSelect={setSelect}
            selectArr={[
                {
                    id: 1,
                    name: 'Ha Noi'
                },
                {
                    id: 2,
                    name: 'HCM'
                },
                {
                    id: 3,
                    name: 'Hue'
                },
                {
                    id: 4,
                    name: 'Da Nang'
                }
            ]}
            setIds={setIds}
            cityId={null}
            openSelect={false}
            setOpenSelect={setOpenSelect}
            isMonthly={false}
        />
    </Provider>
)

describe('Select', () => {
    test('should render', () => {
        render(wrapper)
    })

    test('should render input', () => {
        render(wrapper)
        const elm = screen.getByTestId('input-id');
        fireEvent.focus(elm)
        fireEvent.blur(elm)
    })

    test('should render arrow', () => {
        render(wrapper)
        const elm = screen.getByTestId('arrow-id');
        fireEvent.click(elm)
    })

    test('should isMonthly', () => {
        render(
            <Provider store={store}>
                <Select
                    select={[1, 2, 3]}
                    setSelect={setSelect}
                    selectArr={[
                        {
                            id: 1,
                            name: 'Ha Noi'
                        },
                        {
                            id: 2,
                            name: 'HCM'
                        },
                        {
                            id: 3,
                            name: 'Hue'
                        },
                        {
                            id: 4,
                            name: 'Da Nang'
                        }
                    ]}
                    setIds={setIds}
                    cityId={null}
                    openSelect={false}
                    setOpenSelect={setOpenSelect}
                    isMonthly={true}
                />
            </Provider>
        )
    })

    test('should render cityId', () => {
        render(<Provider store={store}>
            <Select
                select={[1, 2, 3]}
                setSelect={setSelect}
                selectArr={[
                    {
                        id: 1,
                        name: 'Ha Noi'
                    },
                    {
                        id: 2,
                        name: 'HCM'
                    },
                    {
                        id: 3,
                        name: 'Hue'
                    },
                    {
                        id: 4,
                        name: 'Da Nang'
                    }
                ]}
                setIds={setIds}
                cityId={1}
                openSelect={false}
                setOpenSelect={setOpenSelect}
                isMonthly={false}
            />
        </Provider>)
    })

    test('should  remove select', () => {
        render(<Provider store={store}>
            <Select
                select={[1]}
                setSelect={setSelect}
                selectArr={[
                    {
                        id: 1,
                        name: 'Ha Noi'
                    },
                    {
                        id: 2,
                        name: 'HCM'
                    }
                ]}
                setIds={setIds}
                openSelect={false}
                setOpenSelect={setOpenSelect}
                isMonthly={false}
            />
        </Provider>)
        const elm = screen.getByTestId('remove-id');
        fireEvent.click(elm)
    })

    test('should remove select isMonthly is true', () => {
        render(<Provider store={store}>
            <Select
                select={[1]}
                setSelect={setSelect}
                selectArr={[
                    {
                        id: 1,
                        name: 'Ha Noi'
                    },
                    {
                        id: 2,
                        name: 'HCM'
                    }
                ]}
                setIds={setIds}
                openSelect={false}
                setOpenSelect={setOpenSelect}
                isMonthly={true}
            />
        </Provider>)
        const elm = screen.getByTestId('remove-id');
        fireEvent.click(elm)
    })

    test('should select', () => {
        render(
            <Provider store={store}>
                <Select
                    select={[1]}
                    setSelect={setSelect}
                    selectArr={[
                        {
                            id: 1,
                            name: 'Ha Noi'
                        },
                        {
                            id: 2,
                            name: 'HCM'
                        },
                        {
                            id: 3,
                            name: 'Hue'
                        },
                        {
                            id: 4,
                            name: 'Da Nang'
                        }
                    ]}
                    setIds={setIds}
                    cityId={null}
                    openSelect={true}
                    setOpenSelect={setOpenSelect}
                    isMonthly={false}
                />
            </Provider>
        )
        const elm1 = screen.getByTestId('select-2');
        const elm2 = screen.getByTestId('select-3');
        const elm3 = screen.getByTestId('select-4');
        const input = screen.getByTestId('input-id');
        fireEvent.focus(input)
        fireEvent.click(elm1)
        fireEvent.click(elm2)
        fireEvent.click(elm3)
    })

    test('should select isMonthly is true', () => {
        render(
            <Provider store={store}>
                <Select
                    select={[1]}
                    setSelect={setSelect}
                    selectArr={[
                        {
                            id: 1,
                            name: 'Ha Noi'
                        },
                        {
                            id: 2,
                            name: 'HCM'
                        },
                        {
                            id: 3,
                            name: 'Hue'
                        },
                        {
                            id: 4,
                            name: 'Da Nang'
                        }
                    ]}
                    setIds={setIds}
                    cityId={null}
                    openSelect={true}
                    setOpenSelect={setOpenSelect}
                    isMonthly={true}
                />
            </Provider>
        )
        const elm1 = screen.getByTestId('select-2');
        const elm2 = screen.getByTestId('select-3');
        const elm3 = screen.getByTestId('select-4');
        const input = screen.getByTestId('input-id');
        fireEvent.focus(input)
        fireEvent.click(elm1)
        fireEvent.click(elm2)
        fireEvent.click(elm3)
    })

    test('3 select', () => {
        render(
            <Provider store={store}>
                <Select
                    select={[1, 2, 3]}
                    setSelect={setSelect}
                    selectArr={[
                        {
                            id: 1,
                            name: 'Ha Noi'
                        },
                        {
                            id: 2,
                            name: 'HCM'
                        },
                        {
                            id: 3,
                            name: 'Hue'
                        },
                        {
                            id: 4,
                            name: 'Da Nang'
                        }
                    ]}
                    setIds={setIds}
                    cityId={null}
                    openSelect={true}
                    setOpenSelect={setOpenSelect}
                    isMonthly={false}
                />
            </Provider>
        )
        const elm = screen.getByTestId('select-4');
        const input = screen.getByTestId('input-id');
        fireEvent.focus(input)
        fireEvent.click(elm)
    })

    test('list city length equal 0', () => {
        render(
            <Provider store={store}>
                <Select
                    select={[1]}
                    setSelect={setSelect}
                    selectArr={[]}
                    setIds={setIds}
                    cityId={null}
                    openSelect={true}
                    setOpenSelect={setOpenSelect}
                    isMonthly={false}
                />
            </Provider>
        )
    })
})

