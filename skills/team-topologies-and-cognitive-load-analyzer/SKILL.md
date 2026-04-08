---
name: team-topologies-and-cognitive-load-analyzer
description: Infer Team Topologies signals from repository structure, dependencies, churn, and ownership clues. Use when assessing stream-aligned, platform, complicated-subsystem, or enabling boundaries, cognitive load hotspots, Conway's Law, or boundary friction from code alone.
---

# Team Topologies and Cognitive Load Analyzer

Infer likely team topology signals from codebase structure and change patterns.

## When to Use

- Reviews of repository structure or monorepo boundaries
- Refactoring or modernization planning
- Team boundary analysis from code, docs, and Git history only
- Checks for cognitive load, Conway's Law, and platform-vs-product separation

## Scope

- Scans: directory structure, package/module boundaries, dependency graphs, churn patterns, and ownership clues that can reveal stream-aligned, platform, enabling, or complicated-subsystem signals.
- Exclusions: generated/vendor folders, isolated test fixtures, and ambiguous mixed-concern files that do not represent stable team boundaries.
- Fallback: if team boundaries are unclear, apply the shared conventions fallback and report warning with low confidence.
- Routing: defer platform bleed into business logic to Platform and Infrastructure Boundary Evaluator and raw module coupling metrics to Structural Coupling and Volatility Analyzer.

## Workflow

1. Map repository areas.
   - Group source by module, namespace, directory, or package.
   - Identify candidate business domains, shared utilities, platform code, and complex subsystems.
2. Classify each area.
   - `stream-aligned`: business or feature code with narrow dependencies.
   - `platform`: reusable capabilities consumed by several areas, with stable public APIs.
   - `complicated subsystem`: dense algorithmic or domain-heavy code isolated behind a small surface.
   - `enabling`: tests, guardrails, docs, and tooling that reduce friction.
   - `shared/unclear`: mixed or overly broad areas that blur boundaries.
3. Estimate cognitive load.
   - Count incoming and outgoing dependencies.
   - Measure churn, package breadth, and number of responsibilities.
   - Flag modules that mix multiple concepts or require broad context to change safely.
4. Detect boundary friction.
   - Look for shared kernels, direct cross-domain imports, or infrastructure bleed.
   - Flag areas that force many unrelated files to change together.
   - Note where the code suggests collaboration is more coupled than it should be.
5. Report findings.
   - Return module classifications, load hotspots, and boundary-friction notes.
   - Include file and line references when possible.

## Rules

- Use static analysis only.
- Prefer repository structure, imports, tests, docs, and Git history over runtime inference.
- Do not infer org charts or team names unless the repository explicitly encodes them.
- Treat platform code as a candidate only when it is reusable, stable, and domain-agnostic.

## Shared Conventions

- Follow the repository-wide conventions in [shared-skill-conventions](../../references/shared-skill-conventions.md).
- Use the canonical output contract, severity levels, confidence rubric, routing rules, and false-positive downgrades defined there.
- If this skill is not the closest match, defer to the routing guidance in the shared conventions file.

## Output

Return Markdown or JSON with:

- Likely `stream-aligned`, `platform`, `complicated subsystem`, and `enabling` areas
- Cognitive load hotspots
- Conway-style boundary friction signals
- Files and lines supporting each conclusion
