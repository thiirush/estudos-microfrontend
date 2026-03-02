import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { Button, Card, Input } from '@company/ui';
import { useProductsStore } from '../store/productsStore';

type ProductsWidgetProps = {
  isAuthenticated?: boolean;
};

type ProductForm = {
  name: string;
  price: string;
  sku: string;
};

const EMPTY_FORM: ProductForm = {
  name: '',
  price: '',
  sku: ''
};

export default function ProductsWidget({ isAuthenticated = false }: ProductsWidgetProps) {
  const { products, loading, error, fetchProducts, createProduct, updateProduct, deleteProduct } =
    useProductsStore();

  const [form, setForm] = useState<ProductForm>(EMPTY_FORM);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return products;
    }

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) || product.sku.toLowerCase().includes(query)
    );
  }, [products, search]);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      name: form.name.trim(),
      sku: form.sku.trim(),
      price: Number(form.price)
    };

    if (!payload.name || !payload.sku || Number.isNaN(payload.price) || payload.price <= 0) {
      return;
    }

    if (editingId) {
      await updateProduct(editingId, payload);
    } else {
      await createProduct(payload);
    }

    resetForm();
  };

  const startEdit = (product: { id: string; name: string; price: number; sku: string }) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      sku: product.sku,
      price: String(product.price)
    });
  };

  return (
    <Card title="MF Products" description="CRUD de produtos com Zustand e API mockada.">
      <p>
        Status recebido do shell:{' '}
        <strong>{isAuthenticated ? 'Autenticado' : 'Não autenticado'}</strong>
      </p>

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 10, marginTop: 12 }}>
        <Input
          placeholder="Nome do produto"
          value={form.name}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setForm((prev) => ({ ...prev, name: event.target.value }))}
        />
        <Input
          placeholder="SKU"
          value={form.sku}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setForm((prev) => ({ ...prev, sku: event.target.value }))}
        />
        <Input
          type="number"
          min="0"
          step="0.01"
          placeholder="Preço"
          value={form.price}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setForm((prev) => ({ ...prev, price: event.target.value }))}
        />
        <div style={{ display: 'flex', gap: 8 }}>
          <Button type="submit" disabled={loading}>
            {editingId ? 'Salvar edição' : 'Criar produto'}
          </Button>
          {editingId ? (
            <Button type="button" onClick={resetForm} disabled={loading}>
              Cancelar edição
            </Button>
          ) : null}
        </div>
      </form>

      <div style={{ marginTop: 12 }}>
        <Input
          placeholder="Buscar por nome ou SKU"
          value={search}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}
        />
      </div>

      {error ? <p style={{ color: '#b91c1c' }}>{error}</p> : null}
      {loading ? <p>Processando...</p> : null}

      <div style={{ display: 'grid', gap: 8, marginTop: 12 }}>
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 10, display: 'grid', gap: 6 }}
          >
            <div>
              <strong>{product.name}</strong>
            </div>
            <div>SKU: {product.sku}</div>
            <div>Preço: R$ {product.price.toFixed(2)}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button type="button" onClick={() => startEdit(product)} disabled={loading}>
                Editar
              </Button>
              <Button type="button" onClick={() => deleteProduct(product.id)} disabled={loading}>
                Excluir
              </Button>
            </div>
          </div>
        ))}

        {!filteredProducts.length ? <p>Nenhum produto encontrado.</p> : null}
      </div>
    </Card>
  );
}
