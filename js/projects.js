// ─── projects.js — modal renderer + preview overlay ───────
// Data lives in <template id="detail-{slug}"> in each page's HTML.
// Screenshots: add data-screenshots="path1.webp,path2.webp" on the template.
// openPreview() is defined here — NOT in main.js.

const PLACEHOLDER = 'assets/images/ui/placeholder.svg';

// ─── Modal ─────────────────────────────────────────────────
function openModal(slug) {
  const tpl     = document.getElementById('detail-' + slug);
  const overlay = document.getElementById('modalOverlay');
  const body    = document.getElementById('modalBody');

  if (!tpl)              { console.warn('openModal: no template for slug:', slug); return; }
  if (!overlay || !body) return;

  body.innerHTML = '';
  body.appendChild(tpl.content.cloneNode(true));

  // Screenshots — comma-separated list in data-screenshots attribute
  // e.g. data-screenshots="assets/images/projects/screenshots/lockbox-1.webp,lockbox-2.webp"
  const raw   = tpl.dataset.screenshots || tpl.dataset.screenshot || '';
  const paths = raw.split(',').map(s => s.trim()).filter(Boolean);
  const wrap  = body.querySelector('.modal__screenshot-wrap');

  if (wrap) {
    if (paths.length > 0) {
      wrap.style.display = 'block';
      wrap.innerHTML = '';

      if (paths.length === 1) {
        // Single image
        const img = document.createElement('img');
        img.className = 'modal__screenshot-slot';
        img.src = paths[0];
        img.alt = 'Screenshot';
        img.onerror = () => { img.src = PLACEHOLDER; };
        wrap.appendChild(img);
      } else {
        // Gallery — thumbnail strip + large view
        wrap.innerHTML = `
          <div class="ss-main-wrap">
            <img class="ss-main" src="${paths[0]}" alt="Screenshot 1">
          </div>
          <div class="ss-strip"></div>
        `;
        const mainImg = wrap.querySelector('.ss-main');
        const strip   = wrap.querySelector('.ss-strip');

        paths.forEach((src, i) => {
          const thumb = document.createElement('img');
          thumb.className = 'ss-thumb' + (i === 0 ? ' ss-thumb--active' : '');
          thumb.src = src;
          thumb.alt = `Screenshot ${i + 1}`;
          thumb.onerror = () => { thumb.src = PLACEHOLDER; };
          thumb.addEventListener('click', () => {
            mainImg.src = src;
            strip.querySelectorAll('.ss-thumb').forEach(t => t.classList.remove('ss-thumb--active'));
            thumb.classList.add('ss-thumb--active');
          });
          strip.appendChild(thumb);
        });
      }
    } else {
      wrap.style.display = 'none';
    }
  }

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// ─── Preview overlay ───────────────────────────────────────
// iframe panel — stays on the page, no new tab
function openPreview(url) {
  const existing = document.getElementById('previewOverlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'previewOverlay';
  overlay.style.cssText = [
    'position:fixed','inset:0','z-index:300',
    'background:rgba(0,0,0,0.88)',
    'display:flex','flex-direction:column',
    'align-items:center','justify-content:center',
    'backdrop-filter:blur(8px)',
    'animation:pvFadeIn .2s ease',
  ].join(';');

  // Inject keyframe once
  if (!document.getElementById('pvStyle')) {
    const st = document.createElement('style');
    st.id = 'pvStyle';
    st.textContent = '@keyframes pvFadeIn{from{opacity:0}to{opacity:1}}';
    document.head.appendChild(st);
  }

  const bar = document.createElement('div');
  bar.style.cssText = [
    'width:min(960px,94vw)','height:40px',
    'background:#0f1117','border:1px solid #1e222e',
    'border-bottom:none','border-radius:10px 10px 0 0',
    'display:flex','align-items:center','justify-content:space-between',
    'padding:0 14px','flex-shrink:0','gap:8px',
  ].join(';');

  const urlSpan = document.createElement('span');
  urlSpan.style.cssText = 'font:11px -apple-system,sans-serif;color:#4e5468;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;min-width:0;';
  urlSpan.textContent = url;

  const actions = document.createElement('div');
  actions.style.cssText = 'display:flex;gap:8px;flex-shrink:0;';

  const btnStyle = 'font:500 11px -apple-system,sans-serif;color:#9098b0;background:#161a23;border:1px solid #252a38;padding:4px 10px;border-radius:5px;cursor:pointer;text-decoration:none;';

  const openTab = document.createElement('a');
  openTab.href = url;
  openTab.target = '_blank';
  openTab.rel = 'noopener noreferrer';
  openTab.style.cssText = btnStyle;
  openTab.textContent = 'Open in tab ↗';

  const closeBtn = document.createElement('button');
  closeBtn.style.cssText = btnStyle;
  closeBtn.textContent = '✕ Close';
  closeBtn.onclick = () => overlay.remove();

  actions.append(openTab, closeBtn);
  bar.append(urlSpan, actions);

  const frame = document.createElement('iframe');
  frame.src = url;
  frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups');
  frame.loading = 'lazy';
  frame.style.cssText = [
    'width:min(960px,94vw)','height:min(620px,74vh)',
    'border:1px solid #1e222e','border-radius:0 0 10px 10px',
    'background:#08090d','display:block',
  ].join(';');

  overlay.append(bar, frame);
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  document.addEventListener('keydown', function pvEsc(e) {
    if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', pvEsc); }
  });

  document.body.appendChild(overlay);
}