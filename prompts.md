---
title: Prompts
description: A library of AI coding workflow prompts.
layout: prompts
permalink: /prompts/
---

# Prompts

A collection of prompts for the AI-assisted coding workflow. Replace all uppercase placeholders before use — double-click any placeholder to select it.

## Research {#research}

Study the codebase deeply before writing any code. Run this at the start of every task.

```text
You are an expert TOPIC software engineer helping me with a codebase change.
Task: study the provided context deeply before suggesting changes and pay particular attention to:
KEY_FILES_OR_CLASSES.
Read all related source files and trace the real control flow.
Write docs/TASK_NAME/research.md with:
- current architecture
- key flows
- constraints and assumptions
- potential risks
- open questions
For each finding, cite the specific file and function name.
If you cannot find something, say so explicitly. Do not infer or speculate.
Do not implement anything yet.
```

## Plan {#plan}

Propose a concrete implementation plan based on the research.

```text
Use docs/TASK_NAME/research.md as the source of truth.
Goal: 
FEATURE_GOAL
Write docs/TASK_NAME/plan.md.
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

## Review {#review}

After adding inline notes to `plan.md`, send this to address them.

```text
I added inline notes and feedback to docs/TASK_NAME/plan.md (usually prefixed with a dash e.g. "- this is not needed").
Address every note and update the document in place.
Keep the same structure unless a note requests a restructure.
Do not implement yet.
```

## Implement {#implement}

Execute the plan once the review is complete.

```text
Implement everything PHASE_NUMBER in docs/TASK_NAME/todo.md using the information provided in docs/TASK_NAME/plan.md
Mark completed tasks in docs/TASK_NAME/todo.md as you finish them.
Make atomic changes — one logical unit at a time.
Do not add unnecessary comments.
Run typecheck and tests as you go.
Fix issues introduced by your changes.
Do not stop until all tasks are complete.
```
