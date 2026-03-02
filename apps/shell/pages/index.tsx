import dynamic from 'next/dynamic';
import type { GetServerSideProps } from 'next';
import { useState } from 'react';
import { Card, Layout } from '@company/ui';

type HomeProps = {
  initialAuthenticated: boolean;
};

const AuthApp = dynamic(() => import('mf_auth/AuthApp'), {
  ssr: false,
  loading: () => <p>Carregando AuthApp...</p>
});

const DashboardApp = dynamic(() => import('mf_dashboard/DashboardApp'), {
  ssr: false,
  loading: () => <p>Carregando DashboardApp...</p>
});

const ProductsApp = dynamic(() => import('mf_products/ProductsApp'), {
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
          <AuthApp initialAuthenticated={isAuthenticated} onAuthChange={setIsAuthenticated} />
          <DashboardApp isAuthenticated={isAuthenticated} />
          <ProductsApp isAuthenticated={isAuthenticated} />
        </div>
      </Card>
    </Layout>
  );
}
