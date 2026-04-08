---
name: decision-log-adr-tracer
description: Audit repositories for major technology additions and verify that corresponding ADR or decision-log entries exist. Use when reviewing dependency manifest changes, architecture shifts, or code reviews that may introduce new frameworks, databases, or libraries without documentation.
---

# Decision Log & ADR Tracer

Audit repositories for undocumented architectural or technology shifts.

## When to Use

- Dependency manifest changes
- PR or MR reviews
- CI checks for architecture governance
- Reviews of new frameworks, databases, or major libraries

## Workflow

1. Detect technology shifts.
   - Inspect package manifests such as `package.json`, `pom.xml`, `requirements.txt`, `go.mod`, and similar files.
   - Scan imports and references for new major frameworks, databases, or third-party libraries.
2. Validate documentation.
   - Check `docs/adr/`, `DECISION_LOG.md`, `architecture.md`, or equivalent decision records.
   - Confirm the entry explains context, rationale, alternatives, and trade-offs.
3. Report gaps.
   - Flag new major technology with no matching ADR or decision-log entry.
   - Flag incomplete decision records that do not explain why the choice was made.

## Rules

- Use static analysis only.
- Prefer deterministic signals from manifests and docs over inference.
- Treat minor version bumps and routine maintenance as out of scope unless they change architecture materially.
- If a new dependency is clearly structural, require documentation.

## Shared Conventions

- Follow the repository-wide conventions in [shared-skill-conventions](../../references/shared-skill-conventions.md).
- Use the canonical output contract, severity levels, confidence rubric, routing rules, and false-positive downgrades defined there.
- If this skill is not the closest match, defer to the routing guidance in the shared conventions file.

## Output

Return a concise compliance report with:

- Detected technology shifts
- Matching ADR or decision-log entries
- Missing or incomplete documentation
- A draft ADR template when documentation is absent

## Template Source

Use the bundled template in [assets/adr_template.md](assets/adr_template.md) when a new decision record is missing.
