/* ═══════════════════════════════════════════
   auth.js — 密钥锁
   首次启动设置密码 → SHA-256(salt+pin) 本地哈希
   距上次登录 > 30 天 → 必须重新输入；连错 5 次锁定 30 秒
   ═══════════════════════════════════════════ */

import { get, set } from './storage.js';

const REAUTH_MS = 30 * 24 * 3600 * 1000; // 30 天
const MAX_FAIL = 5;
const FAIL_LOCK_MS = 30 * 1000;          // 锁定 30 秒

let failed = 0;
let lockUntil = 0;

async function sha256(text) {
  try {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
  } catch {
    // crypto.subtle 不可用（file:// 等）时的兜底哈希（防君子不防小人）
    let h1 = 0x811c9dc5, h2 = 0x01000193;
    for (let i = 0; i < text.length; i++) {
      const c = text.charCodeAt(i);
      h1 = Math.imul(h1 ^ c, 2654435761);
      h2 = Math.imul(h2 ^ c, 1597334677);
    }
    return (h1 >>> 0).toString(16) + '-' + (h2 >>> 0).toString(16);
  }
}

function genSalt() {
  try {
    const b = crypto.getRandomValues(new Uint8Array(16));
    return Array.from(b).map((x) => x.toString(16).padStart(2, '0')).join('');
  } catch {
    return String(Date.now()) + String(Math.random()).slice(2);
  }
}

async function hashPin(pin, salt) {
  return sha256(salt + '::' + pin);
}

export async function getSettings() {
  return (await get('settings')) || {};
}

/* 状态：setup(首次设密) | locked(需重输) | open(免密进入) */
export async function authState() {
  const s = await getSettings();
  if (!s.pinHash) return 'setup';
  const now = Date.now();
  if (now - (s.lastLoginAt || 0) < REAUTH_MS) return 'open';
  return 'locked';
}

export async function setupPin(pin) {
  const salt = genSalt();
  const s = await getSettings();
  s.pinHash = await hashPin(pin, salt);
  s.pinSalt = salt;
  s.lastLoginAt = Date.now();
  s.failed = 0;
  await set('settings', s);
  failed = 0;
  return true;
}

export async function verifyPin(pin) {
  const s = await getSettings();
  if (!s.pinHash) return { ok: false, reason: 'not-setup' };

  const now = Date.now();
  if (now < lockUntil) return { ok: false, reason: 'locked', remainMs: lockUntil - now };

  const h = await hashPin(pin, s.pinSalt);
  if (h === s.pinHash) {
    failed = 0;
    s.lastLoginAt = now;
    s.failed = 0;
    await set('settings', s);
    return { ok: true };
  }

  failed += 1;
  s.failed = failed;
  await set('settings', s);
  if (failed >= MAX_FAIL) {
    lockUntil = now + FAIL_LOCK_MS;
    failed = 0;
    s.failed = 0;
    await set('settings', s);
    return { ok: false, reason: 'locked', remainMs: FAIL_LOCK_MS };
  }
  return { ok: false, reason: 'wrong', remain: MAX_FAIL - failed };
}

export async function changePin(oldPin, newPin) {
  const s = await getSettings();
  const h = await hashPin(oldPin, s.pinSalt);
  if (h !== s.pinHash) return { ok: false, reason: 'wrong-old' };
  const salt = genSalt();
  s.pinHash = await hashPin(newPin, salt);
  s.pinSalt = salt;
  s.lastLoginAt = Date.now();
  await set('settings', s);
  return { ok: true };
}

export function lockInfo() {
  return { failed, lockUntil };
}
