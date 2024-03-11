import { Sequelize } from "sequelize-typescript"
import TransactionModel from "./transaction.model";
import Transaction from "../domain/transactions";
import Id from "../../@shared/domain/value-object/id.value-object";
import transactionRepository from "./transaction.repository";

describe("Repository Test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
        });
        await sequelize.addModels([TransactionModel])
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should save a transaction", async () => {
        const transaction = new Transaction({
            id: new Id("1"),
            amount: 100,
            orderId: "1",
        });

        transaction.approve();
        
        const repository = new transactionRepository();
        const result = await repository.save(transaction);

        expect(result.id.id).toBe(transaction.id.id);
        expect(result.status).toBe("approved");
        expect(result.amount).toBe(transaction.amount);
        expect(result.orderId).toBe(transaction.orderId);
    }); 
});