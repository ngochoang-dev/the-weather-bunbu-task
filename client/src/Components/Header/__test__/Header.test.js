import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Header from '../Header';


describe('Header', () => {
    test('should render', () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        )
    })
})