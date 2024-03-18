import Address from "../../../@shared/domain/value-object/address.object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import FindClientUseCase from "./find-client.usecase";

const client = new Client({
    id: new Id("1"),
    name: "Client 1",
    email: "william.henry.harrison@example-pet-store.com",
    document: "123456789",
    address: new Address({
      street: "Address 1",
      number: "1",
      complement: "Complement 1",
      city: "City 1",
      state: "State 1",
      zipCode: "ZipCode 1",
    }),
});

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(client)),
    };
};

describe("Find Client Usecase unit test", () => {
    it("should find a client", async () => {
        const repository = MockRepository();
        const usecase = new FindClientUseCase(repository);

        const input = {
            id: "1",
        };

        const result = await usecase.execute(input);

        expect(repository.find).toHaveBeenCalled();
        expect(result.id).toEqual(input.id);
        expect(result.name).toEqual(client.name);
        expect(result.email).toEqual(client.email);
        expect(result.document).toBe(client.document);
        expect(result.street).toBe(client.address.street);
        expect(result.number).toBe(client.address.number);
        expect(result.complement).toBe(client.address.complement);
        expect(result.city).toBe(client.address.city);
        expect(result.state).toBe(client.address.state);
        expect(result.zipCode).toBe(client.address.zipCode);
    });
});