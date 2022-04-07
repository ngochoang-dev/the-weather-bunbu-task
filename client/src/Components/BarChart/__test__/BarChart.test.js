import { render, screen, } from '@testing-library/react';
import BarChart from '../BarChart';


jest.mock('react-chartjs-2', () => ({
    Bar: () => null
}));

describe('barchart', () => {
    test('should render barchart', () => {
        render(<BarChart />)
    })
})