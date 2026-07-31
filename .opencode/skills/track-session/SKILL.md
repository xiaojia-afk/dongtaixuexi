---
name: track-session
description: Use when the user asks to resume/update/check learning progress. Reads and writes SESSION_PROGRESS.md to track the Windows reverse engineering 60-day learning plan. Triggered by $track-session, session resume, or checking progress.
---

# Track Session

Manages `C:\Users\Administrator\Desktop\dongtaixuexi\SESSION_PROGRESS.md` — the single source of truth for the Windows reverse engineering learning plan.

## Triggers (natural language)

When the user says ANY of the following after finishing a day's lesson, execute `$track-session update` immediately:
- "Day X 完成了" / "学完了" / "搞定了" / "done" / "finished"
- "更新笔记" / "更新网站" / "更新进度"
- "X day completed" / "lesson done"

## Commands

### `$track-session resume` (or "resume session" / "resume learning")
1. Read `C:\Users\Administrator\Desktop\dongtaixuexi\SESSION_PROGRESS.md`
2. Read `C:\Users\Administrator\Desktop\dongtaixuexi\days.json`
3. Report to user:
   - Current day and status (in-progress / not started)
   - Completed days count and percentage
   - Current phase and next phase
   - Any unfinished items from last session
   - The next task to work on
4. Read the current day's existing code in `C:\Users\Administrator\Desktop\学习\Dll1\` to understand project state

### `$track-session update` (AUTO-TRIGGER when user says lesson is done)

**Execute all of the following automatically without asking:**

1. Confirm the Day passed acceptance; otherwise save only the current state and do not publish.
2. Update `days.json` — fill in the day's full HTML notes + practice section; add `"status": "done"`
3. Update `SESSION_PROGRESS.md` — mark day as `[x]`, update `last_updated`, update current status
4. Run `node C:\Users\Administrator\Desktop\dongtaixuexi\build.js` and validate the generated page plus `git diff --check`.
5. Run git commands at `C:\Users\Administrator\Desktop\dongtaixuexi\`:
   ```
   git status --short
   git add -- SESSION_PROGRESS.md days.json index.html
   git commit -m "Update: Day X completed"
   git push origin master
   ```
6. Never stage unrelated or untracked files. Confirm: "网站已更新, 1-2分钟后刷新 https://xiaojia-afk.github.io/dongtaixuexi/"

### `$track-session status` (quick check)
Report: completed/total days, current phase, next task, without reading all files.

## Key Paths
- Session file: `C:\Users\Administrator\Desktop\dongtaixuexi\SESSION_PROGRESS.md`
- Days data: `C:\Users\Administrator\Desktop\dongtaixuexi\days.json`
- Learning code: `C:\Users\Administrator\Desktop\学习\Dll1\学习.sln`
- Website: `C:\Users\Administrator\Desktop\dongtaixuexi\`
- Build: `node C:\Users\Administrator\Desktop\dongtaixuexi\build.js`

## Teaching Template (from SESSION_PROGRESS.md)
Every lesson must include: 今日目标, 前置知识, 核心概念, 底层原理, 逆向视角, 防御视角, 最小实验, 调试验证, 常见错误, 32/64差异, 关联, 练习, 验收

## Mandatory Note Blocks per Lesson
实验环境, 已验证结论, 推测结论, 调试证据, 失败实验, 版本信息, 官方来源

## User Info
- Name: 小佳, Windows reverse engineering beginner
- Language: Chinese with English terms in parentheses
- Learning style: detailed guidance, not outlines; lots of hands-on practice
- Tools: VS2026, HxD, Cheat Engine 7.x
- Platform: x64, Windows
