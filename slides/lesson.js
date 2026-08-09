/* ═══════════════════════════════════════════════════════════
   lesson.js —— 课程子页统一交互助手
   AI 电商基础从入门到掌握 · 诗光聊AI电商 入门课
   核心原则：内容随滚动自然展现，无需点击"下一步"。

   提供能力：
   1. .reveal 滚动渐入
   2. window.lessonOnView(el, cb)  进入视野触发一次回调（自动播放演示）
   3. 主题切换（localStorage 记忆）
   4. 学习进度记录（localStorage，与 home.html 互通）
   5. 自动注入「上一节 / 下一节」导航与底部「完成并继续」按钮
      （依赖 course-data.js，需在 lesson.js 之前引入）
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var PROGRESS_KEY = 'aibp_course_progress_v1';

  /* ── 进度读写 ── */
  function getProgress() {
    try { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}'); } catch (e) { return {}; }
  }
  function saveProgress(p) {
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(p)); } catch (e) {}
  }
  function currentFile() {
    var path = window.location.pathname.split('/');
    var f = path[path.length - 1] || 'home.html';
    /* Cloudflare Pages 会把 /slides/1-1.html 重定向为无后缀的 /slides/1-1，这里补回 .html 再匹配课程数据 */
    if (f.indexOf('.') === -1) f += '.html';
    return f;
  }
  function markDone(file) {
    var p = getProgress();
    p[file] = true;
    p.__last = file;
    saveProgress(p);
  }
  window.AIBP = { markDone: markDone, getProgress: getProgress };

  /* ── 主题初始化与切换 ── */
  function initTheme() {
    try {
      var t = localStorage.getItem('aibp_course_theme') || 'light';
      document.documentElement.setAttribute('data-theme', t);
    } catch (e) {}
  }
  initTheme();

  function bindThemeBtn() {
    var btn = document.getElementById('themeBtn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', cur);
      try { localStorage.setItem('aibp_course_theme', cur); } catch (e) {}
    });
  }

  /* ── 滚动渐入：.reveal 元素进入视野时自动加 .show ── */
  function initReveal() {
    var els = document.querySelectorAll('.reveal:not(.show)');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(els, function (el) { el.classList.add('show'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('show');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    Array.prototype.forEach.call(els, function (el) { io.observe(el); });
  }

  /* 进入视野触发一次回调（用于自动播放演示动画）。
     用法：lessonOnView(document.getElementById('demo'), function(){ playDemo(); }); */
  window.lessonOnView = function (el, cb, threshold) {
    if (!el || typeof cb !== 'function') return;
    if (!('IntersectionObserver' in window)) { cb(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { io.disconnect(); cb(); }
      });
    }, { threshold: typeof threshold === 'number' ? threshold : 0.35 });
    io.observe(el);
  };

  /* ── 展平课程顺序：从 COURSE 得到 [ {file,title,partNum,partTitle}, ... ] ── */
  function flattenCourse() {
    var list = [];
    if (!window.COURSE) return list;
    window.COURSE.parts.forEach(function (part) {
      part.topics.forEach(function (topic) {
        topic.lessons.forEach(function (ls) {
          list.push({ file: ls.file, title: ls.title, partNum: part.num, partTitle: part.title });
        });
      });
    });
    return list;
  }

  /* ── 自动注入「上一节 / 下一节」+ 底部悬浮按钮 ── */
  function injectNav() {
    var file = currentFile();
    if (file === 'home.html' || file === 'index.html' || file === 'learn.html' || file === 'exam.html' || file === 'final-exam.html') return;
    var flat = flattenCourse();
    if (!flat.length) return;
    var idx = -1;
    for (var i = 0; i < flat.length; i++) { if (flat[i].file === file) { idx = i; break; } }
    var lesson = document.querySelector('.lesson') || document.body;

    var prev = idx > 0 ? flat[idx - 1] : null;
    var next = (idx >= 0 && idx < flat.length - 1) ? flat[idx + 1] : null;

    // 面包屑
    if (idx >= 0) {
      var crumb = document.querySelector('.lesson-topbar .crumb');
      if (crumb) crumb.textContent = flat[idx].partNum + ' · ' + flat[idx].partTitle;
    }

    // 上一节 / 下一节
    if (!document.querySelector('.lesson-nav')) {
      var nav = document.createElement('nav');
      nav.className = 'lesson-nav';
      var inner = '';
      if (prev) {
        inner += '<a class="prev" href="' + prev.file + '">'
          + '<span class="dir">← 上一节</span>'
          + '<span class="nav-title">' + prev.title + '</span></a>';
      } else {
        inner += '<span class="spacer"></span>';
      }
      if (next) {
        inner += '<a class="next" href="' + next.file + '">'
          + '<span class="dir">下一节 →</span>'
          + '<span class="nav-title">' + next.title + '</span></a>';
      } else {
        inner += '<a class="next" href="home.html">'
          + '<span class="dir">课程地图 →</span>'
          + '<span class="nav-title">回到首页，看看进度</span></a>';
      }
      nav.innerHTML = inner;
      lesson.appendChild(nav);
    }

    // 底部悬浮「完成并继续」
    if (!document.querySelector('.fab-wrap')) {
      var wrap = document.createElement('div');
      wrap.className = 'fab-wrap';
      var btn = document.createElement('button');
      btn.className = 'btn-next';
      btn.textContent = next ? '✓ 完成本节，继续 →' : '✓ 完成本节，回首页';
      btn.addEventListener('click', function () {
        markDone(file);
        btn.textContent = '✓ 已完成，正在跳转…';
        window.location.href = next ? next.file : 'home.html';
      });
      wrap.appendChild(btn);
      document.body.appendChild(wrap);
    }

    // 进入页面即记录"最近学到"（不标记完成，完成需点按钮）
    var p = getProgress();
    p.__last = file;
    saveProgress(p);
  }

  /* ── 顶栏品牌化：统一改名 + 注入「课程首页」── */
  function rebrandTopbar() {
    var link = document.querySelector('.lesson-topbar .home-link');
    if (link) link.innerHTML = '<img class="logo-img" src="mascot/favicon-64.png" alt="顺小栗">诗光聊AI电商 入门课';
    var right = document.querySelector('.lesson-topbar .right');
    if (!right || right.querySelector('.topbar-link')) return;
    var homeBtn = document.createElement('a');
    homeBtn.className = 'topbar-link';
    homeBtn.href = 'home.html';
    homeBtn.textContent = '⌂ 课程首页';
    var themeBtn = right.querySelector('.theme-btn');
    right.insertBefore(homeBtn, themeBtn || null);
  }

  /* ── 右下角浮动公众号卡（顺小栗 + 二维码，可关闭）── */
  function injectQrFloat() {
    if (document.getElementById('qrFloat')) return;
    try { if (localStorage.getItem('aibp_qr_float_hide') === '1') return; } catch (e) {}
    var box = document.createElement('div');
    box.id = 'qrFloat';
    box.className = 'qr-float';
    box.innerHTML = '<button class="qf-close" aria-label="收起二维码">×</button>'
      + '<img class="qf-mascot" src="mascot/favicon-64.png" alt="顺小栗">'
      + '<img class="qf-qr" src="wechat-qr.png" alt="诗光聊AI电商公众号二维码">'
      + '<div class="qf-t">扫码关注<br>「诗光聊AI电商」</div>'
      + '<div class="qf-s">学习卡壳了，来后台问我</div>';
    document.body.appendChild(box);
    box.querySelector('.qf-close').addEventListener('click', function () {
      box.remove();
      try { localStorage.setItem('aibp_qr_float_hide', '1'); } catch (e) {}
    });
  }

  /* ── 字体缩放：100% / 110% / 125%（记忆选择）── */
  var ZOOM_KEY = 'aibp_font_zoom';
  function applyZoom(z) {
    var main = document.querySelector('main.lesson');
    if (main) main.style.zoom = z + '%';
    document.querySelectorAll('.fz-btn').forEach(function (b) {
      b.classList.toggle('on', b.dataset.z === String(z));
    });
  }
  function injectFontZoom() {
    var right = document.querySelector('.lesson-topbar .right');
    if (!right || right.querySelector('.fz-group')) return;
    var group = document.createElement('div');
    group.className = 'fz-group';
    group.setAttribute('role', 'group');
    group.setAttribute('aria-label', '字体缩放');
    [100, 110, 125].forEach(function (z) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'fz-btn';
      b.dataset.z = z;
      b.textContent = z + '%';
      b.addEventListener('click', function () {
        applyZoom(z);
        try { localStorage.setItem(ZOOM_KEY, String(z)); } catch (e) {}
      });
      group.appendChild(b);
    });
    var themeBtn = right.querySelector('.theme-btn');
    right.insertBefore(group, themeBtn || null);
    var saved = 100;
    try { saved = parseInt(localStorage.getItem(ZOOM_KEY) || '100', 10) || 100; } catch (e) {}
    if ([100, 110, 125].indexOf(saved) < 0) saved = 100;
    applyZoom(saved);
  }

  function init() {
    initReveal();
    bindThemeBtn();
    rebrandTopbar();
    injectFontZoom();
    injectQrFloat();
    injectNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
