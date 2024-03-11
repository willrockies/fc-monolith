import InvoiceFacade from "../facade/invoice.facade";
import  InvoiceFacadeInterface  from "../facade/invoice.facade";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUseCase from "../usecase/find/invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate/generate-invoice.usecase";

export default class InvoiceFacadeFactory {
    static create(): InvoiceFacadeInterface {
        const repository = new InvoiceRepository();
        const generateInvoiceUseCase = new GenerateInvoiceUseCase(repository);
        const findInvoiceUseCase = new FindInvoiceUseCase(repository);

        return new InvoiceFacade(
            repository,
            generateInvoiceUseCase,
            findInvoiceUseCase,
        )
    }
}