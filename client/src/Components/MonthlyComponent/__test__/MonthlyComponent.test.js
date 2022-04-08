import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

import MonthlyComponent from '../MonthlyComponent';
import store from '../../../redux/store';

describe('MonthlyComponent', () => {
    test('should render', () => {
        render(
            <Provider store={store}>
                <MonthlyComponent ids={1} />
            </Provider>
        )

    })
})