---
title: How I Use AI Coding Tools
description: A minimal workflow for using AI coding tools with research, planning, and implementation artifacts.
last_modified_at: 2026-02-22
---

My current workflow for AI-assisted coding (I mostly use Copilot)

<!--more-->

Every task follows the same sequence: custom instructions upfront, then research, plan, review, generate a todo list and then implementation. The process produces three main files per task that keep the model grounded in the actual codebase:

- `research.md` — a deep review of what the current system does.
- `plan.md` — proposed approach and file-level changes. I add inline notes here to correct until I am happy with the plan.
- `todo.md` — a list of implementation tasks.

## Contents
- [Stage 0: Custom instructions](#stage-0-custom-instructions)
- [Stage 1: Research](#stage-1-research)
- [Stage 2: Plan](#stage-2-plan)
- [Stage 3: Review](#stage-3-review)
- [Stage 4: Generate todo](#stage-4-generate-todo)
- [Stage 5: Implement](#stage-5-implement)
- [Stage 6: Iterate](#stage-6-iterate)

## Stage 0: Custom instructions

Ensure we have a well maintained project-level instructions file that defines conventions and rules for our codebase. Every major tool has this concept e.g. `.github/copilot-instructions.md` for Copilot. Put the basic intro, stack, patterns and constraints there so you never have to repeat them in prompts. use language like `don't do this, do this instead`

Example:
```text
Stack: TypeScript, React, Postgres.
Tests: Vitest. Always write a test alongside implementation.
Patterns: use the service layer for business logic, never in route handlers.
Do not introduce new dependencies without flagging them first.
Do not add comments unless the logic is non-obvious.
```

## Stage 1: Research

We need the agent to have a deep understanding of the existing code within its context. The way we do this is to give it some files as context and then ask the model for a deep review and written plan. No implementation starts here.

Output required: `research.md`.

Prompt:
```text
You are an expert <topic> software engineer helping me with a codebase change.
Task: study the provided context deeply before suggesting changes and pay particular attention to <files or classes mentioned>.
Read all related source files and trace the real control flow.
Write docs/<date-task>/research.md with:
- current architecture
- key flows
- constraints and assumptions
- potential risks
- open questions
For each finding, cite the specific file and function name.
If you cannot find something, say so explicitly. Do not infer or speculate.
Do not implement anything yet.
```

## Stage 2: Plan

We then need to propose a concrete implementation plan.

Output required: `plan.md` with:
- files to modify
- key trade-offs
- rough code snippets where needed

This is where architecture decisions happen. We should never skip this step.

Prompt:
```text
Use docs/<date-task>/research.md as the source of truth.
Goal: <feature-name-and-goal>.
Write docs/<date-task>/plan.md.
Base all suggestions on the actual codebase.
Include:
- files to change
- step-by-step approach
- trade-offs
- minimal code snippets where needed
Do not introduce patterns not already present in the codebase.
If a new pattern is necessary, flag it explicitly as a decision point.
Do not implement anything yet.
```

## Stage 3: Review
Goal: provide feedback and constraints before implementation.

Carefully review `plan.md`, add inline notes and ask for an update to the plan. This is the most important part of the whole workflow, mistakes caught here are free. Mistakes caught during implementation are expensive.

This repeats until the plan is acceptable.

Types of notes worth adding:
- **Wrong abstraction**: "This should use the existing `UserService`, not a new class."
- **Scope creep**: "Remove step 4, that's a separate task."
- **Pattern violation**: "We don't do X in this codebase, use Y instead."
- **Missing constraint**: "This must be backwards compatible with API v1."
- **Ambiguous step**: "Clarify what 'update the handler' means — which handler?"

Prompt:
```text
I added inline notes and feedback to docs/<date-task>/plan.md (usually prefixed with a dash e.g. "- this is not needed")
Address every note and update the document in place.
Keep the same structure unless a note requests a restructure.
Do not implement yet.
```

## Stage 4: Generate todo
Goal: convert plan into trackable execution steps.

Output required: `todo.md` with small actionable tasks and subtasks as needed.

I keep tasks granular so progress is easy to review and mark off.

Prompt:
```text
Create docs/<date-task>/todo.md from docs/<date-task>/plan.md.
Break work into phases and granular tasks.
Each task should be specific and testable.
Do not implement yet.
```

## Stage 5: Implement
Goal: execute exactly what is in plan + todo.

Implementation starts only after plan review is done.

Prompt:
```text
Implement everything in docs/<date-task>/plan.md and docs/<date-task>/todo.md.
Mark completed tasks in docs/<date-task>/todo.md as you finish them.
Make atomic changes — one logical unit at a time.
Do not add unnecessary comments.
Run typecheck and tests as you go.
Fix issues introduced by your changes.
Do not stop until all tasks are complete.
```

### Additional implementation tips:

**Tests**: look at ways to test alongside each implementation task. Catching regressions task-by-task is far cheaper than debugging at the end.

**New sessions**: if you are resuming work, re-orient the model before continuing:
```text
Read docs/<date-task>/research.md and docs/<date-task>/todo.md.
Continue from where we left off.
```

## Stage 6: Iterate
Use short, direct feedback tied to specific outcomes.

Examples:
- “Use the admin service module not the public API route.”
- “Match spacing and font sizes from the settings table component.”
- “Reuse the existing validator from utils and remove duplicate logic.”

Prompt:
```text
Make only this change:
<single correction>
Keep everything else unchanged.
```

The whole point of this workflow is to push decisions as early as possible. By the time implementation starts the plan is already settled, the todo list is granular, and the AI has a written record to follow. Corrections at the review stage cost nothing. Corrections mid-implementation cost a lot.
