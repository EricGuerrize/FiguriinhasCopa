# Figuriinhas Copa 2026

App web (React + Vite + TypeScript + Tailwind) para gerenciar figurinhas da Copa 2026, com coleção, repetidas, scan por imagem e tela de matches.

## Requisitos

- Node.js 20+
- npm 10+

## Rodar local (rápido)

```bash
npm ci
npm run dev:host
```

Abra no navegador:

- Local: `http://localhost:5173`
- Rede local (mesmo Wi-Fi): `http://SEU_IP:5173`

## Build de produção

```bash
npm run build
npm run preview:host
```

## Variáveis de ambiente

Copie `.env.example` para `.env`.

```bash
cp .env.example .env
```

### Sem configurar `.env`

O app roda em **modo demo** para teste de interface (sem autenticação real).

### Com Supabase

Preencha:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Com isso, login por email/senha e Google passa a usar Supabase Auth.

### Com Gemini (scan)

Preencha:

- `VITE_GEMINI_API_KEY`

Sem chave, o scan retorna um resultado mock para testes.

## Banco de dados

Script base em [`database.sql`](./database.sql).

## Scripts

- `npm run dev` - desenvolvimento local
- `npm run dev:host` - desenvolvimento acessível na rede
- `npm run build` - build de produção
- `npm run preview` - preview da build
- `npm run preview:host` - preview acessível na rede
- `npm run lint` - lint do projeto

## Status atual

- Interface pronta para teste web.
- Algumas features ainda estão em modo mock (estatísticas, coleção persistida, matches premium e checkout Stripe).
