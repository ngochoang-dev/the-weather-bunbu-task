import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import MonthlyComponent, { Children } from '../MonthlyComponent';
import store from '../../../redux/store';

describe('MonthlyComponent', () => {
    test('should render MonthlyComponent', () => {
        render(
            <Provider store={store}>
                <MonthlyComponent ids={1}
                    monthlyData={[
                        {
                            cityId: 1,
                            cityName: "Hà Nội",
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
                        }
                    ]}
                />
            </Provider>
        )
    })

    test('should render Children', () => {
        render(
            <Children
                cityName={'Hà Nội'}
                data={[]}
            />
        )
    })

})