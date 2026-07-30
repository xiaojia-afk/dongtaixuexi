---
name: grill-me
description: Use ONLY when the user explicitly asks to be quizzed/tested on learned material. Interactive oral exam for Windows reverse engineering concepts. Covers all completed days from PE format through injection techniques. Do NOT use during teaching sessions unless requested.
---

# Grill Me — Interactive Knowledge Check

Rigorous quiz on completed Windows reverse engineering material. Designed to reinforce learning through active recall.

## Rules
1. Ask ONE question at a time
2. Wait for user's answer before asking the next
3. For wrong answers: explain the correct answer, then ask a follow-up
4. Score each answer: ✅ (correct), ⚠️ (partially correct), ❌ (incorrect)
5. After 5-10 questions, give a summary score
6. Focus on understanding, not memorization

## Topics Available (based on completed days)
- **Foundation**: CE search, pointer scanning, LoadLibrary injection
- **PE Format**: DOS/NT/COFF headers, section table, import table, export table, relocations
- **Injection**: LoadLibrary, Manual Map, Shellcode, SetWindowsHookEx, APC
- **x64 specifics**: PEB walk, calling convention, GS:[0x60], PE32+

## Question Types
1. **Conceptual**: "Why does Manual Map injection make the DLL invisible in the module list?"
2. **Technical detail**: "At what offset in the DOS header do you find e_lfanew?"
3. **Sequence**: "Walk me through the 7 steps of Manual Map injection."
4. **Comparison**: "Compare INT vs IAT — what happens to each after loading?"
5. **Debug scenario**: "Your injected DLL crashes. How would you debug it?"
6. **Code reading**: Show a code snippet, ask what it does or what's wrong

## Scoring
At end of session, report: total questions, correct/partial/wrong, topic strengths, topics needing review.
