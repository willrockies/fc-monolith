import { PlaceOrderInputDto } from './place-order.dto';
import PlaceOrderUseCase from "./place-order.usecase";

describe("PlaceOrderUseCase unit test ", () => {
    describe("Execute method", () => {


        it("should throw an error when client not found", async () => {
            const MockClientFacade = {
                find: jest.fn().mockResolvedValue(null),
            };

            //@ts-expect-error - no params in constructor
            const placeOrderUseCase = new PlaceOrderUseCase();
            //@ts-expect-error - force set clientFacade
            placeOrderUseCase["_clientFacade"] = MockClientFacade;

            const input: PlaceOrderInputDto = { clientId: "0", products: [] }

            await expect(placeOrderUseCase.execute(input)).rejects.toThrow("Client not found");
        });

        it("should throw an error when product are not valid", async () => {
            const MockClientFacade = {
                find: jest.fn().mockResolvedValue(true),
            };

            //@ts-expect-error - no params in constructor
            const placeOrderUseCase = new PlaceOrderUseCase();

            const mockValidateProducts = jest
                //@ts-expect-error - force
                .spyOn(placeOrderUseCase, "validateProducts")
                //@ts-expect-error - not return never
                .mockRejectedValue(new Error("No products selected"));

                 //@ts-expect-error - force set clientFacade
            placeOrderUseCase["_clientFacade"] = MockClientFacade;

            const input: PlaceOrderInputDto = { clientId: "1", products: [] }

            await expect(() => placeOrderUseCase.execute(input)).rejects.toThrow("No products selected");
            expect(mockValidateProducts).toHaveBeenCalledTimes(1);

        });
    });

});