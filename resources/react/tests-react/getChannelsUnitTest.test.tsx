import { getChannels } from '../services';
import utils from '../utils';
import {toast} from 'react-toastify';

jest.mock('../utils');
jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn()
    }
}));

describe('getChannels', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return channels when response status is 200', async () => {
        const mockData = [{name: 'Channel 1', amount: 10}, {name: 'Channel 2', amount: 20}];
        (utils.get as jest.Mock).mockResolvedValue({status: 200, data: mockData});

        const result = await getChannels();

        expect(result).toEqual([['Channel 1', 10], ['Channel 2', 20]]);
    });

    it('should return an empty array and show toast error when response status is not 200', async () => {
        (utils.get as jest.Mock).mockResolvedValue({status: 404, data: {message: 'Not found'}});

        const result = await getChannels();

        expect(result).toEqual([]);
        expect(toast.error).toHaveBeenCalledWith('Not found');
    });

    it('should return an empty array and log error when there is an exception', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        (utils.get as jest.Mock).mockRejectedValue(new Error('Network Error'));

        const result = await getChannels();

        expect(result).toEqual([]);
        expect(consoleSpy).toHaveBeenCalledWith('Network Error');
        expect(toast.error).toHaveBeenCalledWith('Network Error');
    });
});
