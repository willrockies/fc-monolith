import { Sequelize } from "sequelize-typescript"
import { ClientModel } from "../repository/client.model";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import ClientRepository from "../repository/client.repository";
import Id from "../../@shared/domain/value-object/id.value-object";
import ClientAdmFacade from "./client-adm.facade";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";

describe("", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a client", async () => {
        const repository = new ClientRepository();
        const addUsecase = new AddClientUseCase(repository);

        const facade = new ClientAdmFacade({
            addUsecase: addUsecase,
            findUsecase: undefined
        });

        const input = {
            id: "1",
            name: "Client 1",
            email: "john.c.calhoun@examplepetstore.com",
            document: "123456789",
            street: "Address 1",
            number: "1",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "ZipCode 1",
        }
        await facade.add(input);

        const client = await ClientModel.findOne({ where: { id: "1" } });

        expect(client).toBeDefined();
        //console.log(client);
        //expect(client.id).toBe(input.id);
        expect(client.name).toBe(input.name);
        expect(client.email).toBe(input.email);
        expect(client!.document).toBe(input.document);
        expect(client!.street).toBe(input.street);
        expect(client!.number).toBe(input.number);
        expect(client!.complement).toBe(input.complement);
        expect(client!.city).toBe(input.city);
        expect(client!.state).toBe(input.state);
        expect(client!.zipCode).toBe(input.zipCode);
    });


    it("should find a client", async () => {
        const repository = new ClientRepository();
        const findUsecase = new FindClientUseCase(repository);
        const addUsecase = new AddClientUseCase(repository)
        const facade = new ClientAdmFacade({
            addUsecase: addUsecase,
            findUsecase: findUsecase,
        });

        const input = {
            id: "1",
            name: "Client 1",
            email: "james.wilson@example-pet-store.com",
            document: "123456789",
            street: "Address 1",
            number: "1",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "ZipCode 1",
        };

        await facade.add(input);
        const client = await facade.find({ id: "1" });

        expect(client).toBeDefined();
        expect(client!.name).toBe(input.name);
        expect(client!.email).toBe(input.email);
        expect(client!.document).toBe(input.document);
        expect(client!.street).toBe(input.street);
        expect(client!.number).toBe(input.number);
        expect(client!.complement).toBe(input.complement);
        expect(client!.city).toBe(input.city);
        expect(client!.state).toBe(input.state);
        expect(client!.zipCode).toBe(input.zipCode);
    });

    it("should find a client using factory", async () => {
        const facade = ClientAdmFacadeFactory.create();
        const input = {
            id: "1",
            name: "Client 1",
            email: "x@x.com",
            document: "123456789",
            street: "Address 1",
            number: "1",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "ZipCode 1",
        };

        await facade.add(input);


        const client = await facade.find({ id: "1" });

        expect(client).toBeDefined();
        expect(client!.id).toBe(input.id);
        expect(client!.name).toBe(input.name);
        expect(client!.email).toBe(input.email);
        expect(client!.document).toBe(input.document);
        expect(client!.street).toBe(input.street);
        expect(client!.number).toBe(input.number);
        expect(client!.complement).toBe(input.complement);
        expect(client!.city).toBe(input.city);
        expect(client!.state).toBe(input.state);
        expect(client!.zipCode).toBe(input.zipCode);
    })

})