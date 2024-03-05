import { Sequelize } from "sequelize-typescript"
import { ClientModel } from "../repository/client.model";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import ClientRepository from "../repository/client.repository";
import Id from "../../@shared/domain/value-object/id.value-object";
import ClientAdmFacade from "./client-adm.facade";

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
            findUsecase:undefined
        });

        const input = {
            id: "1",
            name: "Client 1",
            email: "john.c.calhoun@examplepetstore.com",
            address: "Address 1",
        }
        await facade.add(input);

        const client = await ClientModel.findOne({ where: { id: "1" } });

        expect(client).toBeDefined();
        console.log(client);
        //expect(client.id).toBe(input.id);
        expect(client.name).toBe(input.name);
        expect(client.email).toBe(input.email);
        expect(client.address).toBe(input.address);
    });
})