import { string } from 'yup';
import { PlaceOrderInputDto } from './place-order.dto';
import PlaceOrderUseCase from "./place-order.usecase";

describe("PlaceOrderUseCase unit test ", () => {

    describe("validate products methods ", () => {
        //@ts-expect-error - no params in constructor
        const placeOrderUseCase = new PlaceOrderUseCase();

        it("should throw an error if products are selected", async () => {

            const input: PlaceOrderInputDto = { clientId: "0", products: [] }

            await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(new Error("No products selected"));

        });

        it("should throw an error when product is out of stock", async () => {

            const mockProductFacade = {
                checkStock: jest.fn(({ productId }: { productId: string }) =>
                    Promise.resolve({
                        productId,
                        stock: productId === "1" ? 0 : 10,
                    }),
                ),
            };

            //@ts-expect-error - force set clientFacade
            placeOrderUseCase["_clientFacade"] = mockProductFacade;

            let input: PlaceOrderInputDto = {
                clientId: "0",
                products: [{ productId: "1" }],
            };

            await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(new Error("Product 1 is not available in stock"));


            input = {
                clientId: "0",
                products: [{ productId: "0" }, { productId: "1" }],
            };

            await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(new Error("Product 1 is not available in stock"));
            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(3);

            
            input = {
                clientId: "0",
                products: [{ productId: "0" }, { productId: "1" }, { productId: "2" }],
            };

            await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(new Error("Product 1 is not available in stock"));
            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(5);

        });

    });


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