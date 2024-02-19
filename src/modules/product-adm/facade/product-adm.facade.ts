import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import ProductAdmFacadeInterface, { AddProductFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./product-adm.facade.interface";

export interface UseCaseProps {
    addUseCase: UseCaseInterface;
    stockUseCase: UseCaseInterface;
}


export default class ProductAdmFacade implements ProductAdmFacadeInterface {
private _addUseCase: UseCaseInterface;
private _checkStockUseCase: UseCaseInterface;

    constructor(usecasesProps: UseCaseProps) {
        this._addUseCase = usecasesProps.addUseCase;
        this._checkStockUseCase = usecasesProps.stockUseCase;
    }
    addProduct(input: AddProductFacadeInputDto): Promise<void> {
        // caso o dto do caso de uso for != do dto da facade, converter o dto da facade para o dto do caso de uso
        return this._addUseCase.execute(input);
    }
    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        return this._checkStockUseCase.execute(input);  
    }

}