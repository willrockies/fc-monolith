import { Sequelize } from "sequelize-typescript"
import TransactionModel from "../repository/transaction.model";
import transactionRepository from "../repository/transaction.repository";
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase";
import PaymentFacade from "./payment.facade";

describe("Payment test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([TransactionModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a transaction", async () => {
        const repository = new transactionRepository();
        const usecase = new ProcessPaymentUseCase(repository);
        const facade = new PaymentFacade(usecase);

        const input = {
            orderId: "order 1",
            amount: 100,
        };

        const output = await facade.process(input);

        expect(output.transactionId).toBeDefined();
        expect(output.orderId).toEqual(input.orderId);
        expect(output.amount).toEqual(input.amount);
        expect(output.status).toEqual("approved");
    });

})