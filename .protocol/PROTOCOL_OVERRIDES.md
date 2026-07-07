# Protocol Overrides

> **Purpose**: This file records explicit project-specific deviations from the upstream protocol package for `CourseMotion Studio`.
> **Out of scope**: This file does not repeat upstream defaults. Rules not listed here are inherited from the package referenced by `.protocol/protocol.json`.

## Override Rules

- No overrides yet; this project inherits the upstream workflow for its configured level.

## Protocol Level

This project's level is set by `.protocol/protocol.json`:

- `beginner`: first-time / vibe-coding users.
- `solo`: individual development.
- `team`: small team collaboration.

If this project needs behavior that differs from the selected level, write that deviation in Override Rules.

Team-level projects may add role and authority exceptions here, for example:

- Who may confirm committed sprint scope.
- Who may act as acceptance owner.
- Who may ask the agent to commit.
- Which task types must be upgraded to formal tasks.

## Override Policy

- Add an override only when this project truly needs to differ from upstream.
- Each override must state the upstream rule it changes, reason, impact, and verification.
- If an override conflicts with upstream, this file wins. If this file is silent, upstream wins.
