---
name: structural-coupling-and-volatility-analyzer
description: Evaluate package- and module-level coupling, instability, abstractness, and distance from the main sequence. Use when monitoring architectural health, refactoring dependency structure, or enforcing coupling thresholds in CI.
---

# Structural Coupling and Volatility Analyzer

Measure macro-level dependency health across modules and bounded contexts.

## When to Use

- Periodic architectural health checks
- Major refactoring initiatives
- CI gates for dependency drift
- Package or module boundary audits

## Scope

- Scans: package and module dependency graphs, import statements, package declarations, and version-control churn needed to compute Ca, Ce, instability, abstractness, and distance from the main sequence.
- Exclusions: generated/vendor code and local refactors that do not change the external dependency graph materially.
- Fallback: if module boundaries are weak or inconsistent, use the shared conventions heuristic order and downgrade to warning with low confidence.
- Routing: defer method-level connascence and complexity to Complexity and Code Health Analyzer and extraction planning to Component Extraction and Tactical Forking Analyzer.

## Workflow

1. Calculate coupling.
   - Compute afferent coupling (Ca) and efferent coupling (Ce).
   - Flag modules with extreme inbound or outbound dependency counts.
2. Evaluate resilience.
   - Compute instability and abstractness for major modules.
   - Identify stable-but-concrete or abstract-but-unstable modules.
3. Measure distance from the main sequence.
   - Calculate distance and flag zone-of-pain or zone-of-uselessness violations.
4. Report findings.
   - Return the top problematic modules.
   - Include Ca, Ce, I, A, D, plus a separate volatility signal from git history.

## Rules

- Use static analysis, AST parsing, and import-graph evaluation only.
- Keep the analysis deterministic and language-agnostic.
- Prefer module-level architecture boundaries over file-level noise.
- Do not infer volatility from file size alone.
- Treat central shared modules as structural anchors rather than failures unless they are both concrete and unstable.

## Shared Conventions

- Follow the repository-wide conventions in [shared-skill-conventions](../../references/shared-skill-conventions.md).
- Use the canonical output contract, severity levels, confidence rubric, routing rules, and false-positive downgrades defined there.
- If this skill is not the closest match, defer to the routing guidance in the shared conventions file.

## Output

Return:

- Top zone-of-pain and zone-of-uselessness modules
- Coupling and instability metrics
- Architectural health summary
- CI-ready pass or fail output
