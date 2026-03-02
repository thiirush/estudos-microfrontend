import { FormEvent, useState } from 'react';

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
    <section style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
      <h2>MF Auth</h2>
      <p>Microfrontend responsável por autenticação global.</p>

      {isAuthenticated ? (
        <div>
          <p>Você está autenticado.</p>
          <button onClick={handleLogout} type="button">
            Sair
          </button>
        </div>
      ) : (
        <form onSubmit={handleLogin} style={{ display: 'grid', gap: 8, maxWidth: 300 }}>
          <input
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Usuário"
            required
            value={username}
          />
          <input
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Senha"
            required
            type="password"
            value={password}
          />
          <button type="submit">Entrar</button>
        </form>
      )}

      {message && <p>{message}</p>}
    </section>
  );
}
