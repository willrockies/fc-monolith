import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import { validate as uuidValidate } from 'uuid';
import ProductRepository from "./product.repository";

describe("ProductRepository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });


    it("should find all products", async () => {
        // Arrange
      await ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            salesPrice: 100,
        });

        await ProductModel.create({
            id: "2",
            name: "Product 2",
            description: "Product 2 description",
            salesPrice: 200,
        });


        // Act
        const productRepository = new ProductRepository();
        const products = await productRepository.findAll();
 
        // Assert
        expect(products.length).toBe(2);
        expect(uuidValidate(products[0].id.id)).toBe(true); // Verifica se o UUID é válido
        expect(products[0].name).toBe("Product 1");
        expect(products[0].description).toBe("Product 1 description");
        expect(products[0].salesPrice).toBe(100);
        expect(uuidValidate(products[1].id.id)).toBe(true); // Verifica se o UUID é válido
        expect(products[1].name).toBe("Product 2");
        expect(products[1].description).toBe("Product 2 description");
        expect(products[1].salesPrice).toBe(200);
    });

    
  it("should find a product", async () => {
    await ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Description 1",
      salesPrice: 100,
    });

    const productRepository = new ProductRepository();
    const product = await productRepository.find("1");

    expect(product.id.id).toBe("1");
    expect(product.name).toBe("Product 1");
    expect(product.description).toBe("Description 1");
    expect(product.salesPrice).toBe(100);
  });
})