import { render, screen, fireEvent } from '@testing-library/react';
import { WiCloudy, WiDaySunny } from 'react-icons/wi';

import Detail from '../Detail';

const typeForecast = [
    {
        description: 'Cloudy',
        icon: <WiCloudy />
    },
    {
        description: 'Clear sky',
        icon: <WiDaySunny />
    }
];


const setIndexColumn = jest.fn();

describe('detail', () => {
    test('should render detail', () => {
        render(<Detail
            temperature={71}
            humidity={30}
            windSpeed={33}
            description={'Rain'}
            uv={3}
            date={'2022/12/2'}
            cloudCover={80}
            typeForecast={typeForecast}
            rain={80}
            setIndexColumn={setIndexColumn}
        />)
    })

    test('should remove', () => {
        render(<Detail
            temperature={71}
            humidity={30}
            windSpeed={33}
            description={'Rain'}
            uv={3}
            date={'2022/12/2'}
            cloudCover={80}
            typeForecast={typeForecast}
            rain={80}
            setIndexColumn={setIndexColumn}
        />)
        const elm = screen.getByTestId('remove-id');
        fireEvent.click(elm)
    })
})