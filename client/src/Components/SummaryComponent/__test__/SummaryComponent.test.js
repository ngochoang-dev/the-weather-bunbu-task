import { render, screen, fireEvent } from '@testing-library/react';
import dayjs from 'dayjs';

import SummaryComponent from '../SummaryComponent';


describe('SummaryChildren', () => {
    test('should render date is today', () => {
        render(<SummaryComponent
            temperature={1}
            humidity={1}
            windSpeed={1}
            description={1}
            hour={1}
            uv={1}
            date={dayjs().format('MMM DD')}
            cloudCover={1}
            isMultiDay={false}
            rain={1}
        />)
    })

    test('should render', () => {
        render(<SummaryComponent
            temperature={1}
            humidity={1}
            windSpeed={1}
            description={1}
            hour={1}
            uv={1}
            date={dayjs().format('MMM DD')}
            cloudCover={1}
            isMultiDay={false}
            rain={1}
        />)
        const elm = screen.getByTestId('wrapper-id');
        fireEvent.click(elm);
    })

    test('should render details', () => {
        render(<SummaryComponent
            temperature={1}
            humidity={1}
            windSpeed={1}
            description={1}
            hour={1}
            uv={1}
            date={dayjs().format('MMM DD')}
            cloudCover={1}
            isMultiDay={1}
            rain={1}
        />)
        const elm = screen.getByTestId('wrapper-id');
        fireEvent.click(elm);
    })
})