import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import ClientRepository from "./client.repository";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import Address from "../../@shared/domain/value-object/address.object";

describe("ClientRepository test", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        })

        sequelize.addModels([ClientModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should create a client", async () => {
        const client = new Client({
            id: new Id("1"),
            name: "Client 1",
            document: "123456789",
            email: "james.a.garfield@examplepetstore.com",
            address: new Address({
                street: "Address 1",
                number: "1",
                complement: "Complement 1",
                city: "City 1",
                state: "State 1",
                zipCode: "ZipCode 1",
            }),
        })
        const clientRepository = new ClientRepository();
        await clientRepository.add(client);

        const clientDb = await ClientModel.findOne({ where: { id: "1" } });

        expect(clientDb).toBeDefined();
        expect(clientDb.id).toBe(client.id.id);
        expect(clientDb.name).toBe(client.name);
        expect(clientDb.email).toBe(client.email);
        expect(clientDb.document).toBe(client.document);
        expect(clientDb.street).toBe(client.address.street);
        expect(clientDb.number).toBe(client.address.number);
        expect(clientDb.complement).toBe(client.address.complement);
        expect(clientDb.city).toBe(client.address.city);
        expect(clientDb.state).toBe(client.address.state);
        expect(clientDb.zipCode).toBe(client.address.zipCode);
    })
    it("should find a client", async () => {
        const client = new Client({
            id: new Id("1"),
            name: "Client 1",
            email: "x@x.com",
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
      
        
        const clientRepository = new ClientRepository();
        await clientRepository.add(client);
        const result = await clientRepository.find("1");

        expect(result.id.id).toEqual(client.id.id);
        expect(result.name).toEqual(client.name);
        expect(result.email).toEqual(client.email);

        expect(result.document).toBe(client.document);
        expect(result.address.street).toBe(client.address.street);
        expect(result.address.number).toBe(client.address.number);
        expect(result.address.complement).toBe(client.address.complement);
        expect(result.address.city).toBe(client.address.city);
        expect(result.address.state).toBe(client.address.state);
        expect(result.address.zipCode).toBe(client.address.zipCode);

    });
});