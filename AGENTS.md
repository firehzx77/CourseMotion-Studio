# AI Agent Guide

> **Purpose**: This file is the compact entrypoint for AI agents entering `CourseMotion Studio`.
> **Out of scope**: Shared protocol rules live in the upstream package referenced by `.protocol/protocol.json`; project deviations live in `.protocol/PROTOCOL_OVERRIDES.md`.

This project uses the `agent-project-protocol` **solo** workflow: direct task work, simple task records in `docs/TASKS.md`, and no sprint or brainstorm files by default.

Protocol language: `zh-CN`. If `.protocol/protocol.json` omits `language`, default to `en`. Agents must use this language as the default response language unless the current user message explicitly requests another language.

## Mount Requirement

Use this target project root as the mounted workspace / working directory before starting work. Reading only the upstream protocol package is insufficient because project details, architecture, task state, task docs, overrides, and code live in the target project.

If the agent cannot read `AGENTS.md`, `.protocol/`, `docs/`, and relevant code under the project root, ask the user to mount or switch to the target project.

## Rule Precedence

When rules conflict, apply in this order:

1. `.protocol/PROTOCOL_OVERRIDES.md`
2. Project-local `.cursor/rules/*.mdc`
3. Upstream markdown rules listed in `ruleFiles`
4. Defaults in this file

## Read Order

### Always

1. This `AGENTS.md` entrypoint, if it was not already loaded by the tool.
2. `.protocol/protocol.json` for upstream package, level, language, overrides, and rule file lists.
3. Core upstream rules from `ruleFiles`: `primitive-command.md`, `level-gate.md`, `router-policy.md`, `workflow-map.md`.
4. Project-local cursor rules from `cursorRuleFiles`.
5. `.protocol/PROTOCOL_OVERRIDES.md`.

### Before Implementation Or Writes

6. The relevant section(s) of `composed-workflow.md` for the routed workflow.
7. Minimal project docs and code context needed for the task.

### Project Facts When Needed

8. `docs/ARCHITECTURE.md`
9. `docs/CODING_GUIDE.md`
10. `docs/PRODUCT.md`
11. `docs/USER_GUIDE.md`
12. `docs/REVIEWS.md`
13. `docs/TESTING.md`
14. `docs/TASKS.md` and `docs/tasks/`

### On Demand

Resolve via `extends` in `.protocol/protocol.json`:

- `../shared/rule_docs/AI_AGENT_PROMPTS.md` when the user needs copyable prompt text.
- `../shared/rule_docs/ENCODING.md` when changing encoding, newlines, or broad formatting.
- `../shared/rule_docs/AI_AGENT_SETUP.md` for human maintainer wiring guidance.

## Request Routing

Classify every request first. Start the response by stating the router type and a brief natural-language explanation in the project language from `.protocol/protocol.json`.

The current user is the default owner, reviewer, acceptance owner, and maintainer. Task execution does not commit and does not mark `Done`. `task_acceptance` first returns an acceptance review proposal; only write back after the user explicitly accepts.

For `sync docs` and docs-only changes, update directly when the request is clear. Do not require a proposal, test command execution, or acceptance; inspect changed documents and report brief notes.

Before executing tasks or small fixes, run `git status --short`, protect existing uncommitted work, and load only the minimal code, tests, settings, and architecture context needed for the task. If the folder is not a git repository, state that clearly and continue cautiously.

Before the final response for `lightweight_change` or `bug_fix`, complete the workflow's quick task record in `docs/TASKS.md` and `docs/tasks/`, or explicitly state why the routed workflow is exempt, such as `sync_docs` or a read-only answer.

New task docs and quick task records must use `.protocol/protocol.json` `language` unless the current user message explicitly requests another language.

## Project One-Liner

`CourseMotion Studio` 是一个课程大纲后处理工作流平台，用 Next.js/TypeScript 将已有课程大纲转为 Course JSON、脚本、分镜、视觉系统、素材 Prompt 和导出素材。

## Key Paths

- `AGENTS.md`: AI entrypoint.
- `.protocol/protocol.json`: active protocol package, level, and language.
- `.protocol/PROTOCOL_OVERRIDES.md`: project-specific protocol deviations.
- `.cursor/rules/`: Cursor-facing protocol pointers.
- `docs/`: project-local documentation source of truth.
- `docs/TASKS.md`: solo task list.
- `docs/tasks/`: task history directory.
- `app/`: Next.js app and API routes.
- `components/`: workflow UI components.
- `lib/`: AI generators, zod schemas, shared types, export helpers, and state store.

## Development Commands

```sh
npm run dev
```

## Verification Commands

```sh
npm run typecheck
npm run build
```

## Project Boundaries

Do not cross product or safety boundaries without confirmation: choosing the product direction, creating the first app skeleton, adding external services, network access, telemetry, secrets, authentication, payments, personal-data handling, destructive filesystem operations, changing protocol level, or creating commits.

## Routing Reference

Do not treat this entrypoint as the route table. After the required read order, use the active level's `router-policy.md` for request classification, `workflow-map.md` for workflow navigation, and `docs/PROTOCOL_REFERENCE.md` for the human-readable derived reference.

Do not introduce sprint, brainstorm, backlog grooming, milestone, or capacity language unless the user explicitly asks to upgrade to team workflow.
