import { render, screen, fireEvent } from '@testing-library/react';

import Radar from '../Radar';


describe('Radar', () => {
    test('should render', () => {
        render(
            <Radar />
        )
    })

    test('should click', () => {
        render(
            <Radar />
        )
        const elm1 = screen.getByTestId('btnMenu-1');
        const elm2 = screen.getByTestId('btnMenu-2');
        fireEvent.click(elm1);
        fireEvent.click(elm2);
    })
})