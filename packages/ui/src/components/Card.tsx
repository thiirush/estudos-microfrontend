import { PropsWithChildren } from 'react';

type CardProps = PropsWithChildren<{
  title: string;
  description?: string;
}>;

export function Card({ title, description, children }: CardProps) {
  return (
    <section
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: 10,
        padding: 16,
        backgroundColor: '#fff',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.06)'
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: 8 }}>{title}</h2>
      {description ? <p style={{ marginTop: 0, color: '#4b5563' }}>{description}</p> : null}
      {children}
    </section>
  );
}
