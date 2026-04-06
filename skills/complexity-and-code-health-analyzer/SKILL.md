---
name: complexity-and-code-health-analyzer
description: Analyze structural complexity, code churn, and static connascence to identify high-risk hotspots. Use when auditing complexity thresholds, refactoring candidates, or CI gating for code health.
---

# Complexity and Code Health Analyzer

Identify structural hotspots by combining complexity, connascence, and churn data.

## When to Use

- Routine code quality audits
- Pre-refactor planning
- CI gates for complexity thresholds
- Volatility and technical-debt reviews

## Workflow

1. Calculate complexity.
   - Compute cyclomatic and cognitive complexity for public methods and classes.
   - Flag god classes and threshold violations.
2. Evaluate static connascence.
   - Detect position, meaning, and type coupling.
   - Flag magic numbers, brittle argument ordering, and dynamic typing across boundaries.
3. Overlay churn.
   - Compute separate scores for structural complexity and version-control volatility.
   - Flag critical hotspots only when both scores are materially high or when one score is extreme and the other is non-trivial.
   - Treat large but stable benchmark/load scripts as operational hotspots, not automatically as architectural debt.
4. Report findings.
   - Return the most complex methods and classes.
   - Include both complexity and volatility scores, plus a combined hotspot classification.

## Rules

- Use static analysis, AST parsing, and version-control logs only.
- Keep the analysis deterministic and language-agnostic.
- Use team-defined thresholds when available.
- Do not label a file as a critical hotspot from size alone.
- If a file is large but historically stable, downgrade to warning unless the code is also structurally complex.

## Output

Return:

- Top complex methods and classes
- Critical hotspots from complexity/churn overlay
- Static connascence findings
- CI-ready pass or fail output
