/* ═══════════════════════════════════════════
   app.js — 入口：启动页 → 密钥锁 → 主界面 + 路由 + 日期条 + 日历
   ═══════════════════════════════════════════ */

import { pacha } from './svg.js';
import { authState, setupPin, verifyPin } from './auth.js';
import { restoreFromMirror } from './storage.js';
import { fmtCN, prevDay, nextDay, onDateChange, openCalendar, recordedDates } from './date.js';
import {
  renderHome, renderRecord, renderPlaceholder, renderMood, renderReview,
  renderSettings, bindSettings, bindGridNavigation
} from './pages.js';
import { toast } from './ui.js';

/* ── 启动页 ── */
async function runSplash() {
  await new Promise((r) => setTimeout(r, 1200));
  document.getElementById('splash').classList.add('fade-out');
  setTimeout(() => document.getElementById('splash').classList.add('hidden'), 700);
}

/* ── 锁屏页 ── */
function showLock(mode, info = {}) {
  const lock = document.getElementById('lock');
  lock.classList.remove('hidden');
  document.getElementById('lockPacha').innerHTML = pacha('plain');
  const title = document.getElementById('lockTitle');
  const sub = document.getElementById('lockSub');
  const err = document.getElementById('lockError');
  const hint = document.getElementById('lockHint');
  const input = document.getElementById('lockInput');
  const btn = document.getElementById('lockBtn');

  if (mode === 'setup') {
    title.textContent = '设置密码';
    sub.textContent = '首次使用，设置你的专属密码';
    input.placeholder = '设置密码（至少 4 位）';
  } else {
    const remainDays = Math.ceil(info.remainMs / (24 * 3600 * 1000));
    title.textContent = '解锁工作台';
    sub.textContent = remainDays > 0 ? `已 ${remainDays} 天未使用，请重新输入密码` : '请输入密码';
    input.placeholder = '请输入密码';
  }
  err.classList.add('hidden');
  hint.classList.add('hidden');
  input.value = '';
  input.focus();

  btn.onclick = async () => {
    const val = input.value;
    if (!val) return;
    if (mode === 'setup') {
      if (val.length < 4) { showErr('密码至少 4 位'); return; }
      await setupPin(val);
      enterApp();
      return;
    }
    const r = await verifyPin(val);
    if (r.ok) { enterApp(); return; }
    if (r.reason === 'locked') {
      btn.disabled = true;
      let remain = Math.ceil(r.remainMs / 1000);
      showErr(`错误次数过多，锁定中`);
      hint.textContent = `${remain} 秒后可重试`;
      hint.classList.remove('hidden');
      const timer = setInterval(() => {
        remain -= 1;
        if (remain <= 0) {
          clearInterval(timer);
          btn.disabled = false;
          hint.classList.add('hidden');
          err.classList.add('hidden');
          input.focus();
        } else {
          hint.textContent = `${remain} 秒后可重试`;
        }
      }, 1000);
      return;
    }
    showErr(r.reason === 'wrong' ? `密码错误，还剩 ${r.remain} 次机会` : '出错了');
  };

  input.onkeydown = (e) => { if (e.key === 'Enter') btn.click(); };
  function showErr(msg) {
    err.textContent = msg;
    err.classList.remove('hidden');
    input.value = '';
    input.focus();
  }
}

/* ── 路由表 ── */
const ROUTES = {
  '#/home': renderHome,
  '#/record': renderRecord,
  '#/mood': renderMood,
  '#/review': renderReview,
  '#/settings': renderSettings,
  '#/todo': () => renderPlaceholder('#/todo'),
  '#/diet': () => renderPlaceholder('#/diet'),
  '#/sport': () => renderPlaceholder('#/sport'),
  '#/weight': () => renderPlaceholder('#/weight'),
  '#/account': () => renderPlaceholder('#/account'),
  '#/diary': () => renderPlaceholder('#/diary'),
  '#/anni': () => renderPlaceholder('#/anni')
};

let entered = false;
async function route() {
  if (!entered) return;
  const view = document.getElementById('view');
  const hash = location.hash || '#/home';
  const fn = ROUTES[hash] || renderHome;
  view.innerHTML = await fn();
  bindGridNavigation(view);
  if (hash === '#/settings') bindSettings();
  document.querySelectorAll('.tab').forEach((t) => {
    t.classList.toggle('active', t.dataset.route === hash);
  });
  view.scrollTop = 0;
}

/* ── 进入主界面 ── */
function enterApp() {
  entered = true;
  document.getElementById('lock').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  updateDateBar();
  route();
}

function updateDateBar() {
  document.getElementById('dateBar').textContent = fmtCN();
}

/* ── 初始化 ── */
async function init() {
  await restoreFromMirror(); // 镜像 → IDB 合并

  // 事件绑定（常驻）
  document.getElementById('prevDayBtn').addEventListener('click', prevDay);
  document.getElementById('nextDayBtn').addEventListener('click', nextDay);
  document.getElementById('calBtn').addEventListener('click', async () => {
    const recorded = await recordedDates();
    openCalendar(recorded);
  });
  onDateChange(() => { updateDateBar(); route(); });
  window.addEventListener('hashchange', route);
  document.querySelectorAll('.tab').forEach((t) => {
    t.addEventListener('click', () => { location.hash = t.dataset.route; });
  });

  // 应用标题
  const { getSettings } = await import('./auth.js');
  const s = await getSettings();
  if (s.workbenchName) {
    document.getElementById('appTitle').textContent = s.workbenchName;
    document.title = s.workbenchName;
  }

  // 启动动画
  await runSplash();

  // 密钥状态
  const mode = await authState();
  if (mode === 'open') {
    enterApp();
  } else if (mode === 'setup') {
    showLock('setup');
  } else {
    const s2 = await getSettings();
    showLock('locked', { remainMs: Date.now() - (s2.lastLoginAt || Date.now()) });
  }
}

/* ── Service Worker 注册 ── */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

init().catch((e) => { console.error(e); toast('初始化失败：' + e.message); });
