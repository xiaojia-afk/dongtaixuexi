---  
schema: cc-dash/session@1  
project: windows-reverse-learning  
session_id: s_2026-07-30_day8-apc  
started: 2026-07-30T00:00:00+08:00  
last_updated: 2026-08-06T21:30:43+08:00
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
- [x] <!-- id:t_inject_apc dep:t_inject_hook --> Day 8: APC 注入 (QueueUserAPC)  

**阶段一：注入收尾 (8-10)**  
- [x] <!-- id:t_inject_summary dep:t_inject_apc --> Day 9: 注入体系总结 — 六种方式对比表 + 统一分析五问 + 线程劫持原理
- [x] <!-- id:t_detect dep:t_inject_summary --> Day 10: 注入检测视角 — DEP/ASLR/CFG + 反注入思路  

**阶段二：Hook 体系 (11-15)**  
- [x] <!-- id:t_hook_iat dep:t_detect --> Day 11: x64 汇编 + IAT Hook — 调用约定/SSE浮点基础 + 替换导入表地址
- [x] <!-- id:t_hook_inline dep:t_hook_iat --> Day 12: Inline Hook — jmp detour/5字节/Trampoline/原子写入
- [x] <!-- id:t_hook_vtable dep:t_hook_inline --> Day 13: VTable Hook — C++虚函数表替换 + 对象逆向基础
- [x] <!-- id:t_hook_veh dep:t_hook_vtable --> Day 14: VEH Hook + SEH对比 — 向量化异常处理 + SEH机制 + x64表驱动异常(.pdata/.xdata)
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

进度: 14/30 (47%) — 第一阶段
路线: Day 8-60 主路线保持不变；DS 负责理论前置与实操后复盘，Codex 负责工程/实操/调试证据验收/笔记网站
教学阶段: DS 理论前置
实操模型: 5.6luna max（日常实操）
正在: Day 15 硬件断点（HWBP）— 尚未开始。Day 14 已完成 DS 理论前置、Sol 实操/调试证据验收、DS 实操后复盘与理解确认，并按实测边界正式验收；Day 15 等待 DS 理论前置交接卡。
下一步: 由 DS 开始 Day 15 硬件断点（HWBP）的理论前置；DS 交接前 Codex 不提前开始实操。

## Decisions  

- <!-- at:2026-08-06T21:30:43+08:00 --> 学习闭环低开销协议 v4 已落地：DS 网站内容交回卡优先触发原实操模型直接闭环，即使 SESSION 仍显示“DS 实操后复盘”也不再退回 DS；确定性闭环只保留一个 Luna/Sol 执行者，不创建同模型子代理，不重跑已验收实验。Day 完成、正式源文件、GitHub 构建、Pages 公开发布分开报告；Pages 推送后只做一次不超过 60 秒的状态检查，外部排队则记录唯一缺口并停止，不默认推空提交。桌面上下文助手已升级为 v4，提示词契约测试 4/4 和 EXE 启动验证通过；本次规则优化不改变当前 Day 状态，也不算学习证据。

- <!-- at:2026-08-06T20:05:28+08:00 --> Day 14 最终事实审计通过：DS 交回卡已补齐实操后复盘与理解确认；本轮重新完成 Debug/Release x64 单项目 Rebuild 和独立运行，两个产物均返回 0，分别验证 `E0421401 -> VEH -> 108` 与 `E0421402 -> VEH declined -> SehFilter -> 200`。普通 x64dbg 的 `Day14VehHandler`/`SehFilter` 停点证据与当前源码、Debug RVA `0x1240/0x1400` 一致。`C0000005` 仅确认发生在普通 GUI 的嵌套异常处理者软件断点人工续跑场景，x64dbg 内部精确故障点仍未验证；不把推测升级为根因。x64 表驱动表述修正为：最终 Debug PE 有只读 `.pdata`，unwind/handler 数据位于只读 `.rdata`（文档常称 xdata），不声称本构建存在独立命名的 `.xdata` 节。

- <!-- at:2026-08-06T19:15:31+08:00 --> 学习系统规则审计完成：长期规则、`learning-closeout` skill、上下文助手源码/README 和 SESSION 的四阶段路由已统一；桌面 `学习上下文助手.exe` 重建为 `2026-08-06-v3`，当前“DS 实操后复盘”会自动推荐 DS，Luna/Sol 提示词强制在实操证据齐全后停止理论讲解并交出事实摘要。提示词合同自动测试 3/3 通过，旧 v2 备份和临时构建缓存已移入回收站；本次基础设施优化不算 Day 14 完成证据。

- <!-- at:2026-08-06T19:06:21+08:00 --> 学习闭环角色边界纠正：固定顺序改为“DS 理论前置 -> Luna/Sol 实操与取证 -> DS 实操后复盘与理解确认 -> 原 Luna/Sol 文件和网站闭环”。Codex 只验收实操工程与可见证据，不再承担实操后的整课理论讲解或理论考试；没有 DS 复盘交回卡时 Day 必须保持 in-progress。Day 14 已取得全部实操证据，当前正式进入 DS 实操后复盘阶段，days.json 仍为 planned，网站未生成、未发布。

- <!-- at:2026-08-06T18:36:27+08:00 --> Day 14 Sol 根因审计修正：旧 GUI 会话不是完整根因。干净 GUI 能稳定进入 `Day14VehHandler`，但用户从 handler 内的软件断点手动 F9 后仍复现同一 `ntdll C0000005`；隔离 headless 由脚本控制相同执行链则能从 `E0421401` handler 继续到 `E0421402`，证明目标代码和 Windows VEH 返回链可用，差异集中在普通 GUI 中“嵌套异常处理者软件断点后的人工续跑”。教学路线改为每个证据点使用新进程的一次性自动检查点，不再重复 F9/Shift+F9。

- <!-- at:2026-08-06T18:18:09+08:00 --> Day 14 命中 Luna 自动升级条件：同一 `ntdll` 访问异常在第一次异常和交回后的第二次异常重复出现，`Day14VehHandler` 断点始终未命中。已停止第三次同类尝试，将“实操模型”切换为 `5.6sol max（救场，直到当前 Day 验收）`；Day 14 保持 in-progress，唯一缺口为可信的调试器内 VEH/SEH 顺序证据。

- <!-- at:2026-08-06T17:54:16+08:00 --> Day 14 后台预检完成：新建 `学习\Dll1\VEHHookLab` 并加入 `学习.sln`，x64/v145/C++20/Debug-PDB 和统一 `学习\Dll1\x64\Debug|Release\` 输出约定与前课一致。Day 14 项目 Debug Rebuild、Release 单项目 Rebuild、Debug/Release 独立运行均成功；`dumpbin /unwindinfo` 已列出三个关键函数的 x64 unwind 记录，普通调试器证据仍待用户操作确认。

- <!-- at:2026-08-03T11:50:48+08:00 --> Day 13 后台预检完成：独立 `VTableHookLab` 归入 `学习\Dll1\` 并加入 `学习.sln`；Debug/Release 输出统一到 `学习\Dll1\x64\Debug|Release\`。独立运行已验证 Add 的虚表 slot 0 被替换后结果从 8 变为 108，Multiply slot 1 保持 15，恢复 vptr 后 Add 回到 8；调试器内证据仍必须由后续实操确认。

- <!-- at:2026-08-03T12:51:54+08:00 --> Day 13 验收通过：用户能用大白话说明对象 vptr 指向 vtable 副本、slot 0 改为 HookAdd、HookAdd 调用保存的原 Add、恢复原 vptr；普通 x64dbg 已实测 RIP/模块/函数、RCX/RDX/R8、调用栈和副本 slot 0 字节证据；用户理解直接改公共 vtable 会影响共享对象且只读写入可能崩溃。正式文章已写入 days.json，待网站构建与发布验证。

- <!-- at:2026-08-02T21:46:03+08:00 --> 用户明确终止本次 Sol 救场并要求 Luna 重新接管 Day 12；这是对当前接管状态的直接覆盖。Day 12 继续保持 in-progress，Luna 不继承失败教学步骤、不假定现有代码正确，必须先独立复核和亲自跑通，再让用户操作；未验收前不更新 days.json 或网站。
- <!-- at:2026-08-02T21:46:03+08:00 --> Day12InlineHook 的 Debug/Release 输出已统一到 `学习\Dll1\x64\Debug|Release`，旧的 `学习\x64\Release\Day12InlineHook.exe` 已在重建时清理，避免再次误开 Release 版。
- <!-- at:2026-08-02T22:01:24+08:00 --> Luna 后台复核完成：InlineHookLab Debug/Release 均由 MSBuild Rebuild 成功；Debug `--no-break` 与 Release 独立运行均返回 0，Before/After/Restored 结果均为 18，Detour 字节为 `E9 0B 00 00 00 90 90 90`。隔离 x64dbg headless 已加载 Debug PDB 并在 `HookAdd` 停下，实测 `RIP=HookAdd`、`RCX=3`、`RDX=5`；这证明工程和寄存器验收目标成立，但普通 GUI 截图仍待用户复现。
- <!-- at:2026-08-02T22:01:24+08:00 --> 已备份并修正普通 x64dbg 的 `IgnoreRange`，移除覆盖全地址空间的 `nobreak`，保留 `C:\Users\Administrator\Desktop\x64dbug\release\x64\x64dbg.ini.day12-before-ignore.bak` 作为回退副本；不修改工程源代码。
- <!-- at:2026-08-02T22:12:32+08:00 --> 用户在普通 x64dbg GUI 中实际确认 `HookAdd` 停点，寄存器 `RCX=3`、`RDX=5`；这是当前 Day 12 的有效调试证据，已不再只是 headless 或后台推断。
- <!-- at:2026-08-02T22:16:41+08:00 --> 用户用自己的话理解了核心链路：改变的是执行路线/跳转地址，不改变 `RCX/RDX` 中的参数 `3/5`；核心概念复述门已满足。
- <!-- at:2026-08-02T22:19:41+08:00 --> 用户理解了 trampoline：把被覆盖的原代码留存下来，Hook 处理后再接着执行原代码；核心结构链理解门已满足。
- <!-- at:2026-08-02T22:27:43+08:00 --> Day 12 验收通过并正式收尾：用户完成 Inline Hook 执行链、参数保持、trampoline、指令边界失败点和 x64dbg 证据理解；下一 Day 恢复 Luna 日常实操模型。
- <!-- at:2026-08-02T22:27:43+08:00 --> 用户要求移除笔记主页上的情侣问卷跳转入口；已从 `build.js` 移除入口和样式，保留情侣问卷目录及其独立网站，不再从主笔记页跳转。
- <!-- at:2026-08-02T20:49:10+08:00 --> 学习基础设施统一为三段式：DS/V4flash max 只讲理论；Codex 5.6luna max 负责日常实操与闭环；同类失败两次、约 20 分钟无新证据、需要整体换方案或解释与证据冲突时，由 Luna 自动把“实操模型”切到 5.6sol max，Sol 接管当前 Day 直到验收。提示词助手与 `learning-closeout` skill 同步执行该协议；桌面 `学习上下文助手.exe` 是唯一正式入口。本次基础设施重构不构成 Day 12 完成证据。
- <!-- at:2026-08-02T20:20:44+08:00 --> 固定新分工：DS(V4flash max)只负责基础理论、类比和理解纠偏；Codex(日常5.6luna max，重大复盘可用5.6sol max)全权负责实验代码、构建运行、调试实操、验收、SESSION、正式笔记和网站。Codex 实操一次只给一个动作，后台工程未稳定前不让用户陪同试错。
- <!-- at:2026-08-02T20:20:44+08:00 --> Day 12 采用独立 `InlineHookLab` 源项目、输出 `Day12InlineHook.exe`。Debug 默认在 HookAdd 内放透明的无条件 INT3 教学检查点，`--no-break` 仅供后台独立运行；Release 不启用检查点。该设计不依赖 IsDebuggerPresent、旧断点数据库或固定 ASLR 地址。
- <!-- at:2026-07-31T23:40:00+08:00 --> Day 11 x64 汇编 + IAT Hook 完成。核心模型：IAT 槽位=8字节格子存地址；Hook=换格子里的地址，程序 call [槽位] 即跳进 Hook 函数。调试验证：寄存器 RDX/R8/R9 实测参数传递（规则1），调用栈 main → MyMessageBoxA 证明 IAT 被调包，弹窗内容被篡改证明 Hook 函数先执行再调原函数。
- <!-- at:2026-07-30T18:15:00+08:00 --> GPT-5.5 负责大方向规划，Codex 负责逐课教学+写代码。路线扩展为两阶段：第一阶段 Day 1-30（6个阶段），第二阶段 Day 31-60（8个阶段）  
- <!-- at:2026-07-30T18:15:00+08:00 --> Day 10 之后不再以"会多少种注入"为进度指标，而以"能否解释执行链/能用调试器验证/能分析检测与误报"为标准  
- <!-- at:2026-07-30T18:15:00+08:00 --> Day 11 加入 SSE/XMM 浮点基础（movss寄存器传参），避免分析游戏坐标时卡住  
- <!-- at:2026-07-30T18:15:00+08:00 --> Day 14 加入 SEH vs VEH 对比 + x64 表驱动异常（.pdata/.xdata）  
- <!-- at:2026-07-30T18:15:00+08:00 --> Day 24 加入内核对象生命周期/引用计数/IRQL安全意识  
- <!-- at:2026-07-30T18:15:00+08:00 --> Day 27 加入 STL 容器最低识别（vector<Entity*>/string/简单继承）  
- <!-- at:2026-07-30T18:15:00+08:00 --> 每日输出强制包含: 实验环境/已验证结论/推测结论/调试证据/失败实验/版本信息
- <!-- at:2026-07-31T01:30:00+08:00 --> Day 8 APC 注入完成。核心教训：APC 注入必须目标线程进入 Alertable State（SleepEx/WaitFor*Ex + TRUE），GetMessage 消息循环不触发。LoadLibraryA 无法处理中文路径，必须用 LoadLibraryW。MSVC 源文件 UTF-8 需加 /utf-8 编译选项。  
- <!-- at:2026-07-31T12:30:00+08:00 --> Day 9 注入体系总结完成并由 Codex 维护笔记网站。核心模型：先按代码载体、执行入口、Loader 责任、可见证据分析；防御侧以模块/内存/线程/上下文异常反推注入家族。
- <!-- at:2026-07-31T12:45:00+08:00 --> [已由 2026-08-02 新分工废止] 当时约定日常网站维护由 DS 执行；现已改为 Codex 全权负责正式笔记与网站闭环。
- <!-- at:2026-07-31T15:26:59+08:00 --> 已一次性升级前期基础与 Day 1-8 的正式笔记：保留原实验记录，补齐复习锚点、验证证据、误区排查、关联/防御视角和版本/资料方向；网站已重新生成。
- <!-- at:2026-07-31T15:50:48+08:00 --> 已建立 Codex/Reasonix/OpenCode 的学习闭环配置：验收通过后自动更新进度与笔记、生成校验网站并仅提交指定学习文件；提示词 EXE 已重建以携带同一规则。
- <!-- at:2026-07-31T16:01:16+08:00 --> 学习闭环升级为完成条件驱动：老师在教学中自动追踪概念复述、实验证据/失败诊断、误区/防御视角和验收；最后一个学习条件满足时主动发验收题，验收通过后自动收尾，无需用户宣布完成。
- <!-- at:2026-07-31T16:25:00+08:00 --> Day 10 注入检测视角完成：DEP 限制数据页执行，ASLR 随机化加载地址，CFG 校验间接控制流目标；检测应关联模块、私有可执行内存、线程入口和权限/写入历史，不能因未见 RWX 就判定安全。课程采用概念推理验收，尚未进行实时进程枚举实验。
- <!-- at:2026-08-01T00:05:00+08:00 --> Day 11 的 IATHook 已从错误的独立目录迁入 `学习\Dll1\IATHook`，加入 `学习.sln`，并修复了构建脚本路径、导入表 `OriginalFirstThunk` 回退与 `VirtualProtect` 错误检查；Day 11 尚未完成，必须等待用户实际运行验证。
- <!-- at:2026-08-01T00:05:00+08:00 --> 长期协作规则新增教学自检与学习代码工程约定：先确认前置知识/路径/范围，区分实测与推理；学习项目归入 `Dll1\学习.sln`，Release 运行包与调试产物分离。
- <!-- at:2026-08-01T00:22:00+08:00 --> 已审阅一份历史教学对话导出：它只能补充用户偏好与失败模式，不能覆盖当前进度。规则新增明确交接边界、连续工具失败的止损机制，以及禁止让用户充当命令转发者。
- <!-- at:2026-08-01T00:23:57+08:00 --> IATHook Release x64 构建通过（0 警告、0 错误）；统一 Release 目录仅保留 `IATHook.exe`，早期 Debug 版 exe/PDB 已清理。尚未由用户实际运行验证。
- <!-- at:2026-08-01T00:37:27+08:00 --> 已完成笔记网站审阅与生成器优化：课程进度统一显示 Day 10/30（基础单独计数），路线图补齐 Day 5-7，移动端侧栏改为顶部可滚动导航；Day 9 新增“复习入口”以明确证据边界、常见误区与 Day 10/11 的关联。已验证 days.json、生成页与 git diff --check；未发布，Day 11 仍等待运行验证。
- <!-- at:2026-08-01T00:45:37+08:00 --> Day 11 最小 IAT Hook 实验成功：首个 MessageBoxA 为 Hook 前对照；IAT 槽位从 user32!MessageBoxA 改为 exe 内 MyMessageBoxA；第二次弹窗正文被修改，控制台输出 Hook 命中，无崩溃/乱码。下一缺口是调试器证据、练习和验收，Day 11 保持进行中。

## Failed Attempts

- <!-- id:f_day14_gui_resume_from_veh task:t_hook_veh --> Sol 用隔离用户目录启动干净普通 x64dbg，已成功命中 `Day14VehHandler` 并由用户读出 `E0421401`；但随后人工 F9 仍在 `ntdll!00007FFE7336C286` 触发 `C0000005`。因此“只清旧 GUI 会话后继续手动运行”不足以修复，禁止第三次重复；后续改为新进程的一次性脚本检查点。

- <!-- id:f_day14_symbol_bp task:t_hook_veh --> 直接用 `bp day14vehhook.Day14VehHandler` 设置符号断点返回“无效地址”；改用当前进程模块基址加已核对的 handler RVA 设置 `00007FF7530A1240`，断点被 x64dbg 接受，但尚未命中。
- <!-- id:f_day14_ntdll_av task:t_hook_veh --> 设置 handler 断点后按 F9，x64dbg 在 `ntdll` 地址 `00007FFE7336C286` 首次停下，异常码为 `C0000005 / EXCEPTION_ACCESS_VIOLATION`；按一次 Shift+F9 交回后，同一地址变为第二次异常，`Day14VehHandler` 仍未命中。按升级规则停止继续当前路线，待 Sol 审计异常来源与调试器分发配置。

- <!-- id:f_day14_msbuild_path task:t_hook_veh --> 首次调用 `msbuild` 未找到命令；已定位 Visual Studio 18 Community 的 amd64 MSBuild 绝对路径，后续 Debug Rebuild 成功。
- <!-- id:f_day14_solution_release_oldprojects task:t_hook_veh --> 方案级 Release Rebuild 被既有 `HookDll` 的 `_wfopen` 安全警告和 `Dll1` 的预编译头错误阻断；Day 14 项目自身已在该次生成并通过单项目 Release Rebuild，未修改无关旧项目。

- <!-- id:f_day13_sandbox_build task:t_hook_vtable --> 首次 Day 13 MSBuild 在默认沙箱中无法创建桌面工程的 `VTableHookLab\x64\Debug\` 中间目录，报访问被拒绝；改用受控构建权限后 Debug/Release Rebuild 均成功，不能将该环境阻断误判为代码编译失败。

- <!-- id:f_day13_int3_loop task:t_hook_vtable --> Day 13 初版把 `__debugbreak()` 放进 HookAdd，普通 x64dbg 中表现为 `INT3` 地址来回切换，反复 F9 不能得到稳定的普通断点证据；已移除自带 INT3，改用符号 `HookAdd` 上的普通 F2 断点，并由用户实际命中。

- <!-- id:f_day12_wrong_release task:t_hook_inline --> 第一次新工程 x64dbg 尝试误开了旧路径 `学习\x64\Release\Day12InlineHook.exe`；截图入口 RVA `1A90` 与 Release PE 头一致，因此该次不构成 Debug 失败证据。工程输出目录随后已统一，旧误导副本已清理。
- <!-- id:f_day12_int3_ignore task:t_hook_inline --> 后续自动 INT3 路线仍未得到有效停点；已在 `x64dbg.ini` 确认 `IgnoreRange=00000000-00000000:first:log:debuggee,00000000-FFFFFFFF:nobreak:log:debuggee`，该规则覆盖断点异常 `0x80000003`，足以解释为何程序不暂停。禁止再让用户重复按 F9；Luna 必须先修正/隔离此配置并自行获得调试器证据。
- <!-- id:f_day12_ds task:t_hook_inline --> 旧 Day 12 InlineHook 工程虽能独立运行，但代码质量与 x64dbg 教学过程不可靠；用户授权后已删除旧项目、旧 Debug/Release 产物和解决方案引用，禁止重新使用。
- <!-- id:f_day12_break task:t_hook_inline --> 第一版 Codex InlineHookLab 独立运行成功，但普通/硬件断点未在用户 x64dbg 中命中；随后用 IsDebuggerPresent 控制 INT3 仍直接结束，原因是调试器隐藏设置可能使检测返回假。已移除该依赖，改为 Debug 默认无条件检查点；调试器内证据仍待实测，不能标记 Day 12 完成。
- <!-- id:f_day12_headless_entry task:t_hook_inline --> 初始 x64dbg headless `-c` 路线被默认 `EntryBreakpoint=1` 和启动时序截停在 system/mainCRTStartup；改用 `-cf` 脚本清除 `mainCRTStartup` 后才稳定命中 `HookAdd`，因此前面的 system/entry breakpoint 输出不算 Day 12 调试证据。

## Completed Work

- <!-- ref:t_hook_veh at:2026-08-06T20:05:28+08:00 --> Day 14 正式完成：DS 理论前置与实操后复盘门均满足；Debug/Release 编译和独立运行、普通 x64dbg 中 `E0421401/E0421402` 先到 VEH 以及 `SehFilter` 的 RIP/RCX、Debug PE 的 `.pdata`/unwind 元数据均通过核对；失败实验及“已验证/推测”边界已保留。下一 Day 恢复 Luna 日常实操模型。

- <!-- ref:t_hook_vtable at:2026-08-03T11:50:48+08:00 --> 完成 Day 13 `VTableHookLab` 工程创建、解决方案接入、Debug/Release Rebuild 和独立运行验证；当前唯一缺口是普通 x64dbg 中的 HookAdd 停点与寄存器/对象虚表证据，Day 13 尚未验收。

- <!-- ref:t_hook_vtable at:2026-08-03T12:51:54+08:00 --> Day 13 正式完成：完成 VTable Hook 工程、独立运行、普通 x64dbg 停点、参数寄存器、调用栈、对象 vptr/虚表副本内存证据、概念复述和失败点理解；days.json 已更新为 done，网站生成验证待完成。

- <!-- ref:t_hook_inline at:2026-08-02T22:01:24+08:00 --> 完成 Day 12 工程后台预检、Debug/Release 重建、独立运行核验、隔离 x64dbg headless 停点验证和普通 x64dbg 异常配置修正；Day 12 仍保持 in-progress，等待用户在普通 GUI 中复现并完成概念/失败点/验收闭环。
- <!-- ref:t_hook_inline at:2026-08-02T22:12:32+08:00 --> 用户完成普通 x64dbg `HookAdd` 停点复现，实测 `RCX=3`、`RDX=5`；仍需核对 detour 字节和执行链，并通过概念/失败点/验收后才能收尾。
- <!-- ref:t_hook_inline at:2026-08-02T22:16:41+08:00 --> 用户完成 Inline Hook 核心概念复述：只改变执行路线，不改变参数寄存器内容；仍需完成失败点理解与验收。
- <!-- ref:t_hook_inline at:2026-08-02T22:19:41+08:00 --> 用户能用大白话解释 trampoline 的作用；当前还需完成最后的 Day 12 验收题。
- <!-- ref:t_hook_inline at:2026-08-02T22:27:43+08:00 --> Day 12 正式文章已写入 days.json 并标记 done；node build.js 生成 Day 12/30 页面，验证 JSON、核心文章内容、移除情侣入口和 git diff --check 均通过。

## Verification Results

### Day 14 — Successfully Verified

- 依赖与完成门：Day 13 已完成；DS 理论前置、Sol 实操/调试证据、DS 实操后复盘交回卡和理解确认全部存在，无未解决实操缺口。
- 工程与构建：`VEHHookLab` 属于 `学习.sln`，x64/v145/C++20；Debug 与 Release 单项目 Rebuild 均成功并生成各自的 `Day14VEHHook.exe`。
- 独立运行：Debug/Release 均退出码 0；`E0421401` 路径输出 `VEH handled`、108，`E0421402` 路径输出 `VEH declined -> SEH filter`、200。
- 调试证据：普通 x64dbg 已分别确认 `E0421401`、`E0421402` 到达 `Day14VehHandler`；新进程停在 `day14vehhook!SehFilter+0` 时 `RCX=E0421402`。当前 Debug 二进制再次确认 `Day14VehHandler=RVA 0x1240`、`SehFilter=RVA 0x1400`。
- x64 元数据：当前 Debug PE 为 PE32+ x64，Exception Directory 指向只读 `.pdata`；`dumpbin /unwindinfo` 可见函数表、`__C_specific_handler` 与 scope table，unwind 数据 RVA 落在只读 `.rdata`。

### Day 14 — Preserved Boundary

- 普通 x64dbg GUI 中从嵌套异常处理者的软件断点人工续跑会在历史会话的同一 `ntdll` 地址出现 `C0000005`；它是真实访问违例且不是本课设计的自定义异常。已验证差异集中在该 GUI 续跑场景，但未验证 x64dbg 内部精确故障点，因此只保留现象、范围和稳定替代路线，不写成已确认根因。
- `0x1240/0x1400` 是本轮 Debug 构建 RVA；Release 优化和后续重建可改变函数布局，ASLR 也会改变绝对地址。

## Key Paths  

- 解决方案: `C:\Users\Administrator\Desktop\学习\Dll1\学习.sln`  
- Day 12 源项目: `C:\Users\Administrator\Desktop\学习\Dll1\InlineHookLab\`
- Day 12 Debug: `C:\Users\Administrator\Desktop\学习\Dll1\x64\Debug\Day12InlineHook.exe`
- Day 12 Release: `C:\Users\Administrator\Desktop\学习\Dll1\x64\Release\Day12InlineHook.exe`
- Day 14 源项目: `C:\Users\Administrator\Desktop\学习\Dll1\VEHHookLab\`
- Day 14 Debug: `C:\Users\Administrator\Desktop\学习\Dll1\x64\Debug\Day14VEHHook.exe`
- Day 14 Release: `C:\Users\Administrator\Desktop\学习\Dll1\x64\Release\Day14VEHHook.exe`
- x64dbg 配置: `C:\Users\Administrator\Desktop\x64dbug\release\x64\x64dbg.ini`
- 网站仓库: `C:\Users\Administrator\Desktop\dongtaixuexi\`  
- 网站在线: https://xiaojia-afk.github.io/dongtaixuexi/  
- 新会话提示词工具: `C:\Users\Administrator\Desktop\学习上下文助手.exe`
- 提示词助手源码: `C:\Users\Administrator\Documents\Codex\2026-07-31\ds-codex-4\outputs\learning-context-assistant\learning_context_assistant.py`
- 学习数据: `C:\Users\Administrator\Desktop\dongtaixuexi\days.json`  

## Standings  

### 教学框架  
用户不是要代码助手，是要长期学习辅助者。教学必须：概念→底层原理→逆向视角→验证→误区→关联。  
代码先讲"为什么/解决什么/设计思路/执行流程"再给代码。  
用户猜测时先拆解推理再判断对错。  

### 用户偏好  
中文沟通，英文术语加括号解释。新手需详细引导，不要甩大纲。  
学习方式：B站视频 + AI辅助 + 动手验证。每天投入时间多。  
固定双 AI 模式：DS(V4flash max)负责基础理论；Codex(5.6luna max，重大复盘用5.6sol max)负责工程、实操、验收和笔记网站。
模型切换由 Codex 自动判断并写入“实操模型”；用户只描述现象和理解，不负责判断技术难度。

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
