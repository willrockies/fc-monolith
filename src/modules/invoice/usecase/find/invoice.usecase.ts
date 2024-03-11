import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDto, FindInvoiceUseCaseOutputDto } from "./invoice.dto";

export default class FindInvoiceUseCase {
    constructor(private invoiceRepository: InvoiceGateway) { }

    async execute(input: FindInvoiceUseCaseInputDto): Promise<FindInvoiceUseCaseOutputDto> {
        const invoice = await this.invoiceRepository.find(input.id);

        return this.toDTO(invoice)
    }

    private toDTO(invoice: any): FindInvoiceUseCaseOutputDto {
        return {
          id: invoice.id,
          name: invoice.name,
          document: invoice.document,
          address: {
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
          },
          items: invoice.items.map((item: any) => {
            return {
              id: item.id,
              name: item.name,
              price: item.price,
            };
          }),
          createdAt: invoice.createdAt,
          total: invoice.total,
        };
      }
}