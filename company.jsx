// ─── Company section: CEO / History / Org / Location ───────────────────────
const { useState: useStateC } = React;

// ── CEO / Philosophy ────────────────────────────────────────────────────────
function CeoPage({ t }) {
  const d = t.ceo;
  return (
    <PageWrapper title={d.title} subtitle="CEO Greeting" kicker="WHO WE ARE">
      {/* Greeting — text left, photo right (reference layout) */}
      <div>
        {/* Section kicker */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 11, letterSpacing: 5, color: 'var(--gold)', marginBottom: 14, fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700 }}>
            <span style={{ width: 22, height: 1, background: 'var(--gold)' }} />
            GREETINGS
            <span style={{ width: 22, height: 1, background: 'var(--gold)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h2 style={{ fontSize: 30, fontWeight: 800, color: 'var(--navy-800)', margin: 0, letterSpacing: -0.5, paddingBottom: 14, borderBottom: '2px solid var(--gold-2)' }}>인사말</h2>
          </div>
        </div>

        {/* 2-column body */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.15fr)', gap: 56, alignItems: 'center' }}>
          {/* Left: heading + paragraphs + signature */}
          <div>
            <h3 style={{ fontSize: 24, fontWeight: 800, color: 'var(--navy-800)', margin: '0 0 28px', letterSpacing: -0.5, lineHeight: 1.35 }}>{d.ceoTitle}</h3>
            {d.ceoMsg.split('\n').filter(Boolean).map((para, i) => (
              <p key={i} style={{ fontSize: 14.5, color: '#3a4555', lineHeight: 1.85, marginTop: 0, marginBottom: 14 }}>{para}</p>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 24, justifyContent: 'flex-end' }}>
              <span style={{ width: 32, height: 1, background: 'var(--gold-2)' }} />
              <span style={{ fontSize: 13.5, fontWeight: 800, color: 'var(--navy-800)', letterSpacing: 0.3 }}>{d.ceoName}</span>
            </div>
          </div>

          {/* Right: photo — natural aspect, vertically centered, no crop */}
          <div style={{ position: 'relative' }}>
            <img
              src="assets/factory-entrance.jpg"
              alt="아이앤테크 본사 정문 / 공장 전경"
              style={{ width: '100%', height: 'auto', display: 'block', boxShadow: '0 24px 60px rgba(7,20,46,0.18)' }}
            />
            {/* gold corner accent */}
            <div style={{ position: 'absolute', top: -12, right: -12, width: 60, height: 60, border: '2px solid var(--gold-2)', zIndex: -1 }} />
            {/* subtle background block behind to fill vertical space */}
            <div style={{ position: 'absolute', left: -16, bottom: -16, width: 'calc(100% + 32px)', height: 'calc(100% + 32px)', background: 'var(--navy-50)', zIndex: -2 }} />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

// ── Philosophy (separate tab, navy hero + gold rule, B layout) ─────────────
function PhilosophyPage({ t }) {
  const d = t.philosophy;
  return (
    <PageWrapper title={d.title} subtitle="Management Philosophy" kicker={d.kicker}>
      {/* Hero — full-bleed navy + gold rule */}
      <div style={{ background: 'var(--navy-900)', color: '#fff', padding: '90px 64px 80px', position: 'relative', overflow: 'hidden', marginBottom: 72 }}>
        <div style={{ position: 'absolute', right: -30, bottom: -60, fontSize: 280, fontWeight: 900, color: 'rgba(212,146,10,0.05)', fontFamily: 'Barlow Condensed, sans-serif', letterSpacing: -8, lineHeight: 0.8, pointerEvents: 'none' }}>VALUES</div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 820 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontSize: 11, letterSpacing: 5, color: 'var(--gold-2)', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, marginBottom: 20 }}>
            <span style={{ width: 30, height: 1, background: 'var(--gold-2)' }} />
            Vision &amp; Mission
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 3.6vw, 44px)', fontWeight: 800, color: '#fff', margin: '0 0 22px', letterSpacing: -0.6, lineHeight: 1.25 }}>{d.lead}</h2>
          <div style={{ width: 56, height: 3, background: 'var(--gold-2)', marginBottom: 26 }} />
          <p style={{ fontSize: 16, color: 'rgba(170,196,232,0.85)', lineHeight: 1.95, margin: 0 }}>{d.desc}</p>

          {/* pillars row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 1, marginTop: 56, background: 'rgba(255,255,255,0.08)' }}>
            {d.pillars.map(([k, v], i) => (
              <div key={i} style={{ background: 'var(--navy-900)', padding: '24px 22px' }}>
                <div style={{ fontSize: 10, letterSpacing: 3, color: 'var(--gold-2)', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, marginBottom: 8 }}>{k}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', fontFamily: 'Barlow Condensed, sans-serif', letterSpacing: 0.5 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3 missions — large cards, gold rule accents */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 1, background: 'var(--line)', border: '1px solid var(--line)' }}>
        {d.missions.map((m, i) => (
          <div key={i} style={{ background: '#fff', padding: '48px 36px 44px', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 28 }}>
              <span style={{ fontSize: 56, fontWeight: 900, fontFamily: 'Barlow Condensed, sans-serif', color: 'var(--gold-2)', lineHeight: 1, letterSpacing: -2 }}>0{i + 1}</span>
              <span style={{ flex: 1, height: 1, background: 'var(--gold-2)' }} />
            </div>
            <div style={{ fontSize: 11, letterSpacing: 3, color: 'var(--gold)', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, marginBottom: 8 }}>{m.en}</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: 'var(--navy-800)', margin: '0 0 16px', letterSpacing: -0.3 }}>{m.title}</h3>
            <p style={{ fontSize: 14.5, color: '#5a6577', lineHeight: 1.95, margin: 0 }}>{m.desc}</p>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}

// ── History ─────────────────────────────────────────────────────────────────
function HistoryPage({ t }) {
  const d = t.history;
  // strip "MM월 — " prefix (and trim "2014~2015 — " style ranges as-is)
  const stripMonth = (s) => s.replace(/^\s*\d{1,2}월\s*[—–-]\s*/, '');
  const items = d.items.map(it => ({ year: it.year, events: it.events.map(stripMonth) }));
  // split into 2 columns
  const mid = Math.ceil(items.length / 2);
  const cols = [items.slice(0, mid), items.slice(mid)];

  return (
    <PageWrapper title={d.title} subtitle="Company History" kicker="OUR JOURNEY">
      {/* Intro copy — full width */}
      <div style={{ marginBottom: 56, paddingBottom: 40, borderBottom: '1px solid var(--line)' }}>
        <p style={{ fontSize: 15.5, color: '#3a4555', lineHeight: 2, margin: '0 0 14px' }}>
          아이앤테크는 자동차 사출금형 및 사출 양산 분야에서 꾸준한 기술 개발과 생산 역량 강화를 이어오며 성장해온 기업입니다.
        </p>
        <p style={{ fontSize: 15.5, color: '#3a4555', lineHeight: 2, margin: '0 0 14px' }}>
          국제 품질 인증과 해외 수출, 기업부설연구소 운영을 통해 기술력과 품질 경쟁력을 인정받고 있으며, 최근에는 공장 증축과 소부장·뿌리기술 기업 인증을 통해 생산 기반과 미래 경쟁력을 더욱 강화하고 있습니다.
        </p>
        <p style={{ fontSize: 15.5, color: '#3a4555', lineHeight: 2, margin: 0 }}>
          앞으로도 변화하는 자동차 산업에 발맞춰 품질과 생산성을 고도화하며, 국내를 넘어 글로벌 시장에서 신뢰받는 제조 파트너로 성장해 나가겠습니다.
        </p>
      </div>

      {/* compact 2-column timeline */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, position: 'relative' }}>
        {/* center divider */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 1, background: 'var(--line)' }} />
        {cols.map((col, ci) => (
          <div key={ci} style={{ padding: ci === 0 ? '0 36px 0 0' : '0 0 0 36px' }}>
            {col.map((item, i) => (
              <div key={i} style={{ borderBottom: i === col.length - 1 ? 'none' : '1px solid var(--line)', padding: '16px 0' }}>
                {item.events.map((ev, j) => (
                  <div key={j} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', marginTop: j === 0 ? 0 : 12 }}>
                    <div style={{ flex: '0 0 72px', paddingTop: 1 }}>
                      {j === 0 && (
                        <div style={{ fontSize: 28, fontWeight: 900, fontFamily: 'Barlow Condensed, sans-serif', color: 'var(--navy-800)', lineHeight: 1.1, letterSpacing: -0.5 }}>{item.year}</div>
                      )}
                    </div>
                    <div style={{ flex: '0 0 10px', paddingTop: 6 }}>
                      <div style={{ width: 8, height: 8, background: 'var(--gold-2)', transform: 'rotate(45deg)' }} />
                    </div>
                    <div style={{ flex: 1, fontSize: 15, color: '#3a4555', lineHeight: 1.65 }}>
                      {ev}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}

// ── Org Chart ───────────────────────────────────────────────────────────────
function OrgPage({ t }) {
  const d = t.org;
  const c = d.chart;

  // Top-level branches under 전무이사 (left → right):
  //  1) 금형부 (with subs)
  //  2) 사출부 (with subs)
  //  3) 품질관리 (standalone)
  //  4) 지원조직 (with items)
  const branches = [
    { kind: 'dept', name: c.depts[0].name, tag: 'MOLD', subs: c.depts[0].subs },
    { kind: 'dept', name: c.depts[1].name, tag: 'INJECTION', subs: c.depts[1].subs },
    { kind: 'solo', name: c.qa, tag: 'QC', accent: 'gold' },
    { kind: 'support', name: c.support.label, tag: c.support.en, subs: c.support.items },
  ];

  // Shared box styles
  const exec = { background: 'var(--navy-900)', color: '#fff', padding: '20px 56px 18px', borderTop: '3px solid var(--gold-2)', minWidth: 260, textAlign: 'center', position: 'relative' };
  const deptBox = { background: 'var(--navy-800)', color: '#fff', padding: '14px 22px', fontSize: 15, fontWeight: 700, textAlign: 'center', letterSpacing: 0.8, position: 'relative' };
  const soloBox = { background: '#fff', color: 'var(--navy-800)', padding: '14px 22px', fontSize: 15, fontWeight: 700, textAlign: 'center', letterSpacing: 0.8, border: '1.5px solid var(--navy-800)', borderTop: '3px solid var(--gold-2)', position: 'relative' };
  const supportBox = { background: 'var(--paper)', color: 'var(--navy-800)', padding: '14px 22px', fontSize: 15, fontWeight: 700, textAlign: 'center', letterSpacing: 0.8, border: '1.5px solid var(--gold-2)', position: 'relative' };
  const subBox = { background: '#fff', color: 'var(--navy-800)', padding: '11px 14px', fontSize: 13.5, fontWeight: 600, border: '1px solid var(--line)', borderLeft: '3px solid var(--gold-2)', textAlign: 'left' };

  const Tag = ({ children }) => (
    <div style={{ fontSize: 10, letterSpacing: 3, color: 'var(--gold-2)', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, marginBottom: 6, lineHeight: 1 }}>{children}</div>
  );

  return (
    <PageWrapper title={d.title} subtitle="Organization" kicker="STRUCTURE">
      <div style={{ overflowX: 'auto', paddingBottom: 8 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 'max-content', padding: '20px 20px 0' }}>
          {/* 대표이사 */}
          <div style={exec}>
            <div style={{ fontSize: 11, letterSpacing: 4, color: 'var(--gold-2)', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, marginBottom: 8, lineHeight: 1, whiteSpace: 'nowrap' }}>CHIEF EXECUTIVE</div>
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: 2, lineHeight: 1.1 }}>{c.ceo}</div>
          </div>

          {/* line down */}
          <div style={{ width: 1, height: 40, background: 'var(--steel-2)' }} />

          {/* 전무이사 */}
          <div style={{ ...exec, background: 'var(--navy-800)', padding: '18px 52px 16px' }}>
            <div style={{ fontSize: 10, letterSpacing: 4, color: 'var(--gold-2)', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, marginBottom: 6, lineHeight: 1, whiteSpace: 'nowrap' }}>EXECUTIVE DIRECTOR</div>
            <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: 2, lineHeight: 1.1 }}>{c.exec}</div>
          </div>

          {/* line down to horizontal rail */}
          <div style={{ width: 1, height: 40, background: 'var(--steel-2)' }} />

          {/* horizontal rail across all branches */}
          <div style={{ position: 'relative', width: '100%' }}>
            <div style={{ position: 'absolute', top: 0, left: `${100 / branches.length / 2}%`, right: `${100 / branches.length / 2}%`, height: 1, background: 'var(--steel-2)' }} />
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${branches.length}, minmax(200px, 1fr))`, gap: 28, alignItems: 'start' }}>
              {branches.map((b, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                  {/* drop line into the head box */}
                  <div style={{ width: 1, height: 28, background: 'var(--steel-2)', alignSelf: 'center' }} />

                  {/* head box */}
                  <div>
                    <Tag>{b.tag}</Tag>
                    <div style={
                      b.kind === 'dept' ? deptBox :
                      b.kind === 'solo' ? soloBox : supportBox
                    }>{b.name}</div>
                  </div>

                  {/* subs */}
                  {b.subs && b.subs.length > 0 && (
                    <React.Fragment>
                      <div style={{ width: 1, height: 22, background: 'var(--steel-2)', alignSelf: 'center' }} />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {b.subs.map((sub, j) => (
                          <div key={j} style={subBox}>
                            <span style={{ fontSize: 10, color: 'var(--gold)', fontFamily: 'Barlow Condensed, sans-serif', letterSpacing: 2, marginRight: 8 }}>0{j+1}</span>
                            {sub}
                          </div>
                        ))}
                      </div>
                    </React.Fragment>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* About — copy / philosophy block */}
      <div style={{ marginTop: 64, padding: '36px 40px', background: 'var(--navy-50)', borderLeft: '3px solid var(--gold-2)' }}>
        <div style={{ fontSize: 11, letterSpacing: 4, color: 'var(--gold)', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, marginBottom: 10 }}>ABOUT OUR ORGANIZATION</div>
        <p style={{ fontSize: 15, color: '#3a4555', lineHeight: 1.85, margin: 0, maxWidth: 760 }}>
          아이앤테크는 금형 · 사출 두 개 본부를 중심으로, 수주에서 양산까지의 빠른 대응과 우수한 품질을 위해 노력하고 있습니다.
        </p>
      </div>
    </PageWrapper>
  );
}

// ── Location ────────────────────────────────────────────────────────────────
function LocationPage({ t }) {
  const d = t.location;
  return (
    <PageWrapper title={d.title} subtitle="Location" kicker="VISIT US">
      {/* Map — Google Maps embed */}
      <div style={{ marginBottom: 56, position: 'relative' }}>
        <iframe
          title="아이앤테크 위치"
          src="https://maps.google.com/maps?q=%EA%B4%91%EC%A3%BC%EA%B4%91%EC%97%AD%EC%8B%9C%20%EB%B6%81%EA%B5%AC%20%EC%B2%A8%EB%8B%A8%EC%97%B0%EC%8B%A0%EB%A1%9C%20398%EB%B2%88%EA%B8%B8%2023&z=16&hl=ko&output=embed"
          style={{ width: '100%', height: 460, border: 0, display: 'block' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div style={{ position: 'absolute', top: 24, left: 24, background: 'rgba(7,20,46,0.96)', color: '#fff', padding: '22px 24px 20px', maxWidth: 320, borderTop: '3px solid var(--gold-2)', pointerEvents: 'none' }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: 'var(--gold-2)', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, marginBottom: 10, lineHeight: 1, whiteSpace: 'nowrap' }}>I&amp;TECH HEADQUARTERS</div>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>아이앤테크 본사 · 공장</div>
          <div style={{ fontSize: 13, color: 'rgba(170,196,232,0.85)', lineHeight: 1.7 }}>{d.addr}</div>
        </div>
      </div>

      {/* Info grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 1, background: 'var(--line)', border: '1px solid var(--line)', marginBottom: 48 }}>
        {[
          ['ADDRESS', '주소', d.addr],
          ['CONTACT', '연락처', `TEL ${d.tel}\nFAX ${d.fax}\n${d.email}`],
        ].map(([eng, ko, val], i) => (
          <div key={i} style={{ background: '#fff', padding: '32px 28px' }}>
            <div style={{ fontSize: 11, letterSpacing: 4, color: 'var(--gold)', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, marginBottom: 6 }}>{eng}</div>
            <div style={{ fontSize: 13, color: '#8a9ab8', marginBottom: 16, letterSpacing: 1 }}>{ko}</div>
            <div style={{ fontSize: 15, color: 'var(--navy-800)', lineHeight: 1.85, fontWeight: 500, whiteSpace: 'pre-line' }}>{val}</div>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}

Object.assign(window, { CeoPage, PhilosophyPage, HistoryPage, OrgPage, LocationPage });
