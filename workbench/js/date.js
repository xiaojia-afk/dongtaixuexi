/* ═══════════════════════════════════════════
   date.js — 全局日期状态 + 日历
   顶部日期条：‹ 上一天 | 2026年8月4日 星期二 | 下一天 ›
   当月日历：有记录的日期红色高亮（M1 仅今天，M2+ 各模块上报记录日）
   ═══════════════════════════════════════════ */

const WEEK_CN = ['日', '一', '二', '三', '四', '五', '六'];

export const state = {
  date: new Date(),      // 当前选中日期
  monthView: new Date()  // 日历显示的月份
};

const listeners = new Set();

export function onDateChange(fn) { listeners.add(fn); }
function emit() { listeners.forEach((fn) => fn(state.date)); }

export function iso(d = state.date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function fmtCN(d = state.date) {
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 星期${WEEK_CN[d.getDay()]}`;
}

export function fmtMonth(d) {
  return `${d.getFullYear()}年${d.getMonth() + 1}月`;
}

export function addDays(d, n) {
  const c = new Date(d);
  c.setDate(c.getDate() + n);
  return c;
}

export function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function prevDay() { state.date = addDays(state.date, -1); emit(); }
export function nextDay() { state.date = addDays(state.date, 1); emit(); }
export function goToday() {
  state.date = new Date();
  state.monthView = new Date();
  emit();
}
export function setDate(d) {
  state.date = new Date(d);
  state.monthView = new Date(d);
  emit();
}

/* 有记录的日期集合（各模块 M2+ 向此注册日期），M1 仅返回空 */
export async function recordedDates() {
  return new Set();
}

/* 渲染日历到容器。recorded: Set<"2026-08-04"> */
export function renderCalendar(container, { recorded = new Set(), selected = state.date } = {}) {
  const view = state.monthView;
  const y = view.getFullYear();
  const m = view.getMonth();
  const first = new Date(y, m, 1);
  const startOffset = first.getDay(); // 周日开头
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const today = new Date();

  let html = '<div class="cw">日</div><div class="cw">一</div><div class="cw">二</div><div class="cw">三</div><div class="cw">四</div><div class="cw">五</div><div class="cw">六</div>';

  for (let i = 0; i < startOffset; i++) {
    const d = new Date(y, m, -startOffset + 1 + i);
    html += `<div class="cal-cell other" data-d="${iso(d)}">${d.getDate()}</div>`;
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(y, m, day);
    const key = iso(d);
    const cls = ['cal-cell'];
    if (sameDay(d, today)) cls.push('today');
    if (sameDay(d, selected)) cls.push('selected');
    if (recorded.has(key)) cls.push('has-record');
    html += `<div class="${cls.join(' ')}" data-d="${key}">${day}</div>`;
  }

  container.innerHTML = html;
  container.querySelectorAll('.cal-cell').forEach((cell) => {
    cell.addEventListener('click', () => {
      setDate(new Date(cell.dataset.d + 'T00:00:00'));
      closeCalendar();
    });
  });
}

/* 日历弹层开关 */
let calOpen = false;
export function openCalendar(recorded = new Set()) {
  if (calOpen) return;
  calOpen = true;
  const overlay = document.getElementById('calOverlay');
  overlay.classList.remove('hidden');

  const grid = document.getElementById('calGrid');
  const title = document.getElementById('calMonthTitle');

  const draw = () => {
    title.textContent = fmtMonth(state.monthView);
    renderCalendar(grid, { recorded, selected: state.date });
  };
  draw();

  document.getElementById('calPrevMonth').onclick = () => {
    state.monthView = new Date(state.monthView.getFullYear(), state.monthView.getMonth() - 1, 1);
    draw();
  };
  document.getElementById('calNextMonth').onclick = () => {
    state.monthView = new Date(state.monthView.getFullYear(), state.monthView.getMonth() + 1, 1);
    draw();
  };
  document.getElementById('calTodayBtn').onclick = () => {
    goToday();
    draw();
  };
  document.getElementById('calCloseBtn').onclick = closeCalendar;
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeCalendar(); });
}

export function closeCalendar() {
  if (!calOpen) return;
  calOpen = false;
  document.getElementById('calOverlay').classList.add('hidden');
}
