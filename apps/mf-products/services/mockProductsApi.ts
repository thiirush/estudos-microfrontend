import type { Product, ProductInput } from '../types/product';

const wait = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

let productsDb: Product[] = [
  { id: '1', name: 'Teclado Mecânico', price: 299.9, sku: 'KEY-001' },
  { id: '2', name: 'Mouse Gamer', price: 159.9, sku: 'MOU-001' },
  { id: '3', name: 'Monitor 27"', price: 1299.9, sku: 'MON-027' }
];

export const mockProductsApi = {
  async list(): Promise<Product[]> {
    await wait();
    return [...productsDb];
  },

  async create(input: ProductInput): Promise<Product> {
    await wait();
    const product: Product = {
      id: crypto.randomUUID(),
      ...input
    };

    productsDb = [product, ...productsDb];
    return product;
  },

  async update(id: string, input: ProductInput): Promise<Product> {
    await wait();

    const index = productsDb.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new Error('Produto não encontrado.');
    }

    const updatedProduct: Product = { id, ...input };
    productsDb[index] = updatedProduct;

    return updatedProduct;
  },

  async remove(id: string): Promise<void> {
    await wait();
    productsDb = productsDb.filter((product) => product.id !== id);
  }
};
