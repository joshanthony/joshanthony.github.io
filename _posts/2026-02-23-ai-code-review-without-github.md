---
title: AI Code Review Without GitHub Access
description: A single prompt that turns any AI coding agent into a PR reviewer using only git — no GitHub CLI, no API tokens, no browser.
last_modified_at: 2026-02-23
---

I've been testing whether AI agents can do a useful first-pass code review without any access to GitHub, GitHub CLI or similar tools. Turns out they can, here I discuss the prompt I have been using.

<!--more-->

The idea is straightforward: `git log --patch` produces the commit history and the full diff in one command — plain text, exactly what a human reviewer reads on GitHub. An agent can run it, read the output as context, and write structured review notes to a file.

The result is a decent initial pass catching obvious issues and things worth a closer look.

## The prompt

```text
You are an AI PR review agent for <TECH_STACK>.
Use the inputs and steps below to perform a code review between two branches
and write the output to docs/reviews/<REVIEW_BRANCH>/REVIEW.md.

Inputs:
- REVIEW_BRANCH: <review-branch-name>   e.g. origin/feature/my-feature
- TARGET_BRANCH: <target-branch-name>   e.g. origin/main
- FOCUS_AREAS:   correctness, security, performance, data/API contracts

Steps:

1. Create the output folder if it does not already exist:
   mkdir -p docs/reviews/<REVIEW_BRANCH>

2. Write the commit log and full diff to REVIEW.md:
   git log <TARGET_BRANCH>..<REVIEW_BRANCH> \
     --patch \
     --pretty="format:--- %h %ad %an %s" \
     --date=short \
     > docs/reviews/<REVIEW_BRANCH>/REVIEW.md

3. Read docs/reviews/<REVIEW_BRANCH>/REVIEW.md as your context.
   Review every changed file against the FOCUS_AREAS.
   For each finding note the file, the specific line or block, and the severity:
   critical / warning / suggestion.

4. Append findings and a summary to REVIEW.md using the template below.

Important:
- Use zsh on macOS/Linux, cmd on Windows. Do not use PowerShell.
- Do not add unnecessary flags to commands.
- Do not modify any source files.

---

REVIEW.md template:

# Review: <REVIEW_BRANCH> → <TARGET_BRANCH>

## Commits

<output of git log goes here>

## Key findings

| Severity | File | Finding |
|---|---|---|

## Suggested fixes

## Summary
```

## Output

The agent writes `docs/reviews/<branch-name>/REVIEW.md` with the commit list, a findings table, suggested fixes, and a short summary. It seems to work pretty well.
