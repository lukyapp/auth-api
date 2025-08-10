# 🔐 POC Authentication Service with Hexagonal Architecture

A authentication proof-of-concept (POC) project showcasing clean architecture principles with Hexagonal Architecture (Ports & Adapters) in TypeScript. This project demonstrates how to build a flexible project that can be easy to maintain.

## 🏗️ Project Structure

The project follows Hexagonal Architecture with clear separation of concerns:

```
.
├── application/    # Application services and use cases (business rules)
├── domain/         # Core domain models and ports
├── infra/          # Infrastructure adapters (can be memory adapters, database, external services, librairie adaptersetc.)
├── di/             # Dependency injection core lib to works with nestjs and adonis
├── core/           # Cross-cutting concerns and utilities
├── apps/           # Framework-specific applications
│   ├── nest/       # NestJS implementation
│   └── adonis/     # AdonisJS implementation
└── validation/     # Validation utils
```

## 🎯 Features

- [x] JWT-based authentication
  - [x] Local JWT strategy
  - [x] OAuth integration (Google)
  - [ ] Token refresh mechanism
- [ ] Role-based access control (RBAC)
  - [ ] Basic role management
  - [ ] Permission system
- [x] Framework-agnostic core
  - [x] Clean architecture implementation
  - [x] Dependency injection
- [x] Multiple web frameworks
  - [x] NestJS implementation
  - [ ] AdonisJS implementation (Guard not implemented yet)
- [ ] Test coverage
  - [ ] Unit tests
  - [ ] Integration tests
  - [ ] E2E tests
- [ ] Docker support
- [x] OpenAPI/Swagger documentation (In NestJS apps only)
- [x] Secure password hashing

## 🛠️ Technologies & concepts

- **Core**: TypeScript, Node.js
- **Architecture**: Hexagonal Architecture (Ports & Adapters)
- **Frameworks**: NestJS, AdonisJS
- **Authentication**: JWT
- **Testing**: Jest

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/lukyapp/auth-api.git
   cd auth-api
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Copy and configure environment variables:
   ```bash
   cp .env.example .env
   ```

### Running the Application

#### NestJS
```bash
cd apps/nest
pnpm start:dev
```

#### AdonisJS
```bash
cd apps/adonis
pnpm run dev
```

## 📚 Documentation

API documentation is available at `http://localhost:3000/docs` (From NestJS app) when the application is running.

## 🧪 Testing (No tested yet)

Run tests with coverage:
```bash
pnpm test
```

## 📄 License

None

## 🔗 Connect

Project Link: [https://github.com/lukyapp/auth-api](https://github.com/lukyapp/auth-api)