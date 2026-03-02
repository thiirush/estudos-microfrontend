import dynamic from 'next/dynamic';
import type { GetServerSideProps } from 'next';
import type { ComponentType, ReactNode } from 'react';
import { Component, useState } from 'react';
import { Card, Layout } from '@company/ui';

type HomeProps = {
  initialAuthenticated: boolean;
};

type GenericRemoteProps = Record<string, unknown>;

type ErrorBoundaryProps = {
  children: ReactNode;
  microfrontendName: string;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

function MicrofrontendError({ microfrontendName }: { microfrontendName: string }) {
  return (
    <div
      style={{
        border: '1px solid #fecaca',
        backgroundColor: '#fef2f2',
        color: '#991b1b',
        borderRadius: 8,
        padding: 12
      }}
    >
      Não foi possível carregar o microfrontend <strong>{microfrontendName}</strong>.
    </div>
  );
}

class MicrofrontendErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error(`[Shell] Erro de renderização no microfrontend ${this.props.microfrontendName}:`, error);
  }

  render() {
    if (this.state.hasError) {
      return <MicrofrontendError microfrontendName={this.props.microfrontendName} />;
    }

    return this.props.children;
  }
}

function loadRemote(
  importRemote: () => Promise<{ default: ComponentType<GenericRemoteProps> }>,
  microfrontendName: string
) {
  return importRemote().catch((error) => {
    console.error(`[Shell] Falha ao carregar o microfrontend ${microfrontendName}:`, error);

    return {
      default: () => <MicrofrontendError microfrontendName={microfrontendName} />
    };
  });
}

const AuthApp = dynamic<GenericRemoteProps>(() => loadRemote(() => import('mf_auth/AuthApp'), 'AuthApp'), {
  ssr: false,
  loading: () => <p>Carregando AuthApp...</p>
});

const DashboardApp = dynamic<GenericRemoteProps>(
  () => loadRemote(() => import('mf_dashboard/DashboardApp'), 'DashboardApp'),
  {
    ssr: false,
    loading: () => <p>Carregando DashboardApp...</p>
  }
);

const ProductsApp = dynamic<GenericRemoteProps>(() => loadRemote(() => import('mf_products/ProductsApp'), 'ProductsApp'), {
  ssr: false,
  loading: () => <p>Carregando ProductsApp...</p>
});

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({ req }) => {
  const isAuthenticated = Boolean(req.cookies.mf_token);

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: 'http://localhost:3001',
        permanent: false
      }
    };
  }

  return {
    props: {
      initialAuthenticated: isAuthenticated
    }
  };
};

export default function Home({ initialAuthenticated }: HomeProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuthenticated);

  return (
    <Layout
      title="Shell App (Host)"
      subtitle="Consumo dinâmico e lazy de microfrontends via Module Federation."
    >
      <Card
        title="Microfrontends carregados"
        description="Todos consomem o pacote compartilhado @company/ui."
      >
        <p style={{ marginBottom: 12 }}>
          Status global: {isAuthenticated ? 'Autenticado' : 'Não autenticado'}
        </p>
        <div
          style={{
            display: 'grid',
            gap: 12,
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'
          }}
        >
          <MicrofrontendErrorBoundary microfrontendName="AuthApp">
            <AuthApp initialAuthenticated={isAuthenticated} onAuthChange={setIsAuthenticated} />
          </MicrofrontendErrorBoundary>
          <MicrofrontendErrorBoundary microfrontendName="DashboardApp">
            <DashboardApp isAuthenticated={isAuthenticated} />
          </MicrofrontendErrorBoundary>
          <MicrofrontendErrorBoundary microfrontendName="ProductsApp">
            <ProductsApp isAuthenticated={isAuthenticated} />
          </MicrofrontendErrorBoundary>
        </div>
      </Card>
    </Layout>
  );
}
