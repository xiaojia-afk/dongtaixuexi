请执行当天学习闭环。只有在我明确说“今天学完了 / Day N 完成了 / 可以下一天”，或你已经确认我通过当天验收时才执行；不要因为只讲完一个小节就结课。

先读取并遵守：

1. `C:\Users\Administrator\Desktop\更新笔记助手.txt`
2. `C:\Users\Administrator\Desktop\dongtaixuexi\SESSION_PROGRESS.md`
3. `C:\Users\Administrator\Desktop\dongtaixuexi\days.json`

然后自动完成：

1. 更新 `SESSION_PROGRESS.md`：标记当天完成、刷新进度、记录关键结论和失败/调试证据，下一步指向既定的下一课。
2. 更新 `days.json`：形成可复习的正式文章，保留实验环境、已验证/推测结论、调试证据、失败实验、版本限制、官方资料、执行链、对比表和防御视角。
3. 在 `C:\Users\Administrator\Desktop\dongtaixuexi` 运行 `node build.js`。只编辑 `days.json`，不要手改生成的 `index.html`。
4. 验证 JSON 可解析、生成页含当天标题和关键复习小节、`git diff --check` 通过。
5. 默认发布：先查看 `git status --short`；只能执行 `git add -- SESSION_PROGRESS.md days.json index.html`，绝不使用 `git add -A`；提交后推送 `master`。
6. 最后报告：当前 Day/进度、下一步、修改的文件、公开网站地址，以及任何发布失败原因。

不要改未来课程、不要提交无关或未跟踪文件。桌面的“学习上下文助手.exe”会动态读取这些文件，普通结课后无需重建它。
