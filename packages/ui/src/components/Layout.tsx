import { PropsWithChildren } from 'react';

type LayoutProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
}>;

export function Layout({ title, subtitle, children }: LayoutProps) {
  return (
    <main style={{ fontFamily: 'sans-serif', padding: 24, backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <header style={{ marginBottom: 16 }}>
        <h1 style={{ marginBottom: 8 }}>{title}</h1>
        {subtitle ? <p style={{ margin: 0, color: '#4b5563' }}>{subtitle}</p> : null}
      </header>
      {children}
    </main>
  );
}
