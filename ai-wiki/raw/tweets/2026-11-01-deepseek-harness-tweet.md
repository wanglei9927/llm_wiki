# 原始素材：@Super_Nius 推文 — DeepSeek deepseek-harness（Super-agent 架构）

- 原始 URL：https://x.com/super_nius/status/2116536297842213119
- 作者：Super Niu @Super_Nius（独立开发者，热衷制作各类开源工具及 skills）
- 发布时间：2026-10-31 2:22 PM（页面显示时间）
- 抓取时间：2026-11-01（webfetch 自动抓取）
- 互动数据（抓取时）：21.6K 浏览、29 回复、15 转推、136 引用、162 喜欢

## 原帖全文

卧槽！DeepSeek 刚丢出一篇很有吊的设计文章：别再一个窗口一个 AI 了 🧠
它说现在的 Agent（能自己干活的 AI）一个会话就是一个孤岛，你同时推几件事，得自己来回切、自己记上下文。
他们的解法叫 Super-agent，两层：
- Router 层：只管跟你聊、记全局、派活
- Worker 层：每个任务单独开一个隔离会话并行干，干完向 Router 汇报，不直接找你
还加了事件触发（群消息、邮件、代码评论、CI 结果自动喂给它）和 Watchdog 看门狗，挂了能自己恢复 🐕
说白了就是给每个人配一个 24 小时在线的 AI 秘书长。我想看的是真能跑起来的那天。
（附链接：https://github.com/deepseek-ai/deepseek-harness — GitHub - deepseek-ai/deepseek-harness: DeepSeek Harness: Everything is a Plugin.）

## 评论区

### @r8tba 阿布（发帖 14h 后，1K 浏览）

之前做过，我的agent更高级，就是会议模式，主agent负责接活把活交给子agent，同时动态排版，时刻跟你聊天，子agent通过事件总线投递结果给主agent，但是后面我删除了，方向错了，而且这个方向也是codex走的

### @UFO2002616 Heithon（发帖 16h 后，927 浏览）

要出官方 personal agent产品了吗

### @Kepler_Nicoles 织田信长（发帖 10h 后，419 浏览）

Claude code的project也类似

---

> 注：本文件为 AI 抓取的原始素材，只读不改。
