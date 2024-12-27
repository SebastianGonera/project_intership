import React from "react";
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import DeleteModalDialog from "../DeleteModalDialog";

describe("DeleteModalDialog Component", () => {
    it("should render the modal and handle delete and close actions correctly", () => {
        const mockCloseModal = jest.fn();
        const mockHandleDelete = jest.fn();
        const channelName = "TestChannel";

        render(
            <DeleteModalDialog
                name={channelName}
                closeModal={mockCloseModal}
                handleDelete={mockHandleDelete}
            />
        );

        expect(screen.getByText("Deleting")).toBeInTheDocument();
        expect(
            screen.getByText(`If you want delete ${channelName} channel press OK button.`)
        ).toBeInTheDocument();

        const okButton = screen.getByText("OK");
        fireEvent.click(okButton);
        expect(mockHandleDelete).toHaveBeenCalledWith(channelName);

        const closeButton = screen.getByRole("button", { name: /close/i });
        fireEvent.click(closeButton);
        expect(mockCloseModal).toHaveBeenCalled();
    });
});
