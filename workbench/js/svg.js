/* ═══════════════════════════════════════════
   svg.js — 帕恰狗吉祥物 + 哥特图标库（原创 SVG）
   帕恰狗风格：白脸 · 黑垂耳 · 黑眼 · 小黑鼻（黑白配色，暗黑底不糊）
   ═══════════════════════════════════════════ */

/* 帕恰狗本体（原创黑白小狗）
   variant: plain | cape(紫斗篷) | moon(月牙背景) | sleep(闭眼) | happy(吐舌) */
export function pacha(variant = 'plain') {
  const moon = variant === 'moon'
    ? `<path d="M68 8 A40 40 0 1 0 96 46 A32 32 0 1 1 68 8Z" fill="#8b5cf6" opacity=".4"/>`
    : '';
  const cape = variant === 'cape'
    ? `<path d="M14 64 Q50 40 86 64 L82 84 Q50 70 18 84Z" fill="#5b21b6" stroke="#8b5cf6" stroke-width="2.5" stroke-linejoin="round"/>
       <path d="M50 46 L50 60" stroke="#a78bfa" stroke-width="2.5" stroke-linecap="round"/>`
    : '';
  const eyes = variant === 'sleep'
    ? `<path d="M33 53 q6 -6 12 0 M55 53 q6 -6 12 0" stroke="#141021" stroke-width="3.4" fill="none" stroke-linecap="round"/>`
    : `<circle cx="39" cy="53" r="4.6" fill="#141021"/>
       <circle cx="61" cy="53" r="4.6" fill="#141021"/>
       <circle cx="40.6" cy="51.4" r="1.4" fill="#fff" opacity=".9"/>`;
  const mouth = variant === 'happy'
    ? `<path d="M47 65 Q50 72 53 65Z" fill="#e11d48"/>
       <path d="M44 62 Q50 68 56 62" stroke="#141021" stroke-width="2" fill="none" stroke-linecap="round"/>`
    : `<ellipse cx="50" cy="63.5" rx="2.6" ry="1.9" fill="#141021"/>
       <path d="M47 67 Q50 69 53 67" stroke="#141021" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;

  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    ${moon}
    ${cape}
    <ellipse cx="27" cy="26" rx="15" ry="20" fill="#141021" transform="rotate(-12 27 26)"/>
    <ellipse cx="73" cy="26" rx="15" ry="20" fill="#141021" transform="rotate(12 73 26)"/>
    <circle cx="50" cy="57" r="34" fill="#f4f0fa"/>
    <circle cx="50" cy="57" r="34" fill="none" stroke="#2a2140" stroke-width="1.5"/>
    ${eyes}
    ${mouth}
  </svg>`;
}

/* 哥特图标库（24x24 线性描边，currentColor） */
const ICONS = {
  home: `<path d="M3 10.5 L12 3 L21 10.5"/><path d="M5 9.5 V20 h14 V9.5"/><path d="M9 20 v-6 h6 v6"/>`,
  diet: `<circle cx="12" cy="14" r="7"/><circle cx="12" cy="14" r="3.4"/><path d="M7.5 6.5 L6 5 M6.5 8.5 L5 7 M16.5 6.5 L18 5 M17.5 8.5 L19 7"/>`,
  sport: `<rect x="3" y="9" width="3.4" height="6" rx="1.4"/><rect x="17.6" y="9" width="3.4" height="6" rx="1.4"/><rect x="6.4" y="11" width="11.2" height="2" rx="1"/>`,
  weight: `<path d="M12 3 v3.6"/><circle cx="12" cy="8.6" r="1.6"/><path d="M5.5 12 h13 l-1.6 8.4 H7.1 Z"/><path d="M8.2 12 L10.8 14.6 M15.8 12 L13.2 14.6"/>`,
  account: `<path d="M12 3 L14.2 8.6 L20.2 9 L15.6 13 L17 19 L12 15.8 L7 19 L8.4 13 L3.8 9 L9.8 8.6 Z"/>`,
  mood: `<path d="M12 20 C5.5 14.5 3 9.6 5.8 6.9 C8 4.8 11 5.9 12 8.2 C13 5.9 16 4.8 18.2 6.9 C21 9.6 18.5 14.5 12 20Z"/>`,
  diary: `<path d="M19.5 4.5 C11 6.5 6.5 12.5 4.5 20.5 L13 18.5 C18.5 14 20.5 7.5 19.5 4.5Z"/><path d="M15.5 8 L18.5 5.5"/>`,
  anni: `<rect x="4" y="12" width="16" height="8" rx="2"/><path d="M6.5 12 v-2.5 h11 V12"/><path d="M12 9.5 V6.5"/><path d="M12 4.6 c1.4 1.8 1.4 2.9 0 3.8 c-1.4-.9-1.4-2 0-3.8Z"/>`,
  review: `<path d="M4 5.5 h16 V20 H4 Z"/><path d="M8 5.5 V20"/><path d="M4 12.5 h16"/><path d="M10.5 9 l3 1.8 -3 1.8"/>`,
  gear: `<circle cx="12" cy="12" r="3.2"/><path d="M12 2.8 v3 M12 18.2 v3 M2.8 12 h3 M18.2 12 h3 M5.5 5.5 l2.1 2.1 M16.4 16.4 l2.1 2.1 M18.5 5.5 l-2.1 2.1 M7.6 16.4 l-2.1 2.1"/>`,
  lock: `<rect x="5" y="10.5" width="14" height="9.5" rx="2.4"/><path d="M8 10.5 V7.6 a4 4 0 0 1 8 0 v2.9"/><circle cx="12" cy="15" r="1.6"/>`,
  todo: `<rect x="4" y="4" width="16" height="16" rx="3.4"/><path d="M8.2 12.4 l2.6 2.6 l5-5.4"/>`,
  moon: `<path d="M19 13.5 A8 8 0 1 1 10.5 5 A6.6 6.6 0 0 0 19 13.5Z"/>`,
  x: `<line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>`
};

export function icon(name) {
  return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.moon}</svg>`;
}
