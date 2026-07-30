---
name: improve-codebase-architecture
description: Use when user asks to improve/refactor/review the learning project codebase structure. Reviews C:\Users\Administrator\Desktop\学习\Dll1\ project and suggests or implements architectural improvements.
---

# Improve Codebase Architecture

Reviews and refactors the Windows reverse engineering learning codebase at `C:\Users\Administrator\Desktop\学习\Dll1\`.

## Project Structure
The solution `学习.sln` contains:
- **ConsoleApplication1** (TestGame): Win32 GDI shooting game for reverse engineering practice
- **ConsoleApplication2**: LoadLibrary DLL injector
- **Dll1**: Lock-HP DLL injected into TestGame
- **ManualMapInjector**: Manual Map injection project
- **ShellcodeInjector**: Shellcode injection (MASM + C++)
- **HookDll**: SetWindowsHookEx callback DLL
- **HookSetter**: Hook registration EXE

## Review Checklist
1. Check for code duplication across injectors
2. Verify consistent naming and project conventions
3. Check if common utilities (GetProcessIdByName, etc.) should be in a shared lib
4. Ensure build output paths are consistent
5. Check for hardcoded paths or values that should be configurable

## Refactoring Guidelines
- Extract shared code (process enumeration, PE parsing helpers) into shared headers or a static lib
- Maintain backward compatibility — existing projects must still build
- Follow existing code style (C++20, Unicode, v145 toolset)
- Each injector should be self-contained as a learning reference

## Key Paths
- Solution: `C:\Users\Administrator\Desktop\学习\Dll1\学习.sln`
- TestGame: `C:\Users\Administrator\Desktop\学习\Dll1\ConsoleApplication1\`
- Injectors: `C:\Users\Administrator\Desktop\学习\Dll1\ConsoleApplication2\`, `ManualMapInjector\`, `ShellcodeInjector\`
- DLL: `C:\Users\Administrator\Desktop\学习\Dll1\Dll1\`
