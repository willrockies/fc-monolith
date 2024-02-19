import ProductGateway from "../../gateway/product.gateway";
import AddProductDto from "./add-product.dto";

export default class AddProductUseCase {
    private _productRepository: ProductGateway;
    constructor(productRepository: ProductGateway) {
        this._productRepository = productRepository;
    }

    async execute(input: AddProductDto): Promise<AddProductDto> {

    }
}