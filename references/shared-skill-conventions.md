# Shared Skill Conventions

This file is the repository-wide source of truth for conventions used by the 16 skills in `architecture-guardrails-skills`.

## Purpose

The skills in this repository should behave consistently across repositories, agents, and operating environments. They should:

- use deterministic static analysis
- report evidence in a machine-consumable way
- avoid duplicate findings across neighboring skills
- prefer warnings with low confidence when the boundary is unclear

## Canonical Output Contract

Skills should return Markdown or JSON using the same logical fields:

- `skill`
- `status` (`pass`, `warning`, `fail`)
- `severity`
- `confidence` (`high`, `medium`, `low`)
- `summary`
- `findings[]`
  - `id`
  - `category`
  - `file`
  - `line`
  - `evidence`
  - `rationale`
  - `remediation`
- `metrics`
- `assumptions`
- `limitations`

## Default Severity Rules

- `fail` when the skill detects an explicit and unambiguous rule violation
- `warning` when there is a strong signal but the evidence is partial, heuristic, or context-sensitive
- `pass` when no material issue is found

## Confidence Rules

- `high`: direct file evidence and deterministic match
- `medium`: strong pattern match, but not exhaustive
- `low`: heuristic inference or incomplete boundary detection

## Module and Boundary Detection

Use this order when identifying modules, services, or bounded contexts:

1. explicit build/module files
2. top-level service or feature directories
3. namespace or package roots
4. file-name or path heuristics
5. if still unclear, report `warning` with `low` confidence

Preferred signals:

- `pom.xml`, `package.json`, `go.mod`, `Cargo.toml`, `*.csproj`, `build.gradle`
- `src/`, `tests/`, `docs/`, `infra/`, `scripts/`, `references/`
- `AGENTS.md`, `ARCHITECTURE.md`, ADR folders, docs indexes

## Trigger Defaults

Skills should prioritize these scan roots and patterns unless a skill says otherwise:

- source: `src/`, `tests/`
- docs: `docs/`, `README.md`, `ARCHITECTURE.md`, `AGENTS.md`
- infra/config: `infra/`, `docker-compose.yml`, `k8s/**`, `helm/**`, CI workflow files
- manifests: `pom.xml`, `package.json`, `go.mod`, `Cargo.toml`, `*.csproj`
- contracts: `docs/contracts/`, `**/*.avsc`, `**/*.proto`, `**/*.asyncapi.*`

## Overlap and Routing

Use the nearest skill for the symptom being evaluated:

- `Decision Log & ADR Tracer` for decision completeness and architecture documentation gaps
- `Automated Software Guidebook Generator` for living guidebook structure and documentation freshness
- `Automated Architecture Governance (Fitness Function Evaluator)` for explicit architecture rules and thresholds
- `Team Topologies and Cognitive Load Analyzer` for stream-aligned/platform/enabling/complicated-subsystem signals and cognitive load
- `Structural Coupling & Volatility Analyzer` for module-level Ca/Ce, instability, abstractness, and distance from the main sequence
- `Complexity and Code Health Analyzer` for method-level complexity, connascence, and churn hotspots
- `Integration Strength and Micro-Coupling Evaluator` for public-interface coupling across module boundaries
- `Dynamic Connascence and Execution State Evaluator` for local execution order, timing, and state-machine fragility
- `Distributed Workflow and Integration Analyzer` for inter-service sync chains, sagas, and operational coupling
- `Event-Driven Architecture (EDA) Integrity Evaluator` for payload autonomy, broker entanglement, and consumer autonomy
- `Data and Database Coupling Evaluator` for shared tables, ORM leakage, and database ownership
- `Platform and Infrastructure Boundary Evaluator` for infrastructure bleed into business logic
- `Architectural Quantum and Deployability Validator` for independently deployable units and distributed-monolith risk
- `Domain Boundary and Language Integrity Evaluator` for bounded contexts, ubiquitous language, ACLs, and shared-kernel safety
- `Component Extraction and Tactical Forking Analyzer` for extraction candidates and shared-kernel entanglement
- `Testability and Automation Architecture Evaluator` for brittle tests, seam alignment, and implementation-detail coupling

## False-Positive Downgrades

Downgrade to `warning` unless the evidence is strong and repeated:

- benchmark or load-test scripts that are intentionally large
- shared technical wrappers that are reusable and domain-agnostic
- documented contract envelopes or stable transport DTOs
- sample applications or reference implementations
- heuristic module inference when the repo has weak boundaries or mixed conventions

## Suggested Markdown/JSON Skeleton

```json
{
  "skill": "skill-name",
  "status": "warning",
  "severity": "medium",
  "confidence": "low",
  "summary": "Short explanation.",
  "findings": [
    {
      "id": "F001",
      "category": "boundary",
      "file": "path/to/file",
      "line": 42,
      "evidence": "Relevant excerpt or rule match.",
      "rationale": "Why this matters.",
      "remediation": "Concrete next step."
    }
  ],
  "metrics": {},
  "assumptions": [],
  "limitations": []
}
```

## Usage

Each skill should reference this file from `SKILL.md` and rely on it for shared conventions. The skill file should keep only the task-specific workflow and any skill-specific exceptions.
