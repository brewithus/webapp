# CONTRIBUTION GUIDE

## Branching Strategy and Pull Requests

Our project utilizes two main branches to manage the development and release of the application:

- **`prod` (Production Branch):** This branch contains code that has been fully tested and is ready to be deployed to production. It represents the stable version of our application.

- **`latest` (Latest Development Branch):** This branch serves as the primary development branch. All new features, enhancements, and bug fixes are merged into this branch before being considered for release.

### Contributing Through Pull Requests (PRs)

To contribute to the project, please follow these steps:

1. **Branch off from `latest`:** Always create your feature or bugfix branch from the `latest` branch. This ensures that you're working with the most recent development code.

2. **Naming Your Branch:** Use a descriptive name for your branch that reflects the feature or fix you're working on. For example, `feature/add-coffee-shop-filters` or `fix/map-display-issue`.

3. **Submitting a Pull Request:** Once your work is complete and tested locally, submit a pull request to merge your branch into the `latest` branch. Ensure your PR title and description clearly describe the changes and any implications they have on the project.

4. **Review Process:** Pull requests require a thorough review by at least one team member. This process ensures that all code is consistent with the project's standards and objectives. Feedback may be given, and revisions may be required before the PR is approved.

5. **Merging:** After your PR has been reviewed and approved, it will be merged into the `latest` branch. Periodically, after thorough testing and verification, changes from the `latest` branch will be merged into the `prod` branch for release.

### Guidelines

- Ensure your code adheres to the project's coding standards and guidelines.
- Keep your branches focused on a single feature or fix to simplify the review process.
- Regularly sync your branch with the `latest` branch to avoid conflicts.
- Provide detailed and meaningful commit messages.
- Document any changes or additions to the project's documentation as necessary.
