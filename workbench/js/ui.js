/* ═══════════════════════════════════════════
   ui.js — Toast + 通用 Modal
   ═══════════════════════════════════════════ */

export function toast(msg, ms = 2200) {
  const root = document.getElementById('toastRoot');
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  root.appendChild(el);
  setTimeout(() => {
    el.style.transition = 'opacity .3s';
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 320);
  }, ms);
}

/* modal({ title, bodyHTML, okText, cancelText, onOK }) → 返回关闭函数 */
export function modal({ title, bodyHTML = '', okText = '确定', cancelText = '', onOK = null }) {
  const root = document.getElementById('modalRoot');
  const mask = document.createElement('div');
  mask.className = 'modal-mask';
  mask.innerHTML = `
    <div class="modal-box glass">
      <h3>${title}</h3>
      <div class="modal-body">${bodyHTML}</div>
      <div class="modal-actions">
        ${cancelText ? `<button class="gbtn ghost" data-act="cancel">${cancelText}</button>` : ''}
        <button class="gbtn primary" data-act="ok">${okText}</button>
      </div>
    </div>`;
  root.appendChild(mask);

  const close = () => mask.remove();

  mask.addEventListener('click', (e) => {
    if (e.target === mask) close();
    const act = e.target.closest('[data-act]')?.dataset.act;
    if (act === 'cancel') close();
    if (act === 'ok') {
      const keep = onOK ? onOK(mask) : false;
      if (keep !== true) close();
    }
  });
  return close;
}

export function confirmDialog(title, bodyHTML, onOK) {
  return modal({ title, bodyHTML, okText: '确定', cancelText: '取消', onOK: () => { onOK(); } });
}
