---
applyTo: "/api/**"
---

# Copilot Instructions for Nomadi API

## Project Overview

**Nomadi** is a modular, production-focused SaaS starter using the MEAN stack (MongoDB, Express, Angular, Node.js) with Azure-first infrastructure.

**You will be working primarily in the `api/` directory, which contains the Node.js/Express REST API (TypeScript) Backed.**

## Build & Test Commands

- **API** (from `api/`):
  - `npm install` — install dependencies
  - `npm run start` — start dev server
  - `npm run build` — build for production
  - `npm run test` — run tests
  - `npm run lint` — lint code
  - `npm run watch` — dev with nodemon/TypeScript
  - `npm run docker:build` / `npm run docker:up` — Docker workflows

## Conventions & Patterns

- Use ES module syntax and TypeScript throughout
- Each file starts with a one-line comment of its path/filename (if present)
- Comments describe purpose, not effect; add only where not obvious
- Modular, DRY, and secure code; refactor and extract functions as needed
- Use latest Node/ES features; add `TODO:` comments for incomplete code
- Centralized error handling in `api/src/models/errors.model.ts`
- Auth via Passport.js, configured in `api/src/config/passport.config.ts`
- API routes defined in `api/src/routes/`

## Libraries

- **Express**: Web framework for Node.js (`express`, `express-async-errors`, `express-rate-limit`, `express-session`)
- **Mongoose**: MongoDB object modeling (`mongoose`)
- **Passport.js**: Authentication middleware (`passport`, `passport-local`, `passport-github2`, `passport-google-oauth20`)
- **Azure SDK**: Azure Cosmos DB and Identity (`@azure/arm-cosmosdb`, `@azure/identity`)
- **LangChain**: LLM and AI integration (`langchain`, `@langchain/core`, `@langchain/groq`)
- **Application Insights**: Azure monitoring (`applicationinsights`)
- **Session & Auth**: `connect-mongo`, `cookie-parser`, `cors`, `dotenv`, `bcryptjs`
- **Swagger UI Express**: API documentation (`swagger-ui-express`)
- **TypeScript**: Type-safe development (`typescript`, `tslib`)
- **ESLint**: Linting (`eslint`, `@eslint/js`, `typescript-eslint`)
- **Nodemon/ts-node-dev**: Dev server and hot reload (`nodemon`, `ts-node-dev`)
- **JSDoc/Types**: Type definitions for Node, Express, Passport, etc. (`@types/*`)
- **Morgan**: HTTP request logging (`morgan`)

> **Note:**
>
> - All libraries are up-to-date as per `api/package.json`. Add or update as needed for new features.

## AI / LLM Rule to Follow

1. When using agent mode, verify newer code using context7.
2. If necessary, provide options/solutions based on recommendations and best practices.

---

**When in doubt, prefer clarity, modularity, and alignment with the above conventions.**
