---
name: data-and-database-coupling-evaluator
description: Evaluate ORM configurations, schema changes, and data access layers for shared-table coupling, ORM leakage, and distributed data joins. Use when reviewing schema migrations, repository classes, or modernization work toward decoupled data ownership.
---

# Data and Database Coupling Evaluator

Analyze data access boundaries to detect model coupling and shared-table integration.

## When to Use

- PRs with schema migrations
- ORM entity or repository changes
- Data access layer refactors
- Monolith-to-microservice decomposition reviews

## Scope

- Scans: ORM entities, SQL migration scripts, DAO/repository classes, and SQL query strings that reveal table ownership and schema coupling.
- Exclusions: analytics/read-model joins that are explicitly documented, generated code, and runtime-only database issues without static evidence.
- Fallback: if schema ownership is ambiguous, fall back to the shared conventions order and downgrade to warning with low confidence.
- Routing: defer bounded-context translation concerns to Domain Boundary and Language Integrity Evaluator and distributed workflow ownership to Distributed Workflow and Integration Analyzer.

## Workflow

1. Detect shared table coupling.
   - Map modules or bounded contexts to the tables they read or write.
   - Flag multiple writers as high severity.
   - Flag cross-module reads from another module's table as moderate severity.
2. Detect ORM leakage.
   - Check whether ORM entities or annotations cross into API or domain boundaries.
   - Prefer DTOs and isolated domain entities.
3. Detect distributed data joins.
   - Identify cross-module aggregation patterns, app-level joins, and cross-boundary N+1 risks.
   - Prefer dedicated read models or analytics stores when needed.
4. Report findings.
   - List shared tables and operation types.
   - Include file paths for ORM leakage.
   - Format output for CI/CD consumption.

## Rules

- Use static analysis only.
- Do not connect to a live database.
- Keep analysis deterministic and language-agnostic.
- Treat shared writes as the most severe coupling signal.

## Shared Conventions

- Follow the repository-wide conventions in [shared-skill-conventions](../../references/shared-skill-conventions.md).
- Use the canonical output contract, severity levels, confidence rubric, routing rules, and false-positive downgrades defined there.
- If this skill is not the closest match, defer to the routing guidance in the shared conventions file.

## Output

Return:

- Shared tables with module-level access details
- ORM leakage findings
- Distributed join and N+1 risks
- CI-ready pass or fail output
