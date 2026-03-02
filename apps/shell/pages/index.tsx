import dynamic from 'next/dynamic';
import type { GetServerSideProps } from 'next';
import { useState } from 'react';

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
    <main style={{ fontFamily: 'sans-serif', padding: 24 }}>
      <h1>Shell App (Host)</h1>
      <p>Consumo dinâmico e lazy de microfrontends via Module Federation.</p>
      <p>Status global: {isAuthenticated ? 'Autenticado' : 'Não autenticado'}</p>
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        <AuthApp initialAuthenticated={isAuthenticated} onAuthChange={setIsAuthenticated} />
        <DashboardApp isAuthenticated={isAuthenticated} />
        <ProductsApp isAuthenticated={isAuthenticated} />
      </div>
    </main>
  );
}
