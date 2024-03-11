import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import InvoiceGateway from "../gateway/invoice.gateway";

import InvoiceFacadeInterface, {
    FindInvoiceFacadeOutputDto,
    GenerateInvoiceFacadeOutputDto,
    GenerateInvoiceFacadeInputDto,
} from "./invoice.facade.interface";


export default class InvoiceFacade implements InvoiceFacadeInterface {
    constructor(
        private _invoiceRepository: InvoiceGateway,
        private _generateInvoiceUseCase: UseCaseInterface,
        private _findInvoiceUseCase: UseCaseInterface) { }
    async create(invoice: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        return await this._generateInvoiceUseCase.execute(invoice);
    }
    async find(invoiceId: string): Promise<FindInvoiceFacadeOutputDto> {
        return await this._findInvoiceUseCase.execute({ id: invoiceId });
      }

}