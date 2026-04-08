---
name: automated-architecture-governance-fitness-function-evaluator
description: Evaluate codebases against architectural fitness functions, governance files, and dependency rules to prevent architectural drift. Use when enforcing layering, cyclic dependency, or static metric thresholds in CI/CD or pre-commit checks.
---

# Automated Architecture Governance (Fitness Function Evaluator)

Evaluate structural rules and quantitative thresholds defined by architecture governance.

## When to Use

- CI/CD architectural gates
- Nightly governance checks
- Pre-commit architecture checks
- Audits of layering, cycles, or metric thresholds

## Workflow

1. Parse fitness functions.
   - Read governance files, architecture rules, and architecture-focused test suites.
   - Also inspect CI includes and validation jobs for executable governance that is not stored in a dedicated rules file.
   - Extract explicit thresholds and dependency rules.
2. Verify structure.
   - Detect forbidden cross-layer dependencies.
   - Detect cycles across packages, modules, or bounded contexts.
3. Evaluate metrics.
   - Check complexity, file size, and similar static thresholds.
   - Flag modules that exceed defined limits.
4. Report findings.
   - List failed fitness functions.
   - Include file paths, classes, and lines.
   - Distinguish between:
     - explicit architecture fitness functions that can fail the build
     - general CI governance that validates contracts, lint, or security
     - missing architecture rules, which should warn rather than fail if governance exists elsewhere
   - Provide CI-ready failure output and exit-code guidance.

## Rules

- Use static analysis, configuration files, and AST parsing only.
- Keep the analysis deterministic and language-agnostic where possible.
- Prefer explicit governance definitions over inferred conventions.
- Treat the absence of a dedicated architecture rules file as a warning if other executable governance exists in CI.
- Treat explicit violations of declared architecture fitness functions as fails.

## Shared Conventions

- Follow the repository-wide conventions in [shared-skill-conventions](../../references/shared-skill-conventions.md).
- Use the canonical output contract, severity levels, confidence rubric, routing rules, and false-positive downgrades defined there.
- If this skill is not the closest match, defer to the routing guidance in the shared conventions file.

## Output

Return:

- Failed fitness functions
- Structural dependency violations
- Metric threshold breaches
- CI-ready pass or fail output
