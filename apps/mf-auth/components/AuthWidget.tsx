import { FormEvent, useState } from 'react';
import { Button, Card, Input } from '@company/ui';

type AuthWidgetProps = {
  initialAuthenticated?: boolean;
  onAuthChange?: (isAuthenticated: boolean) => void;
};

export default function AuthWidget({ initialAuthenticated = false, onAuthChange }: AuthWidgetProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuthenticated);
  const [message, setMessage] = useState<string | null>(null);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      setMessage('Falha no login. Tente novamente.');
      return;
    }

    setMessage('Login realizado com sucesso.');
    setIsAuthenticated(true);
    onAuthChange?.(true);
  }

  async function handleLogout() {
    const response = await fetch('http://localhost:3001/api/logout', {
      method: 'POST',
      credentials: 'include'
    });

    if (!response.ok) {
      setMessage('Falha ao sair. Tente novamente.');
      return;
    }

    setMessage('Logout realizado com sucesso.');
    setIsAuthenticated(false);
    onAuthChange?.(false);
  }

  return (
    <Card title="MF Auth" description="Microfrontend responsável por autenticação global.">
      {isAuthenticated ? (
        <div style={{ display: 'grid', gap: 10 }}>
          <p>Você está autenticado.</p>
          <Button onClick={handleLogout} type="button">
            Sair
          </Button>
        </div>
      ) : (
        <form onSubmit={handleLogin} style={{ display: 'grid', gap: 10, maxWidth: 320 }}>
          <Input
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Usuário"
            required
            value={username}
          />
          <Input
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Senha"
            required
            type="password"
            value={password}
          />
          <Button type="submit">Entrar</Button>
        </form>
      )}

      {message && <p style={{ marginTop: 8 }}>{message}</p>}
    </Card>
  );
}
