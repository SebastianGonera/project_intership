import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddChannelForm from '../AddChannelForm';

describe('AddChannelForm', () => {
    const mockOnAdd = jest.fn();
    const mockCloseAddForm = jest.fn();

    beforeEach(() => {
        render(<AddChannelForm onAdd={mockOnAdd} closeAddForm={mockCloseAddForm} />);
    });

    test('should render the form with input fields', () => {
        expect(screen.getByLabelText(/Channel name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Amount value/i)).toBeInTheDocument();
    });

    test('should show error message when name is less than 4 characters', async () => {
        fireEvent.change(screen.getByLabelText(/Channel name/i), { target: { value: 'abc' } });
        await waitFor(() => expect(screen.getByText(/Channel name must be at least 4 characters long/i))
            .toBeInTheDocument());
    });

    test('should show error message when amount is not a valid number', async () => {
        fireEvent.change(screen.getByLabelText(/Amount value/i), { target: { value: 'abc' } });
        await waitFor(() => expect(screen.getByText(/Please enter a valid number/i)).toBeInTheDocument());
    });

    test('should call onAdd with correct data when form is submitted', async () => {
        fireEvent.change(screen.getByLabelText(/Channel name/i), { target: { value: 'New Channel' } });
        fireEvent.change(screen.getByLabelText(/Amount value/i), { target: { value: '10' } });
        fireEvent.click(screen.getByRole('button', { name: /Confirm/i }));

        await waitFor(() => expect(mockOnAdd).toHaveBeenCalledWith('New Channel', 10));
    });

    test('should disable the submit button when form is invalid', async () => {
        fireEvent.change(screen.getByLabelText(/Channel name/i), { target: { value: '' } });
        fireEvent.change(screen.getByLabelText(/Amount value/i), { target: { value: '' } });

        expect(screen.getByRole('button', { name: /Confirm/i })).toBeDisabled();
    });

    test('should close the form when close button is clicked', () => {
        fireEvent.click(screen.getByLabelText(/close/i));

        expect(mockCloseAddForm).toHaveBeenCalled();
    });

});
