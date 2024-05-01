# CONTRIBUTION GUIDE

## Summary

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Branching Strategy and Pull Requests](#branching-strategy-and-pull-requests)
- [Project Structure](#project-structure)
- [Commit Style Guide](#commit-style-guide)
- [Coding Standards](#coding-standards)

## Getting Started

Welcome to the project! We are developing a web application using technologies such as Next.js, TailwindCSS, and shadcn/ui. This guide provides you with all the information you need to start contributing effectively.

### Key Technologies

- **[Next.js](https://nextjs.org/docs)**: Used for both server-side and client-side rendering.
- **[TailwindCSS](https://tailwindcss.com/docs)**: A utility-first CSS framework used for rapid UI development.
- **[shadcn/ui](https://ui.shadcn.com/docs)**: A library of customizable UI components.

## Prerequisites

- **Docker and Docker-compose** installed, or
- **Node.js** v20.x/v21.x if you're developing locally.

### Setting up your development environment

1. Clone the repo:
   ```
   git clone https://github.com/brewithus/webapp.git
   ```
2. Check out your branch:
   ```
   git checkout your-branch-name
   ```
3. To start the application:

- With Docker:
  ```
  docker-compose up -d
  ```
- Locally:
  ```
  npm install
  npm run dev
  ```

## Branching Strategy and Pull Requests

- **Main Branches**:
  - `prod`: Production-ready code.
  - `latest`: Active development branch.

### Contributing:

- Branch off from `latest`.
- Use descriptive names for your branches (e.g., `feature/add-coffee-shop-filters`).
- Submit a pull request (PR) to `latest` for review.

## Project Structure

- `/app`: Layouts and pages with file-based routing.
- `/components`: Reusable components.
- `/config`: Configuration files.
- `/content`: Content files, primarily MDX.
- `/hooks`: Reusable hooks.
- `/lib`: Utility functions.
- `/public`: Public assets.
- `/styles`: Styling files.
- `/types`: TypeScript types.

## Commit Style Guide

- **Format**: `$type($scope): $message`
- **Example**: `docs: add commit style guide`
- **Length**: Maximum of 98 characters.

```
<type>(<scope>): <short summary>
  │       │             │
  │       │             └─⫸ a short, imperative tense description of the change
  │       │
  │       └─⫸ Commit Scope (optional)
  │
  └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|test
```

### Commit Types:

- `build`: Changes that affect the build system.
- `ci`: Changes to our CI configuration.
- `docs`: Documentation changes.
- `feat`: New feature.
- `fix`: Bug fix.
- `perf`: Performance improvement.
- `refactor`: Code refactoring.
- `test`: Adding or fixing tests.

### Automated Checks:

- **Formatting**: Run `npm run format` to apply Prettier formatting.
- **Linting**: Run `npm run lint` to check for issues. Use `npm run lint:fix` to auto-fix many issues, but review changes.

## Coding Standards

- Follow project-specific coding conventions.
- Use ESLint for type-checking.
- Ensure all code changes match the existing code style.
