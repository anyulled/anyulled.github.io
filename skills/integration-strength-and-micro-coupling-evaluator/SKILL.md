---
name: integration-strength-and-micro-coupling-evaluator
description: Analyze method signatures, shared state, and cross-module interactions for content, common, control, and stamp coupling. Use when reviewing public interfaces, shared state variables, or module boundaries.
---

# Integration Strength and Micro-Coupling Evaluator

Detect fine-grained coupling that weakens encapsulation across module boundaries.

## When to Use

- PRs that modify public methods
- Cross-module invocation changes
- Shared state or global variable changes
- Reviews focused on encapsulation or dependency injection

## Scope

- Scans: public method signatures, cross-module calls, shared mutable state, and argument structures at module boundaries.
- Exclusions: private helpers, same-class internals, and stable transport DTOs that are explicitly used as boundary contracts.
- Fallback: if coupling is borderline, apply the shared conventions fallback and downgrade to warning with low confidence unless the violation is explicit.
- Routing: defer timing and execution-order coupling to Dynamic Connascence and Execution State Evaluator and brittle seam placement in tests to Testability and Automation Architecture Evaluator.

## Workflow

1. Detect content and common coupling.
   - Find direct private-state access, reflection-based bypasses, and shared mutable globals.
   - Treat these as high-severity violations.
2. Detect control coupling.
   - Flag control flags, enums, and branch-driving parameters passed across module boundaries.
   - Identify callers that dictate receiver execution paths.
3. Detect stamp coupling.
   - Find large objects passed where only a small subset of fields is used.
   - Prefer narrow DTOs or primitives.
   - Downgrade deliberate orchestration/status envelopes to warning when they are documented, stable, and limited to transport or pipeline boundaries.
4. Report findings.
   - Include files, line numbers, flags, and consumed fields.
   - Format output for CI or review bots.

## Rules

- Use static analysis and AST parsing only.
- Do not execute code.
- Restrict analysis to public interfaces and cross-module boundaries.
- Ignore private helper functions inside the same class or file.
- Do not treat internal workflow status enums as a fail if they are part of an explicit, documented pipeline contract.
- Prefer warning when the coupling is intentional, bounded, and already absorbed by a public event or orchestration boundary.

## Shared Conventions

- Follow the repository-wide conventions in [shared-skill-conventions](../../references/shared-skill-conventions.md).
- Use the canonical output contract, severity levels, confidence rubric, routing rules, and false-positive downgrades defined there.
- If this skill is not the closest match, defer to the routing guidance in the shared conventions file.

## Output

Return:

- Content and common coupling violations
- Control coupling findings
- Stamp coupling hotspots
- CI-ready pass or fail output
