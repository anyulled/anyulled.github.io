---
name: event-driven-architecture-eda-integrity-evaluator
description: Evaluate event-driven architectures for payload design, consumer autonomy, broker entanglement, and synchronous callback anti-patterns. Use when reviewing schemas, publishers, consumers, or broker configurations.
---

# Event-Driven Architecture (EDA) Integrity Evaluator

Analyze event-driven systems for autonomy, payload quality, and broker coupling.

## When to Use

- PRs that change event schemas, publishers, or consumers
- Message broker configuration changes
- Architectural audits of async or event-driven services

## Workflow

1. Analyze payload state.
   - Distinguish notification events from event-carried state transfer.
   - Flag minimal events that force synchronous lookups after publication.
2. Verify consumer autonomy.
   - Trace consumer execution for immediate downstream calls.
   - Flag consumers that cannot process events from local data alone.
3. Check broker entanglement.
   - Detect business logic embedded in broker routing or stream configuration.
   - Flag overly broad or fat topics with excessive unrelated subscribers.
4. Report findings.
   - Identify synchronous callback anti-patterns.
   - List consumers and topics that violate autonomy.

## Rules

- Use static analysis only.
- Inspect schemas, broker config, and source code only.
- Keep analysis deterministic and language-agnostic.
- Prefer bounded-context autonomy over shared middleware logic.

## Shared Conventions

- Follow the repository-wide conventions in [shared-skill-conventions](../../references/shared-skill-conventions.md).
- Use the canonical output contract, severity levels, confidence rubric, routing rules, and false-positive downgrades defined there.
- If this skill is not the closest match, defer to the routing guidance in the shared conventions file.

## Output

Return:

- Event topics with synchronous callback risk
- Consumers lacking autonomy
- Broker entanglement findings
- CI-ready pass or fail output
