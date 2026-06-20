// ─── projects.js — modal renderer ─────────────────────────
// Data lives in <template id="detail-{slug}"> in each page's HTML.
// Screenshot path stored in data-screenshot on the template tag.
// Only injects image if data-screenshot is set — no flicker.

const PLACEHOLDER = 'assets/images/ui/placeholder.svg';

function openModal(slug) {
  const tpl     = document.getElementById('detail-' + slug);
  const overlay = document.getElementById('modalOverlay');
  const body    = document.getElementById('modalBody');

  if (!tpl)              { console.warn('openModal: no template for slug:', slug); return; }
  if (!overlay || !body) return;

  // Stamp template content
  body.innerHTML = '';
  body.appendChild(tpl.content.cloneNode(true));

  // Screenshot — only inject if explicitly set on the template
  const screenshotSrc = tpl.dataset.screenshot;
  const imgWrap       = body.querySelector('.modal__screenshot-wrap');

  if (imgWrap) {
    if (screenshotSrc) {
      // Real screenshot exists — show it, fall back to placeholder on error
      imgWrap.style.display = 'block';
      const imgEl = imgWrap.querySelector('.modal__screenshot-slot');
      if (imgEl) {
        imgEl.src = screenshotSrc;
        imgEl.onerror = () => { imgEl.src = PLACEHOLDER; };
      }
    } else {
      // No screenshot set — hide the wrap entirely, no flicker
      imgWrap.style.display = 'none';
    }
  }

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// ─── Preview overlay ───────────────────────────────────────
// Opens an iframe overlay so the user can preview without leaving.
// Falls back to new tab if the URL blocks iframes.

function openPreview(url) {
  const existing = document.getElementById('previewOverlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'previewOverlay';
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:300;
    background:rgba(0,0,0,0.85);
    display:flex;flex-direction:column;
    align-items:center;justify-content:center;
    backdrop-filter:blur(6px);
    animation:fadeIn .2s ease;
  `;

  overlay.innerHTML = `
    <style>
      @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      #previewOverlay .preview-bar{
        width:min(960px,94vw);height:40px;
        background:#0f1117;border:1px solid #1e222e;
        border-bottom:none;border-radius:10px 10px 0 0;
        display:flex;align-items:center;justify-content:space-between;
        padding:0 14px;flex-shrink:0;
      }
      #previewOverlay .preview-url{
        font-family:-apple-system,sans-serif;font-size:11px;
        color:#4e5468;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
        max-width:70%;
      }
      #previewOverlay .preview-actions{display:flex;gap:8px;align-items:center;}
      #previewOverlay .preview-btn{
        font-family:-apple-system,sans-serif;font-size:11px;font-weight:500;
        color:#9098b0;background:#161a23;border:1px solid #252a38;
        padding:4px 10px;border-radius:5px;cursor:pointer;text-decoration:none;
      }
      #previewOverlay .preview-btn:hover{color:#e8eaf0;}
      #previewOverlay iframe{
        width:min(960px,94vw);height:min(620px,75vh);
        border:1px solid #1e222e;border-radius:0 0 10px 10px;
        background:#08090d;display:block;
      }
    </style>
    <div class="preview-bar">
      <span class="preview-url">${url}</span>
      <div class="preview-actions">
        <a href="${url}" target="_blank" rel="noopener noreferrer" class="preview-btn">Open in tab ↗</a>
        <button class="preview-btn" onclick="document.getElementById('previewOverlay').remove()">✕ Close</button>
      </div>
    </div>
    <iframe src="${url}" sandbox="allow-scripts allow-same-origin allow-forms" loading="lazy"></iframe>
  `;

  // Click backdrop to close
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.remove();
  });

  document.body.appendChild(overlay);
}