# Collaboration Workflow

## Branch Protection (configure on GitHub)
- Protect main: require PRs, at least 1 approval, and passing CI
- Optionally protect develop similarly

## Branch Strategy
- main: stable releases
- develop: integration branch
- feature/*: new features from develop
- fix/*: bugfix branches
- chore/*, docs/*: maintenance

## PR Process
1. Branch from develop
2. Commit with Conventional Commits
3. Push and open PR to develop
4. Ensure CI passes and request review
5. Squash merge with conventional title

## Release Process
- Merge develop into main with a release PR
- Tag release: vX.Y.Z

## Naming Conventions
- Branches: type/scope-description (e.g., feat/auth-login)
- Commits: type(scope): subject

