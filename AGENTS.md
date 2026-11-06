# 🤖 AI Agent Instructions (AGENTS.md)

This document provides context, rules, and constraints for AI coding assistants (Cursor, Windsurf, Copilot, etc.) interacting with this repository.

Please read and adhere to these guidelines before generating or modifying any code.

---

## 📌 Repository Persona & Role

When editing this repository, act as a **Senior Frontend Architect** who values:

- Zero-configuration leakage (no dirty workarounds).
- Strict type safety (no `any` types).
- Clean separation of concerns (Webpack for building, Jest for testing, ESLint/Prettier for style).

---

## 🛠 Tech Stack Constraints (DO NOT UPGRADE)

Keep these major versions unless the user explicitly authorizes a migration. Commit dependency changes together with `package-lock.json`, and use `npm ci` for reproducible installs:

- **React and React DOM:** v18.x; keep both on the same version and use v18.x of `@types/react` and `@types/react-dom`.
- **TypeScript:** v6.x (locked to prevent compiler-parser mismatch).
- **ESLint:** v8.x (uses `.eslintrc.json`, **do not** convert to ESLint 9 Flat Config (`eslint.config.js`)).
- **Babel:** v7.x for Webpack transpilation. Do not install Babel 8.
- **Node.js:** use v24.18.0 to match the Docker images; CI uses Node.js 24.x.

---

## 🛑 Critical Rules for Code Generation

### 1. Line Endings (CRLF / LF)

- This project is configured to run seamlessly on both Windows and Unix systems.
- Always preserve `"endOfLine": "auto"` in both `.prettierrc` and `.eslintrc.json`.
- Do not generate files with hardcoded `LF` line endings if the environment is Windows.

### 2. TypeScript and Asset Imports

- If you introduce new static assets (images, webp, svg, woff2, scss, css), ensure they are imported correctly.
- Any new file extension imports must be declared in `src/custom.d.ts` so the TypeScript compiler does not throw errors.

### 3. JSX and Type Checking

- Use the automatic JSX runtime: TypeScript uses `react-jsx`, and Babel uses `runtime: "automatic"`. Do not add React imports solely for JSX.
- Babel transpiles TypeScript without checking types. Run `npm run typecheck` separately.
- Keep the `@/*` alias aligned across TypeScript, Webpack, and Jest.

### 4. CSS & SCSS Rules

- We use **Sass/SCSS** for styling.
- Webpack is configured to compile SCSS. In development, it uses `style-loader`. In production, it extracts CSS using `MiniCssExtractPlugin`.
- When writing styles, use modular or standard SCSS. Avoid inline styles unless absolutely necessary.

### 5. Testing Rules (Jest + RTL)

- All unit and integration tests must use **Jest** and **React Testing Library**.
- **Mocks:** Since Jest does not compile SCSS and assets natively, mock them.
  - Styles must map to `identity-obj-proxy`.
  - Images must map to `__mocks__/fileMock.js`.
  - The file `__mocks__/fileMock.js` **must** begin with `// @ts-nocheck` to prevent TypeScript compiler warnings.

### 6. Git Hooks & Validation

- Husky is configured with `lint-staged`.
- Any code you write must pass `npm run lint` (which runs `eslint --fix`). If you generate code with styling errors, the pre-commit hook will block the commit. Fix styling errors automatically using ESLint and Prettier configurations.
- Before completing code or dependency changes, run `npm run typecheck`, `npm run lint`, `npm test -- --runInBand`, and `npm run build`.
- On Windows PowerShell, use `npm.cmd` and `npx.cmd` if execution policy blocks the `.ps1` launchers.

---

## 🔍 Directory Guide for AI

- `src/` — All React components, TSX files, and stylesheets.
- `public/` — Static HTML templates.
- `__mocks__/` — Mocking files for Jest test runner.
- `.github/workflows/` — CI/CD automation pipeline.
- `.husky/` — Pre-commit linting hooks.
- `.vscode/` — Workspace-specific formatter settings.
