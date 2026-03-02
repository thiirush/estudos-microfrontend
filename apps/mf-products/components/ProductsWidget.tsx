import { Button, Card, Input } from '@company/ui';

type ProductsWidgetProps = {
  isAuthenticated?: boolean;
};

export default function ProductsWidget({ isAuthenticated = false }: ProductsWidgetProps) {
  return (
    <Card title="MF Products" description="Microfrontend responsável por produtos.">
      <p>
        Status recebido do shell:{' '}
        <strong>{isAuthenticated ? 'Autenticado' : 'Não autenticado'}</strong>
      </p>
      <div style={{ display: 'grid', gap: 10, marginTop: 8 }}>
        <Input placeholder="Buscar produto" />
        <Button type="button">Pesquisar</Button>
      </div>
    </Card>
  );
}
