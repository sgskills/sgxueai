/**
 * 课程结构化数据 —— 门户首页 (home.html) 与 Wiki 学习页 (learn.html) 的统一数据源。
 * 维护一处即可，新增/调整课程内容只改这里。
 *
 * 结构：篇章(part) → 主题(topic) → 知识点(lesson)
 * lesson.file 对应 slides/ 下的某个 .html
 * lesson.tag  用于显示彩色标签（交互/动画/概念/案例/安全/实战/电商/汇总/收官/技巧）
 * lesson.ready 为 true 表示页面已上线；缺省或 false 表示「更新中」，首页灰显不可点
 *
 * 品牌：诗光聊AI电商 公益项目（顺为科技出品 · 鸣谢洛小山 xueai.app）
 */
window.COURSE = {
  meta: {
    title: 'AI 电商基础从入门到掌握',
    subtitle: '从 Prompt 到业务流智能体，建立电商 AI 基础认知',
    brand: '诗光聊AI电商 入门课',
    company: '顺为科技',
    author: '张诗光',
    authorUrl: '',
    wechat: '诗光聊AI电商',
  },
  parts: [
    /* ───────────────────────── 导学篇 ───────────────────────── */
    {
      id: 'p0',
      num: '导学篇',
      title: '开学第一课',
      desc: '先搞清楚三件事：你现在在哪、这门课怎么学才有效、为什么电商人必须懂点 AI 底层。',
      color: '#475569',
      topics: [
        {
          id: 't0-start',
          title: '入门与定位',
          desc: '定位自己，明确学法',
          lessons: [
            { file: '0-intro.html', title: '我们在哪里？电商人的达克效应', desc: '用达克曲线定位你在 AI 应用上的真实位置，别在愚昧之巅开店', tag: '开篇', ready: true },
            { file: '0-how.html', title: '怎样学，知识才能留下来', desc: '看完 ≠ 学到——每个案例都要停下来代入自己的店铺想一想', tag: '开篇', ready: true },
            { file: '0-why.html', title: '为什么电商人要懂 AI 底层', desc: 'AI 写文案跑偏、客服答非所问，根子都在底层机制上——懂了才好管', tag: '开篇', ready: true },
          ],
        },
      ],
    },
    /* ───────────────────────── 第一篇章 ───────────────────────── */
    {
      id: 'p1',
      num: '第一篇章',
      title: '电商 AI 认知底座',
      desc: 'Token、上下文窗口、幻觉——为什么 AI 写详情页会跑偏？为什么提示词要那样写？把底层机制用电商话讲明白。',
      color: '#2563EB',
      topics: [
        {
          id: 't1-basic',
          title: 'AI 的底层直觉',
          desc: 'Token、训练与推理、概率生成',
          lessons: [
            { file: '1-1.html', title: 'Token：AI 的“计价单位”', desc: '为什么 API 按 Token 收费？一段详情页文案值多少钱？现场算给你看', tag: '交互', ready: true },
            { file: '1-2.html', title: '训练 vs 推理：AI 不会在聊天中“学习”', desc: '跟 AI 聊了三天它还是不记得你的店？因为对话根本不会更新模型', tag: '概念', ready: true },
            { file: '1-3.html', title: '生成式人工智能：“接龙”概率生成揭秘', desc: '逐字生成动画：看 AI 怎么一个字一个字“猜”出你的商品文案', tag: '动画', ready: true },
          ],
        },
        {
          id: 't1-context',
          title: '上下文与记忆',
          desc: '为什么聊着聊着 AI 就“忘事”',
          lessons: [
            { file: '1-4.html', title: '上下文窗口：AI 的“工作记忆“', desc: '拖动滑块模拟对话变长，看 AI 怎么一步步”忘记”客人最初的要求', tag: '交互', ready: true },
            { file: '1-5.html', title: 'System Prompt：给 AI 立的“店规”', desc: '为什么同一款模型，别人家的客服井井有条，你家的满嘴跑火车', tag: '案例', ready: true },
          ],
        },
        {
          id: 't1-hallucination',
          title: '幻觉：AI 为什么会一本正经地胡说',
          desc: '幻觉成因与电商场景的四种应对',
          lessons: [
            { file: '1-6.html', title: '幻觉演示：AI 编出来的“卖点”', desc: '问 AI 一款不存在的产品，它能给你编出全套参数——电商人必须见过的三类幻觉', tag: '案例', ready: true },
            { file: '1-7.html', title: '应对一：把提示词写成“岗位说明书”', desc: '约束指令怎么写才有效，以及它的天花板在哪', tag: '实战', ready: true },
            { file: '1-8.html', title: '应对二：Temperature 温度调节', desc: '拖动温度滑块，实时看同一条“连衣裙”文案从保守到放飞的变化', tag: '交互', ready: true },
            { file: '1-9.html', title: '应对三：RAG 给 AI 配一本“商品手册”', desc: '检索增强生成 5 步动画：先查资料再回答，卖点再也不瞎编', tag: '交互', ready: true },
            { file: '1-10.html', title: '应对四：评测 + 人工抽检', desc: '冷启动阶段的兜底策略：AI 输出怎么质检、抽检比例怎么定', tag: '概念', ready: true },
          ],
        },
        {
          id: 't1-summary',
          title: '篇章汇总',
          desc: '第一篇章核心知识回顾',
          lessons: [
            { file: 'summary-1.html', title: '汇总 · 认知底座一页纸', desc: 'Token / 上下文 / 幻觉 / 四种应对方案的选择矩阵，一张图带走', tag: '汇总', ready: true },
          ],
        },
      ],
    },
    /* ───────────────────────── 第二篇章 ───────────────────────── */
    {
      id: 'p2',
      num: '第二篇章',
      title: '业务流智能体设计',
      desc: 'Prompt 工程进阶、Agent 循环、成本优化——把大模型从“聊天玩具”变成能干活的客服 Agent、选品 Agent、文案 Agent。',
      color: '#7C3AED',
      topics: [
        {
          id: 't2-prompt',
          title: '电商 Prompt 工程',
          desc: '角色设定、Few-Shot、输出格式控制',
          lessons: [
            { file: '2-1.html', title: '角色扮演：让 AI 进入“金牌运营”状态', desc: '五种人设实时切换，看同一条指令输出差别有多大', tag: '交互', ready: true },
            { file: '2-2.html', title: 'Few-Shot：给 AI 看“爆款范文”', desc: '为什么要给它 3 条优秀详情页当例子？给与不给效果对比', tag: '实战', ready: true },
            { file: '2-3.html', title: '输出格式：让 AI 直接给你能上架的表格', desc: 'JSON / Markdown / 表格三种格式取舍，批量生成标题时的最优解', tag: '交互', ready: true },
            { file: '2-4.html', title: '提示词安全：客服 Agent 的防套话', desc: '客人一句”忽略之前的指令”就让 AI 报错价？注入攻击与三层防御', tag: '安全', ready: true },
          ],
        },
        {
          id: 't2-agent',
          title: 'Agent 设计实战',
          desc: '客服 Agent、选品 Agent、文案 Agent 的循环设计',
          lessons: [
            { file: '2-5.html', title: 'Agent：能干活的 AI 员工', desc: 'Plan / Tool / Memory / Act 四大能力，用“客服的一天”讲透', tag: '概念', ready: true },
            { file: '2-6.html', title: '工具调用：让 Agent 会查库存、查物流', desc: '模型输出指令 → 系统执行 → 结果注回，四步链路可视化', tag: '交互', ready: true },
            { file: '2-7.html', title: 'ReAct 循环：一次退换货咨询的完整链路', desc: '思考→行动→观察，7 步走完一单售后，含自我纠错', tag: '动画', ready: true },
            { file: '2-8.html', title: 'Agent 卡死的 5 种模式', desc: '死循环、乱调工具、幻觉库存……电商 Agent 最常见的翻车姿势与对策', tag: '案例', ready: true },
            { file: '2-9.html', title: 'Skill：把 SOP 喂给 Agent', desc: 'Skill = 流程说明 + 工具指引——把“产品数据分析套路”变成 Agent 的肌肉记忆', tag: '实战', ready: true },
          ],
        },
        {
          id: 't2-cost',
          title: '成本与选型',
          desc: 'Token 效能优化与多模型决策',
          lessons: [
            { file: '2-10.html', title: '客服 Agent 效率提升计算器', desc: 'AI 帮你多接多少客、省出多少小时、高峰少排多少队——拉滑块算清效率红利', tag: '交互', ready: true },
            { file: '2-11.html', title: '五层效能优化体系', desc: '五层动作帮运营把时间从琐事里抢回来——每周 20 小时压到六七个小时', tag: '技巧', ready: true },
            { file: '2-12.html', title: '多模型选型决策矩阵', desc: '文案/图片/客服/数据分析 × 省钱/平衡/效果，一键给出推荐组合', tag: '交互', ready: true },
          ],
        },
        {
          id: 't2-summary',
          title: '篇章收官',
          desc: '汇总与阶段自测',
          lessons: [
            { file: 'summary-2.html', title: '汇总 · 智能体设计一页纸', desc: 'Prompt 四板斧 / Agent 循环 / 成本五层 / 选型矩阵', tag: '汇总', ready: true },
            { file: 'exam.html', title: '阶段自测：前三篇掌握度', desc: '20 道题检验学习成果，错题自动定位到对应知识点', tag: '收官', ready: true },
          ],
        },
      ],
    },
    /* ───────────────────────── 第三篇章 ───────────────────────── */
    {
      id: 'p3',
      num: '第三篇章',
      title: '电商 AI 落地实战',
      desc: '生图产品化、客服话术循环、知识库搭建、多 Agent 协作——从 Demo 到真正能跑在店里的业务流。',
      color: '#059669',
      topics: [
        {
          id: 't3-image',
          title: 'AI 生图与视觉',
          desc: '主图、详情页、海报的产品化生成',
          lessons: [
            { file: '3-1.html', title: 'AI 生图的效率账怎么算', desc: '主图/详情页/海报批量生成：AI 帮你多出多少图、快多少倍——实时计算提速倍数', tag: '交互', ready: true },
            { file: '3-2.html', title: '从一张白底图到一套详情页', desc: '生图产品化流程：垫图、控图、批量出图、人工精修的流水线设计', tag: '实战', ready: true },
            { file: '3-3.html', title: '生图翻车现场与质检清单', desc: '多手指、错 LOGO、材质穿帮——AI 图上架前必查的 8 个细节', tag: '案例', ready: true },
            { file: '3-4.html', title: '产品特征提取：固化生图物理参数', desc: '诗光实战心得：生图漂移的根子是没固化产品特征——两步业务流锁住产品长相', tag: '心得', ready: true },
          ],
        },
        {
          id: 't3-kb',
          title: '店铺知识库',
          desc: 'RAG 在电商的真实落地',
          lessons: [
            { file: '3-5.html', title: 'RAG vs 直接生成：卖点回答对比', desc: '同一个“扫地机器人有什么卖点”，有无知识库左右分屏对比', tag: '交互', ready: true },
            { file: '3-6.html', title: '搭建你的商品知识库', desc: '商品参数、FAQ、售后政策怎么切块入库，检索命中率才高', tag: '实战', ready: true },
            { file: '3-7.html', title: '长期记忆：让运营智能体越用越懂你', desc: '记住你的爆款、诊断习惯、标题风格和品牌调性——为什么运营搭子越用越好用', tag: '概念', ready: true },
          ],
        },
        {
          id: 't3-loop',
          title: '话术循环与多 Agent',
          desc: '客服循环控制与团队协作',
          lessons: [
            { file: '3-8.html', title: '客服话术循环：什么时候该转人工', desc: '循环上限、情绪识别、升级机制——给 Agent 装上“刹车”', tag: '实战', ready: true },
            { file: '3-9.html', title: '上下文压缩：长对话不“断片”', desc: '60% 裁剪 → 75% 微压缩 → 85% 折叠，拖动滑块看四轮压缩防线', tag: '交互', ready: true },
            { file: '3-10.html', title: '多 Agent 协作：选品 + 文案 + 设计流水线', desc: '三个 Agent 接力完成一次上新，调度策略与冲突处理', tag: '动画', ready: true },
            { file: '3-11.html', title: '权限与安全：AI 能改价吗？', desc: '五种权限模式 + 人工兜底节点设计，哪些按钮永远不能让 AI 碰', tag: '安全', ready: true },
          ],
        },
        {
          id: 't3-summary',
          title: '篇章汇总',
          desc: '第三篇章核心知识回顾',
          lessons: [
            { file: 'summary-3.html', title: '汇总 · 落地实战一页纸', desc: '生图流水线 / 知识库 / 话术循环 / 多 Agent 协作全景图', tag: '汇总', ready: true },
          ],
        },
      ],
    },
    /* ───────────────────────── 第四篇章 ───────────────────────── */
    {
      id: 'p4',
      num: '第四篇章',
      title: '电商业务流进阶',
      desc: 'AI 工程设计模式的电商化改造：团队协作规范、AI 输出质检体系、长任务稳定性与自我改进。',
      color: '#DC2626',
      topics: [
        {
          id: 't4-pattern',
          title: '业务流设计模式',
          desc: '从 AI 工程设计模式到电商业务流',
          lessons: [
            { file: '4-1.html', title: '上下文工程：给 AI 的“交接班记录”', desc: '跨班次、跨 Agent 的上下文怎么传递，信息不丢失的设计', tag: '概念', ready: true },
            { file: '4-2.html', title: '工具设计的艺术：给 AI 的“操作台”', desc: '同样的查订单功能，好描述 vs 坏描述成功率差 3 倍', tag: '案例', ready: true },
            { file: '4-3.html', title: '长任务 Agent：跑一夜的竞品监控', desc: '迭代上限、断点恢复、超时控制——让 Agent 长时间稳定干活', tag: '实战', ready: true },
          ],
        },
        {
          id: 't4-eval',
          title: 'AI 输出质检',
          desc: '评测方法论在电商的落地',
          lessons: [
            { file: '4-4.html', title: 'AI 输出怎么质检：三层评测体系', desc: '规则校验 → 模型互评 → 人工抽检，文案/图片/客服各有侧重', tag: '实战', ready: true },
            { file: '4-5.html', title: '建立你的“黄金测试集”', desc: '50 个真实买家问题作为基准，每次改提示词都跑一遍回归', tag: '技巧', ready: true },
            { file: '4-6.html', title: '数据看板：AI 业务流的量化管理', desc: '结论准确率、人工返工率、Token 单耗——运营智能体的 KPI 怎么定', tag: '电商', ready: true },
          ],
        },
        {
          id: 't4-evolve',
          title: '自我改进（扩展阅读）',
          desc: 'Harness 优化与自动进化',
          lessons: [
            { file: '4-7.html', title: '让 AI 优化 AI：提示词自动迭代', desc: '用评测结果反向优化提示词，业务流的自我进化闭环', tag: '概念', ready: true },
            { file: '4-8.html', title: '汇总 · 进阶篇一页纸', desc: '设计模式 / 质检体系 / 自我改进，进阶知识全景', tag: '汇总', ready: true },
          ],
        },
      ],
    },
    /* ───────────────────────── 第五篇章 ───────────────────────── */
    {
      id: 'p5',
      num: '第五篇章',
      title: '电商团队 AI 协作规范',
      desc: 'Vibe Coding 方法论的电商化改造：团队用 AI 写文案、做图、跑数据时的流程控制、质量底线与文档沉淀。',
      color: '#0D9488',
      topics: [
        {
          id: 't5-flow',
          title: '流程控制',
          desc: 'AI 协作的正确姿势',
          lessons: [
            { file: '5-1.html', title: 'AI 协作三段式：说清 → 对齐 → 验收', desc: '为什么“帮我写个详情页”注定返工三次？任务下达的标准流程', tag: '实战', ready: true },
            { file: '5-2.html', title: '提示词六大要素：角色 · 任务 · 背景 · 输出 · 示例 · 约束', desc: '最基本的提示词书写逻辑——灵活组合使用，并非全部必备', tag: '基础', ready: true },
            { file: '5-3.html', title: '小步快跑：别让 AI 一次写 50 条文案', desc: '批次拆分、单点确认、快速纠偏——控制 AI 产出的节奏', tag: '技巧', ready: true },
            { file: '5-4.html', title: 'AI 跑偏了怎么办：退出 Bug 循环', desc: '越改越乱时的三个止损动作：回滚、重述、换路子', tag: '案例', ready: true },
          ],
        },
        {
          id: 't5-quality',
          title: '质量底线',
          desc: '团队 AI 产出的红线与验收',
          lessons: [
            { file: '5-5.html', title: 'AI 产出的四条质量底线', desc: '事实核验、品牌调性、违禁词、版权——哪些检查不能省', tag: '安全', ready: true },
            { file: '5-6.html', title: '验收清单：文案/图片/数据各一份', desc: '直接可抄的三份验收 Checklist，新人也能当天上手', tag: '实战', ready: true },
          ],
        },
        {
          id: 't5-doc',
          title: '文档沉淀',
          desc: '把经验变成团队资产',
          lessons: [
            { file: '5-7.html', title: '提示词资产库：别让经验跟着人走', desc: '提示词的版本管理、命名规范、效果记录，团队共享的正确方式', tag: '技巧', ready: true },
            { file: '5-8.html', title: '电商团队 AI 使用 SOP 模板', desc: '从客服到美工，一套可直接落地的 AI 协作 SOP 框架', tag: '实战', ready: true },
            { file: '5-9.html', title: '汇总 · 协作规范一页纸', desc: '流程 / 质量 / 沉淀三大板块核心要点回顾', tag: '汇总', ready: true },
          ],
        },
      ],
    },
    /* ───────────────────────── 团队应用加餐 ───────────────────────── */
    {
      id: 'p6',
      num: '加餐篇',
      title: '团队应用加餐',
      desc: '非 AI 正课的加餐：选品、测款、现金流、团队——把团队应用可能会踩的坑讲给你听。',
      color: '#F97316',
      bonus: true,
      topics: [
        {
          id: 't6-select',
          title: '选品与测款',
          desc: '爆款的起点',
          lessons: [
            { file: 'lei-1.html', title: '选品的底层逻辑：需求 > 供应链 > 流量', desc: '年销 2000 万单品的选品复盘：先看池子，再看竿子', tag: '电商', ready: true },
            { file: 'lei-2.html', title: '测款：用最小成本验证市场', desc: '测款预算怎么定、数据怎么看、什么信号该加码什么信号该砍', tag: '实战', ready: true },
            { file: 'lei-3.html', title: 'AI 时代的选品新玩法', desc: '用 AI 做竞品分析、评论挖需求、趋势预判的正确姿势', tag: '电商', ready: true },
          ],
        },
        {
          id: 't6-money',
          title: '现金流与经营',
          desc: '活下来比什么都重要',
          lessons: [
            { file: 'lei-4.html', title: '现金流：电商老板的生死线', desc: '库存、账期、推广费——赚钱的公司是怎么被现金流拖死的', tag: '电商', ready: true },
            { file: 'lei-5.html', title: '毛利口径：别把流水当利润', desc: '推广贡献盈亏怎么算？一张表看清每个链接的真实赚钱能力', tag: '实战', ready: true },
          ],
        },
        {
          id: 't6-team',
          title: '团队与成长',
          desc: '一个人走得快，一群人走得远',
          lessons: [
            { file: 'lei-6.html', title: '小团队的 AI 杠杆', desc: '3 个人的团队如何用 AI 干出 10 个人的活：岗位重构而非裁员', tag: '电商', ready: true },
            { file: 'lei-7.html', title: '从操盘手到AI推进官：能力的复利', desc: '个人提效 → 团队复用 → 体系成型：搭建公司 AI 应用体系，带出 AI 型团队', tag: '收官', ready: true },
            { file: 'lei-final.html', title: '全课收官：把 AI 变成你的经营杠杆', desc: '七大篇章串成一条线，给你一张回去就能执行的行动清单', tag: '收官', ready: true },
            { file: 'final-exam.html', title: '结业考试：全课综合测试', desc: '31 道题覆盖七大篇章，考完生成篇章掌握度报告，错题直达复习', tag: '收官', ready: true },
          ],
        },
      ],
    },
  ],
};
