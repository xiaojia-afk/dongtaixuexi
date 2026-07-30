---
name: find-skills
description: Lists and discovers available skills for the Windows reverse engineering project. Use when the user asks what skills are available or needs help finding the right tool/workflow.
---

# Find Skills

Scans and lists all available skills in:
- `.opencode/skills/` (project skills)
- `~/.config/opencode/skills/` (global skills)
- `~/.claude/skills/` (external auto-loaded skills)

## Usage
When invoked, scan the skills directories and report:
1. Available skill names and their descriptions
2. Which are project vs global vs external
3. Brief summary of what each does

## Project Skills
- **track-session**: Session progress tracking, resume/update/check learning state
- **grill-me**: Interactive quiz on learned reverse engineering concepts
- **grill-with-docs**: Documentation-referenced quiz with Microsoft Learn citations
- **improve-codebase-architecture**: Codebase review and refactoring

## Known Project Dirs
- Project root: `C:\Users\Administrator\Desktop\dongtaixuexi\`
- Learning code: `C:\Users\Administrator\Desktop\学习\Dll1\`
