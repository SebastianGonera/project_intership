import { addChannel } from "../services";
import utils from "../utils";


jest.mock("../utils", () => ({
    post: jest.fn(),
}));

const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

describe("addChannel function", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should call the API successfully", async () => {
        const mockResponse = {
            status: 200,
            data: {
                message: "Channel added successfully",
            },
        };

        (utils.post as jest.Mock).mockResolvedValue(mockResponse);

        const name = "TestChannel";
        const amount = 100;

        await addChannel(name, amount);

        expect(utils.post).toHaveBeenCalledWith("/acquisition-channels", {
            name: name,
            amount: amount,
        });

        expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it("should log an error to console when the API call fails", async () => {
        const mockError = new Error("Network Error");
        (utils.post as jest.Mock).mockRejectedValue(mockError);

        const name = "TestChannel";
        const amount = 100;

        await addChannel(name, amount);

        expect(utils.post).toHaveBeenCalledWith("/acquisition-channels", {
            name: name,
            amount: amount,
        });

        expect(consoleErrorSpy).toHaveBeenCalledWith(mockError.message);
    });

});
