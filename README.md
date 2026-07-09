# Galyan Monorepo

Welcome to the Galyan monorepo, built with [Turborepo](https://turbo.build/repo).

## What's inside?

This repository is structured as a monorepo containing the following apps and packages:

### Apps
- `playground`: A [Next.js](https://nextjs.org/) app used for testing and developing components and themes.

### Packages
- `@galyan/ui`: A React component library (`packages/ui`) built with React 19 and Floating UI.
- `@galyan/theme`: Shared design tokens, reset, globals, variables, and fonts (`packages/theme`).
- `@repo/eslint-config`: Shared `eslint` configurations (`packages/eslint-config`).
- `@repo/typescript-config`: Shared `tsconfig.json` configurations used throughout the workspace (`packages/typescript-config`).

## Tooling

This Turborepo is pre-configured with industry-standard tools:
- [TypeScript](https://www.typescriptlang.org/) for static type checking.
- [ESLint](https://eslint.org/) for code linting.
- [Prettier](https://prettier.io) for code formatting.
- [pnpm](https://pnpm.io/) as the package manager.

## Commands

### Install Dependencies
To install all dependencies across the monorepo, run:
```sh
pnpm install
```

### Build
To build all apps and packages, run the following command from the root:
```sh
pnpm run build
```
Or with global `turbo`:
```sh
turbo build
```

### Develop
To start the development servers for all apps and packages:
```sh
pnpm run dev
```
To develop a specific app (like `playground`), you can filter the task:
```sh
turbo dev --filter=playground
```

### Lint and Format
To lint all packages and apps:
```sh
pnpm run lint
```
To format the code with Prettier:
```sh
pnpm run format
```
To check TypeScript types without emitting:
```sh
pnpm run check-types
```

## Useful Links
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [pnpm Documentation](https://pnpm.io/motivation)
