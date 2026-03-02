type DashboardWidgetProps = {
  isAuthenticated?: boolean;
};

export default function DashboardWidget({ isAuthenticated = false }: DashboardWidgetProps) {
  return (
    <section style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
      <h2>MF Dashboard</h2>
      <p>Microfrontend responsável pelo painel.</p>
      <strong>Status recebido do shell: {isAuthenticated ? 'Autenticado' : 'Não autenticado'}</strong>
    </section>
  );
}
