// ─── Pages: Business, Facility, ESG, Contact ─────────────────────────────────

const { useState, useRef } = React;

// ── Mold Manufacturing ─────────────────────────────────────────────────────────
function MoldPage({ t }) {
  const d = t.mold;
  const isKo = t.lang === 'KOR';
  return (
    <PageWrapper title={d.title} subtitle={d.subtitle}>
      {/* Process Flow */}
      <div style={{ marginBottom: 64 }}>
        <SectionTitle label="Process" title={isKo ? '제작 프로세스' : 'Manufacturing Process'} />
        <div className="hscroll" style={bizSt.processFlow}>
          {d.process.map((step, i, arr) => (
            <React.Fragment key={i}>
              <div style={bizSt.processFlowStep}>
                <div style={bizSt.processFlowIdx}>{String(i + 1).padStart(2, '0')}</div>
                <div style={bizSt.processFlowLabel} dangerouslySetInnerHTML={{ __html: step }} />
              </div>
              {i < arr.length - 1 && <div style={bizSt.processFlowArrow}>→</div>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Key Production Items — grouped by vehicle area */}
      <SectionTitle label="Key Products" title={d.itemsTitle || (isKo ? '주력 양산 아이템' : 'Key Production Items')} />
      {(d.itemGroups || []).map((g, gi) => (
        <div key={gi} style={{ marginBottom: 44 }}>
          {/* category header */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid var(--navy-800)' }}>
            <div style={{ fontSize: 24, fontWeight: 900, fontFamily: 'Barlow Condensed, sans-serif', color: 'var(--gold-2)', lineHeight: 1, letterSpacing: -1 }}>{String(gi + 1).padStart(2, '0')}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 9.5, letterSpacing: 3, color: 'var(--gold)', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, marginBottom: 2 }}>{g.en}</div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--navy-800)', margin: 0, letterSpacing: -0.3 }}>{g.area}</h3>
            </div>
          </div>

          {/* item cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 16 }}>
            {g.items.map((item, i) => {
              const name = typeof item === 'string' ? item : item.name;
              const src = typeof item === 'string' ? null : item.src;
              return (
                <div key={i} style={{ background: '#fff', border: '1px solid var(--line)', overflow: 'hidden' }}>
                  {src
                    ? <div style={{ height: 140, overflow: 'hidden', background: 'var(--navy-900)' }}><img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>
                    : <PlaceholderImg label={`${name} 사진`} height={140} />}
                  <div style={{ padding: '12px 14px', borderTop: '2px solid var(--gold-2)' }}>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--navy-800)', letterSpacing: -0.2 }}>{name}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </PageWrapper>
  );
}

// ── Injection Production ───────────────────────────────────────────────────────
function InjectionPage({ t }) {
  const d = t.injection;
  const steps = d.processDetail || [];
  return (
    <PageWrapper title={d.title} subtitle={d.subtitle}>
      <p style={bizSt.intro}>{d.intro}</p>

      {/* ── Process Flow — editorial numbered grid ─────────────────────── */}
      <div style={{ marginBottom: 80 }}>
        <SectionTitle label="Process Layout" title="사출부 공정 LAYOUT" sub="원재료 입고부터 출하까지 8단계 표준 공정" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--line)', border: '1px solid var(--line)' }}>
          {steps.map((s, i) => {
            return (
              <div key={i} style={{ background: '#fff', padding: '18px 16px 18px', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                {/* large index */}
                <div style={{
                  fontSize: 30, fontWeight: 900, fontFamily: 'Barlow Condensed, sans-serif',
                  color: 'var(--gold-2)', lineHeight: 1, letterSpacing: -1, marginBottom: 10,
                }}>{String(i + 1).padStart(2, '0')}</div>

                {/* gold rule */}
                <div style={{ width: 24, height: 2, background: 'var(--gold-2)', marginBottom: 10 }} />

                {/* step title */}
                <div style={{
                  fontSize: 14, fontWeight: 800, color: 'var(--navy-800)',
                  marginBottom: 10, letterSpacing: -0.2, lineHeight: 1.35,
                  whiteSpace: 'pre-line',
                }}>{s.title.replace('\n', ' · ')}</div>

                {/* bullets */}
                {s.bullets.length > 0 && (
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                    {s.bullets.map((b, j) => (
                      <li key={j} style={{
                        fontSize: 12, color: '#3a4555', lineHeight: 1.55,
                        marginBottom: 3, paddingLeft: 10, position: 'relative',
                      }}>
                        <span style={{ position: 'absolute', left: 0, top: 8, width: 3, height: 3, background: 'var(--steel-2)' }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Specs ──────────────────────────────────────────────────────── */}
      <SectionTitle label="Capacity" title="사출 양산 Capacity" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 64 }}>
        {d.specs.map((spec, i) => {
          const hasKorean = /[\u3131-\uD79D]/.test(spec.value);
          const isMultiLine = spec.value.includes('\n');
          return (
            <div key={i} style={bizSt.specBox}>
              <div style={{
                ...bizSt.specVal,
                fontSize: isMultiLine ? 20 : 30,
                fontFamily: hasKorean ? "'Pretendard', sans-serif" : 'Barlow Condensed, sans-serif',
                fontWeight: hasKorean ? 700 : 600,
                letterSpacing: hasKorean ? -0.3 : 0.5,
              }}>{spec.value}</div>
              <div style={bizSt.specLabel}>{spec.label}</div>
            </div>
          );
        })}
      </div>

      {/* ── Capabilities — redesigned ──────────────────────────────────── */}
      <SectionTitle label="Capabilities" title="사출 역량" sub={d.capabilitiesIntro} />

      {/* Core Technologies */}
      <div style={{ marginBottom: 56 }}>
        <h4 style={{ fontSize: 18, fontWeight: 800, color: 'var(--navy-800)', margin: '0 0 18px', letterSpacing: -0.3 }}>Core Technologies</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--line)', border: '1px solid var(--line)', borderTop: '2px solid var(--navy-800)' }}>
          {d.coreTech.map((c, i) => (
            <div key={i} style={{ background: '#fff', padding: '22px 22px 24px' }}>
              <div style={{ fontSize: 11, letterSpacing: 3, color: 'var(--gold)', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, marginBottom: 8 }}>{String(i + 1).padStart(2, '0')}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--navy-800)', marginBottom: 8, letterSpacing: -0.2 }}>{c.title}</div>
              <div style={{ fontSize: 13.5, color: '#5a6577', lineHeight: 1.7 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Materials + Production — 2 columns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: 56, marginBottom: 80 }}>
        {/* 소재 대응 역량 */}
        <div>
          <h4 style={{ fontSize: 20, fontWeight: 800, color: 'var(--navy-800)', margin: '0 0 22px', letterSpacing: -0.3, paddingBottom: 12, borderBottom: '2px solid var(--navy-800)' }}>{d.materials.title}</h4>
          {d.materials.groups.map((g, i) => (
            <div key={i} style={{ marginBottom: 22 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy-800)', marginBottom: 8, letterSpacing: -0.2 }}>{g.name}</div>
              <div style={{ fontSize: 14, color: '#3a4555', lineHeight: 1.7 }}>{g.items.join(' · ')}</div>
            </div>
          ))}
        </div>

        {/* 생산 대응 역량 */}
        <div>
          <h4 style={{ fontSize: 20, fontWeight: 800, color: 'var(--navy-800)', margin: '0 0 22px', letterSpacing: -0.3, paddingBottom: 12, borderBottom: '2px solid var(--navy-800)' }}>{d.production.title}</h4>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {d.production.bullets.map((b, i) => (
              <li key={i} style={{ fontSize: 14.5, color: '#3a4555', lineHeight: 1.75, marginBottom: 12, paddingLeft: 18, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, top: 10, width: 6, height: 6, background: 'var(--gold-2)', transform: 'rotate(45deg)' }} />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageWrapper>
  );
}

// step card used by InjectionPage process flow
function ProcessStepCard({ step, idx, accent, reverse }) {
  const arrow = reverse ? '←' : '→';
  const isLast = idx === 8;
  const isFourth = idx === 4; // ends row 1 → drops down
  const showArrow = idx !== 8 && idx !== 4 && idx !== 5; // 5 starts new row, no arrow before
  // Actually we want arrows between cards on the same row only.
  // For row 1: arrows after 1,2,3 (→). For row 2 visual order [8,7,6,5]: arrows ← between them.
  // simpler: place arrow to the right of every card except last in its row.
  // Row 1: cards 1,2,3,4 → arrows after 1,2,3 (→). Card 4 drops down (↓).
  // Row 2: cards 8,7,6,5 (visual) → arrows ←  between them. Card 5 is the final-step neighbor of 4.

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
      {/* arrow chip on the right edge (or down for #4) */}
      {idx !== 8 && (
        <div style={{
          position: 'absolute',
          ...(idx === 4
            ? { right: 0, bottom: -28, transform: 'translateX(50%)' }   // drop arrow
            : { right: -16, top: 22, transform: 'translate(50%, 0)' }   // side arrow
          ),
          width: 28, height: 28, background: accent, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, fontWeight: 900, zIndex: 2,
        }}>{idx === 4 ? '↓' : arrow}</div>
      )}

      {/* header */}
      <div style={{
        background: accent, color: '#fff', textAlign: 'center',
        padding: '12px 10px', fontWeight: 800, fontSize: 15, letterSpacing: -0.2,
        lineHeight: 1.35, whiteSpace: 'pre-line', minHeight: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{
          background: 'rgba(0,0,0,0.18)', color: '#fff',
          fontSize: 10, padding: '2px 8px', marginRight: 8,
          fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, letterSpacing: 1,
        }}>{String(idx).padStart(2, '0')}</span>
        {step.title}
      </div>

      {/* body */}
      <div style={{
        border: '1px solid var(--line)', borderTop: 'none',
        background: '#fff', padding: '16px 18px',
        flex: 1, minHeight: 130,
      }}>
        {step.bullets.length === 0 ? (
          <div style={{ fontSize: 13.5, color: 'var(--steel)', textAlign: 'center', paddingTop: 8 }}>출하</div>
        ) : (
          <ol style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: '#3a4555', lineHeight: 1.7 }}>
            {step.bullets.map((b, i) => (
              <li key={i} style={{ marginBottom: 4 }}>{b}</li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

// ── Products ───────────────────────────────────────────────────────────────────
function ProductsPage({ t }) {
  const d = t.products;

  return (
    <PageWrapper title={d.title} subtitle={d.subtitle}>
      <p style={bizSt.intro}>{d.intro}</p>
      <div style={{ border: '1px solid var(--line)', background: '#fff', padding: 16 }}>
        <img src="assets/products-overview.png" alt="아이앤테크 자동차 부품 적용 현황" style={{ width: '100%', height: 'auto', display: 'block' }} />
      </div>
    </PageWrapper>
  );
}

// ── Clients ────────────────────────────────────────────────────────────────────
function ClientsPage({ t }) {
  const d = t.clients;
  const isKo = t.lang === 'KOR';
  return (
    <PageWrapper title={d.title} subtitle={d.subtitle}>
      <p style={bizSt.intro}>{d.intro}</p>

      {/* Stats — 공급 이력 */}
      <SectionTitle label={d.statsSub} title={d.statsTitle} />
      <div style={clSt.statsGrid}>
        {d.stats.map((s, i) => (
          <div key={i} style={clSt.statCard}>
            <div style={clSt.statNum}>{s.num}</div>
            <div style={clSt.statLabel}>{s.label}</div>
            <div style={clSt.statSub}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Regions — 지역 대응 범위 */}
      <div style={{ marginTop: 96 }}>
        <SectionTitle label={d.regionsSub} title={d.regionsTitle} sub={d.regionsDesc} />
        <div style={clSt.mapsRow}>
          <div style={clSt.mapBlock}>
            <div style={clSt.mapHeading}>
              <span style={clSt.mapHeadKicker}>DOMESTIC</span>
              <span style={clSt.mapHeadTitle}>{isKo ? '국내 고객사 분포' : 'Domestic Reach'}</span>
            </div>
            <DomesticMap isKo={isKo} />
          </div>
          <div style={clSt.mapBlock}>
            <div style={clSt.mapHeading}>
              <span style={clSt.mapHeadKicker}>INTERNATIONAL</span>
              <span style={clSt.mapHeadTitle}>{isKo ? '해외 수출 국가' : 'Export Countries'}</span>
            </div>
            <InternationalMap isKo={isKo} />
          </div>
        </div>
        <div style={clSt.regionGrid}>
          {d.regions.map((r, i) => (
            <div key={i} style={{ ...clSt.regionCard, ...(r.primary ? clSt.regionCardPrimary : {}) }}>
              <div style={clSt.regionFlag}>{r.flag}</div>
              <div style={{ flex: 1 }}>
                <div style={clSt.regionTop}>
                  <span style={clSt.regionName}>{r.name}</span>
                  <span style={{ ...clSt.regionTag, ...(r.primary ? clSt.regionTagPrimary : {}) }}>{r.role}</span>
                </div>
                <div style={clSt.regionDesc}>{r.desc}</div>
                <div style={clSt.regionSince}>SINCE {r.since}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Industries — 대응 산업군 */}
      <div style={{ marginTop: 96 }}>
        <SectionTitle label={d.industriesSub} title={d.industriesTitle} />
        <div style={clSt.indGrid}>
          {d.industries.map((ind, i) => (
            <div key={i} style={clSt.indCard}>
              <div style={clSt.indCat}>{ind.cat}</div>
              <div style={clSt.indName}>{ind.name}</div>
              <div style={clSt.indDesc}>{ind.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Global Track — 글로벌 경험 */}
      <div style={{ marginTop: 96 }}>
        <SectionTitle label={d.globalSub} title={d.globalTitle} sub={d.globalDesc} />
        <div style={clSt.timeline}>
          {d.timeline.map((tl, i) => (
            <div key={i} style={clSt.tlRow}>
              <div style={clSt.tlDot} />
              <div style={clSt.tlYear}>{tl.year}</div>
              <div style={clSt.tlEvent} dangerouslySetInnerHTML={{ __html: tl.event }} />
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

// ── Domestic Map (South Korea with city markers) ─────────────────────────────
function DomesticMap({ isKo }) {
  const cities = [
    { name: isKo ? '화성' : 'Hwaseong' },
    { name: isKo ? '전북' : 'Jeonbuk' },
    { name: isKo ? '광주' : 'Gwangju', hq: true },
    { name: isKo ? '경남' : 'Gyeongnam' },
    { name: isKo ? '울산' : 'Ulsan' },
  ];
  // South Korea, no API key needed
  const src = 'https://maps.google.com/maps?ll=36.3,127.9&z=6&output=embed&hl=' + (isKo ? 'ko' : 'en');
  return (
    <div>
      <div style={{ position: 'relative', height: 320, border: '1px solid var(--line)', overflow: 'hidden', background: '#0d2045' }}>
        <iframe
          title="Domestic reach map"
          src={src}
          style={{ width: '100%', height: '100%', border: 0, display: 'block', filter: 'grayscale(0.15)' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div style={mapChipRow}>
        {cities.map((c, i) => (
          <span key={i} style={{ ...mapChip, ...(c.hq ? mapChipHq : {}) }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.hq ? '#fff' : 'var(--gold-2)', display: 'inline-block' }} />
            {c.name}{c.hq ? ` · ${isKo ? '본사' : 'HQ'}` : ''}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── International Map (Google embed — Asia export reach) ─────────────────────
function InternationalMap({ isKo }) {
  const countries = [
    { name: isKo ? '대한민국 · 본사' : 'Korea · HQ', hq: true },
    { name: isKo ? '일본 · 2013~' : 'Japan · 2013~' },
    { name: isKo ? '중국 · 2014~' : 'China · 2014~' },
    { name: isKo ? '인도 · 2020~' : 'India · 2020~' },
  ];
  // Centered to show Korea / Japan / China / India, no API key needed
  const src = 'https://maps.google.com/maps?ll=27,108&z=3&output=embed&hl=' + (isKo ? 'ko' : 'en');
  return (
    <div>
      <div style={{ position: 'relative', height: 320, border: '1px solid var(--line)', overflow: 'hidden', background: '#0d2045' }}>
        <iframe
          title="International reach map"
          src={src}
          style={{ width: '100%', height: '100%', border: 0, display: 'block', filter: 'grayscale(0.15)' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div style={mapChipRow}>
        {countries.map((c, i) => (
          <span key={i} style={{ ...mapChip, ...(c.hq ? mapChipHq : {}) }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.hq ? '#fff' : 'var(--gold-2)', display: 'inline-block' }} />
            {c.name}
          </span>
        ))}
      </div>
    </div>
  );
}

const mapChipRow = { display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 };
const mapChip = { display: 'inline-flex', alignItems: 'center', gap: 7, padding: '7px 13px', fontSize: 12.5, fontWeight: 600, color: 'var(--navy-800)', background: 'var(--navy-50)', border: '1px solid var(--line)', letterSpacing: -0.2 };
const mapChipHq = { background: 'var(--navy-800)', color: '#fff', border: '1px solid var(--navy-800)', fontWeight: 700 };

const clSt = {
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 1, background: '#e0e4eb', border: '1px solid #e0e4eb' },
  statCard: { background: '#fff', padding: '32px 28px', textAlign: 'left' },
  statNum: { fontSize: 'clamp(40px, 4vw, 56px)', fontWeight: 800, color: 'var(--gold-2)', fontFamily: 'Barlow Condensed, sans-serif', lineHeight: 1, letterSpacing: -1, marginBottom: 14 },
  statLabel: { fontSize: 15, fontWeight: 800, color: '#0d2045', marginBottom: 4 },
  statSub: { fontSize: 11, letterSpacing: 2, color: '#8a9ab8', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600 },

  mapsRow: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 28 },
  mapBlock: { background: '#0d2045', border: '1px solid rgba(212,146,10,0.18)', overflow: 'hidden' },
  mapHeading: { display: 'flex', alignItems: 'baseline', gap: 12, padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)' },
  mapHeadKicker: { fontSize: 11, letterSpacing: 3, color: 'var(--gold-2)', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700 },
  mapHeadTitle: { fontSize: 14, color: '#fff', fontWeight: 700 },
  mapWrap: { background: '#0d2045', padding: 28, marginBottom: 28, border: '1px solid rgba(212,146,10,0.18)' },
  regionGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 },
  regionCard: { display: 'flex', gap: 18, padding: '24px 22px', background: '#f4f6fa', border: '1px solid #e0e4eb', alignItems: 'flex-start' },
  regionCardPrimary: { background: '#fff', borderTop: '3px solid var(--gold-2)' },
  regionFlag: { fontSize: 32, lineHeight: 1, flexShrink: 0 },
  regionTop: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' },
  regionName: { fontSize: 17, fontWeight: 800, color: '#0d2045', letterSpacing: -0.3 },
  regionTag: { fontSize: 10, letterSpacing: 1.5, padding: '3px 8px', background: 'rgba(122,138,170,0.18)', color: '#5a6a8c', fontWeight: 700, fontFamily: 'Barlow Condensed, sans-serif' },
  regionTagPrimary: { background: 'var(--gold-2)', color: '#0d2045' },
  regionDesc: { fontSize: 13.5, color: '#555', lineHeight: 1.6, marginBottom: 10 },
  regionSince: { fontSize: 10, letterSpacing: 2, color: '#8a9ab8', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700 },

  indGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 },
  indCard: { background: '#fff', border: '1px solid #e8edf5', padding: '28px 24px', borderTop: '2px solid var(--gold-2)' },
  indCat: { fontSize: 10, letterSpacing: 3, color: 'var(--gold-2)', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, marginBottom: 10 },
  indName: { fontSize: 18, fontWeight: 800, color: '#0d2045', marginBottom: 8, letterSpacing: -0.3 },
  indDesc: { fontSize: 13.5, color: '#555', lineHeight: 1.7 },

  timeline: { display: 'flex', flexDirection: 'column', borderLeft: '2px solid var(--gold-2)', paddingLeft: 0, marginLeft: 8, position: 'relative' },
  tlRow: { display: 'flex', alignItems: 'center', gap: 22, padding: '16px 0 16px 32px', position: 'relative' },
  tlDot: { width: 12, height: 12, background: 'var(--gold-2)', borderRadius: '50%', position: 'absolute', left: -7, top: '50%', marginTop: -6, boxShadow: '0 0 0 4px #fff' },
  tlYear: { fontSize: 22, fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, color: 'var(--gold-2)', letterSpacing: 2, width: 70, flexShrink: 0 },
  tlEvent: { fontSize: 15, color: '#333', lineHeight: 1.6, flex: 1 },
};

const bizSt = {
  intro: { fontSize: 16, color: '#555', lineHeight: 1.9, marginBottom: 52, whiteSpace: 'pre-line' },
  processFlow: { display: 'flex', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'flex-start', gap: 2, background: '#f4f6fa', padding: '36px 24px', borderTop: '2px solid var(--gold-2)', overflowX: 'auto' },
  processFlowStep: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '8px 4px', minWidth: 'max-content', flex: '0 0 auto' },
  processFlowIdx: { fontSize: 13, color: 'var(--gold-2)', letterSpacing: 3, fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, marginBottom: 10 },
  processFlowLabel: { fontSize: 14, fontWeight: 800, color: '#0d2045', letterSpacing: -0.3, lineHeight: 1.4, whiteSpace: 'nowrap' },
  processFlowArrow: { color: 'var(--gold-2)', fontSize: 20, fontWeight: 300, padding: '0 8px', alignSelf: 'center', marginTop: 18, flex: '0 0 auto' },
  cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24 },
  card: { background: '#fff', border: '1px solid #e8edf5', overflow: 'hidden' },
  cardBody: { padding: '20px 22px' },
  cardTitle: { fontSize: 17, fontWeight: 800, color: '#0d2045', marginBottom: 8 },
  cardDesc: { fontSize: 14, color: '#666', lineHeight: 1.7 },
  specBox: { background: '#0d2045', color: '#fff', padding: '32px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 160 },
  specVal: { fontSize: 30, fontWeight: 600, color: '#e8b94b', fontFamily: 'Barlow Condensed, sans-serif', letterSpacing: 0.5, lineHeight: 1.3, whiteSpace: 'pre-line', marginBottom: 10 },
  specLabel: { fontSize: 13, color: '#aac4e8', marginTop: 0 },
  logoBox: { border: '1px solid #e8edf5', borderRadius: 2, overflow: 'hidden' },
};

// ── Injection Facility Page (custom, deep-blue industrial layout) ──────────
function InjectionFacilityPage({ t }) {
  const d = t.injFacility;

  // Reusable plant section: left photo(s), right NO/TYPE/SIZE table
  const PlantSection = ({ plant, idx, accent, photos, machineType }) => {
    // expand qty into individual rows (1×3000T, 1×2500T, 2×550T → 2 rows of 550T, etc.)
    // each row carries its full spec set; missing specs fall back to "—"
    const rows = plant.machines.flatMap(m =>
      Array.from({ length: m.qty }, () => ({
        ton: m.ton,
        tieBar: m.tieBar || '—',
        moldSize: m.moldSize || '—',
        shotWeight: m.shotWeight || '—',
      }))
    );
    const cols = [
      { key: 'no',         head: 'NO',              sub: '',              width: '8%' },
      { key: 'ton',        head: 'CLAMPING FORCE',  sub: '형체력',         width: '20%' },
      { key: 'tieBar',     head: 'TIE BAR',         sub: '타이바 간격',     width: '24%' },
      { key: 'moldSize',   head: 'MAX MOLD SIZE',   sub: '최대 금형 크기',   width: '26%' },
      { key: 'shotWeight', head: 'SHOT WEIGHT',     sub: '최대 사출량',     width: '22%' },
    ];

    return (
      <div style={{ marginBottom: 64 }}>
        {/* Header bar */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 20, paddingBottom: 14, borderBottom: '2px solid var(--navy-800)' }}>
          <div style={{ fontSize: 42, fontWeight: 900, fontFamily: 'Barlow Condensed, sans-serif', color: accent, lineHeight: 1, letterSpacing: -1 }}>0{idx}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, letterSpacing: 4, color: 'var(--gold)', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, marginBottom: 4 }}>{plant.tag}</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: 'var(--navy-800)', margin: 0, letterSpacing: -0.3 }}>{plant.title}</h3>
          </div>
        </div>

        {/* Description */}
        <p style={{ fontSize: 14.5, color: '#3a4555', lineHeight: 1.85, margin: '0 0 24px', maxWidth: 900, whiteSpace: 'pre-line' }}>{plant.desc}</p>

        {/* Photo (left) + Table (right) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.8fr) minmax(0, 1.25fr)', gap: 24, alignItems: 'stretch' }}>
          {/* Photo(s) — stacked if multiple */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {photos.map((p, i) => (
              <div key={i} style={{ position: 'relative', overflow: 'hidden', background: 'var(--navy-900)', flex: 1, minHeight: 0 }}>
                <img
                  src={p.src}
                  alt={p.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            ))}
          </div>

          {/* Table */}
          <div style={{ background: 'var(--paper)', padding: '0', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column' }}>
            <table style={{ width: '100%', height: '100%', borderCollapse: 'collapse', fontSize: 13.5, tableLayout: 'fixed' }}>
              <colgroup>
                {cols.map((c, i) => <col key={i} style={{ width: c.width }} />)}
              </colgroup>
              <thead>
                <tr style={{ background: 'var(--navy-50)' }}>
                  {cols.map((c, i) => (
                    <th key={i} style={{ padding: '12px 12px 10px', textAlign: 'center', borderBottom: '2px solid var(--navy-800)' }}>
                      <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 1.5, color: 'var(--gold)', fontFamily: 'Barlow Condensed, sans-serif' }}>{c.head}</div>
                      {c.sub && <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: -0.2, color: 'var(--navy-800)', marginTop: 2 }}>{c.sub}</div>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => {
                  const isLast = i === rows.length - 1;
                  const base = {
                    padding: '11px 12px',
                    textAlign: 'center',
                    color: 'var(--navy-800)',
                    fontSize: 13.5,
                    fontWeight: 400,
                    borderBottom: isLast ? 'none' : '1px dashed var(--line)',
                  };
                  return (
                    <tr key={i}>
                      <td style={{ ...base, color: 'var(--steel)', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600 }}>{i + 1}</td>
                      <td style={{ ...base, fontWeight: 700 }}>{r.ton.toLocaleString()}T</td>
                      <td style={base}>{r.tieBar}</td>
                      <td style={base}>{r.moldSize}</td>
                      <td style={base}>{r.shotWeight}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <PageWrapper title={d.title} subtitle={d.subtitle} kicker={d.kicker}>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div style={{ background: 'var(--navy-900)', color: '#fff', padding: '72px 64px 72px', position: 'relative', overflow: 'hidden', marginBottom: 72 }}>
        {/* huge background ton number */}
        <div style={{ position: 'absolute', right: -40, bottom: -90, fontSize: 320, fontWeight: 900, color: 'rgba(212,146,10,0.05)', fontFamily: 'Barlow Condensed, sans-serif', letterSpacing: -10, lineHeight: 0.8, pointerEvents: 'none' }}>3000T</div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 900 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontSize: 11, letterSpacing: 5, color: 'var(--gold-2)', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, marginBottom: 18 }}>
            <span style={{ width: 30, height: 1, background: 'var(--gold-2)' }} />
            {d.hero.eyebrow}
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 3.4vw, 42px)', fontWeight: 800, color: '#fff', margin: '0 0 22px', letterSpacing: -0.6, lineHeight: 1.3, whiteSpace: 'pre-line' }}>{d.hero.headline}</h2>
          <div style={{ width: 56, height: 3, background: 'var(--gold-2)', marginBottom: 26 }} />
          <p style={{ fontSize: 16, color: 'rgba(170,196,232,0.92)', lineHeight: 1.95, margin: 0, maxWidth: 820 }}>{d.hero.desc}</p>
        </div>
      </div>

      {/* ── PLANT B · LARGE SIZE ─────────────────────────────────────────── */}
      <PlantSection
        plant={d.plantB}
        idx={1}
        accent="var(--gold-2)"
        photos={[
          { src: 'assets/plant-b-large.jpg', alt: '사출 B동 · 대형 사출 라인 (오토피딩 연결)' },
        ]}
        machineType="사출성형기"
      />

      {/* ── PLANT A · MID & SMALL ────────────────────────────────────────── */}
      <PlantSection
        plant={d.plantA}
        idx={2}
        accent="var(--navy-700)"
        photos={[
          { src: 'assets/plant-a-small.png', alt: '사출 A동 · 중소형 다품종 라인 내부' },
          { src: 'assets/plant-a-exterior.png', alt: '사출 A동 외관 (드론 촬영)' },
        ]}
        machineType="사출성형기"
      />
    </PageWrapper>
  );
}

// ── Facility Pages ─────────────────────────────────────────────────────────────
function FacilityPage({ t, dataKey }) {
  const d = t[dataKey];

  return (
    <PageWrapper title={d.title} subtitle={d.subtitle}>
      <p style={bizSt.intro}>{d.intro}</p>

      {(d.groups || []).map((g, gi) => {
        const totalQty = g.rows.reduce((s, r) => s + (typeof r.qty === 'number' ? r.qty : 0), 0);
        return (
          <div key={gi} style={{ marginBottom: 48 }}>
            {/* group header */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid var(--navy-800)' }}>
              <div style={{ fontSize: 26, fontWeight: 900, fontFamily: 'Barlow Condensed, sans-serif', color: 'var(--gold-2)', lineHeight: 1, letterSpacing: -1 }}>{String(gi + 1).padStart(2, '0')}</div>
              <h3 style={{ flex: 1, fontSize: 18, fontWeight: 800, color: 'var(--navy-800)', margin: 0, letterSpacing: 0.5, fontFamily: 'Barlow Condensed, sans-serif' }}>{g.en}</h3>
              {totalQty > 0 && (
                <div style={{ fontSize: 12, color: 'var(--steel)', fontFamily: 'Barlow Condensed, sans-serif', letterSpacing: 1, fontWeight: 600 }}>TOTAL {totalQty} UNITS</div>
              )}
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={facSt.table}>
                <colgroup>
                  <col style={{ width: g.showLoad ? '8%' : '10%' }} />
                  <col style={{ width: g.showLoad ? '38%' : '50%' }} />
                  <col style={{ width: g.showLoad ? '24%' : '28%' }} />
                  {g.showLoad && <col style={{ width: '20%' }} />}
                  <col style={{ width: g.showLoad ? '10%' : '12%' }} />
                </colgroup>
                <thead>
                  <tr>
                    {['No', 'MODEL', (g.specHead || "SPEC'"), ...(g.showLoad ? ['LOAD WEIGHT'] : []), "Q'ty"].map((h, i) => (
                      <th key={i} style={facSt.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {g.rows.map((r, ri) => (
                    <tr key={ri} style={{ background: ri % 2 === 0 ? '#fff' : '#fbfaf7' }}>
                      <td style={{ ...facSt.td, textAlign: 'center', color: 'var(--steel)', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600 }}>{ri + 1}</td>
                      <td style={{ ...facSt.td, fontWeight: 600, color: 'var(--navy-800)' }}>{r.model}</td>
                      <td style={{ ...facSt.td, textAlign: 'center' }}>{r.spec}</td>
                      {g.showLoad && <td style={{ ...facSt.td, textAlign: 'center' }}>{r.load || '—'}</td>}
                      <td style={{ ...facSt.td, textAlign: 'center', color: 'var(--gold)', fontWeight: 700 }}>{r.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </PageWrapper>
  );
}

const facSt = {
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 14, border: '1px solid var(--line)' },
  th: { padding: '13px 18px', textAlign: 'center', fontSize: 13, fontWeight: 700, letterSpacing: 1, whiteSpace: 'nowrap', background: 'var(--navy-900)', color: '#fff' },
  td: { padding: '12px 18px', borderBottom: '1px solid #e8edf5', borderLeft: '1px solid #eef1f6', color: '#333', verticalAlign: 'middle' },
};

// ── Factory Gallery Page ───────────────────────────────────────────────────────
function FactoryPage({ t }) {
  const d = t.factory;
  const [activeArea, setActiveArea] = useState(0);
  return (
    <PageWrapper title={d.title} subtitle={d.subtitle}>
      <p style={bizSt.intro}>{d.intro}</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
        {d.areas.map((area, i) => (
          <button key={i} onClick={() => setActiveArea(i)} style={{
            padding: '10px 22px', border: '2px solid', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
            borderColor: activeArea === i ? '#d4920a' : '#d0d8e8',
            background: activeArea === i ? '#d4920a' : '#fff',
            color: activeArea === i ? '#fff' : '#666',
          }}>{area}</button>
        ))}
      </div>

      {(() => {
        const areaName = d.areas[activeArea];
        const videos = (d.videos && areaName === 'VIDEO') ? d.videos : null;
        const photos = (d.galleries && d.galleries[areaName]) || null;

        // VIDEO tab — YouTube thumbnail cards
        if (areaName === 'VIDEO') {
          if (!videos || videos.length === 0) {
            return (
              <div style={{ padding: '80px 24px', textAlign: 'center', background: 'var(--navy-50)', border: '1px solid var(--line)' }}>
                <div style={{ fontSize: 11, letterSpacing: 3, color: 'var(--gold)', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, marginBottom: 10 }}>COMING SOON</div>
                <div style={{ fontSize: 15, color: 'var(--steel)' }}>영상 콘텐츠가 곧 업로드됩니다.</div>
              </div>
            );
          }
          return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 22 }}>
              {videos.map((v, i) => {
                // accept full URL or bare YouTube ID
                const id = (v.youtube || '').replace(/^.*(?:youtu\.be\/|v=|embed\/)/, '').split(/[?&]/)[0];
                const thumb = v.thumb || (id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null);
                const href = id ? `https://www.youtube.com/watch?v=${id}` : '#';
                return (
                  <a key={i} href={href} target="_blank" rel="noopener" style={{ textDecoration: 'none', display: 'block' }}>
                    <div style={{ position: 'relative', aspectRatio: '16 / 9', overflow: 'hidden', background: 'var(--navy-900)', border: '1px solid var(--line)' }}>
                      {thumb
                        ? <img src={thumb} alt={v.title || '영상'} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>썸네일 준비중</div>}
                      {/* dark overlay + play button */}
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(7,20,46,0.18)' }} />
                      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 64, height: 64, borderRadius: '50%', background: 'rgba(212,146,10,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 20px rgba(0,0,0,0.3)' }}>
                        <div style={{ width: 0, height: 0, borderLeft: '20px solid #fff', borderTop: '12px solid transparent', borderBottom: '12px solid transparent', marginLeft: 5 }} />
                      </div>
                    </div>
                    {v.title && (
                      <div style={{ padding: '14px 4px 0', fontSize: 15, fontWeight: 700, color: 'var(--navy-800)', letterSpacing: -0.2 }}>{v.title}</div>
                    )}
                  </a>
                );
              })}
            </div>
          );
        }

        if (photos) {
          return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 18 }}>
              {photos.map((p, i) => (
                <div key={i} style={{ aspectRatio: '16 / 10', overflow: 'hidden', background: 'var(--navy-900)', border: '1px solid var(--line)' }}>
                  <img src={p.src} alt={p.cap} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              ))}
            </div>
          );
        }
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {[1,2,3,4,5,6].map(n => (
              <PlaceholderImg key={n} label={`${areaName} 사진 ${n}`} height={220} style={{ borderRadius: 2 }} />
            ))}
          </div>
        );
      })()}
    </PageWrapper>
  );
}

// ── ESG Page (경영방침만) ────────────────────────────────────────────────────────
function EsgPage({ t }) {
  const d = t.esg;
  const [active, setActive] = useState(0);
  return (
    <PageWrapper title={d.title} subtitle={d.subtitle}>
      <p style={bizSt.intro}>{d.intro}</p>

      {/* Pillar Tabs */}
      <SectionTitle label="ESG Policy" title="ESG 경영방침" />
      <div style={{ display: 'flex', gap: 0, marginBottom: 40, borderBottom: '2px solid #e0e4eb' }}>
        {d.pillars.map((p, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            flex: 1, padding: '18px 12px', border: 'none', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
            background: active === i ? p.color : '#f4f6fa',
            color: active === i ? '#fff' : '#666',
            borderBottom: active === i ? `3px solid ${p.color}` : '3px solid transparent',
          }}>
            <span style={{ fontSize: 22, fontWeight: 900 }}>{p.key}</span>
            <br />
            <span style={{ fontSize: 12 }}>{p.label.split(' ')[0]}</span>
          </button>
        ))}
      </div>
      {d.pillars.map((p, i) => i === active && (
        <div key={i} style={{ display: 'flex', gap: 48, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: '0 0 200px', background: p.color, color: '#fff', padding: '40px 32px', textAlign: 'center', borderRadius: 2 }}>
            <div style={{ fontSize: 64, fontWeight: 900, fontFamily: 'Barlow Condensed, sans-serif', lineHeight: 1 }}>{p.key}</div>
            <div style={{ fontSize: 14, marginTop: 12, opacity: 0.9 }}>{p.label}</div>
          </div>
          <div style={{ flex: 1, minWidth: 280 }}>
            {p.items.map((item, j) => (
              <div key={j} style={{ display: 'flex', gap: 16, marginBottom: 20, padding: '20px 24px', background: '#f8f9fc', borderLeft: `4px solid ${p.color}` }}>
                <div style={{ color: p.color, fontWeight: 900, fontSize: 18 }}>✓</div>
                <div style={{ fontSize: 15, color: '#333', lineHeight: 1.7 }}>{item}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </PageWrapper>
  );
}

// ── Certifications Page (인증현황) ─────────────────────────────────────────────
function CertPage({ t }) {
  const d = t.esg;

  return (
    <PageWrapper title={d.certTitle} subtitle="Certifications">
      <p style={{ ...bizSt.intro }}>{d.certDesc}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
        {d.certs.map((cert, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid var(--line)', borderTop: `3px solid ${cert.color}`, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* cert preview — display only, no zoom */}
            <div style={{ background: '#eef1f6', height: 360, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              {cert.type === 'img' && (
                <img src={cert.file} alt={cert.name} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', background: '#fff' }} />
              )}
              {cert.type === 'pending' && (
                <div style={{ textAlign: 'center', color: 'var(--steel)' }}>
                  <div style={{ fontSize: 11, letterSpacing: 3, color: 'var(--gold)', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, marginBottom: 8 }}>COMING SOON</div>
                  <div style={{ fontSize: 13 }}>인증서 준비중</div>
                </div>
              )}
            </div>
            {/* caption */}
            <div style={{ padding: '18px 20px' }}>
              <div style={{ display: 'inline-block', background: cert.color, color: '#fff', fontSize: 12, fontWeight: 800, padding: '4px 12px', letterSpacing: 1, marginBottom: 12, fontFamily: 'Barlow Condensed, sans-serif' }}>{cert.code}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--navy-800)', marginBottom: 6, lineHeight: 1.35, letterSpacing: -0.3 }}>{cert.name}</div>
              {cert.body && <div style={{ fontSize: 13, color: 'var(--steel)', marginBottom: 2 }}>{cert.body}</div>}
              {cert.period && <div style={{ fontSize: 12, color: 'var(--gold)', fontFamily: 'Barlow Condensed, sans-serif', letterSpacing: 0.5, fontWeight: 600 }}>{cert.period}</div>}
            </div>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}

// ── Quality Management System Page ───────────────────────────────────────────
function QualityPage({ t }) {
  const d = t.quality;
  return (
    <PageWrapper title={d.title} subtitle={d.subtitle}>
      <p style={bizSt.intro}>{d.intro}</p>

      {/* SQ Mark hero block — certs on the left, info on the right */}
      <div style={qmSt.sqHero}>
        <div style={qmSt.sqLeft}>
          <img src="assets/sq-cert-injection.png" alt="2025년 사출 부문 SQ 인증서" style={{ width: '100%', height: 'auto', display: 'block', background: '#fff', boxShadow: '0 6px 18px rgba(0,0,0,0.35)' }} />
          <img src="assets/sq-cert-mold.png" alt="2025년 사출금형 부문 SQ 인증서" style={{ width: '100%', height: 'auto', display: 'block', background: '#fff', boxShadow: '0 6px 18px rgba(0,0,0,0.35)' }} />
        </div>
        <div style={qmSt.sqRight}>
          <div style={qmSt.sqKicker}>
            <span style={{ width: 24, height: 1, background: 'var(--gold-2)' }} />
            HYUNDAI · KIA SQ CERTIFICATION
          </div>
          <h3 style={qmSt.sqTitle}>{d.sqTitle}</h3>
          <p style={qmSt.sqDesc}>{d.sqDesc}</p>
          <div style={qmSt.sqBadges}>
            <div style={qmSt.sqBadge}>사출 SQ</div>
            <div style={qmSt.sqBadge}>사출금형 SQ</div>
          </div>
        </div>
      </div>

      {/* 4 Pillars */}
      <SectionTitle label="Quality System" title="품질관리 4대 영역" sub="대응·생산·검사·고객 : 4개의 축으로 품질을 책임집니다." />
      <div style={qmSt.pillarGrid}>
        {d.pillars.map((p, i) => (
          <div key={i} style={qmSt.pillarCard}>
            <div style={qmSt.pillarHeader}>
              <span style={qmSt.pillarNum}>{p.num}</span>
              <div style={qmSt.pillarTitles}>
                <div style={qmSt.pillarTitle}>{p.title}</div>
                <div style={qmSt.pillarSub}>{p.sub}</div>
              </div>
            </div>
            <ul style={qmSt.pillarList}>
              {p.items.map((it, j) => (
                <li key={j} style={qmSt.pillarItem}>
                  <span style={qmSt.pillarTick} />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Flow */}
      <div style={{ marginTop: 96 }}>
        <SectionTitle label="Inspection Flow" title={d.flowTitle} sub={d.flowSub} />
        <div style={qmSt.flow}>
          {d.flow.map(([h, sub], i, arr) => (
            <React.Fragment key={i}>
              <div style={qmSt.flowStep}>
                <div style={qmSt.flowIdx}>{String(i + 1).padStart(2, '0')}</div>
                <div style={qmSt.flowH}>{h}</div>
                <div style={qmSt.flowSub}>{sub}</div>
              </div>
              {i < arr.length - 1 && <div style={qmSt.flowArrow}>→</div>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div style={{ marginTop: 96 }}>
        <SectionTitle label="On the Floor" title={d.galleryTitle} sub="현장의 품질 관리 활동을 사진으로 확인하세요." />
        <div style={qmSt.gallery}>
          {d.gallery.map((g, i) => (
            <div key={i} style={qmSt.galleryItem}>
              <PlaceholderImg label={g.label} height={220} />
              <div style={qmSt.galleryCap}>
                <div style={qmSt.galleryLabel}>{g.label}</div>
                <div style={qmSt.galleryDesc}>{g.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

const qmSt = {
  sqHero: { display: 'grid', gridTemplateColumns: 'minmax(220px, 0.85fr) minmax(320px, 1.3fr)', gap: 36, alignItems: 'center', marginBottom: 96, background: '#0d2045', color: '#fff', padding: 40 },
  sqLeft: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  sqRight: { padding: '4px 4px 4px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  sqKicker: { display: 'inline-flex', alignItems: 'center', gap: 12, fontSize: 11, letterSpacing: 4, color: 'var(--gold-2)', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, marginBottom: 18 },
  sqTitle: { fontSize: 'clamp(28px, 3vw, 38px)', fontWeight: 800, lineHeight: 1.2, margin: '0 0 20px', letterSpacing: -0.5 },
  sqDesc: { fontSize: 14.5, lineHeight: 1.8, color: 'rgba(220,232,250,0.85)', marginBottom: 28 },
  sqBadges: { display: 'flex', gap: 14, flexWrap: 'wrap' },
  sqBadge: { display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(212,146,10,0.15)', border: '1px solid rgba(212,146,10,0.4)', padding: '10px 18px', fontSize: 14, color: 'var(--gold-2)', fontWeight: 700 },

  pillarGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: '#e0e4eb', border: '1px solid #e0e4eb' },
  pillarCard: { background: '#fff', padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: 18 },
  pillarHeader: { display: 'flex', alignItems: 'flex-start', gap: 16, paddingBottom: 18, borderBottom: '1px solid #eef0f5' },
  pillarNum: { fontSize: 32, fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, color: 'var(--gold-2)', letterSpacing: 1, lineHeight: 1, flexShrink: 0 },
  pillarTitles: { flex: 1 },
  pillarTitle: { fontSize: 18, fontWeight: 800, color: '#0d2045', marginBottom: 4, letterSpacing: -0.3 },
  pillarSub: { fontSize: 11, letterSpacing: 2, color: '#8a9ab8', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600 },
  pillarList: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 },
  pillarItem: { display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#333', lineHeight: 1.6 },
  pillarTick: { width: 6, height: 6, background: 'var(--gold-2)', marginTop: 8, flexShrink: 0 },

  flow: { display: 'flex', alignItems: 'stretch', justifyContent: 'center', flexWrap: 'wrap' },
  flowStep: { flex: '1 1 140px', minWidth: 130, maxWidth: 200, padding: '28px 18px', background: '#f4f6fa', border: '1px solid #e0e4eb', textAlign: 'center' },
  flowIdx: { fontSize: 11, color: 'var(--gold-2)', letterSpacing: 3, fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, marginBottom: 12 },
  flowH: { fontSize: 17, fontWeight: 800, color: '#0d2045', marginBottom: 6, letterSpacing: -0.3 },
  flowSub: { fontSize: 12, color: '#7a8aaa' },
  flowArrow: { display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-2)', fontSize: 22, padding: '0 8px' },

  gallery: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 },
  galleryItem: { background: '#fff', border: '1px solid #e8edf5' },
  galleryCap: { padding: '16px 18px 20px' },
  galleryLabel: { fontSize: 15, fontWeight: 800, color: '#0d2045', marginBottom: 4 },
  galleryDesc: { fontSize: 13, color: '#7a8aaa', lineHeight: 1.5 },
};

// ── Contact Page ───────────────────────────────────────────────────────────────
function ContactPage({ t }) {
  const d = t.contact;
  const f = d.fields;
  const [form, setForm] = useState({ name:'', company:'', tel:'', email:'', subject:'', message:'', agree:false });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message || !form.agree) { setError(true); return; }
    setError(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({ name:'', company:'', tel:'', email:'', subject:'', message:'', agree:false });
  }

  const inp = (field, multiline) => {
    const base = { width: '100%', padding: '12px 14px', border: '1px solid #d0d8e8', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none', background: '#fafbfc', transition: 'border-color 0.2s' };
    if (multiline) return <textarea rows={5} style={{ ...base, resize: 'vertical' }} value={form[field]} onChange={e => setForm({...form, [field]: e.target.value})} />;
    return <input type={field === 'email' ? 'email' : 'text'} style={base} value={form[field]} onChange={e => setForm({...form, [field]: e.target.value})} />;
  };

  return (
    <PageWrapper title={d.title} subtitle={d.subtitle}>
      <p style={bizSt.intro}>{d.intro}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 48, flexWrap: 'wrap' }}>
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={cntSt.row}>
            <div style={cntSt.field}>
              <label style={cntSt.label}>{f.name} <span style={{ color: '#e03' }}>*</span></label>
              {inp('name')}
            </div>
            <div style={cntSt.field}>
              <label style={cntSt.label}>{f.company}</label>
              {inp('company')}
            </div>
          </div>
          <div style={cntSt.row}>
            <div style={cntSt.field}>
              <label style={cntSt.label}>{f.tel}</label>
              {inp('tel')}
            </div>
            <div style={cntSt.field}>
              <label style={cntSt.label}>{f.email} <span style={{ color: '#e03' }}>*</span></label>
              {inp('email')}
            </div>
          </div>
          <div style={{ ...cntSt.field, marginBottom: 16 }}>
            <label style={cntSt.label}>{f.subject}</label>
            {inp('subject')}
          </div>
          <div style={{ ...cntSt.field, marginBottom: 16 }}>
            <label style={cntSt.label}>{f.message} <span style={{ color: '#e03' }}>*</span></label>
            {inp('message', true)}
          </div>
          <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13, color: '#555', marginBottom: 20, cursor: 'pointer' }}>
            <input type="checkbox" checked={form.agree} onChange={e => setForm({...form, agree: e.target.checked})} style={{ marginTop: 2 }} />
            {f.agree} <span style={{ color: '#e03' }}>*</span>
          </label>
          {error && <div style={{ background: '#fff0f0', border: '1px solid #ffcccc', color: '#c00', padding: '12px 16px', fontSize: 13, marginBottom: 16 }}>{f.required}</div>}
          {submitted && <div style={{ background: '#f0fff4', border: '1px solid #b2dfdb', color: '#1a7a4a', padding: '12px 16px', fontSize: 13, marginBottom: 16 }}>{f.success}</div>}
          <button type="submit" style={{ background: '#0d2045', color: '#fff', border: 'none', padding: '16px 40px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: 1, width: '100%', transition: 'background 0.2s' }}>
            {f.submit}
          </button>
        </form>

        {/* Contact Info */}
        <div>
          {[
            ['주소', d.info.addr],
            ['전화', d.info.tel],
            ['팩스', d.info.fax],
            ['이메일', d.info.email],
            ['운영시간', d.info.hours],
          ].map(([label, val], i) => (
            <div key={i} style={{ padding: '20px 0', borderBottom: '1px solid #e8edf5' }}>
              <div style={{ fontSize: 11, letterSpacing: 2, color: '#d4920a', fontWeight: 700, marginBottom: 6 }}>{label.toUpperCase()}</div>
              <div style={{ fontSize: 14, color: '#333', lineHeight: 1.7 }}>{val}</div>
            </div>
          ))}
          <div style={{ marginTop: 28 }}>
            <PlaceholderImg label="약도 이미지" height={200} style={{ borderRadius: 2 }} />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

const cntSt = {
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 16 },
  field: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: 13, fontWeight: 600, color: '#444' },
};

Object.assign(window, { MoldPage, InjectionPage, ProductsPage, ClientsPage, FacilityPage, InjectionFacilityPage, FactoryPage, EsgPage, CertPage, QualityPage, ContactPage });
