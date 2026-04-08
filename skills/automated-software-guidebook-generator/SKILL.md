---
name: automated-software-guidebook-generator
description: Generate and maintain a living software guidebook by scanning repository code, infrastructure, deployment files, and docs. Use when periodic documentation updates are needed, especially after IaC, deployment script, or major release changes.
---

# Automated Software Guidebook Generator

Generate and keep a repository guidebook current from code and documentation.

## When to Use

- Weekly or sprint-end documentation reviews
- Major releases
- IaC, deployment, or build script changes
- Repositories where architecture docs must stay current with minimal overhead

## Required Sections

Validate that the guidebook includes:

- Context
- Functional Overview
- Quality Attributes
- Constraints
- Principles
- Software Architecture
- Infrastructure Architecture
- Deployment
- Operation and Support
- Development Environment

## Workflow

1. Validate structure.
   - Check `docs/` and top-level markdown such as `README.md`.
   - Flag missing required sections.
2. Extract infrastructure and deployment facts.
   - Inspect IaC, container, and deployment scripts.
   - Map runtime, environment, logging, monitoring, and diagnostics.
3. Map principles and constraints.
   - Read configuration, lint rules, framework choices, and repository conventions.
   - Derive protocols, formats, layering, dependency, and style constraints.
4. Report and draft.
   - List outdated or missing sections.
   - Produce markdown drafts for absent sections.

## Rules

- Use static analysis only.
- Prefer repository truth over inferred intent.
- Treat docs as living artifacts: update the smallest relevant section first.
- Do not invent infrastructure details that are not supported by files.

## Shared Conventions

- Follow the repository-wide conventions in [shared-skill-conventions](../../references/shared-skill-conventions.md).
- Use the canonical output contract, severity levels, confidence rubric, routing rules, and false-positive downgrades defined there.
- If this skill is not the closest match, defer to the routing guidance in the shared conventions file.

## Output

Return a structured report with:

- Missing guidebook sections
- Outdated sections
- Extracted facts for deployment and operations
- Draft markdown for missing content

## Template Source

Use the bundled template in [assets/guidebook_template.md](assets/guidebook_template.md).
