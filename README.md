# Josh Anthony Blog

Minimal GitHub Pages/Jekyll blog for short software engineering notes.

## Fast publish
1. Create a file in `_posts/` named `YYYY-MM-DD-your-title.md`.
2. Add front matter:

```yaml
---
title: Your Title
description: One-line summary
last_modified_at: 2026-02-22
---
```

3. Add a short intro, then place `<!--more-->` where excerpt should end.
4. Commit and push to `main`.

GitHub Pages deploys automatically.

## Draft workflow
- Use `_drafts/post-template.md` as a starter.
- Drafts do not publish unless built with draft mode locally.

## Optional local preview
- `bundle exec jekyll serve --drafts`

## Notes
- Theme is dark-only, minimal, and intentionally simple.
- Nav is Home + About only.
- No comments, no analytics, no search.
