# Angular E-Commerce (Nx Monorepo)

A full-featured e-commerce web application built with **Angular 20** and organized as an **Nx monorepo**. The app covers authentication, product browsing, cart management, checkout, and order history — integrated with the Route E-commerce REST API through typed services, functional route guards, and HTTP interceptors, with broad **Jest** unit test coverage.

**Live demo:** [https://tarikzaki.github.io/angular-ecommerce/](https://tarikzaki.github.io/angular-ecommerce/)

---

## Features

| Area | Description |
|------|-------------|
| **Authentication** | Login, register, JWT stored in cookies, functional route guards |
| **Home** | Main slider, popular categories, featured products |
| **Products** | Listing with search, sorting, pagination, and category/price filters — synced with URL query parameters for shareable links and persistent state across refreshes |
| **Categories** | Browse products by category |
| **Product details** | Single product view with add-to-cart |
| **Cart** | Cart items, quantity controls, order summary |
| **Checkout** | Cash-on-delivery order placement |
| **Orders** | View all past orders |
| **Shared UI** | Reusable navbar, footer, buttons, inputs, cards, and pipes |

---

## Tech Stack

- **Framework:** Angular 20 (standalone components, signals, lazy-loaded routes, `@if` / `@for` control flow)
- **Monorepo:** Nx 21 — 16 feature and shared libraries
- **Styling:** SCSS, Tailwind CSS, Angular Material
- **HTTP:** Angular HttpClient with custom interceptors
- **State:** Angular Signals, RxJS interop (`computed()`, `toSignal()`)
- **Unit tests:** Jest + jest-preset-angular
- **Linting:** ESLint + Prettier

---

## Architecture

The application is modularized into **16 Nx libraries** to isolate business domains, improve maintainability, and encourage code reuse. The shell app lazy-loads feature libraries and shares domain models and services across modules.

```
App (nxPractice)
├── Auth              Login, register, validators
├── Home              Landing page, slider, featured content
├── Products          Listing, filters, URL-synced query state
├── Product Details   Single product view
├── Categories        Category browsing
├── Cart              Items, summary, quantity controls
├── Checkout          Order placement
├── Orders            Order history
├── Services          Auth, cart, products, categories (REST API)
├── Guards            Auth, guest, and cart route protection
├── Interceptors      JWT header injection
├── Models            Shared TypeScript interfaces
└── UI                Navbar, footer, buttons, inputs, pipes
```

Libraries are imported via path aliases (e.g. `@org/services`, `@org/cart`).

---

## Getting Started

### Prerequisites

- **Node.js** 20.x (see `package.json` → `engine.node`)
- **npm**

### Installation

```bash
git clone https://github.com/TarikZaki/angular-ecommerce.git
cd angular-ecommerce
npm install
```

### Development server

```bash
npm start
```

Open [http://localhost:4200](http://localhost:4200). The app reloads on file changes.

### Production build

```bash
npm run build
```

Output is written to `dist/apps/nxPractice`.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Serve the app in development mode |
| `npm run build` | Production build |
| `npm test` | Run unit tests for the main app |
| `npm run test:all` | Run unit tests across all Nx projects |
| `npm run test:coverage` | Run all tests with coverage report |
| `npm run test:coverage:watch` | Coverage in watch mode |
| `npm run lint` | Lint the main application |

---

## Testing

This project uses **Jest** for unit testing across **16 Nx projects** with **38 test suites** and **93 tests**.

### Coverage summary

| Metric | Coverage |
|--------|----------|
| **Statements** | 84.12% |
| **Branches** | 66.16% |
| **Functions** | 69.81% |
| **Lines** | 83.17% |

The test suite focuses on business logic and reusable building blocks, including services, guards, validators, shared UI components, and checkout flows.

### Run tests locally

```bash
# All projects with coverage
npm run test:coverage

# Single project (example)
npx nx test services --coverage
npx nx test cart
```

After running coverage, open the interactive HTML report:

```
coverage/index.html
```

### What is tested

- **Components** — rendering, user interactions, template behavior
- **Services** — HTTP calls (with `HttpTestingController`), auth flow, cart logic
- **Guards** — route protection for authenticated and guest users
- **Validators** — custom form validation (e.g. confirm password)
- **Interceptors** — request header injection
- **Pipes** — error message formatting

Example test locations:

- `libs/services/src/lib/products/products.spec.ts`
- `libs/cart/src/lib/cart/cart.spec.ts`
- `libs/auth/src/lib/components/login/login.spec.ts`
- `libs/guards/src/lib/guards/auth-guard.spec.ts`

---

## Future Improvements

- Refresh token support
- Wishlist
- Online payment integration
- Product reviews
- E2E tests with Playwright
- CI pipeline with automated test runs and coverage reporting
- Increase branch coverage (guards, checkout service)

---

## Deployment

The app is deployed to **GitHub Pages** on push to `main` via GitHub Actions (`.github/workflows/deploy.yml`).

---

## License

MIT

---

## Author

**Tarek Zaki** — [GitHub](https://github.com/TarikZaki)
