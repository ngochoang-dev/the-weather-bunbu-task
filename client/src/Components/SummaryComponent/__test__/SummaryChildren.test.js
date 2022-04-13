import { render, } from '@testing-library/react';
import dayjs from 'dayjs';

import SummaryChildren from '../SummaryChildren';


describe('SummaryChildren', () => {
    test('should render', () => {
        render(<SummaryChildren
            date={dayjs().format('MMM DD')}
            isMultiDay={1}
            hour={1}
            temperature={1}
            description={1}
            humidity={1}
            windSpeed={1}
        />)
    })
})