---
name: learning-closeout
description: Use after a Windows reverse-learning day has passed acceptance or the user says the day is complete. Update the learning session and review notes, rebuild and validate the website, then safely publish only the intended learning files.
---

# Learning Closeout

Run only after the user explicitly finishes the Day or passes the Day acceptance. Do not close out an unfinished lesson or a failed experiment.

## Read First

1. `C:\Users\Administrator\Desktop\更新笔记助手.txt`
2. `C:\Users\Administrator\Desktop\dongtaixuexi\SESSION_PROGRESS.md`
3. The completed Day in `C:\Users\Administrator\Desktop\dongtaixuexi\days.json`

## Closeout

1. Update `SESSION_PROGRESS.md`: mark the completed Day, refresh progress and next step, record durable conclusions and real failed/debugged evidence.
2. Update `days.json`: create a review-quality article with a recall conclusion, execution/structure chain, comparison table, validation evidence, pitfalls, defense/reverse view, version limits, official-source direction, and practice record.
3. Run `node build.js` in `C:\Users\Administrator\Desktop\dongtaixuexi`. Do not manually edit generated `index.html`.
4. Validate JSON parsing, generated title/headings, and `git diff --check`.
5. Publish by default unless the user says local-only: inspect `git status --short`, then stage only `SESSION_PROGRESS.md`, `days.json`, and `index.html` using `git add -- ...`; commit and push `master`.
6. Report the progress, next Day, published URL, and any failure.

## Guardrails

- Never use `git add -A`.
- Never stage unrelated or untracked files.
- Never change future lessons or mark a Day done before acceptance.
- The desktop context assistant reads the rule, session, and note data dynamically; rebuild it only when its prompt logic or paths change.
