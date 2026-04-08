# React Principles — Next.js Starter

A production-ready Next.js starter template that implements the patterns and principles from [reactprinciples.dev](https://reactprinciples.dev). Use this as a starting point for real-world React applications.

## Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict mode) |
| Package Manager | pnpm |
| Styling | Tailwind CSS v4 |
| State Management | Zustand |
| Data Fetching | TanStack Query |
| Forms | React Hook Form + Zod |
| Tables | TanStack Table |
| Testing | Vitest + Testing Library |
| Linting | ESLint 9 (flat config) |
| Git Hooks | Husky |

## Quick Start

```bash
# Clone the repo
git clone https://github.com/sindev08/react-principles-nextjs.git
cd react-principles-nextjs

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start the dev server (port 3001)
pnpm dev
```

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server on port 3001 |
| `pnpm build` | Production build |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm test` | Run tests with Vitest |
| `pnpm test:watch` | Run tests in watch mode |

## Project Structure

See [ARCHITECTURE.md](./ARCHITECTURE.md) for a detailed breakdown of the folder structure and architectural decisions.

## API

This starter uses [DummyJSON](https://dummyjson.com) as a mock API for demonstration purposes. The API client (`src/lib/api-client.ts`) is a fetch-based factory that can be pointed at any REST API by changing `NEXT_PUBLIC_API_URL`.

## Learn More

- [React Principles](https://reactprinciples.dev) — The cookbook and pattern library this starter is based on
- [Next.js Docs](https://nextjs.org/docs) — Framework documentation
- [TanStack Query](https://tanstack.com/query) — Data fetching library
- [Zustand](https://zustand.docs.pmnd.rs/) — State management

## License

MIT
