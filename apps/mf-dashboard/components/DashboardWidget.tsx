import { Button, Card } from '@company/ui';

type DashboardWidgetProps = {
  isAuthenticated?: boolean;
};

export default function DashboardWidget({ isAuthenticated = false }: DashboardWidgetProps) {
  return (
    <Card title="MF Dashboard" description="Microfrontend responsável pelo painel.">
      <p>
        Status recebido do shell:{' '}
        <strong>{isAuthenticated ? 'Autenticado' : 'Não autenticado'}</strong>
      </p>
      <Button type="button">Atualizar dados</Button>
    </Card>
  );
}
