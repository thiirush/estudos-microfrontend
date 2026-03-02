import dynamic from 'next/dynamic';

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

export default function Home() {
  return (
    <main style={{ fontFamily: 'sans-serif', padding: 24 }}>
      <h1>Shell App (Host)</h1>
      <p>Consumo dinâmico e lazy de microfrontends via Module Federation.</p>
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        <AuthApp />
        <DashboardApp />
        <ProductsApp />
      </div>
    </main>
  );
}
