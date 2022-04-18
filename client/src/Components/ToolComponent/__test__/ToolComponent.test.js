import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import dayjs from 'dayjs';

import ToolComponent from '../ToolComponent';
import store from '../../../redux/store';

const setShowModal = jest.fn();
const setSelectId = jest.fn();
const setIds = jest.fn();
const setArrSelectShow = jest.fn();

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);


describe('ToolComponent', () => {
    test('should render', () => {
        render(<Provider store={store}>
            <ToolComponent
                isRadar={false}
                isMobile={true}
                setShowModal={setShowModal}
                selectId={[1]}
                setSelectId={setSelectId}
                setIds={setIds}
                showModal={false}
                isDashboard={false}
                allCity={[{ id: 1, name: 'Hà Nội' }]}
                cityId={null}
                loading={false}
                allForecast={[{
                    cityId: 1,
                    data: [{
                        cityId: "1",
                        cityName: "Hà Nội",
                        cloudCover: "73",
                        date: "2022/4/07",
                        description: "Clear sky",
                        temperature: "38"
                    },
                    {
                        cityId: "2",
                        cityName: "Da Nang",
                        cloudCover: "73",
                        date: "2022/4/07",
                        description: "Clear sky",
                        temperature: "38"
                    }]
                }]}
                arrSelectShow={[1]}
                setArrSelectShow={setArrSelectShow}
            />
        </Provider>)
    })

    test('should render isDashboard', () => {
        render(<Provider store={store}>
            <ToolComponent
                isRadar={false}
                setShowModal={setShowModal}
                selectId={[1]}
                setSelectId={setSelectId}
                setIds={setIds}
                showModal={false}
                isDashboard={true}
                allCity={[{ id: 1, name: 'Hà Nội' }]}
                cityId={null}
                loading={false}
                allForecast={[{
                    cityId: 1,
                    data: [{
                        cityId: "1",
                        cityName: "Hà Nội",
                        cloudCover: "73",
                        date: "2022/4/07",
                        description: "Clear sky",
                        temperature: "38"
                    },
                    {
                        cityId: "2",
                        cityName: "Da Nang",
                        cloudCover: "73",
                        date: "2022/4/07",
                        description: "Clear sky",
                        temperature: "38"
                    }]
                }]}
                arrSelectShow={[1]}
                setArrSelectShow={setArrSelectShow}
            />
        </Provider>)
    })

    test('should selectId length 3', () => {
        render(<Provider store={store}>
            <ToolComponent
                isRadar={false}
                setShowModal={setShowModal}
                selectId={[1, 2, 3]}
                setSelectId={setSelectId}
                setIds={setIds}
                showModal={false}
                isDashboard={false}
                allCity={[{ id: 1, name: 'Hà Nội' }]}
                cityId={null}
                loading={false}
                allForecast={[{
                    cityId: 1,
                    data: [{
                        cityId: "1",
                        cityName: "Hà Nội",
                        cloudCover: "73",
                        date: "2022/4/07",
                        description: "Clear sky",
                        temperature: "38"
                    },
                    {
                        cityId: "2",
                        cityName: "Da Nang",
                        cloudCover: "73",
                        date: "2022/4/07",
                        description: "Clear sky",
                        temperature: "38"
                    }]
                }]}
                arrSelectShow={[1]}
                setArrSelectShow={setArrSelectShow}
            />
        </Provider>)
    })

    test('should showModal true', () => {
        render(<Provider store={store}>
            <ToolComponent
                isRadar={false}
                setShowModal={setShowModal}
                selectId={[1, 2, 3]}
                setSelectId={setSelectId}
                setIds={setIds}
                showModal={true}
                isDashboard={false}
                allCity={[{ id: 1, name: 'Hà Nội' }]}
                cityId={null}
                loading={false}
                allForecast={[{
                    cityId: 1,
                    data: [{
                        cityId: "1",
                        cityName: "Hà Nội",
                        cloudCover: "73",
                        date: "2022/4/07",
                        description: "Clear sky",
                        temperature: "38"
                    },
                    {
                        cityId: "2",
                        cityName: "Da Nang",
                        cloudCover: "73",
                        date: "2022/4/07",
                        description: "Clear sky",
                        temperature: "38"
                    }]
                }]}
                arrSelectShow={[1]}
                setArrSelectShow={setArrSelectShow}
            />
        </Provider>)
    })

    test('should click modal', () => {
        render(<Provider store={store}>
            <ToolComponent
                isRadar={false}
                setShowModal={setShowModal}
                selectId={[1, 2, 3]}
                setSelectId={setSelectId}
                setIds={setIds}
                showModal={false}
                isDashboard={false}
                allCity={[{ id: 1, name: 'Hà Nội' }]}
                cityId={null}
                loading={false}
                allForecast={[{
                    cityId: 1,
                    data: [{
                        cityId: "1",
                        cityName: "Hà Nội",
                        cloudCover: "73",
                        date: "2022/4/07",
                        description: "Clear sky",
                        temperature: "38"
                    },
                    {
                        cityId: "2",
                        cityName: "Da Nang",
                        cloudCover: "73",
                        date: "2022/4/07",
                        description: "Clear sky",
                        temperature: "38"
                    }]
                }]}
                arrSelectShow={[1]}
                setArrSelectShow={setArrSelectShow}
            />
        </Provider>)

        const elm = screen.queryByTestId('openModal-id');
        fireEvent.click(elm)
    })


    test('should click refresh', () => {
        render(<Provider store={store}>
            <ToolComponent
                isRadar={false}
                setShowModal={setShowModal}
                selectId={[1, 2, 3]}
                setSelectId={setSelectId}
                setIds={setIds}
                showModal={false}
                isDashboard={false}
                allCity={[{ id: 1, name: 'Hà Nội' }]}
                cityId={null}
                loading={false}
                allForecast={[{
                    cityId: 1,
                    data: [{
                        cityId: "1",
                        cityName: "Hà Nội",
                        cloudCover: "73",
                        date: "2022/4/07",
                        description: "Clear sky",
                        temperature: "38"
                    },
                    {
                        cityId: "2",
                        cityName: "Da Nang",
                        cloudCover: "73",
                        date: dayjs(tomorrow).format('YYYY/M/DD'),
                        description: "Rain",
                        temperature: "38"
                    }]
                }]}
                arrSelectShow={[1]}
                setArrSelectShow={setArrSelectShow}
            />
        </Provider>)

        const elm = screen.queryByTestId('refresh-id');
        fireEvent.click(elm)
    })
})