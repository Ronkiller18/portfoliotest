// ─── main.js — shared across ALL pages ────────────────────

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

document.addEventListener('click', e => {
  const overlay = document.getElementById('modalOverlay');
  if (overlay && e.target === overlay) closeModal();
});

function toggleExpand(btn) {
  const card   = btn.closest('.card');
  const expand = card && card.querySelector('.card-expand');
  if (!expand) return;
  const isOpen = expand.classList.contains('open');
  expand.classList.toggle('open', !isOpen);
  btn.textContent = isOpen ? 'Details ↓' : 'Details ↑';
}

function openPreview(url) {
  window.open(url, '_blank', 'noopener,noreferrer');
}