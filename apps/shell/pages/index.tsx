import dynamic from 'next/dynamic';

const AuthWidget = dynamic(() => import('mf_auth/AuthWidget'), { ssr: false });
const DashboardWidget = dynamic(() => import('mf_dashboard/DashboardWidget'), { ssr: false });
const ProductsWidget = dynamic(() => import('mf_products/ProductsWidget'), { ssr: false });

export default function Home() {
  return (
    <main style={{ fontFamily: 'sans-serif', padding: 24 }}>
      <h1>Shell App (Host)</h1>
      <p>Consumo dinâmico de microfrontends via Module Federation.</p>
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        <AuthWidget />
        <DashboardWidget />
        <ProductsWidget />
      </div>
    </main>
  );
}
