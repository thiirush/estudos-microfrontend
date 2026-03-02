# Microfrontends com Next.js + Module Federation

Estrutura:

- `apps/shell` (host)
- `apps/mf-auth`
- `apps/mf-dashboard`
- `apps/mf-products`
- `packages/ui` (`@company/ui` compartilhado)

## Requisitos atendidos

- Next.js 14+
- Webpack 5
- Module Federation via `@module-federation/nextjs-mf`
- Cada app em porta diferente (3000, 3001, 3002, 3003)
- Shell consome remotes dinamicamente
- Setup local pronto
- TypeScript habilitado
- Design system compartilhado com versionamento semântico (`@company/ui@^1.0.0`)

## Como rodar

```bash
npm install

# Em terminais separados
npm run dev:auth
npm run dev:dashboard
npm run dev:products
npm run dev:shell
```

Abra `http://localhost:3000`.

## Como o token é compartilhado hoje

Neste exemplo, **não existe implementação de autenticação real ainda**. O `mf-auth` expõe apenas um componente visual (`AuthWidget`) e não há código de login, geração de token, persistência (`cookie`/`localStorage`) nem propagação de estado de sessão entre os microfrontends.

Na prática, o que é compartilhado entre apps hoje é somente o runtime de UI via Module Federation (ex.: `react` e `react-dom` como `singleton`), e não credenciais.

## Alternativas arquiteturais para compartilhar autenticação em microfrontends

### 1. Cookie HTTPOnly no domínio raiz (BFF/Backend)
- O `mf-auth` autentica no backend e recebe um cookie `HttpOnly`, `Secure`, `SameSite` no domínio comum.
- Os demais MFs não leem token no JavaScript; apenas chamam APIs que validam cookie.
- **Prós:** mais seguro contra XSS; evita token no browser JS.
- **Contras:** exige estratégia de domínio/subdomínio e CORS/CSRF bem definidos.

### 2. Shell como "fonte de verdade" de sessão
- O shell autentica e mantém estado de sessão central (store/context).
- MFs recebem estado por props, eventos ou contrato compartilhado.
- **Prós:** governança central e desacoplamento de implementação interna dos remotes.
- **Contras:** maior acoplamento ao shell; difícil se houver execução independente frequente.

### 3. Biblioteca de autenticação compartilhada (package comum)
- Criar pacote interno (`@org/auth-client`) com funções de login/refresh/getSession.
- Cada MF usa a mesma API para obter sessão.
- **Prós:** padronização e reuso.
- **Contras:** versionamento e rollout coordenado entre vários MFs.

### 4. Event bus / BroadcastChannel / Custom Events
- `mf-auth` publica evento de sessão e os demais escutam mudanças.
- **Prós:** desacoplamento em runtime.
- **Contras:** complexidade de sincronização, reconexão e ordem de eventos.

### 5. localStorage/sessionStorage (opção menos recomendada)
- Token salvo no storage e lido por todos os MFs no mesmo domínio.
- **Prós:** implementação simples.
- **Contras:** maior superfície de ataque em XSS.

## Recomendação prática para este projeto

Para evoluir este repositório com boa segurança e simplicidade operacional:
1. Adotar **cookie HTTPOnly** como mecanismo principal de sessão.
2. Manter no shell apenas um estado derivado de autenticação (ex.: usuário autenticado, perfil, permissões básicas), sem expor token cru.
3. Definir contrato explícito entre shell e remotes (eventos + tipos) para login/logout/refresh.
