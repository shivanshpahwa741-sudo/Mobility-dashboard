// Interactivity and rendering for the India mobility map.

// ---- Mobility map with Combined / Intracity / Intercity toggle ----

let MODE = (location.hash === '#inter' || location.hash === '#intra') ? location.hash.slice(1) : 'combined';
const mapEl = document.getElementById('map');
const detail = document.getElementById('detail');
let openKey = null;

function renderMap() {
  let html = '<div class="corner"></div>' + COLUMNS.map((c) => '<div class="col-head">' + c + '</div>').join('');
  ROWS.forEach((row, r) => {
    html += '<div class="row-head">' + row + '</div>';
    COLUMNS.forEach((col, c) => {
      const key = c + '|' + r;
      const A = CELLS[key], B = CELLS_X['x' + key];
      let headline = '';
      if (MODE === 'combined') {
        if (!A && !B) { html += '<div></div>'; return; }
        const line = (cell, tag, cls) => cell ? '<div class="c-stat"><span class="mtag ' + cls + '">' + tag + '</span>' + (cell.stat || '') + '</div>' : '';
        headline = line(A, 'Intra', 'mi') + line(B, 'Inter', 'mx');
      } else {
        const cell = MODE === 'intra' ? A : B;
        if (!cell) { html += '<div></div>'; return; }
        headline = '<div class="c-stat">' + (cell.stat || '') + '</div>';
      }
      html += '<div class="cell" data-cell="' + key + '">' +
        '<div class="c-title">' + col + '</div>' + headline + '</div>';
    });
  });
  mapEl.innerHTML = html;
}

function detailBlock(d, tag) {
  const chip = d.na ? 'N/A' : (tag || d.scope || '');
  let html = '<h3>' + d.title + (chip ? ' <span class="l-tag">' + chip + '</span>' : '') + '</h3><p class="d-sum">' + d.summary + '</p>';
  if (d.facts.length) {
    html += '<ul>';
    d.facts.forEach((f) => { html += '<li>' + f[0] + '</li>'; });
    html += '</ul>';
  }
  if (d.leaders.length) {
    html += '<h4>Market leaders (India)</h4>';
    d.leaders.forEach((l) => {
      html += '<div class="leader">' +
        '<div class="l-top"><span class="l-name">' + l.name + '</span>' +
        '<span class="l-tag">' + l.tag + '</span></div>' +
        '<div class="l-blurb">' + l.blurb + '</div>' +
        '</div>';
    });
  }
  return html;
}

function bindLeaders() {
  detail.querySelectorAll('.leader').forEach((el) => {
    el.addEventListener('click', () => el.classList.toggle('open'));
  });
}

function openDetail(key) {
  if (MODE === 'combined') {
    const A = CELLS[key], B = CELLS_X['x' + key];
    detail.innerHTML = (A ? detailBlock(A, 'Intracity') : '') + (B ? detailBlock(B, 'Intercity') : '');
  } else {
    const cell = MODE === 'intra' ? CELLS[key] : CELLS_X['x' + key];
    detail.innerHTML = detailBlock(cell, null);
  }
  detail.classList.add('open');
  bindLeaders();
}

mapEl.addEventListener('click', (e) => {
  const el = e.target.closest('.cell');
  if (!el) return;
  const key = el.dataset.cell;
  if (openKey === key && detail.classList.contains('open')) {
    detail.classList.remove('open');
    el.classList.remove('active');
    openKey = null;
    return;
  }
  openKey = key;
  mapEl.querySelectorAll('.cell.active').forEach((x) => x.classList.remove('active'));
  el.classList.add('active');
  openDetail(key);
  detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

document.querySelectorAll('#modeToggle button').forEach((btn) => {
  btn.addEventListener('click', () => {
    MODE = btn.dataset.mode;
    document.querySelectorAll('#modeToggle button').forEach((b) => b.classList.toggle('active', b === btn));
    detail.classList.remove('open');
    openKey = null;
    renderMap();
    applyLens();
  });
});

document.querySelectorAll('#modeToggle button').forEach((b) => b.classList.toggle('active', b.dataset.mode === MODE));
renderMap();

// ---- Strategic lens filters (qualitative classification of the map cells) ----
const LENS = {
  '0|0': { dist:['hyper','intra'], biz:['b2c'], asset:['heavy'] },
  '1|0': { dist:['intra'], biz:['b2c'], asset:['heavy'] },
  '2|0': { dist:['intra','inter'], biz:['b2c'], asset:['heavy'] },
  '0|1': { dist:['hyper','intra'], biz:['b2c'], asset:['light'] },
  '1|1': { dist:['intra'], biz:['b2c'], asset:['light'] },
  '2|1': { dist:['intra','inter','long'], biz:['b2c'], asset:['light'] },
  '3|1': { dist:['intra','inter','long'], biz:['b2c','b2g'], asset:['heavy'] },
  '0|2': { dist:['hyper','intra'], biz:['b2b'], asset:['heavy'] },
  '1|2': { dist:['intra'], biz:['b2b'], asset:['heavy'] },
  '2|2': { dist:['intra','inter'], biz:['b2b'], asset:['heavy'] },
  '3|2': { dist:['intra','inter'], biz:['b2b'], asset:['heavy'] },
  '0|3': { dist:['hyper','intra'], biz:['b2b'], asset:['light'] },
  '1|3': { dist:['intra'], biz:['b2b'], asset:['light'] },
  '2|3': { dist:['intra','inter'], biz:['b2b'], asset:['light','heavy'] },
  '3|3': { dist:['inter','long'], biz:['b2b'], asset:['heavy','light'] },
};
const lensSel = { dist:'all', biz:'all', asset:'all' };
function applyLens() {
  document.querySelectorAll('#map .cell').forEach((el) => {
    const t = LENS[el.dataset.cell];
    const dim = t && (
      (lensSel.dist !== 'all' && !t.dist.includes(lensSel.dist)) ||
      (lensSel.biz !== 'all' && !t.biz.includes(lensSel.biz)) ||
      (lensSel.asset !== 'all' && !t.asset.includes(lensSel.asset)));
    el.classList.toggle('dim', !!dim);
  });
}
[['lensDist','dist'],['lensBiz','biz'],['lensAsset','asset']].forEach(([id, lens]) => {
  document.querySelectorAll('#' + id + ' button').forEach((btn) => {
    btn.addEventListener('click', () => {
      lensSel[lens] = btn.dataset.lv;
      document.querySelectorAll('#' + id + ' button').forEach((b) => b.classList.toggle('active', b === btn));
      applyLens();
    });
  });
});

applyLens();

// ---- Layers ----

// ---- Thesis ----

document.getElementById('thesis').innerHTML = `
<h3>The point: volume and value live in different places</h3>
<p><b>~70% of the vehicles India sells are two-wheelers, but they carry only ~20% of the rupees</b>. Cars are ~15% of vehicles and ~43% of the money. Commercial vehicles - trucks and buses together - are ~3.5% of vehicles and ~19% of the money. Per vehicle, a commercial vehicle averages about <b>&#8377;22&nbsp;L</b> against a two-wheeler's <b>&#8377;1.2&nbsp;L</b> - roughly 18x; a car ~10x; a construction machine ~49x.</p>
<p>By use case: the private bucket moves <b>~2.36&nbsp;Cr vehicles</b> a year at ~&#8377;3.0&nbsp;L each; public passenger ~17&nbsp;L vehicles at ~&#8377;5.9&nbsp;L; the two commercial buckets <b>~58&nbsp;L vehicles at ~&#8377;6.5-11.5&nbsp;L each</b>. Where the vehicles go and where the rupees go barely overlap.</p>
<p class="pull">The volume story is two wheels. The value story is cars and freight.</p>
<p>High-volume cells monetise through density and financing; high-value cells monetise per transaction.</p>
`;

// ---- Use-case flow sankey ----
let FMODE = 'vol';
function fnum(x, unit) {
  return x >= 100 ? '~' + (x/100).toFixed(2).replace(/\.?0+$/,'') + ' Cr' + (unit||'')
                  : '~' + (Math.round(x*10)/10) + ' L' + (unit||'');
}
function frup(k) {
  return k >= 99.5 ? '~\u20B9' + (k/100).toFixed(2).replace(/\.?0+$/,'') + ' L Cr'
                   : '~\u20B9' + Math.round(k*1000) + ' Cr';
}
function renderFlow() {
  const isVol = FMODE === 'vol';
  const segs = FLOW_SEGMENTS;
  const tot = segs.reduce((s,x) => s + (isVol ? x.vol : x.val), 0);
  const W = 1180, TOP = 40, CH = 470, BOT = TOP + CH, GAP = 4;
  const sc = CH / tot;
  const LX = 292, LW = 14, FX = 510, FW = 56, RX = 840, RW = 16;
  const bkeys = ['priv','pubp','prvc','pubc'];
  const btot = { priv:0, pubp:0, prvc:0, pubc:0 };
  const bvol = { priv:0, pubp:0, prvc:0, pubc:0 };
  const bval = { priv:0, pubp:0, prvc:0, pubc:0 };
  segs.forEach(s => { for (const k in s.split) { btot[k] += (isVol ? s.vol : s.val) * s.split[k]; bvol[k] += s.vol * s.split[k]; bval[k] += s.val * s.split[k]; } });
  const bcursor = {}; { let run = TOP; for (const k of bkeys) { bcursor[k] = run; run += btot[k]*sc; } }
  const out = [];
  const NS = 'font-family="Montserrat,sans-serif"';

  // pass 1: left bar positions and label slots (anti-overlap, min 26px step)
  const segsPos = [];
  { let ly = TOP, labelY = TOP + 9;
    segs.forEach(s => {
      const hgt = (isVol ? s.vol : s.val) * sc - GAP;
      const barMid = ly + hgt/2;
      const wantY = ly + 9;
      const y = Math.max(wantY, labelY);
      segsPos.push({ s:s, y0:ly, hgt:hgt, barMid:barMid, labY:y, displaced: y > wantY + 1 });
      labelY = y + 26;
      ly += hgt + GAP;
    });
  }
  // pass 2: right bucket positions and label slots (min 46px step)
  const buckPos = [];
  { let ry = TOP, labelY = TOP + 13;
    for (const k of bkeys) {
      const hgt = btot[k]*sc - GAP;
      const wantY = ry + 13;
      const y = Math.max(wantY, labelY);
      buckPos.push({ k:k, y0:ry, hgt:hgt, barMid:ry+hgt/2, labY:y, displaced: y > wantY + 1 });
      labelY = y + 54;
      ry += hgt + GAP;
    }
  }
  const svgH = Math.max(BOT + 14, segsPos[segsPos.length-1].labY + 8, buckPos[buckPos.length-1].labY + 36);

  out.push('<svg viewBox="0 0 ' + W + ' ' + svgH.toFixed(0) + '" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;min-width:980px;">');
  out.push('<text x="10" y="26" fill="#86868c" font-size="12.5" font-weight="700" letter-spacing="1" ' + NS + '>NEW VEHICLES SOLD, FY26</text>');
  out.push('<text x="856" y="26" fill="#86868c" font-size="12.5" font-weight="700" letter-spacing="1" ' + NS + '>THE USE THEY FLOW INTO</text>');
  out.push('<rect x="' + FX + '" y="' + TOP + '" width="' + FW + '" height="' + (CH-GAP) + '" fill="#161618" stroke="#26262a" rx="10"></rect>');
  out.push('<text x="' + (FX+FW/2) + '" y="' + (TOP+(CH-GAP)/2) + '" fill="#b1b1b7" font-size="13" font-weight="800" letter-spacing="2" ' + NS + ' text-anchor="middle" transform="rotate(-90 ' + (FX+FW/2) + ' ' + (TOP+(CH-GAP)/2) + ')">USE-CASE SPLIT</text>');

  // flows
  segsPos.forEach(p => {
    const s = p.s;
    const amt = isVol ? s.vol : s.val;
    let fy = p.y0;
    for (const k of bkeys) {
      const f = s.split[k];
      if (!f) continue;
      const fh = amt * f * sc;
      const fc = fy + fh/2;
      const by0 = bcursor[k];
      const bc = by0 + fh/2;
      const famt = isVol ? s.vol*f : s.val*f;
      const tip = s.name + ' \u2192 ' + FLOW_BUCKETS[k].short + ': ' + (isVol ? fnum(famt,' vehicles') : frup(famt));
      const w = Math.max(fh, 1.4).toFixed(1);
      out.push('<path d="M ' + (LX+LW) + ',' + fc.toFixed(1) + ' C ' + (LX+LW+90) + ',' + fc.toFixed(1) + ' ' + (FX-90) + ',' + fc.toFixed(1) + ' ' + FX + ',' + fc.toFixed(1) + '" fill="none" stroke="' + s.color + '" stroke-width="' + w + '" stroke-opacity="0.72"><title>' + tip + '</title></path>');
      out.push('<path d="M ' + (FX+FW) + ',' + fc.toFixed(1) + ' C ' + (FX+FW+120) + ',' + fc.toFixed(1) + ' ' + (RX-120) + ',' + bc.toFixed(1) + ' ' + RX + ',' + bc.toFixed(1) + '" fill="none" stroke="' + s.color + '" stroke-width="' + w + '" stroke-opacity="0.72"><title>' + tip + '</title></path>');
      fy += fh;
      bcursor[k] += fh;
    }
  });

  // left bars + labels
  segsPos.forEach(p => {
    const s = p.s;
    out.push('<rect x="' + LX + '" y="' + p.y0.toFixed(1) + '" width="' + LW + '" height="' + p.hgt.toFixed(1) + '" fill="' + s.color + '" rx="2"></rect>');

    out.push('<rect x="10" y="' + (p.labY-9).toFixed(1) + '" width="9" height="9" fill="' + s.color + '" rx="2"></rect>');
    const amt = isVol ? s.vol : s.val;
    const share = amt/tot*100;
    const line = s.name + '  \u00B7  ' + (isVol ? s.volDisp : s.valDisp) + '  \u00B7  ' + share.toFixed(share < 1 ? 1 : 0) + '%';
    out.push('<text x="26" y="' + p.labY.toFixed(1) + '" fill="#ffffff" font-size="11.5" font-weight="600" ' + NS + '>' + line + '</text>');
  });

  // right bars + labels
  buckPos.forEach(p => {
    const k = p.k;
    out.push('<rect x="' + RX + '" y="' + p.y0.toFixed(1) + '" width="' + RW + '" height="' + p.hgt.toFixed(1) + '" fill="#2a2a2e" rx="2"></rect>');
    if (p.displaced) out.push('<line x1="' + (RX+RW+4) + '" y1="' + p.barMid.toFixed(1) + '" x2="' + (RX+RW+4) + '" y2="' + (p.labY-5).toFixed(1) + '" stroke="#232327" stroke-width="1"/>');
    const nm = FLOW_BUCKETS[k].name, pi = nm.indexOf(' (');
    if (pi > 0) {
      out.push('<text x="856" y="' + p.labY.toFixed(1) + '" fill="#ffffff" font-size="15" font-weight="700" ' + NS + '>' + nm.slice(0, pi) + '</text>');
      out.push('<text x="856" y="' + (p.labY+12).toFixed(1) + '" fill="#ffffff" font-size="12.5" font-weight="700" ' + NS + '>' + nm.slice(pi+1) + '</text>');
    } else {
      out.push('<text x="856" y="' + p.labY.toFixed(1) + '" fill="#ffffff" font-size="15" font-weight="700" ' + NS + '>' + nm + '</text>');
    }
    const tline = fnum(bvol[k],' vehicles') + '  \u00B7  ' + frup(bval[k]);
    out.push('<text x="856" y="' + (p.labY+25).toFixed(1) + '" fill="#b1b1b7" font-size="12" ' + NS + '>' + tline + '</text>');
    out.push('<text x="856" y="' + (p.labY+37).toFixed(1) + '" fill="#86868c" font-size="11" ' + NS + '>\u2248\u20B9' + (bval[k]/bvol[k]).toFixed(1) + ' L per vehicle</text>');
  });

  out.push('</svg>');
  document.getElementById('flowWrap').innerHTML = out.join('');
}
document.querySelectorAll('#flowToggle button').forEach((btn) => {
  btn.addEventListener('click', () => {
    FMODE = btn.dataset.fmode;
    document.querySelectorAll('#flowToggle button').forEach((b) => b.classList.toggle('active', b === btn));
    renderFlow();
    renderFlowList();
  });
});
renderFlow();

// ---- Mobile flow list: same data as the sankey, rendered as readable rows/cards under 720px ----
function renderFlowList() {
  const el = document.getElementById('flowList');
  if (!el) return;
  const bkeys = ['priv','pubp','prvc','pubc'];
  const isVol = FMODE === 'vol';
  const bvol = { priv:0, pubp:0, prvc:0, pubc:0 };
  const bval = { priv:0, pubp:0, prvc:0, pubc:0 };
  FLOW_SEGMENTS.forEach(function(s) {
    bkeys.forEach(function(k) {
      bvol[k] += s.vol * (s.split[k] || 0);
      bval[k] += s.val * (s.split[k] || 0);
    });
  });
  let h = '<div class="fl-cap">New vehicles sold, FY26</div>';
  h += FLOW_SEGMENTS.map(function(s) {
    return '<div class="fl-row"><span class="fl-dot" style="background:' + s.color + '"></span>'
      + '<span class="fl-name">' + s.name + '</span>'
      + '<span class="fl-num">' + s.volDisp + '<span>' + s.valDisp + '</span></span></div>';
  }).join('');
  h += '<div class="fl-divider">Split into four use cases</div>';
  h += bkeys.map(function(k) {
    const tot = isVol ? bvol[k] : bval[k];
    const strip = FLOW_SEGMENTS.map(function(s) {
      const w = tot > 0 ? (isVol ? s.vol : s.val) * (s.split[k] || 0) / tot * 100 : 0;
      return w > 0.4 ? '<span style="width:' + w.toFixed(1) + '%;background:' + s.color + '"></span>' : '';
    }).join('');
    return '<div class="fl-bucket"><div class="fl-bk-name">' + FLOW_BUCKETS[k].name + '</div>'
      + '<div class="fl-bk-strip">' + strip + '</div>'
      + '<div class="fl-bk-nums">' + fnum(bvol[k], ' vehicles') + ' &nbsp;&middot;&nbsp; ' + frup(bval[k]) + '</div>'
      + '<div class="fl-bk-per">&asymp;&#8377;' + (bval[k] / bvol[k]).toFixed(1) + ' L per vehicle</div></div>';
  }).join('');
  el.innerHTML = h;
}
renderFlowList();

// ---- Split notes (given content) ----
document.getElementById('splitNotesList').innerHTML = FLOW_SEGMENTS.map(function(s) {
  return '<li><b>' + s.name + ':</b> ' + s.note + '</li>';
}).join('');

// ---- Layer figures (given inputs; memo rows are subsets or embedded values, never additive) ----
['l1','l2','l3','l4'].forEach(function(k) {
  const el = document.getElementById('figs-' + k);
  if (!el) return;
  el.innerHTML = LAYER_FIGS[k].map(function(f) {
    return '<div class="l4-fig' + (f.memo ? ' memo' : '') + '"><span class="amt">' + f.amount + '</span><div class="fig-tx"><div class="fig-name">' + f.label + '</div><div class="fig-what">' + f.what + '</div><div class="fig-meta">' + f.period + ' &middot; ' + f.basis + '</div></div></div>';
  }).join('');
});

