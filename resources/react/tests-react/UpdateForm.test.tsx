import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent} from '@testing-library/react';
import UpdateForm from '../UpdateForm';
describe('UpdateForm', () => {
    const mockOnUpdate = jest.fn();
    const mockCloseUpdateForm = jest.fn();

    beforeEach(() => {
        render(
            <UpdateForm
                name="Channel A"
                currentAmount={10}
                onUpdate={mockOnUpdate}
                closeUpdateForm={mockCloseUpdateForm}
            />
        );
    });

    test('should render with the initial value of currentAmount', () => {
        const input = screen.getByPlaceholderText('Enter number');
        expect(input).toHaveValue('10');
    });

    test('should display error message for invalid input', () => {
        const input = screen.getByPlaceholderText('Enter number');
        fireEvent.change(input, { target: { value: 'invalid' } });

        const errorMessage = screen.getByText('Please enter a valid number');
        expect(errorMessage).toBeInTheDocument();
    });

    test('should display error message for empty input', () => {
        const input = screen.getByPlaceholderText('Enter number');
        fireEvent.change(input, { target: { value: '' } });

        const errorMessage = screen.getByText('It can not be empty. Please enter number.');
        expect(errorMessage).toBeInTheDocument();
    });

    test('should allow updating value if input is valid', () => {
        const input = screen.getByPlaceholderText('Enter number');
        fireEvent.change(input, { target: { value: '20' } });

        const updateButton = screen.getByRole('button', { name: /update/i });
        expect(updateButton).not.toBeDisabled();
    });

    test('should call onUpdate when form is submitted with valid input', () => {
        const input = screen.getByPlaceholderText('Enter number');
        fireEvent.change(input, { target: { value: '20' } });

        const submitButton = screen.getByRole('button', { name: /update/i });
        fireEvent.click(submitButton);

        expect(mockOnUpdate).toHaveBeenCalledWith(20);
    });

    test('should call closeUpdateForm when close button is clicked', () => {
        const closeButton = screen.getByLabelText(/close/i);
        fireEvent.click(closeButton);

        expect(mockCloseUpdateForm).toHaveBeenCalled();
    });

    test('should disable the "Update" button if there is an error', () => {
        const input = screen.getByPlaceholderText('Enter number');
        fireEvent.change(input, { target: { value: '-5' } });

        const updateButton = screen.getByRole('button', { name: /update/i });
        expect(updateButton).toBeDisabled();
    });
});
