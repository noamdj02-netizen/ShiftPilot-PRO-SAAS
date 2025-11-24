# Contributing to ShiftPilot

Thank you for your interest in contributing to ShiftPilot! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/shiftpilot-saas.git`
3. Install dependencies: `pnpm install`
4. Create a branch: `git checkout -b feature/your-feature-name`

## Development Workflow

### Prerequisites

- Node.js 18+ or 20+
- pnpm 8+

### Setup

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start development server
pnpm dev
```

### Code Standards

- **TypeScript**: Strict mode enabled, no `any` types
- **ESLint**: All rules must pass
- **Prettier**: Code must be formatted
- **Commits**: Use [Conventional Commits](https://www.conventionalcommits.org/)

### Before Committing

```bash
# Run linter
pnpm run lint

# Format code
pnpm run format

# Type check
pnpm exec tsc --noEmit

# Run tests
pnpm run test
```

## Commit Guidelines

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

Examples:
```
feat: add AI planning algorithm
fix: resolve shift assignment bug
docs: update README installation steps
refactor: extract fetchData to custom hook
```

## Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all CI checks pass
4. Request review from maintainers
5. Address review feedback

## Project Structure

```
├── app/              # Next.js pages and API routes
├── components/       # React components
├── lib/              # Utilities and services
├── stores/           # Zustand state management
├── types/            # TypeScript type definitions
└── public/           # Static assets
```

## Questions?

Open an issue or contact the maintainers.

Thank you for contributing! 🚀
