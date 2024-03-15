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
            //@ts-expected-error - force set clientFacade
            placeOrderUseCase["_clientFacade"] = MockClientFacade;

            const input : PlaceOrderInputDto = { clientId: "0", products: [] }

            await expect(placeOrderUseCase.execute(input)).rejects.toThrow("Client not found");
        });
    })

});