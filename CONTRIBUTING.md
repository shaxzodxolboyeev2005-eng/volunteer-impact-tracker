# Contributing to Volunteer Impact Tracker

## Branching Strategy

- \main\ — production-ready code
- \develop\ — integration branch
- \eature/xxx\ — new features
- \ix/xxx\ — bug fixes

## Workflow

1. Create branch from \develop\
2. Write tests first (TDD)
3. Implement feature
4. Ensure all 28 tests pass
5. Submit Pull Request to \develop\

## Commit Convention

\\\
feat: add new feature
fix: bug fix
docs: documentation
test: add tests
chore: maintenance
\\\

## Code Standards

- All new features must have tests
- Run \
pm test\ before committing
- Run \
pm audit\ for security check
- Follow existing code structure
