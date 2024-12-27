import React from "react";
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import MyTable from "../MyTable";
import UpdateForm from "../UpdateForm";


describe("Integration Test for MyTable and UpdateForm", () => {
    test("should open the UpdateForm with correct data when Update button is clicked and submit changes", () => {
        const mockData = [
            ["Channel1", 10],
            ["Channel2", 20],
        ];
        const mockOpenModal = jest.fn();
        const mockOnUpdate = jest.fn();

        const Wrapper = () => {
            const [updateFormVisible, setUpdateFormVisible] = React.useState(false);
            const [currentChannel, setCurrentChannel] = React.useState({
                name: "",
                amount: 0,
            });

            const handleOpenUpdateForm = (newAmount: number, name: string) => {
                setCurrentChannel({ name, amount: newAmount });
                setUpdateFormVisible(true);
            };

            const handleCloseUpdateForm = () => {
                setUpdateFormVisible(false);
            };

            return (
                <>
                    <MyTable
                        data={mockData}
                        openModal={mockOpenModal}
                        openUpdateForm={handleOpenUpdateForm}
                    />
                    {updateFormVisible && (
                        <UpdateForm
                            name={currentChannel.name}
                            currentAmount={currentChannel.amount}
                            onUpdate={mockOnUpdate}
                            closeUpdateForm={handleCloseUpdateForm}
                        />
                    )}
                </>
            );
        };

        render(<Wrapper />);

        const updateButton = screen.getByLabelText("update-Channel1");
        fireEvent.click(updateButton);

        expect(screen.getByText("Update amount of Channel1")).toBeInTheDocument();
        const input = screen.getByPlaceholderText("Enter number");
        expect(input).toHaveValue('10');

        fireEvent.change(input, { target: { value: "15" } });
        expect(input).toHaveValue('15');
        fireEvent.click(screen.getByLabelText("confirmUpdate"));

        expect(mockOnUpdate).toHaveBeenCalledWith(15);

    });
});
