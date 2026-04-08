---
name: domain-boundary-and-language-integrity-evaluator
description: Enforce DDD bounded contexts, ubiquitous language, anti-corruption layers, and shared-kernel safety. Use when reviewing cross-domain communication, shared libraries, DTO mappings, or domain model leakage.
---

# Domain Boundary and Language Integrity Evaluator

Enforce DDD boundaries and prevent domain model leakage across contexts.

## When to Use

- PRs that change cross-domain communication
- New shared libraries or shared domain models
- Data structures passed between bounded contexts
- DDD boundary or context-map audits

## Workflow

1. Detect domain entity leakage.
   - Map bounded contexts from namespaces, directories, or modules.
   - Flag entities passed, returned, or instantiated across contexts without translation.
2. Verify anti-corruption layers.
   - Check that cross-context integrations pass through mappers or ACLs.
   - Flag direct ingestion of upstream contracts by downstream domains.
3. Evaluate shared kernels.
   - Distinguish technical utilities from shared domain concepts.
   - Flag malignant shared domain models that reduce team autonomy.
   - Allow intentional shared-contract modules to pass when they are explicit integration DTOs and not domain behavior.
   - Downgrade shared kernel findings when the shared types are pipeline envelopes or transport contracts rather than business entities.
4. Report findings.
   - Include file paths and line numbers for leakage.
   - Summarize missing ACLs and shared-kernel violations.

## Rules

- Use static analysis and module boundary configuration only.
- Keep the analysis deterministic and language-agnostic.
- Treat shared domain models as boundary violations unless explicitly justified.
- Distinguish explicit shared contracts from leaking domain models.
- If naming drift exists but translation is present, prefer warning over fail.

## Shared Conventions

- Follow the repository-wide conventions in [shared-skill-conventions](../../references/shared-skill-conventions.md).
- Use the canonical output contract, severity levels, confidence rubric, routing rules, and false-positive downgrades defined there.
- If this skill is not the closest match, defer to the routing guidance in the shared conventions file.

## Output

Return:

- Domain entity leakage findings
- Missing anti-corruption layers
- Malignant shared kernel classes
- CI-ready pass or fail output
