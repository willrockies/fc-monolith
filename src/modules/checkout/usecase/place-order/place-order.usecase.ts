import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export default class PlaceOrderUseCase implements UseCaseInterface {
    private _clientFacade: ClientAdmFacadeInterface;

    constructor(clentFacade: ClientAdmFacadeInterface) {
        this._clientFacade = clentFacade;
    }

    async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
        /* 
                // buscar o cliente. Caso não encontre -> client not found
                // validar produto. //função a parte
                // recuperar os dados do produto
        
                // criar o objeto do client
                // criar o objeto da order (client, products)
        
                // processpayment -> paymentfacade.process(orderid, amount)
        
                // caso pagamento seja aprovado. -> gerar invoice
                // mudar o status da minha order para approved
                // retornar dto
         */
        const client = await this._clientFacade.find({ id: input.clientId });
        if (!client) {
            throw new Error("Client not found");
        }

        return {
            id: "",
            invoiceId: "",
            status: "",
            total: 0,
            products: []
        }
    }

}