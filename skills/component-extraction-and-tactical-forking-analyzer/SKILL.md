---
name: component-extraction-and-tactical-forking-analyzer
description: Analyze monolithic codebases to identify extraction candidates, shared-kernel entanglement, and tactical forking effort. Use when planning modernization or breaking a monolith into independently deployable domains.
---

# Component Extraction and Tactical Forking Analyzer

Identify bounded contexts that are suitable for extraction from a monolith.

## When to Use

- Modernization or decomposition planning
- Legacy monolith audits
- Pre-extraction feasibility studies
- Domain boundary or context-map reviews

## Scope

- Scans: namespace and directory structures, cross-domain imports, and shared Common/Shared/Core/Utils directories to identify extraction candidates.
- Exclusions: benign technical shared code, generated/vendor code, and sample or reference repos that are not candidates for extraction.
- Fallback: if domain ownership is unclear, apply the shared conventions heuristic order and report a warning with low confidence.
- Routing: defer bounded-context leakage to Domain Boundary and Language Integrity Evaluator and module-level coupling health to Structural Coupling and Volatility Analyzer.

## Workflow

1. Map domain components.
   - Group code by namespace or directory.
   - Compare internal cohesion with external coupling.
2. Identify shared-kernel entanglement.
   - Trace dependencies into `Common`, `Shared`, `Core`, or `Utils`.
   - Separate benign helpers from malignant shared domain state.
3. Estimate tactical forking effort.
   - Simulate a fork for the best candidate.
   - Count severed references, broken dependencies, and entangled classes.
4. Report findings.
   - Rank the top extraction candidates.
   - Provide an extraction effort score and blocker summary.

## Rules

- Use static analysis and AST dependency graphs only.
- Do not mutate files or simulate changes beyond analysis.
- Keep the analysis deterministic and language-agnostic.

## Shared Conventions

- Follow the repository-wide conventions in [shared-skill-conventions](../../references/shared-skill-conventions.md).
- Use the canonical output contract, severity levels, confidence rubric, routing rules, and false-positive downgrades defined there.
- If this skill is not the closest match, defer to the routing guidance in the shared conventions file.

## Output

Return:

- Top extraction candidates
- Shared-kernel blockers
- Tactical forking effort score
- CI-ready or planning-ready markdown/JSON report
