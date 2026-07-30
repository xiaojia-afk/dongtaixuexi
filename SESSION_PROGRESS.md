---  
schema: cc-dash/session@1  
project: windows-reverse-learning  
session_id: s_2026-07-30_day8-apc  
started: 2026-07-30T00:00:00+08:00  
last_updated: 2026-07-30T18:15:00+08:00  
status: in-progress  
---  

# Session Progress — Windows 逆向学习  

## Plan  

### 第一阶段：Day 1-30（GPT-5.5 制定路线，Codex 逐课落地）

- [x] <!-- id:t_foundation dep:none --> 前期基础: CE入门 + 指针扫描 + LoadLibrary注入  
- [x] <!-- id:t_pe dep:none --> Day 1-4: PE 格式 (DOS/NT/COFF头/节表/导入/导出/重定位)  
- [x] <!-- id:t_inject_manual dep:none --> Day 5: 手动映射注入 (Manual Map, 模块列表不可见)  
- [x] <!-- id:t_inject_shellcode dep:none --> Day 6: Shellcode 注入 (PEB走法 + MASM)  
- [x] <!-- id:t_inject_hook dep:none --> Day 7: SetWindowsHookEx 钩子注入 (系统被动注入)  
- [ ] <!-- id:t_inject_apc dep:t_inject_hook --> Day 8: APC 注入 (QueueUserAPC)  

**阶段一：注入收尾 (8-10)**  
- [ ] <!-- id:t_inject_summary dep:t_inject_apc --> Day 9: 注入体系总结 — 六种方式对比表 + 统一分析五问 + 线程劫持原理  
- [ ] <!-- id:t_detect dep:t_inject_summary --> Day 10: 注入检测视角 — DEP/ASLR/CFG + 反注入思路  

**阶段二：Hook 体系 (11-15)**  
- [ ] <!-- id:t_hook_iat dep:t_detect --> Day 11: x64 汇编 + IAT Hook — 调用约定/SSE浮点基础 + 替换导入表地址  
- [ ] <!-- id:t_hook_inline dep:t_hook_iat --> Day 12: Inline Hook — jmp detour/5字节/Trampoline/原子写入  
- [ ] <!-- id:t_hook_vtable dep:t_hook_inline --> Day 13: VTable Hook — C++虚函数表替换 + 对象逆向基础  
- [ ] <!-- id:t_hook_veh dep:t_hook_vtable --> Day 14: VEH Hook + SEH对比 — 向量化异常处理 + SEH机制 + x64表驱动异常(.pdata/.xdata)  
- [ ] <!-- id:t_hook_hwbp dep:t_hook_veh --> Day 15: 硬件断点 (HWBP) — DR0-DR7寄存器/单次触发/反检测  

**阶段三：反调试与保护 (16-20)**  
- [ ] <!-- id:t_debugger dep:t_hook_hwbp --> Day 16: 调试器原理 — 断点触发/异常分发/DebugPort  
- [ ] <!-- id:t_anti_debug_peb dep:t_debugger --> Day 17: 反调试基础 — PEB.BeingDebugged/NtGlobalFlag/IsDebuggerPresent  
- [ ] <!-- id:t_anti_debug_time dep:t_anti_debug_peb --> Day 18: 高级反调试 — RDTSC计时/TLS回调/NtQueryInformationProcess  
- [ ] <!-- id:t_anti_anti_debug dep:t_anti_debug_time --> Day 19: 绕过反调试 — 手动Patch/ScyllaHide原理/反反调试思维  
- [ ] <!-- id:t_protection dep:t_anti_anti_debug --> Day 20: 软件保护综述 — 加壳/混淆/自修改/反篡改/VM保护概念  

**阶段四：内核基础 (21-26)**  
- [ ] <!-- id:t_kernel_arch dep:t_protection --> Day 21: 内核架构基础 — Ring0/Ring3/系统调用(syscall)/SSDT  
- [ ] <!-- id:t_kernel_callback dep:t_kernel_arch --> Day 22: 内核回调机制 — PsSetCreateProcessNotifyRoutine + 驱动入口  
- [ ] <!-- id:t_kernel_ssdt dep:t_kernel_callback --> Day 23: SSDT Hook原理 — 内核级Hook/KD调试/VTL0/VTL1概念  
- [ ] <!-- id:t_kernel_comm dep:t_kernel_ssdt --> Day 24: 驱动通信 + 对象生命周期 — IOCTL/共享内存/引用计数/IRQL与锁  
- [ ] <!-- id:t_kernel_filter dep:t_kernel_comm --> Day 25: 过滤器驱动 — Minifilter(文件)/NDIS/WFP(网络)概念  
- [ ] <!-- id:t_kernel_ob dep:t_kernel_filter --> Day 26: 内核对象管理 — ObRegisterCallbacks/进程线程保护  

**阶段五：综合实战 (27-30)**  
- [ ] <!-- id:t_game_reverse dep:t_kernel_ob --> Day 27: 游戏逆向实战 — Unity/UE基础 + STL容器识别(vector/string) + 对象结构恢复  
- [ ] <!-- id:t_game_data dep:t_game_reverse --> Day 28: 游戏数据分析 — 存档格式/网络协议/资源文件分析 + 静态分析工具(IDA/Ghidra)  
- [ ] <!-- id:t_anti_cheat dep:t_game_data --> Day 29: 反外挂分析 — 检测引擎架构/特征码/行为检测/威胁建模/服务器侧校验  
- [ ] <!-- id:t_integration dep:t_anti_cheat --> Day 30: 综合闭环项目 — 完整分析报告: PE→注入→Hook→检测→保护→反外挂评估  

### 第二阶段：Day 31-60（GPT-5.5 建议，Day 30 后执行）

- [ ] <!-- id:t_phase_a dep:t_integration --> Day 31-34: x64 汇编进阶 + SSE/AVX + 编译器优化识别  
- [ ] <!-- id:t_phase_b dep:t_phase_a --> Day 35-38: C++ 对象模型 + RTTI + STL 容器恢复  
- [ ] <!-- id:t_phase_c dep:t_phase_b --> Day 39-41: SEH/VEH 深入 + x64 栈展开 + TLS/Loader 高级  
- [ ] <!-- id:t_phase_d dep:t_phase_c --> Day 42-45: 游戏数学 + 相机/矩阵/World-to-Screen  
- [ ] <!-- id:t_phase_e dep:t_phase_d --> Day 46-49: 调试器进阶 + Trace/Dump/自动化脚本  
- [ ] <!-- id:t_phase_f dep:t_phase_e --> Day 50-53: 版本 Diff + 特征码定位 + CE 进阶  
- [ ] <!-- id:t_phase_g dep:t_phase_f --> Day 54-57: Windows 多线程 + 同步机制 + Hook 稳定性  
- [ ] <!-- id:t_phase_h dep:t_phase_g --> Day 58-60: 第二次综合项目 + 完整逆向报告  

## Current Status  

进度: 7/30 (23%) — 第一阶段  
路线: GPT-5.5 制定 Day 8-60 完整路线，Codex 逐课落地教学  
正在: Day 8 APC 注入 — 待开始  
下一步: 学 APC 机制 (异步过程调用/Alertable State/QueueUserAPC)  

## Decisions  

- <!-- at:2026-07-30T18:15:00+08:00 --> GPT-5.5 负责大方向规划，Codex 负责逐课教学+写代码。路线扩展为两阶段：第一阶段 Day 1-30（6个阶段），第二阶段 Day 31-60（8个阶段）  
- <!-- at:2026-07-30T18:15:00+08:00 --> Day 10 之后不再以"会多少种注入"为进度指标，而以"能否解释执行链/能用调试器验证/能分析检测与误报"为标准  
- <!-- at:2026-07-30T18:15:00+08:00 --> Day 11 加入 SSE/XMM 浮点基础（movss寄存器传参），避免分析游戏坐标时卡住  
- <!-- at:2026-07-30T18:15:00+08:00 --> Day 14 加入 SEH vs VEH 对比 + x64 表驱动异常（.pdata/.xdata）  
- <!-- at:2026-07-30T18:15:00+08:00 --> Day 24 加入内核对象生命周期/引用计数/IRQL安全意识  
- <!-- at:2026-07-30T18:15:00+08:00 --> Day 27 加入 STL 容器最低识别（vector<Entity*>/string/简单继承）  
- <!-- at:2026-07-30T18:15:00+08:00 --> 每日输出强制包含: 实验环境/已验证结论/推测结论/调试证据/失败实验/版本信息  

## Key Paths  

- 解决方案: `C:\Users\Administrator\Desktop\学习\Dll1\学习.sln`  
- 网站仓库: `C:\Users\Administrator\Desktop\dongtaixuexi\`  
- 网站在线: https://xiaojia-afk.github.io/dongtaixuexi/  
- 接续文件: `C:\Users\Administrator\Desktop\Codex接续文件_拖进新对话.txt`  
- 学习数据: `C:\Users\Administrator\Desktop\dongtaixuexi\days.json`  

## Standings  

### 教学框架  
用户不是要代码助手，是要长期学习辅助者。教学必须：概念→底层原理→逆向视角→验证→误区→关联。  
代码先讲"为什么/解决什么/设计思路/执行流程"再给代码。  
用户猜测时先拆解推理再判断对错。  

### 用户偏好  
中文沟通，英文术语加括号解释。新手需详细引导，不要甩大纲。  
学习方式：B站视频 + AI辅助 + 动手验证。每天投入时间多。  
GPT-5.5 规划方向 + Codex 教学落地 = 双AI协作模式。  

### 每天教学结构 (GPT-5.5 制定)  
1.今日目标 2.前置知识检查 3.核心概念 4.Windows底层原理 5.逆向者视角 6.防御/反外挂视角 7.最小可运行实验 8.调试验证 9.常见错误与崩溃原因 10.32/64位差异 11.与之前课程的关联 12.课后练习 13.验收问题 14.笔记网站文章大纲  

### 每天输出的强制笔记区块 (GPT-5.5 制定)  
- 实验环境 (Windows版本/x64或x86/编译器版本/Debug或Release/工具版本)  
- 已验证结论  
- 仅为推测的结论  
- 调试证据 (寄存器/调用栈/内存布局/模块和偏移)  
- 失败实验 (现象/原因/修复)  
- 版本相关内容  
- 官方资料来源 (Microsoft Learn/Windows Internals/工具文档)  

### 技能  
已安装: find-skills, grill-me, grill-with-docs, improve-codebase-architecture, track-session  
