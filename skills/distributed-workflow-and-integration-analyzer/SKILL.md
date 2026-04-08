---
name: distributed-workflow-and-integration-analyzer
description: Map inter-service communication, distributed workflows, Saga patterns, and operational coupling across services. Use when reviewing REST, gRPC, brokers, distributed transactions, or temporal coupling risks.
---

# Distributed Workflow and Integration Analyzer

Trace service-to-service communication and classify distributed workflow risks.

## When to Use

- PRs introducing inter-service communication
- Distributed transaction changes
- Message broker, REST, or gRPC integration changes
- Microservice resilience and workflow audits

## Scope

- Scans: HTTP clients, gRPC stubs, GraphQL mutations, Kafka/RabbitMQ/SQS/SNS publishers and consumers, database connection strings, and deployment configs that shape cross-service workflows.
- Exclusions: single-process helper calls, intra-service sync code, and broker or network details that are not part of a distributed workflow boundary.
- Fallback: if a workflow boundary is uncertain, use the shared conventions fallback and report warning with low confidence.
- Routing: defer event-payload autonomy to Event-Driven Architecture Integrity Evaluator and deployability boundaries to Architectural Quantum and Deployability Validator.

## Workflow

1. Trace integration points.
   - Scan HTTP, gRPC, GraphQL, broker, and database connection usage.
   - Build a distributed communication graph.
2. Classify distributed workflows.
   - Determine synchronous vs asynchronous communication.
   - Determine orchestration vs choreography.
   - Identify saga-like multi-step workflows.
3. Detect operational coupling.
   - Flag synchronous call chains that create cascade risk.
   - Flag distributed transaction anti-patterns such as 2PC or missing compensations.
4. Report findings.
   - List the most coupled integration points.
   - Map workflow coordination styles.
   - Include file paths and functions for violations.

## Rules

- Use static analysis and AST parsing only.
- Do not execute network calls.
- Keep analysis deterministic and language-agnostic.
- Prefer architecture-review output that is easy to gate in CI.

## Shared Conventions

- Follow the repository-wide conventions in [shared-skill-conventions](../../references/shared-skill-conventions.md).
- Use the canonical output contract, severity levels, confidence rubric, routing rules, and false-positive downgrades defined there.
- If this skill is not the closest match, defer to the routing guidance in the shared conventions file.

## Output

Return:

- Top coupled integration points
- Distributed workflow classifications
- Temporal coupling violations
- CI-ready pass or fail output
