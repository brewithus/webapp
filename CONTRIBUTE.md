# CONTRIBUTION GUIDE

## Getting Started

Welcome to the project! We're building an application using Next.js, TailwindCSS, and shadcn/ui. Here's a brief overview to help you get started with contributing:

- **Next.js:** We use Next.js for both our server-side and client-side rendering, leveraging its powerful features for SEO, performance, and developer experience. Familiarize yourself with the [Next.js Documentation](https://nextjs.org/docs) to understand how routing and page creation work. Pay special attention to the file structure under the `/pages` directory, as it directly correlates with the app's routing.

- **TailwindCSS:** Our styling is powered by TailwindCSS, a utility-first CSS framework that allows for rapid UI development. Our project customizes Tailwind's default configuration using the `tailwind.config.js` file and defines global styles in `styles/global.css`. Learn more about TailwindCSS by visiting the [official documentation](https://tailwindcss.com/docs). When contributing UI changes, ensure your modifications adhere to the established color themes and respond appropriately to both light and dark modes, as defined in our global CSS variables.

- **shadcn/ui:** We use components from shadcn/ui to build our UI efficiently. This library provides a set of customizable components that fit well with our design system. While you're encouraged to use and modify these components, please ensure your changes do not break existing functionalities. Check out the [shadcn/ui documentation](https://ui.shadcn.com/docs) for more information on available components and usage guidelines. Check the "pre-installed" components in `components/ui/` folder before install any new component.

## Branching Strategy and Pull Requests

- **Branching:** We operate with two main branches:

  - `prod` (Production Branch): Contains code ready for production deployment.
  - `latest` (Latest Development Branch): The primary development branch for all new features, enhancements, and fixes.

- **Contributing:** To contribute, branch off from `latest`, use descriptive branch names (e.g., `feature/add-coffee-shop-filters`), and submit a pull request (PR) back into `latest` once your work is complete. PRs require at least one review.

## Guidelines

- Adhere to the project's coding standards and guidelines.
- Focus branches on single features or fixes.
- Regularly sync with `latest` to minimize conflicts.
- Write clear, meaningful commit messages.
- Update documentation as needed.

By following these guidelines, you'll help maintain the quality and consistency of the project. Thank you for your contribution!
