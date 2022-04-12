import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import MonthlyComponent, { Children } from '../MonthlyComponent';
import store from '../../../redux/store';

describe('MonthlyComponent', () => {
    test('should render MonthlyComponent', () => {
        render(
            <Provider store={store}>
                <MonthlyComponent ids={1} />
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