# Separate frontend and backend validation

## Context and Problem Statement

Frontend and backend need to validate, but they have different demands. The backend validates for security and database integrity; the frontend validates for user experience: instant feedback, friendly messages, blocking invalid input before the request.

## Considered Options

* Share: front imports the backend's Zod schema and uses it for form validation
* Split; each side has its own schema

## Decision Outcome

Chosen option: "Split; each side has its own schema." Because frontend and backend have different demands. A shared schema would force both sides to use the same rules, ignoring these differences.

## Consequences

* Good, because the frontend and backend are decoupled
* Bad, because if the backend schema changes, the frontend doesn't follow. Mitigation: shared constants (`shared/call-constants.ts`) keep max lengths and enums in sync, so only the validation logic can drift.