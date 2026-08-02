// build.js —— 从 days.json 生成 index.html
const fs = require('fs');
const data = JSON.parse(fs.readFileSync(__dirname + '/days.json', 'utf-8'));
const days = data;
const foundation = data.foundation || [];

const totalDays = 30;
function isCompletedDay(day) {
  return day && (day.status === 'done' || (!day.status && day.title !== '待学习'));
}

let completedDayCount = 0;
for (let i = 1; i <= 30; i++) {
  if (isCompletedDay(days[String(i)])) completedDayCount++;
}
const completedCount = completedDayCount + foundation.length;
const totalAll = totalDays + foundation.length;
const progressPct = Math.round(completedDayCount / totalDays * 100);

// ===== 前期基础导航 + 页面 =====
let foundNav = '';
let foundPages = '';
foundation.forEach((f, idx) => {
  foundNav += `    <a href="#" data-day="f${idx}" class="done"><span class="dot"></span>基础-${idx+1} — ${f.title}</a>\n`;
  let ph = '';
  if (f.practice && f.practice.tools) {
    ph = `
      <div class="practice-box">
        <h3>🛠 实操记录</h3>
        <table>
          <tr><th style="width:80px">使用工具</th><td>${f.practice.tools}</td></tr>
          <tr><th>目标程序</th><td>${f.practice.target}</td></tr>
          <tr><th>过程 & 结果</th><td>${f.practice.result}</td></tr>
        </table>
      </div>`;
  }
  const act = idx === 0 ? ' active' : '';
  foundPages += `
    <div class="page${act}" data-day="f${idx}">
      <h2>基础-${idx+1} — ${f.title}</h2>
      <div class="day-meta"><span class="tag tag-done">✅ 已完成</span> &nbsp; ${f.video}</div>
      ${f.html}${ph}
    </div>
`;
});

// ===== 侧边栏导航 =====
let navItems = foundNav;
for (let i = 1; i <= 30; i++) {
  const d = days[String(i)];
  const isDone = isCompletedDay(d);
  const cls = isDone ? ' class="done"' : '';
  navItems += `    <a href="#" data-day="${i}"${cls}><span class="dot"></span>Day ${i} — ${d.title}</a>\n`;
}

// ===== 页面内容 =====
let pages = foundPages;
for (let i = 1; i <= 30; i++) {
  const d = days[String(i)];
  const isDone = isCompletedDay(d);
  const tagHtml = isDone ? '<span class="tag tag-done">✅ 已完成</span>' : '<span class="tag" style="background:#e9ecef;color:#6c757d">⏳ 计划中</span>';
  const videoHtml = d.video ? ` &nbsp; ${d.video}` : '';
  const reviewHtml = d.review ? `
      <div class="review-box">
        <h3>复习入口</h3>
        <p><strong>已确认：</strong>${d.review.confirmed}</p>
        <p><strong>不要混淆：</strong>${d.review.pitfall}</p>
        <p><strong>下一步：</strong>${d.review.next}</p>
      </div>` : '';
  let ph = '';
  if (d.practice && d.practice.tools) {
    ph = `
      <div class="practice-box">
        <h3>🛠 实操记录</h3>
        <table>
          <tr><th style="width:80px">使用工具</th><td>${d.practice.tools}</td></tr>
          <tr><th>目标程序</th><td>${d.practice.target}</td></tr>
          <tr><th>过程 & 结果</th><td>${d.practice.result}</td></tr>
        </table>
      </div>`;
  }
  pages += `
    <div class="page" data-day="${i}">
      <h2>Day ${i} — ${d.title}</h2>
      <div class="day-meta">${tagHtml}${videoHtml}</div>
      ${reviewHtml}${d.html}${ph}
    </div>
`;
}

// 路线图
const phases = [
  { name: 'PE 格式 (Day 1-4)', days: [1,2,3,4] },
  { name: '注入基础 (Day 5-7)', days: [5,6,7] },
  { name: '注入收尾 (Day 8-10)', days: [8,9,10] },
  { name: 'Hook 体系 (Day 11-15)', days: [11,12,13,14,15] },
  { name: '反调试与保护 (Day 16-20)', days: [16,17,18,19,20] },
  { name: '内核基础 (Day 21-26)', days: [21,22,23,24,25,26] },
  { name: '综合实战 (Day 27-30)', days: [27,28,29,30] },
];

let currentPhaseIdx = 0;
for (let p = phases.length - 1; p >= 0; p--) {
  if (phases[p].days.every(d => isCompletedDay(days[String(d)]))) {
    currentPhaseIdx = Math.min(p + 1, phases.length - 1);
    break;
  }
}

let roadmap = '▶前期基础<span class="done"> ✅</span>\n';
phases.forEach((phase, idx) => {
  const allDone = phase.days.every(d => isCompletedDay(days[String(d)]));
  let pfx = '';
  if (idx < currentPhaseIdx) pfx = '<span class="done"> ✅</span>';
  else if (idx === currentPhaseIdx) pfx = '<span class="here"> ◀</span>';
  if (idx > 0) roadmap += '  ├ ';
  roadmap += `▶${phase.name}${pfx}\n`;
});

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Windows 逆向 & 游戏安全 — 小佳的学习笔记</title>
<style>
:root{--bg:#f0f2f5;--sidebar-bg:#1a1d23;--sidebar-text:#a8adb8;--card:#fff;--text:#212529;--muted:#6c757d;--border:#dee2e6;--accent:#0d6efd;--code-bg:#f1f3f5;--table-stripe:#f8f9fa;--tag-done:#d1e7dd;--tag-text:#0f5132;--sw:260px}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Noto Sans SC",sans-serif;background:var(--bg);color:var(--text);line-height:1.7;display:flex;min-height:100vh}
.sidebar{position:fixed;top:0;left:0;bottom:0;width:var(--sw);background:var(--sidebar-bg);color:var(--sidebar-text);padding:28px 20px;overflow-y:auto;z-index:10;user-select:none}
.sidebar h2{color:#fff;font-size:1rem;margin-bottom:6px;border:none;padding:0}
.sidebar .sub{font-size:.72rem;color:#6b7280;margin-bottom:12px}
.jump{display:flex;gap:6px;margin:0 0 16px}.jump input{flex:1;min-width:0;background:#111318;border:1px solid #2b2f3a;color:#e0e3eb;border-radius:6px;padding:7px 10px;font-size:.8rem;outline:none}.jump input::placeholder{color:#6b7280}.jump input:focus{border-color:#60a5fa}.jump button{flex-shrink:0;background:#1e3a5f;color:#60a5fa;border:none;border-radius:6px;padding:0 12px;font-size:.78rem;cursor:pointer}.jump button:hover{background:#274b78}
.menu-toggle{display:none}
.sidebar .roadmap{font-size:.7rem;line-height:1.6;color:#6b7280;background:#111318;border-radius:6px;padding:10px 12px;margin-bottom:20px;white-space:pre-wrap}
.sidebar .roadmap .here{color:#fbbf24;font-weight:600}
.sidebar .roadmap .done{color:#34d399}
.sidebar nav a{display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:6px;color:var(--sidebar-text);text-decoration:none;font-size:.85rem;transition:all .15s;margin-bottom:2px}
.sidebar nav a:hover{background:#262930;color:#e0e3eb}
.sidebar nav a.active{background:#1e3a5f;color:#60a5fa;font-weight:600}
.sidebar nav a .dot{width:8px;height:8px;border-radius:50%;background:#374151;flex-shrink:0}
.sidebar nav a.active .dot{background:#60a5fa}
.sidebar nav a.done .dot{background:#34d399}
.sidebar .progress{margin-top:20px;font-size:.75rem;color:#6b7280;border-top:1px solid #262930;padding-top:14px}
.sidebar .progress .bar{height:4px;background:#262930;border-radius:2px;margin-top:6px;overflow:hidden}
.sidebar .progress .bar .fill{height:100%;background:#34d399;border-radius:2px;transition:width .4s}
.main{margin-left:var(--sw);flex:1;display:flex;flex-direction:column;min-height:100vh}
.pc{flex:1;display:flex;flex-direction:column;padding:32px 40px 20px;max-width:860px;width:100%}
.page{display:none;flex:1}
.page.active{display:block}
.page h2{font-size:1.4rem;margin-bottom:2px}
.page .day-meta{color:var(--muted);font-size:.82rem;margin-bottom:20px}
.tag{display:inline-block;padding:1px 8px;border-radius:4px;font-size:.75rem;font-weight:600}
.tag-done{background:var(--tag-done);color:var(--tag-text)}
h3{font-size:1.05rem;margin:24px 0 8px}
p{margin:8px 0}
table{width:100%;border-collapse:collapse;margin:12px 0;font-size:.88rem}
th,td{padding:8px 10px;border:1px solid var(--border);text-align:left}
th{background:#e9ecef;font-weight:600}
tr:nth-child(even) td{background:var(--table-stripe)}
pre{background:#1e1e2e;color:#cdd6f4;padding:14px 18px;border-radius:6px;overflow-x:auto;margin:10px 0;font-size:.85rem;line-height:1.55}
code{font-family:"Cascadia Code","Fira Code","JetBrains Mono",monospace;font-size:.85em}
:not(pre)>code{background:var(--code-bg);padding:1px 5px;border-radius:3px;color:#d6336c}
pre code{background:none;padding:0;color:inherit}
.practice-box{margin-top:28px;border-top:2px solid #34d399;padding-top:16px}
.practice-box h3{color:#0f5132;margin-top:0}
.review-box{border-left:4px solid #0d6efd;background:#eef5ff;padding:12px 16px;margin:0 0 18px;border-radius:6px}.review-box h3{color:#0b4d9b;margin:0 0 6px}.review-box p{margin:4px 0}
.planned-box{margin-top:18px;border-left:4px solid #fbbf24;background:#fff8e1;padding:14px 16px;border-radius:6px}
.planned-box h3{color:#92400e;margin-top:0}
.planned-box p{color:#5f4b1b}
.nav-bar{display:flex;align-items:center;justify-content:center;gap:20px;padding:16px 0 24px;border-top:1px solid var(--border);margin-top:16px}
.nav-bar button{padding:8px 18px;border:1px solid var(--border);background:var(--card);border-radius:6px;cursor:pointer;font-size:.88rem;color:var(--text);transition:all .15s}
.nav-bar button:hover{background:#e9ecef}
.nav-bar button:disabled{opacity:.35;cursor:default}
.nav-bar .pi{font-size:.85rem;color:var(--muted);min-width:60px;text-align:center}
@media(max-width:768px){body{display:block}.sidebar{position:static;width:100%;max-height:none;padding:14px 16px}.main{margin-left:0}.pc{padding:20px 18px}.sidebar .roadmap{margin-bottom:12px}.menu-toggle{display:block;width:100%;margin:0 0 10px;background:#262930;color:#e0e3eb;border:none;border-radius:6px;padding:9px 12px;font-size:.82rem;cursor:pointer;text-align:left}.menu-toggle::after{content:" ▾"}.sidebar.open .menu-toggle::after{content:" ▴"}.sidebar nav{display:none}.sidebar.open nav{display:block;max-height:52vh;overflow-y:auto}}
.log-section{margin-top:16px;font-size:.7rem;color:#6b7280;border-top:1px solid #262930;padding-top:12px}.log-title{color:#9ca3af;font-weight:600;margin-bottom:8px}.log-entry{margin-bottom:8px}.log-date{color:#fbbf24;margin-bottom:2px}.log-item{color:#6b7280;padding:1px 0}.log-item::before{content:"- ";color:#4b5563}
</style>
</head>
<body>
<div class="sidebar">
<h2>学习笔记</h2>
<div class="sub">Windows 逆向 · 游戏安全</div>
<button class="menu-toggle" id="mt">📚 目录</button>
<div class="jump"><input id="jump" type="text" placeholder="输入跳转：12 / Day 12 / 基础-2" autocomplete="off"><button id="jb">跳转</button></div>
<div class="roadmap">${roadmap}</div>
<nav>
${navItems}</nav>
<div class="progress">课程 Day：${completedDayCount}/30 · 前期基础：${foundation.length}/${foundation.length}<div class="bar"><div class="fill" style="width:${progressPct}%"></div></div></div>
<div class="log-section">
<div class="log-title">📅 学习日志</div>
${data.log ? data.log.slice().sort(function(a,b){return a.date<b.date?-1:a.date>b.date?1:0}).reverse().map(function(entry) { return `<div class="log-entry"><div class="log-date">${entry.date}</div><div class="log-items">${entry.items.map(function(item) { return `<div class="log-item">${item}</div>`; }).join("")}</div></div>`; }).join("") : ""}
</div>

</div>
<div class="main"><div class="pc">
${pages}
    <div class="nav-bar"><button id="pb" disabled>◀ 上一页</button><span class="pi" id="pi">Day 1 / ${totalAll}</span><button id="nb">下一页 ▶</button></div>
</div></div>
<script>
(function(){var p=document.querySelectorAll(".page");var n=document.querySelectorAll(".sidebar nav a");var b=document.getElementById("pb");var x=document.getElementById("nb");var t=document.getElementById("pi");var j=document.getElementById("jump");var jb=document.getElementById("jb");var mt=document.getElementById("mt");var sb=document.querySelector(".sidebar");var F=${foundation.length};var c=0;var l=p.length;
function label(i){var d=p[i].dataset.day;return d.charAt(0)==="f"?"基础-"+((+d.slice(1))+1):"Day "+d}
function s(i){for(var k=0;k<l;k++)p[k].classList.remove("active");for(var k2=0;k2<n.length;k2++)n[k2].classList.remove("active");p[i].classList.add("active");n[i].classList.add("active");b.disabled=i===0;x.disabled=i===l-1;t.textContent=label(i)+" / "+l}
function done(){if(window.innerWidth<=768)sb.classList.remove("open");window.scrollTo(0,0)}
function go(){var e=j.value.trim().toLowerCase();var m;if((m=e.match(/^(?:day\\s*)?(\\d{1,2})$/))){var d=+m[1];if(d>=1&&d<=30){c=d+F-1;s(c);j.value="";done();return}}if((m=e.match(/^(?:基础|base|f)\\s*-?\\s*(\\d)$/))){var f=+m[1];if(f>=1&&f<=F){c=f-1;s(c);j.value="";done();return}}j.value="未找到，试试 1-30 或 基础-1"}
b.onclick=function(){if(c>0){c--;s(c)}};x.onclick=function(){if(c<l-1){c++;s(c)}};
for(var i=0;i<n.length;i++){(function(idx){n[idx].onclick=function(e){e.preventDefault();c=idx;s(c);done()}})(i)}
j.onfocus=function(){j.select()};j.onkeydown=function(e){if(e.key==="Enter"){go();return false}};jb.onclick=go;
mt.onclick=function(){sb.classList.toggle("open")};
document.onkeydown=function(e){if(document.activeElement===j)return;if(e.key==="ArrowLeft"&&c>0){c--;s(c)}if(e.key==="ArrowRight"&&c<l-1){c++;s(c)}}})();
</script>
</body>
</html>`;

fs.writeFileSync(__dirname + '/index.html', html.replace(/^[ \t]+$/gm, ''), 'utf-8');
console.log(`Generated: Day ${completedDayCount}/${totalDays} (${progressPct}%), foundation ${foundation.length}/${foundation.length}`);




