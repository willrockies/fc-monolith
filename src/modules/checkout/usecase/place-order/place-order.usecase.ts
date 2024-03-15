import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export default class PlaceOrderUseCase implements UseCaseInterface {

    constructor() { }
    execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
/* 
        // buscar o cliente. Caso não encontre -> client not found
        // validar produto.
        // recuperar os dados do produto

        // criar o objeto do client
        // criar o objeto da order (client, products)

        // processpayment -> paymentfacade.process(orderid, amount)

        // caso pagamento seja aprovado. -> gerar invoice
        // mudar o status da minha order para approved
        // retornar dto
 */
        
        
        return {
            id: "",
            invoiceId: "",
            status: "",
            total: 0,
            products: []
        }
    }

}