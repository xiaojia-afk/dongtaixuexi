/* ═══════════════════════════════════════════
   storage.js — IndexedDB 主存储 + localStorage 镜像双保险
   写入：双写；读取：IDB 优先，失败回退镜像；启动：镜像 → IDB 恢复合并
   ═══════════════════════════════════════════ */

const DB_NAME = 'workbench';
const DB_VER = 1;
const STORE = 'kv';
const PREFIX = 'wb_';

let dbPromise = null;

function openDB() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) { reject(new Error('no indexeddb')); return; }
    const req = indexedDB.open(DB_NAME, DB_VER);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}

function lsGet(key) {
  try { const v = localStorage.getItem(PREFIX + key); return v === null ? undefined : JSON.parse(v); }
  catch { return undefined; }
}
function lsSet(key, val) {
  try { localStorage.setItem(PREFIX + key, JSON.stringify(val)); } catch { /* 存储满/隐私模式忽略 */ }
}
function lsDel(key) {
  try { localStorage.removeItem(PREFIX + key); } catch {}
}
function lsKeys() {
  const out = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(PREFIX)) out.push(k.slice(PREFIX.length));
    }
  } catch {}
  return out;
}

export async function get(key) {
  try {
    const db = await openDB();
    return await new Promise((res, rej) => {
      const tx = db.transaction(STORE, 'readonly');
      const r = tx.objectStore(STORE).get(key);
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
  } catch {
    return lsGet(key);
  }
}

export async function set(key, val) {
  lsSet(key, val); // 镜像先写，IDB 失败也有保底
  try {
    const db = await openDB();
    await new Promise((res, rej) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put(val, key);
      tx.oncomplete = res;
      tx.onerror = () => rej(tx.error);
      tx.onabort = () => rej(tx.error);
    });
  } catch { /* 镜像已写，可接受 */ }
}

export async function remove(key) {
  lsDel(key);
  try {
    const db = await openDB();
    await new Promise((res, rej) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).delete(key);
      tx.oncomplete = res;
      tx.onerror = () => rej(tx.error);
    });
  } catch {}
}

export async function keys() {
  try {
    const db = await openDB();
    return await new Promise((res, rej) => {
      const tx = db.transaction(STORE, 'readonly');
      const r = tx.objectStore(STORE).getAllKeys();
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
  } catch {
    return lsKeys();
  }
}

export async function getAll() {
  try {
    const db = await openDB();
    return await new Promise((res, rej) => {
      const tx = db.transaction(STORE, 'readonly');
      const r = tx.objectStore(STORE).getAll();
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
  } catch {
    return lsKeys().map((k) => lsGet(k)).filter((v) => v !== undefined);
  }
}

/* 启动时：把 localStorage 镜像合并回 IDB（防 iOS 清 IDB 丢数据） */
export async function restoreFromMirror() {
  for (const k of lsKeys()) {
    const v = lsGet(k);
    if (v !== undefined) await set(k, v);
  }
}
