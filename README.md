# Microfrontends com Next.js + Module Federation

Estrutura:

- `apps/shell` (host)
- `apps/mf-auth`
- `apps/mf-dashboard`
- `apps/mf-products`

## Requisitos atendidos

- Next.js 14+
- Webpack 5
- Module Federation via `@module-federation/nextjs-mf`
- Cada app em porta diferente (3000, 3001, 3002, 3003)
- Shell consome remotes dinamicamente
- Setup local pronto
- TypeScript habilitado

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
