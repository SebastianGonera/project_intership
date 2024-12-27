import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import MyTable from '../MyTable';

describe('MyTable Component', () => {
    const mockOpenModal = jest.fn();
    const mockOpenUpdateForm = jest.fn();
    const testData = [
        ['Channel1', 100],
        ['Channel2', 200],
    ];

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders table with data', () => {
        render(<MyTable data={testData} openModal={mockOpenModal} openUpdateForm={mockOpenUpdateForm} />);

        expect(screen.getByText('Channel')).toBeInTheDocument();
        expect(screen.getByText('Amount')).toBeInTheDocument();

        expect(screen.getByText('Channel1')).toBeInTheDocument();
        expect(screen.getByText('100')).toBeInTheDocument();
        expect(screen.getByText('Channel2')).toBeInTheDocument();
        expect(screen.getByText('200')).toBeInTheDocument();
    });

    it('calls openUpdateForm when Update button is clicked', () => {
        render(<MyTable data={testData} openModal={mockOpenModal} openUpdateForm={mockOpenUpdateForm} />);

        const updateButtons = screen.getAllByText('Update');
        expect(updateButtons).toHaveLength(2);

        fireEvent.click(updateButtons[0]);

        expect(mockOpenUpdateForm).toHaveBeenCalledWith(100, 'Channel1');
        expect(mockOpenUpdateForm).toHaveBeenCalledTimes(1);
    });

    it('calls openModal when Delete button is clicked', () => {
        render(<MyTable data={testData} openModal={mockOpenModal} openUpdateForm={mockOpenUpdateForm} />);

        const deleteButtons = screen.getAllByText('Delete');
        expect(deleteButtons).toHaveLength(2);

        fireEvent.click(deleteButtons[0]);

        expect(mockOpenModal).toHaveBeenCalledWith('Channel1');
        expect(mockOpenModal).toHaveBeenCalledTimes(1);
    });

});
