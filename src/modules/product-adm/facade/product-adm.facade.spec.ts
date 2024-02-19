import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../repository/product.model";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import ProductAdmFacede from "./product-adm.facade";

describe("ProductAdmFacade test", () => {
    let sequelize: Sequelize;
    
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const addProductUseCase = new AddProductUseCase(productRepository);
        const productFacade = new ProductAdmFacede({
            addUseCase: addProductUseCase,
            stockUseCase: undefined
        });

        const input = {
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 10,
            stock: 10,
        };

        await productFacade.addProduct(input);

        const product = await ProductModel.findOne({ where: { id: "1" } });
        console.log(product.dataValues)
        expect(product).toBeDefined();
        expect(product.dataValues.id).toBe(input.id);
        expect(product.dataValues.name).toBe(input.name);
        expect(product.dataValues.description).toBe(input.description);
        expect(product.dataValues.purchasePrice).toBe(input.purchasePrice);
        expect(product.dataValues.stock).toBe(input.stock);
    });
});