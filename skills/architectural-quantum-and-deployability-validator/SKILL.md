---
name: architectural-quantum-and-deployability-validator
description: Calculate architecture quantum and detect distributed monolith risks by analyzing synchronous service dependencies, shared databases, and IaC. Use when reviewing cross-service calls, shared schemas, or independent deployability concerns.
---

# Architectural Quantum and Deployability Validator

Analyze service boundaries to verify independent deployability and isolation.

## When to Use

- Periodic architecture reviews
- PRs introducing cross-service synchronous calls
- PRs introducing shared database usage
- Microservice deployability audits

## Workflow

1. Map synchronous dependencies.
   - Trace HTTP, gRPC, and similar outbound calls on critical paths.
   - Merge services into one quantum when a downstream dependency is required at runtime.
2. Detect shared data stores.
   - Inspect connection strings, schemas, and IaC for shared databases or schemas.
   - Merge services that share a store.
3. Calculate quantum size.
   - Summarize the connected deployable unit and its scope.
   - Flag distributed monolith patterns.
4. Report findings.
   - List coupled services, databases, and synchronous calls.
   - Format output for CI/CD or review dashboards.

## Rules

- Use static analysis only.
- Rely on code, config, and IaC.
- Keep analysis deterministic and language-agnostic.
- Treat shared database schemas as a high-risk coupling signal.

## Shared Conventions

- Follow the repository-wide conventions in [shared-skill-conventions](../../references/shared-skill-conventions.md).
- Use the canonical output contract, severity levels, confidence rubric, routing rules, and false-positive downgrades defined there.
- If this skill is not the closest match, defer to the routing guidance in the shared conventions file.

## Output

Return:

- Architecture quantum boundaries
- Coupled services and databases
- Blocking synchronous dependencies
- CI-ready pass or fail output
