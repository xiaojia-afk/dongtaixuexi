/* ═══════════════════════════════════════════
   pages.js — 各页面渲染（M1：首页九宫格 + 模块占位 + 设置可用）
   ═══════════════════════════════════════════ */

import { pacha, icon } from './svg.js';
import { fmtCN, iso } from './date.js';
import { getSettings, changePin } from './auth.js';
import { getAll, keys as storageKeys } from './storage.js';
import { modal, toast } from './ui.js';

/* 工具清单：route / 名称 / 图标 / 顶部文案 / 计划上线期 */
const TOOLS = [
  { route: '#/todo',    name: '每日待办', ico: 'todo',    hero: '今日事，今日毕～', phase: 'M2' },
  { route: '#/diet',    name: '饮食',      ico: 'diet',    hero: '吃好喝好，快乐减脂～', phase: 'M2' },
  { route: '#/sport',   name: '运动',      ico: 'sport',   hero: '动起来，元气满满！', phase: 'M3' },
  { route: '#/weight',  name: '体重',      ico: 'weight',  hero: '轻一点，更轻盈～', phase: 'M3' },
  { route: '#/account', name: '账户',      ico: 'account', hero: '黑暗财富之路～', phase: 'M3' },
  { route: '#/mood',    name: '心情',      ico: 'mood',    hero: '今天的心情是什么颜色？', phase: 'M2' },
  { route: '#/diary',   name: '日记',      ico: 'diary',   hero: '天马行空，都写下来～', phase: 'M2' },
  { route: '#/anni',    name: '纪念',      ico: 'anni',    hero: '重要的日子，都记得～', phase: 'M2' },
  { route: '#/review',  name: '复盘',      ico: 'review',  hero: '每周回顾，越变越好～', phase: 'M4' }
];

const PLACEHOLDER_TEXT = {
  '#/todo':    ['每日待办', '每日待办、固定事项、普通待办，三种模式。每日待办每天自动重现，当天勾选只记当天～'],
  '#/diet':    ['饮食记录', '食物大卡即时搜索，四餐记录，手动添加自动算热量。M2 上线～'],
  '#/sport':   ['运动记录', '运动时长记录、热量计算、每日运动提醒。M3 上线～'],
  '#/weight':  ['体重记录', '同日自动更新不重复，近 7 天趋势图。M3 上线～'],
  '#/account': ['账户收支', '收支记账、汇总、趋势图、赚钱目标计划。M3 上线～'],
  '#/mood':    ['心情记录', '帕恰狗表情选心情，小日记写下为什么开心为什么难过～'],
  '#/diary':   ['日记本', '记录每天天马行空的想法，只属于你～'],
  '#/anni':    ['纪念日', '纪念日倒计时 + 提醒，重要的日子一个都不错过～'],
  '#/review':  ['每周复盘', '自动汇总各模块数据，卡片式预览 + 一键导出。M4 上线～'],
  '#/record':  ['记录中心', '饮食、运动、体重、账户，都在这里～']
};

/* ── 首页 ── */
export async function renderHome() {
  const today = fmtCN();
  const gridItems = TOOLS.map((t) => `
    <div class="grid-item" data-route="${t.route}">
      <div class="gi-ico">${icon(t.ico)}</div>
      <div class="gi-name">${t.name}</div>
    </div>`).join('');

  return `
    <div class="hero-card glass">
      <div class="hero-pacha">${pacha('cape')}</div>
      <div class="hero-text">
        <h2>个人专属工作台</h2>
        <p>${today} · 帕恰狗陪你每一天 🖤</p>
      </div>
    </div>

    <div class="grid">${gridItems}</div>

    <div class="hero-card glass" style="margin-top:14px">
      <div class="hero-pacha" style="width:44px;height:44px">${pacha('sleep')}</div>
      <div class="hero-text">
        <h2>今日待办</h2>
        <p>每日待办功能 M2 上线，敬请期待～</p>
      </div>
    </div>`;
}

/* ── 记录中心（聚合入口）── */
export async function renderRecord() {
  const rows = ['#/diet', '#/sport', '#/weight', '#/account'].map((r) => {
    const [name, desc] = PLACEHOLDER_TEXT[r];
    const t = TOOLS.find((x) => x.route === r);
    return `
      <div class="grid-item" data-route="${r}" style="flex-direction:row;justify-content:flex-start;padding:14px">
        <div class="gi-ico" style="width:34px;height:34px">${icon(t ? t.ico : 'moon')}</div>
        <div style="text-align:left">
          <div class="gi-name" style="font-size:13px">${name}</div>
          <div class="small dim" style="margin-top:2px">${desc.slice(0, 20)}</div>
        </div>
      </div>`;
  }).join('');

  return `
    <div class="hero-card glass">
      <div class="hero-pacha">${pacha('moon')}</div>
      <div class="hero-text"><h2>记录中心</h2><p>饮食 · 运动 · 体重 · 账户</p></div>
    </div>
    <div class="grid" style="grid-template-columns:1fr">${rows}</div>`;
}

/* ── 通用占位页 ── */
export function renderPlaceholder(route) {
  const [name, desc] = PLACEHOLDER_TEXT[route] || PLACEHOLDER_TEXT['#/record'];
  const t = TOOLS.find((x) => x.route === route);
  return `
    <div class="page-title"><span class="pacha-mini">${pacha('happy')}</span>${name}</div>
    <div class="hero-card glass">
      <div class="hero-pacha">${pacha('moon')}</div>
      <div class="hero-text">
        <h2>${t ? t.hero : ''}</h2>
        <p>${fmtCN()} · 今天也要加油呀</p>
      </div>
    </div>
    <div class="placeholder-card glass">
      <div class="pl-pacha">${pacha('cape')}</div>
      <span class="pl-badge">${t ? t.phase + ' 施工中' : '施工中'}</span>
      <h3>${name}</h3>
      <p>${desc}</p>
    </div>`;
}

/* ── 心情页（M1 占位）── */
export function renderMood() {
  return renderPlaceholder('#/mood');
}

/* ── 复盘页（M1 占位）── */
export function renderReview() {
  return renderPlaceholder('#/review');
}

/* ── 设置页（M1 即可用：名称/改密/导出）── */
export async function renderSettings() {
  const s = await getSettings();
  return `
    <div class="page-title"><span class="pacha-mini">${pacha('happy')}</span>设置</div>

    <div class="set-group">
      <h3>工作台</h3>
      <div class="set-row glass">
        <div>
          <div class="sr-label">工作台名称</div>
          <div class="sr-sub">显示在顶部与桌面图标下</div>
        </div>
        <input id="setName" class="ginput" value="${(s.workbenchName || '个人专属工作台').replace(/"/g, '&quot;')}" maxlength="20">
      </div>
      <div class="set-row glass">
        <div>
          <div class="sr-label">保存名称</div>
          <div class="sr-sub">修改后立即生效</div>
        </div>
        <button id="saveNameBtn" class="gbtn ghost">保存</button>
      </div>
    </div>

    <div class="set-group">
      <h3>安全</h3>
      <div class="set-row glass">
        <div>
          <div class="sr-label">修改密码</div>
          <div class="sr-sub">需验证当前密码</div>
        </div>
        <button id="changePinBtn" class="gbtn ghost">修改</button>
      </div>
    </div>

    <div class="set-group">
      <h3>数据</h3>
      <div class="set-row glass">
        <div>
          <div class="sr-label">导出备份</div>
          <div class="sr-sub">下载全部数据 JSON，换手机可迁移</div>
        </div>
        <button id="exportBtn" class="gbtn ghost">导出</button>
      </div>
    </div>

    <div class="set-group">
      <h3>关于</h3>
      <div class="set-row glass">
        <div>
          <div class="sr-label">版本</div>
          <div class="sr-sub">M1 骨架期 · 暗黑哥特风 · 帕恰狗陪着你</div>
        </div>
        <div class="small dim">v0.1</div>
      </div>
    </div>`;
}

/* 设置页事件绑定 */
export function bindSettings() {
  const saveBtn = document.getElementById('saveNameBtn');
  if (saveBtn) saveBtn.addEventListener('click', async () => {
    const input = document.getElementById('setName');
    const name = input.value.trim() || '个人专属工作台';
    const s = await getSettings();
    s.workbenchName = name;
    await import('./storage.js').then((m) => m.set('settings', s));
    document.getElementById('appTitle').textContent = name;
    document.title = name;
    toast('名称已保存 🖤');
  });

  const pinBtn = document.getElementById('changePinBtn');
  if (pinBtn) pinBtn.addEventListener('click', () => {
    modal({
      title: '修改密码',
      bodyHTML: `
        <input id="cpOld" class="ginput" type="password" placeholder="当前密码" style="margin-bottom:10px">
        <input id="cpNew" class="ginput" type="password" placeholder="新密码（4 位以上）">
        <p id="cpErr" class="small" style="color:var(--blood);min-height:16px;margin-top:6px"></p>`,
      okText: '确认修改',
      cancelText: '取消',
      onOK: async (mask) => {
        const oldP = mask.querySelector('#cpOld').value;
        const newP = mask.querySelector('#cpNew').value;
        const err = mask.querySelector('#cpErr');
        if (newP.length < 4) { err.textContent = '新密码至少 4 位'; return true; }
        const r = await changePin(oldP, newP);
        if (!r.ok) { err.textContent = '当前密码不正确'; return true; }
        toast('密码已更新 🖤');
        return false;
      }
    });
  });

  const exportBtn = document.getElementById('exportBtn');
  if (exportBtn) exportBtn.addEventListener('click', async () => {
    const data = {};
    for (const k of await storageKeys()) data[k] = await import('./storage.js').then((m) => m.get(k));
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `workbench-backup-${iso()}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 3000);
    toast('备份已导出 📦');
  });
}

/* 通用：点击事件委托（网格项跳转） */
export function bindGridNavigation(container) {
  container.querySelectorAll('[data-route]').forEach((el) => {
    el.addEventListener('click', () => { location.hash = el.dataset.route; });
  });
}
