# Contributing to NASCON Event Management System

Thanks for your interest in contributing! Please read this guide to get started.

## Branching Strategy
- main: always releasable
- develop: integration branch for upcoming release
- feature/*: feature branches from develop
- chore/*, fix/*, docs/*: maintenance branches as needed

## Commit Messages
- Use Conventional Commits: feat:, fix:, docs:, chore:, refactor:, test:, ci:
- Scope is optional, e.g., feat(auth): add refresh tokens
- Keep subject under 72 chars; add body if needed

## Pull Requests
- Create PRs into develop (or main for hotfixes)
- Fill PR template, link issues, and include screenshots for UI changes
- Ensure CI passes and add tests when applicable

## Code Style
- Frontend: React + TS, Vite, Tailwind
- Backend: Node + Express, MySQL (mysql2/promise)
- Run linters/formatters before committing

## Environment
- Copy nascon-app/server/env.example to nascon-app/server/.env and configure
- Do not commit secrets

## Running Locally
- From root: npm run install-all
- Start dev: npm run dev

## Issues
- Use issue templates and labels (bug, feature, chore)

## Security
- See SECURITY.md for reporting vulnerabilities

## License
- MIT

