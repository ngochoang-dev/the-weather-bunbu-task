import { render } from '@testing-library/react';
import LineChart from '../LineChart';


describe('linechart', () => {
    test('should render linechart', () => {
        render(<LineChart
            humidityArr={[10]}
            temperature={72}
            currentForecast={0}
            isCelsius={false}
        />)
    })

    test('should render isCelsius is true', () => {
        render(<LineChart
            humidityArr={[10]}
            temperature={72}
            currentForecast={0}
            isCelsius={true}
        />)
    })
})