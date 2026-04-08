---
name: dynamic-connascence-and-execution-state-evaluator
description: Analyze asynchronous code, state machines, and temporal dependencies to detect dynamic connascence, race conditions, and fragile execution order requirements. Use when reviewing async workflows, multithreaded code, event handlers, or mutable state.
---

# Dynamic Connascence and Execution State Evaluator

Analyze runtime coupling risks that arise from execution order, timing, and shared values.

## When to Use

- PR or MR reviews involving async workflows
- Event-driven consumers and workers
- State machine changes
- Multithreaded or concurrent code
- Shared constants or validation rules that may drift

## Scope

- Scans: asynchronous workers, state machines, event handlers, mutable state, and timing-sensitive code paths that create temporal coupling.
- Exclusions: synchronous-only helpers, generated code, and deliberate orchestration that is already covered by a higher-level workflow contract.
- Fallback: if execution order is ambiguous, fall back to the shared conventions heuristic order and downgrade to warning with low confidence.
- Routing: defer multi-service orchestration to Distributed Workflow and Integration Analyzer and cross-boundary interface coupling to Integration Strength and Micro-Coupling Evaluator.

## Workflow

1. Detect connascence of execution.
   - Find methods that require a strict call order, such as `init()` before `process()`.
   - Flag partial object setup exposed to callers.
2. Detect connascence of timing.
   - Inspect async flows for race conditions and hidden ordering assumptions.
   - Flag code that depends on parallel tasks finishing without explicit coordination.
3. Detect connascence of value.
   - Find duplicated magic numbers, string limits, or schema values that must change together.
   - Recommend centralized constants or schema definitions.
4. Report findings.
   - Return a deterministic JSON or Markdown report.
   - Include file paths and required execution order where relevant.

## Rules

- Use static analysis and AST parsing only.
- Do not execute code or run tests.
- Keep analysis language-agnostic and deterministic.

## Shared Conventions

- Follow the repository-wide conventions in [shared-skill-conventions](../../references/shared-skill-conventions.md).
- Use the canonical output contract, severity levels, confidence rubric, routing rules, and false-positive downgrades defined there.
- If this skill is not the closest match, defer to the routing guidance in the shared conventions file.

## Output

Return:

- Execution-order violations
- Timing-coupling risks
- Shared-value drift risks
- CI-ready pass or fail output
