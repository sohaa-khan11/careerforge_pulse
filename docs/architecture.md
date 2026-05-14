# CareerForge Pulse Architecture

## Overview
CareerForge Pulse is built using a clean, scalable monorepo architecture. 

## Structure
- **`/frontend`**: Next.js App Router for the UI layer. Uses Tailwind CSS, Framer Motion, and Recharts.
- **`/backend`**: Lightweight Node.js/Express API handling orchestration and integration.
- **`/shared`**: Centralized TypeScript types, enums, and Zod schemas.
- **`/prompts`**: Externalized LLM prompt templates (Markdown).
- **`/configs`**: Shared configurations for linting, formatting, etc.

## Flow
1. **Frontend** captures the user's resume and target role.
2. **Backend** processes the document using the appropriate prompts from `/prompts`.
3. LLM responds with data structured according to the schemas in `/shared`.
4. **Backend** calculates scores and returns the JSON payload.
5. **Frontend** visualizes the data on the Dashboard.
