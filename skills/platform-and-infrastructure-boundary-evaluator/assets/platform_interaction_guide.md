# Platform Interaction Guide

Use internal platform interfaces instead of embedding infrastructure concerns in business logic.

## Approved Consumption Patterns

- Logging: use the standard application logging facade
- Metrics: use the platform metrics API
- Secrets: use the managed secret provider
- Networking: use the paved service mesh or platform gateway
- Storage and queues: use sanctioned platform clients or adapters

## Avoid

- Direct cloud SDK usage in domain code
- Inline provisioning logic in application packages
- Custom connection poolers, mesh bypasses, or hand-rolled deployment wiring

## Escalate When

- A service needs a new platform capability
- A domain package requires low-level infrastructure access
- Boundary ownership is unclear between platform and product teams
