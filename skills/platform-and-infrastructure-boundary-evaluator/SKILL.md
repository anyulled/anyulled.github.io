---
name: platform-and-infrastructure-boundary-evaluator
description: Enforce architectural boundaries between platform concerns and stream-aligned business logic. Use when reviewing core domain code for infrastructure bleed, cloud SDK leakage, or excessive deployment/configuration overhead.
---

# Platform and Infrastructure Boundary Evaluator

Audit business-domain code for infrastructure bleed and platform boundary violations.

## When to Use

- PR or MR reviews on core business logic
- CI checks for stream-aligned services
- Changes to application code, not platform or infra repositories

## Exclusions

- Skip repositories explicitly tagged `Platform`, `Infra`, or `DevOps`.

## Scope

- Scans: core business logic, cloud SDK imports, infrastructure APIs, package manifests, and deployment/configuration files that may leak platform details into stream-aligned code.
- Exclusions: platform-owned directories, DevOps or Infra repositories, and documentation-only references that do not affect runtime code paths.
- Fallback: if the codebase role is unclear, fall back to the shared conventions heuristic order and downgrade to warning with low confidence.
- Routing: defer independent-deployability concerns to Architectural Quantum and Deployability Validator and team-boundary signals to Team Topologies and Cognitive Load Analyzer.

## Workflow

1. Detect infrastructure bleed.
   - Scan domain source for vendor SDKs, orchestration clients, or inline provisioning code.
   - Flag direct cloud/provider usage inside business logic.
2. Measure configuration overhead.
   - Compare deployment/configuration volume with business code volume.
   - Flag repos where infra configuration dominates the application surface.
3. Check platform compliance.
   - Verify use of standardized platform APIs for logs, metrics, secrets, networking, and similar concerns.
   - Flag custom infrastructure implementations that bypass paved paths.
4. Report findings.
   - Emit file and line references.
   - Include a configuration overhead ratio.
   - Format output for CI/CD gating.

## Rules

- Use static analysis only.
- Keep analysis deterministic and language-agnostic.
- Prefer explicit repository boundary metadata when available.
- Treat vendor SDK imports in domain code as high severity.

## Shared Conventions

- Follow the repository-wide conventions in [shared-skill-conventions](../../references/shared-skill-conventions.md).
- Use the canonical output contract, severity levels, confidence rubric, routing rules, and false-positive downgrades defined there.
- If this skill is not the closest match, defer to the routing guidance in the shared conventions file.

## Output

Return JSON or Markdown with:

- Leaked infrastructure SDK usage
- Configuration overhead ratio
- Platform API compliance gaps
- CI-ready pass or fail result

## Template Source

Use [assets/platform_interaction_guide.md](assets/platform_interaction_guide.md) to direct developers toward approved platform interfaces.
