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

## Output

Return:

- Top zone-of-pain and zone-of-uselessness modules
- Coupling and instability metrics
- Architectural health summary
- CI-ready pass or fail output
