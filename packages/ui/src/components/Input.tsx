import { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ style, ...props }: InputProps) {
  return (
    <input
      {...props}
      style={{
        width: '100%',
        border: '1px solid #d1d5db',
        borderRadius: 8,
        padding: '10px 12px',
        fontSize: 14,
        outline: 'none',
        ...style
      }}
    />
  );
}
