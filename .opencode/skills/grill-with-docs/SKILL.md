---
name: grill-with-docs
description: Use ONLY when user asks for documentation-referenced quiz. Like grill-me but every answer must cite official sources (Microsoft Learn, Windows Internals book, Intel/AMD manuals). Teaches the skill of finding and verifying answers from primary sources.
---

# Grill With Docs — Documentation-Referenced Quiz

Like `grill-me` but enforces documentation-backed answers. Teaches the critical skill of verifying technical claims against official sources.

## Rules
1. Ask a question that requires citing a specific source
2. After user answers, ask: "Which Microsoft Learn page / Windows Internals chapter confirms this?"
3. If user cannot cite source, provide the citation and explain
4. Accept citations from:
   - **Microsoft Learn** (docs.microsoft.com / learn.microsoft.com)
   - **Windows Internals** (book, 7th ed, Part 1 & 2)
   - **Intel/AMD Manuals** (for CPU/instruction questions)
   - **Official PE/COFF specification** (Microsoft PE Format spec)
   - **MSDN/Microsoft documentation** for API references

## Source Verification Workflow
1. Ask question → user answers
2. Ask for source → user provides citation
3. If needed, fetch the URL/page to verify
4. Confirm or correct the answer with the actual documentation

## Example Questions
- "What does the MSDN page for QueueUserAPC say about the thread's alertable state requirement?"
- "Where in Windows Internals is the APC state machine documented?"
- "What does the PE specification say about the SizeOfOptionalHeader field in PE32+?"

## Purpose
Many reverse engineers learn from blogs/videos but never check official docs. This skill builds the habit of going to primary sources.
