type ProductsWidgetProps = {
  isAuthenticated?: boolean;
};

export default function ProductsWidget({ isAuthenticated = false }: ProductsWidgetProps) {
  return (
    <section style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
      <h2>MF Products</h2>
      <p>Microfrontend responsável por produtos.</p>
      <strong>Status recebido do shell: {isAuthenticated ? 'Autenticado' : 'Não autenticado'}</strong>
    </section>
  );
}
