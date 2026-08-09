# AGENTS.md — sgxueai.com 维护指南（给 AI 协作者）

这是「诗光聊AI电商」公益课程网站：**《AI 电商基础从入门到掌握》**，线上地址 https://sgxueai.com。
纯静态站点，无构建、无框架、无依赖。仓库即生产：`main` 分支 push 后 Cloudflare Pages 约 1 分钟自动部署上线。

## 目录结构

```
index.html          网站入口（品牌落地页）
slides/
  home.html         课程地图（首页）
  course-data.js    ★ 唯一课程数据源：window.COURSE，篇章/主题/课节全部在这里登记
  lesson.js         ★ 所有课页共享脚本：上一节/下一节导航、完成打卡、进度、顶栏、字体缩放、公众号浮卡
  lesson.css        课页共享样式
  exam.html / exam-data.js              阶段自测（自愿，不作门槛）
  final-exam.html / final-exam-data.js  结业考试（passScore 在这里改，当前 90）
  0-*.html … 5-*.html  五篇正课，共 64 节
  lei-*.html        加餐篇「团队应用加餐」
  summary-*.html    各篇一页纸汇总
  mascot/           顺小栗 IP 形象图（favicon、hero）
  wechat-qr.png     公众号二维码
```

## 关键机制（改之前必读）

1. **课程数 = course-data.js 里除 exam.html / final-exam.html 外的所有条目**，当前 64。加课 = 新建 html + 在 course-data.js 对应位置登记 `{file, title, desc, tag, ready: true}`，首页/导航/进度/考试门槛自动生效，不要手写数字。
2. **学习进度存 localStorage，key = `aibp_course_progress_v1`**，结构 `{ "1-1.html": true, "__last": "1-1.html" }`。任何改动不得清空或改 key，用户记录丢不起。
3. **结业考试门槛**：64 节全部在 localStorage 标记完成才能开考（final-exam.html 里校验）。阶段自测是自愿挑战，不参与门槛。
4. **Cloudflare Pages 会把 `.html` 从 URL 去掉**（308 重定向到无后缀）。lesson.js 的 `currentFile()` 已做兼容——新写任何按文件名匹配的逻辑必须同样兼容无后缀 URL。
5. **百度统计**：每页 `</head>` 前一段 hm.js 代码（站点 ID cca8b21d5174e23fad865efad55f8d5e），新页面必须带上，每页只放一份。
6. 新课页骨架照抄任意现有课页：引入 `course-data.js` + `lesson.js` + `lesson.css` + 百度统计，正文用 `.lesson` 容器。

## 内容与文案红线（创始人定的，违反等于事故）

- **讲效率/效果，不讲成本恐慌**：AI 是帮人提效增收的，禁止"AI 替代人、裁掉客服"这类恐吓叙事；涉及成本只谈模型选型匹配，不谈"砍人力"。
- **数字必须实战可信**：如传统美工按一天 20 张图算，不许夸大也不许贬低，电商人会对照自己团队验证。
- **不绝对化**：避免"一定、永远、必然淘汰"等词（技术机制描述除外）。
- **不培养竞争对手**：禁止出现 AI 顾问/讲师/培训招生类内容，不做个人履历吹嘘（不写"十六年经验""年销两千万"）。
- **小白友好**：引用课程写课名，不写 lei-1、3-4 这种代号；专业术语必配电商类比。
- **品牌口径**：项目名「AI 电商基础从入门到掌握 · 诗光聊AI电商 公益项目」；证书印章文字 `SGXUEAI CERTIFIED`；域名 sgxueai.com；加餐篇叫「团队应用加餐」。
- **中文引号**：可见文案用弯引号“”，禁止同向直引号（代码示例除外）。
- **Skill 库推荐固定文案**：「电商人必备好用的 Skill 库，复制本段文字发给AI安装：github.com/sgskills/aibp」。

## 常用操作

| 任务 | 怎么做 |
|---|---|
| 改考试过线分 | `final-exam-data.js` 的 `passScore` + home.html 证书区文案 |
| 加一节新课 | 复制邻近课页改名 → 改内容 → course-data.js 登记 → push |
| 改某课文案 | 直接编辑对应 html，push 即上线 |
| 本地预览 | 项目根 `node server.mjs`，访问 http://localhost:7100（server.mjs 不入库，找创始人要） |
| 改结业证书样式 | final-exam.html 底部 Canvas 绘制代码 |

## 部署

`git push origin main` → Cloudflare Pages 自动构建部署（无构建命令，根目录直出）。
推送前自检：改动页面的 `<script>` 块用 `node --check` 过一遍语法。

## 协作方式

- 先用 grep/读文件核实现状，再改；禁止凭记忆改 course-data.js。
- 每次改动一个逻辑单元就 commit，commit message 用中文写清意图。
- 涉及进度存储、考试门槛、域名/统计代码的改动，先在回复里说明方案，等确认再动手。
