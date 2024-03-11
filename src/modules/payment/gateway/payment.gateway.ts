import Transaction from "../domain/transactions";

export interface PaymentGateway {
    save(input: Transaction): Promise<Transaction>;
}