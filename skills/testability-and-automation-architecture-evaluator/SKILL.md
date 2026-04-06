---
name: testability-and-automation-architecture-evaluator
description: Evaluate test suite architecture for brittle coupling to implementation details, shared state, and poor seam alignment. Use when reviewing tests, mocking strategies, or integration test isolation.
---

# Testability and Automation Architecture Evaluator

Analyze test architecture for isolation, seam quality, and implementation coupling.

## When to Use

- PRs that add or refactor tests
- Periodic test-suite health audits
- Changes to mocking, fixtures, or integration setup

## Workflow

1. Detect implementation-detail coupling.
   - Flag tests that target private methods, internals, or reflection-heavy hacks.
   - Prefer assertions through public APIs and architectural boundaries.
2. Analyze state isolation.
   - Flag shared databases, global mutable state, and missing rollback or container isolation.
   - Detect temporal coupling between tests.
3. Check seam alignment.
   - Verify mocks and stubs match real boundaries such as HTTP clients, repositories, or adapters.
   - Flag mocking of the subject under test or other invalid test doubles.
4. Report findings.
   - Return file paths and line numbers for severe coupling.
   - Format output for CI/CD or review bots.

## Rules

- Use static analysis only.
- Do not evaluate coverage percentages.
- Focus on architectural test structure, not line-by-line style.

## Output

Return:

- Implementation-detail coupling findings
- Shared-state or temporal-coupling risks
- Seam and stub mismatches
- CI-ready pass or fail output
