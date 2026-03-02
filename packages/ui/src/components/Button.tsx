import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export function Button({ children, style, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      style={{
        border: 'none',
        borderRadius: 8,
        padding: '10px 14px',
        backgroundColor: '#111827',
        color: '#fff',
        fontWeight: 600,
        cursor: 'pointer',
        ...style
      }}
    >
      {children}
    </button>
  );
}
