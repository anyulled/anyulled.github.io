# Architecture Guardrails Skills

`architecture-guardrails-skills` is a public, agent-agnostic collection of 15 reusable skills for static software architecture analysis.

The repository focuses on architectural guardrails: coupling, volatility, bounded contexts, event-driven integrity, deployability, testability, and documentation governance.

Any agent or workflow that can read a `SKILL.md` file and follow its instructions can use these skills. The repository is not tied to Codex or to any single execution environment.

## What This Repository Contains

- 15 self-contained skill folders under `skills/<skill-name>/`
- A `SKILL.md` file per skill
- Optional bundled assets where the skill needs a template or reference artifact
- This README and an MIT license

## How To Use The Skills

1. Pick the skill folder you need.
2. Copy the folder into the skill location supported by your agent or tooling.
3. Read `SKILL.md` and use any bundled assets if present.
4. Apply the skill as a static-analysis guardrail over code, docs, configs, or Git history.

The skills are designed to be deterministic, static-first, and reusable across repositories.

## Skill Index

| Skill | Main purpose | Primary source families |
| --- | --- | --- |
| Decision Log & ADR Tracer | Detect missing or incomplete architecture decisions | Simon Brown; architecture documentation practices |
| Automated Software Guidebook Generator | Keep living architecture documentation current | Simon Brown; software guidebook practices |
| Automated Architecture Governance (Fitness Function Evaluator) | Enforce explicit architecture rules and thresholds | Building Evolutionary Architectures; ArchUnit/AST tooling |
| Structural Coupling & Volatility Analyzer | Measure Ca/Ce, instability, abstractness, and distance from the main sequence | Clean Architecture; Fundamentals of Software Architecture; structural metrics |
| Domain Boundary and Language Integrity Evaluator | Detect bounded-context leakage and weak ACLs | DDD; Team Topologies; context maps |
| Platform and Infrastructure Boundary Evaluator | Prevent platform bleed into stream-aligned code | Team Topologies; context-map thinking; platform governance |
| Complexity and Code Health Analyzer | Measure complexity, connascence, and churn hotspots | Fundamentals of Software Architecture; Meilir Page-Jones; connascence |
| Dynamic Connascence and Execution State Evaluator | Detect temporal coupling, race risk, and value coupling | Meilir Page-Jones; structured design; connascence |
| Integration Strength and Micro-Coupling Evaluator | Find content, common, control, and stamp coupling | Meilir Page-Jones; coupling theory; structured design |
| Distributed Workflow and Integration Analyzer | Classify sagas and operational coupling | Microservices patterns; distributed workflow design |
| Event-Driven Architecture (EDA) Integrity Evaluator | Validate event payload autonomy and broker discipline | Microservices patterns; Event-Carried State Transfer; EDA design |
| Data and Database Coupling Evaluator | Detect shared-table coupling and ORM leakage | Microservices patterns; DDD; data ownership boundaries |
| Architectural Quantum and Deployability Validator | Estimate independently deployable units and detect monolith coupling | Building Evolutionary Architectures; microservices deployability |
| Component Extraction and Tactical Forking Analyzer | Identify extraction candidates and shared-kernel blockers | DDD; bounded contexts; modular decomposition |
| Testability and Automation Architecture Evaluator | Reduce brittle tests and align seams with architecture | Clean Architecture; testability and automation design |

## Sources

This repository is a synthesis of explicitly provided materials and established software architecture literature. It is not copied verbatim from any single source..

- [Michael Plöd](https://www.michael-ploed.com/)'s context-map and [Team Topologies]() material, [Simon Brown]()'s Software Guidebook PDF, and the architectural context.
- Michael Plöd, [Systems Thinking by combining Team Topologies with Context Maps](https://speakerdeck.com/mploed/systems-thinking-by-combining-team-topologies-with-context-maps).
- [Simon Brown](https://simonbrown.je/), [The Software Guidebook](https://leanpub.com/documenting-software-architecture).
- Neal Ford, Rebecca Parsons, and Patrick Kua, [Building Evolutionary Architectures](https://evolutionaryarchitecture.com/).
- Matthew Skelton and Manuel Pais, [Team Topologies](https://teamtopologies.com/).
- Eric Evans, [Domain-Driven Design](https://domaindrivendesign.org/).
- Vaughn Vernon, [bounded context and strategic DDD practice](https://www.oreilly.com/library/view/implementing-domain-driven-design/9780133039900/).
- Robert C. Martin, [Clean Architecture](https://www.oreilly.com/library/view/clean-architecture-a/9780134494272/) and coupling/cohesion principles.
- Mark Richards and Neal Ford, [Fundamentals of Software Architecture](https://fundamentalsofsoftwarearchitecture.com/).
- Meilir Page-Jones, [software metrics and structured design](https://dl.acm.org/doi/10.5555/48039).
- Chris Richardson, [Microservices Patterns](https://microservices.io/index.html).
- [Sam Newman](https://samnewman.io/) [Monoliths to microservices](https://samnewman.io/books/monolith-to-microservices/).
- SonarQube, ArchUnit, AST parsers, and deterministic architecture tooling paradigms.

## Repository Layout

```text
architecture-guardrails-skills/
├── README.md
├── LICENSE
└── skills/
    ├── automated-software-guidebook-generator/
    │   ├── SKILL.md
    │   └── assets/...
    ├── automated-architecture-governance-fitness-function-evaluator/
    │   └── SKILL.md
    ├── architectural-quantum-and-deployability-validator/
    │   └── SKILL.md
    ├── complexity-and-code-health-analyzer/
    │   └── SKILL.md
    ├── component-extraction-and-tactical-forking-analyzer/
    │   └── SKILL.md
    ├── data-and-database-coupling-evaluator/
    │   └── SKILL.md
    ├── decision-log-adr-tracer/
    │   └── SKILL.md
    ├── distributed-workflow-and-integration-analyzer/
    │   └── SKILL.md
    ├── domain-boundary-and-language-integrity-evaluator/
    │   └── SKILL.md
    ├── dynamic-connascence-and-execution-state-evaluator/
    │   └── SKILL.md
    ├── event-driven-architecture-eda-integrity-evaluator/
    │   └── SKILL.md
    ├── integration-strength-and-micro-coupling-evaluator/
    │   └── SKILL.md
    ├── platform-and-infrastructure-boundary-evaluator/
    │   └── SKILL.md
    ├── structural-coupling-and-volatility-analyzer/
    │   └── SKILL.md
    └── testability-and-automation-architecture-evaluator/
        └── SKILL.md
```

## Notes

- The skills are intentionally broad enough to be useful across repositories and teams.
- Several skills overlap by design because architecture problems often overlap in practice.
- The repository favors deterministic static analysis over runtime experimentation.

## License

MIT.
