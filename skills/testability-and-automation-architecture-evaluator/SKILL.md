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

## Scope

- Scans: test suite source files, mocking frameworks, dependency injection setup, and setup/teardown code that reveal architectural seams in tests.
- Exclusions: pure helper functions within the same file, generated fixtures, and coverage percentage alone without structural evidence.
- Fallback: if a seam or boundary is unclear, use the shared conventions heuristic order and downgrade to warning with low confidence.
- Routing: defer interface-coupling analysis to Integration Strength and Micro-Coupling Evaluator and domain-boundary mapping to Domain Boundary and Language Integrity Evaluator.

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

## Shared Conventions

- Follow the repository-wide conventions in [shared-skill-conventions](../../references/shared-skill-conventions.md).
- Use the canonical output contract, severity levels, confidence rubric, routing rules, and false-positive downgrades defined there.
- If this skill is not the closest match, defer to the routing guidance in the shared conventions file.

## Output

Return:

- Implementation-detail coupling findings
- Shared-state or temporal-coupling risks
- Seam and stub mismatches
- CI-ready pass or fail output
