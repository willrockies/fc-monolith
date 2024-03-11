import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const MockRepository = () => {
    return {
      create: jest.fn(),
      find: jest.fn(),
    };
  };

  describe("Generate invoice usecase unit test", () => {
    it("should generate an invoice", async () =>{
        const mockRepository = MockRepository();
        const usecase = new GenerateInvoiceUseCase(mockRepository);

        const input = {
            name: "Teste",
            document: "12345678901",
            street: "Rua Teste",
            number: "123",
            complement: "complemento",
            city: "Teste",
            state: "Teste",
            zipCode: "12345678",
            items: [
              {
                id: "1",
                name: "Product 1",
                price: 10,
              },
              {
                id: "2",
                name: "Product 2",
                price: 20,
              },
            ],
        };

        const result = await usecase.execute(input);

        expect(result.id).toBeDefined();
        expect(mockRepository.create).toHaveBeenCalled();
        expect(result.name).toBe(input.name);
        expect(result.document).toBe(input.document);
        expect(result.street).toBe(input.street);
        expect(result.number).toBe(input.number);
        expect(result.complement).toBe(input.complement);
        expect(result.city).toBe(input.city);
        expect(result.state).toBe(input.state);
        expect(result.zipCode).toBe(input.zipCode);
        expect(result.items.length).toBe(input.items.length);
        expect(result.total).toBe(30);
    });
  });