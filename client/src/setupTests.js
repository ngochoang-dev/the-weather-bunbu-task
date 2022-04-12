import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

jest.mock('react-chartjs-2', () => ({
    Line: () => null,
    Bar: () => null
}));


Enzyme.configure({ adapter: new Adapter() });