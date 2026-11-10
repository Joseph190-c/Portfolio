const $ = (s) => document.querySelector(s);
const ICONS = {
  github: '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a10.9 10.9 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>',
  linkedin: '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/></svg>',
  email: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  doc: '<svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></svg>',
  ext: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>'
};
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ext = (url, inner, cls = '', attrs = '') => `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer" class="${cls}" ${attrs}>${inner}</a>`;

const socials = [
  ['github', 'GitHub', PROFILE.github],
  ['linkedin', 'LinkedIn', PROFILE.linkedin],
  ['email', 'Email', `mailto:${PROFILE.email}`]
].filter(([, , u]) => u);
$('#socials').innerHTML = socials.map(([k, l, u]) => ext(u, ICONS[k], 'social', `aria-label="${l}"`)).join('');
$('#contactLinks').innerHTML = socials.map(([k, l, u]) =>
  ext(u, `<span class="text-salmon">${ICONS[k]}</span><span>${l === 'Email' ? esc(PROFILE.email) : l}</span>`, 'flex items-center gap-3 hover:text-salmon transition-colors')).join('');

$('#skillsGrid').innerHTML = SKILLS.map((g) => `
  <div class="skill-card"><h3>${esc(g.group)}</h3>${g.items.map((i) => `<span class="chip">${esc(i)}</span>`).join('')}</div>`).join('');

$('#projectsList').innerHTML = PROJECTS.map((p) => `
  <article class="project">
    <div class="project-media"><img src="${esc(p.image)}" alt="Screenshot of ${esc(p.title)}" loading="lazy" onerror="this.outerHTML='<span class=&quot;ph&quot;>${esc(p.title)}</span>'"></div>
    <div>
      <span class="year-badge">${p.year}</span>
      <h3 class="mt-3 font-display font-bold text-2xl sm:text-3xl text-white">${esc(p.title)}</h3>
      <p class="mt-3 text-zinc-400 leading-relaxed">${esc(p.description)}</p>
      <div class="mt-4">${p.tags.map((t) => `<span class="chip chip-accent">${esc(t)}</span>`).join('')}</div>
      <div class="role-box"><strong>My role and contributions: ${esc(p.role)}.</strong><p class="mt-1 text-zinc-300">${esc(p.contributions)}</p></div>
      <div class="mt-5 flex flex-wrap gap-3">${p.links.map((l) => ext(l.url, `${esc(l.label)} ${ICONS.ext}`, 'link-btn')).join('')}</div>
    </div>
  </article>`).join('');

const certCard = (c) => {
  const img = c.thumb || (/\.(png|jpe?g|webp|gif|svg)$/i.test(c.file) ? c.file : null);
  return `<article class="cert">
    <div class="cert-thumb">${img ? `<img src="${esc(img)}" alt="Certificate: ${esc(c.title)}" loading="lazy" onerror="this.remove()">` : ICONS.doc}</div>
    <div class="p-5 flex-1 flex flex-col">
      <h4 class="font-display font-bold text-lg text-white">${esc(c.title)}</h4>
      <p class="text-sm text-zinc-400 mt-1">${esc(c.issuer)}${c.year ? ' &middot; ' + c.year : ''}</p>
      <div class="mt-4">${ext(c.file, `View certificate ${ICONS.ext}`, 'link-btn')}</div>
    </div></article>`;
};
$('#coreCerts').innerHTML = CORE_CERTS.map(certCard).join('');
$('#extraCerts').innerHTML = EXTRA_CERTS.map(certCard).join('');

const menuBtn = $('#menuBtn'), menu = $('#mobileMenu');
menuBtn.addEventListener('click', () => {
  const open = menu.classList.toggle('hidden') === false;
  menu.classList.toggle('flex', open);
  menuBtn.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', (e) => { if (e.target.tagName === 'A') { menu.classList.add('hidden'); menu.classList.remove('flex'); } });

const form = $('#contactForm'), status = $('#formStatus');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  if (form.action.includes('YOUR_FORM_ID')) {
    const body = encodeURIComponent(`${d.message}\n\nFrom: ${d.name} (${d.email})`);
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent('Portfolio contact from ' + d.name)}&body=${body}`;
    status.textContent = 'Opening your email app...'; status.className = 'text-sm text-salmon';
    return;
  }
  try {
    const r = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    if (!r.ok) throw new Error();
    form.reset(); status.textContent = 'Message sent. Thank you!'; status.className = 'text-sm text-salmon';
  } catch { status.textContent = 'Something went wrong. Please email me directly.'; status.className = 'text-sm text-red-400'; }
});

$('#year').textContent = new Date().getFullYear();
