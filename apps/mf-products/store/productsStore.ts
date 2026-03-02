import { create } from 'zustand';
import { mockProductsApi } from '../services/mockProductsApi';
import type { Product, ProductInput } from '../types/product';

type ProductsState = {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  createProduct: (input: ProductInput) => Promise<void>;
  updateProduct: (id: string, input: ProductInput) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
};

const handleError = (error: unknown) =>
  error instanceof Error ? error.message : 'Erro inesperado ao processar ação.';

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });

    try {
      const products = await mockProductsApi.list();
      set({ products, loading: false });
    } catch (error) {
      set({ error: handleError(error), loading: false });
    }
  },

  createProduct: async (input) => {
    set({ loading: true, error: null });

    try {
      const product = await mockProductsApi.create(input);
      set((state) => ({ products: [product, ...state.products], loading: false }));
    } catch (error) {
      set({ error: handleError(error), loading: false });
    }
  },

  updateProduct: async (id, input) => {
    set({ loading: true, error: null });

    try {
      const updatedProduct = await mockProductsApi.update(id, input);
      set((state) => ({
        products: state.products.map((product) => (product.id === id ? updatedProduct : product)),
        loading: false
      }));
    } catch (error) {
      set({ error: handleError(error), loading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true, error: null });

    try {
      await mockProductsApi.remove(id);
      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: handleError(error), loading: false });
    }
  }
}));
