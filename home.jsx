// ─── Home Page ─────────────────────────────────────────────────────────────
const { useState: useStateH, useEffect: useEffectH, useRef: useRefH } = React;

function HomePage({ t, navigate }) {
  const [slide, setSlide] = useStateH(0);
  const slides = t.home.slides;
  const total = slides.length;

  useEffectH(() => {
    const id = setInterval(() => setSlide(s => (s + 1) % total), 6500);
    return () => clearInterval(id);
  }, [total]);

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section style={hmSt.hero}>
        {/* Layered backgrounds */}
        <div style={hmSt.heroBgGrad} />
        <div style={hmSt.heroAerial} />
        <div style={hmSt.heroAerialTint} />
        <div style={hmSt.heroGrid} />
        <div style={hmSt.heroSheen} />
        {/* Big background year/word */}
        <div style={hmSt.heroBgWord}>I&amp;TECH</div>

        {/* Vertical heritage rail (right side) */}
        <div style={hmSt.heroVRail}>
          <span style={hmSt.heroVRailMark}>EST. 1992</span>
          <span style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.2)' }} />
          <span style={hmSt.heroVRailLabel}>GWANGJU · KOREA</span>
        </div>

        {/* Slide content */}
        <div style={hmSt.heroInner}>
          {slides.map((sl, i) => (
            <div key={i} style={{
              position: i === 0 ? 'relative' : 'absolute', inset: i === 0 ? 'auto' : 0,
              opacity: i === slide ? 1 : 0,
              transition: 'opacity 1s ease', pointerEvents: i === slide ? 'auto' : 'none',
              padding: i === 0 ? 0 : '0 8%', display: 'flex', alignItems: 'center',
            }}>
              <div style={{ maxWidth: 880 }}>
                <div style={hmSt.heroSlideLabel}>
                  <span style={hmSt.heroSlideNum}>0{i + 1} <span style={{ color: 'rgba(212,146,10,0.45)' }}>/ 0{total}</span></span>
                  <span style={hmSt.heroSlideTopic}>{['MOLD SOLUTIONS','ONE-STOP PRODUCTION','QUALITY & LEAD TIME'][i]}</span>
                </div>
                <h1 style={hmSt.heroTitle}>{sl.title}</h1>
                <p style={hmSt.heroSub}>{sl.sub}</p>
                <div style={hmSt.heroBtns}>
                  <button style={hmSt.heroBtnPrimary}
                    onClick={() => navigate(['mold', 'moldFacility', 'quality'][i])}>
                    <span>{sl.btn}</span>
                    <span style={hmSt.heroBtnArrow}>→</span>
                  </button>
                  <button style={hmSt.heroBtnGhost} onClick={() => navigate('contact')}>
                    {t.nav.contact}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slide controls */}
        <div style={hmSt.heroControls}>
          <div style={hmSt.heroDots}>
            {slides.map((_, i) => (
              <button key={i} onClick={() => setSlide(i)} style={{
                width: i === slide ? 56 : 18, height: 3, border: 'none', cursor: 'pointer', padding: 0,
                background: i === slide ? 'var(--gold-2)' : 'rgba(255,255,255,0.25)',
                transition: 'all 0.5s',
              }} />
            ))}
          </div>
          <div style={hmSt.heroSlideCount}>
            <span style={{ color: 'var(--gold-2)' }}>0{slide + 1}</span>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}> / 0{total}</span>
          </div>
        </div>

      </section>

      {/* ── Stats Strip ──────────────────────────────────────────────── */}
      <section style={hmSt.stats}>
        <div style={hmSt.statsInner}>
          <div style={hmSt.statsLabel}>
            <div style={{ width: 26, height: 1, background: 'var(--gold-2)' }} />
            <span>BY THE NUMBERS</span>
          </div>
          <div style={hmSt.statsGrid}>
            {t.home.stats.map((s, i) => (
              <div key={i} style={hmSt.statCell}>
                <div style={hmSt.statNum}>{s.num}</div>
                <div style={hmSt.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About / Heritage ─────────────────────────────────────────── */}
      <section style={hmSt.about}>
        <div style={hmSt.aboutInner}>
          <div style={{ flex: '1 1 380px', display: 'flex' }}>
            <div style={{ ...hmSt.aboutImgFrame, width: '100%' }}>
              <img src="assets/about-5axis.jpg" alt="5축 가공기 45° 가공 중" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
          <div style={{ flex: '1 1 460px' }}>
            <p className="serif-it" style={hmSt.aboutQuote}>
              “정밀함은 기술이 아닌 태도에서 시작됩니다.”
            </p>
            <p style={hmSt.aboutText}>{t.home.aboutText}</p>

            <div style={hmSt.aboutPoints}>
              {[
                ['01', '설계부터 양산까지', 'CAD·CAE 설계, CNC·EDM 가공, 사출 양산을 한 공장에서'],
                ['02', '자동차 부품 전문', '완성차·1차 협력사 납품 실적과 IATF 16949 기반 품질 관리'],
                ['03', '꾸준한 연구개발', '기술개발연구소를 중심으로 금형 및 사출 기술 고도화, 품질 향상, 신규 제품 개발에 지속적으로 투자'],
              ].map(([n, h, d]) => (
                <div key={n} style={hmSt.aboutPoint}>
                  <div style={hmSt.aboutPointNum}>{n}</div>
                  <div>
                    <div style={hmSt.aboutPointHead}>{h}</div>
                    <div style={hmSt.aboutPointDesc}>{d}</div>
                  </div>
                </div>
              ))}
            </div>

            <button style={hmSt.outlineBtn} onClick={() => navigate('ceo')}>
              {t.nav.company} <span style={{ marginLeft: 8 }}>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── Business Areas ──────────────────────────────────────────── */}
      <section style={hmSt.biz}>
        <div style={hmSt.bizInner}>
          <SectionTitle label="Our Business" title={t.home.bizTitle} center
            sub="금형 설계·제작부터 사출 성형 양산, 그리고 완성차·산업용 부품 공급까지 — 제조의 한 호흡을 책임집니다." />

          <div style={hmSt.bizGrid}>
            {t.home.bizItems.map((item, i) => {
              const target = ['mold', 'injection', 'products'][i];
              const eng = ['MOLD MFG.', 'INJECTION', 'PRODUCTS'][i];
              return (
                <div key={i} style={hmSt.bizCard} onClick={() => navigate(target)}>
                  <div style={hmSt.bizCardHead}>
                    <span style={hmSt.bizCardNum}>0{i + 1}</span>
                    <span style={hmSt.bizCardEng}>{eng}</span>
                  </div>
                  <div style={hmSt.bizCardImg}>
                    <img src={['assets/home-svc-mold.jpg', 'assets/home-svc-injection.jpg', 'assets/home-svc-parts.jpg'][i]} alt={['사출금형 제작', '사출 양산', '대형 부품 생산'][i]} style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div style={hmSt.bizCardBody}>
                    <h3 style={hmSt.bizCardTitle}>{item.title}</h3>
                    <p style={hmSt.bizCardDesc}>{item.desc}</p>
                    <div style={hmSt.bizCardLink}>
                      <span style={{ width: 24, height: 1, background: 'var(--gold-2)' }} />
                      VIEW DETAILS
                      <span>→</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── One-Stop Process + Certifications ───────────────────────── */}
      <section style={hmSt.capa}>
        <div style={hmSt.osInner}>
          <div style={hmSt.osHead}>
            <div style={hmSt.capaLabel}>
              <span style={{ width: 26, height: 1, background: 'var(--gold-2)' }} />
              IN-HOUSE MOLD &amp; INJECTION
            </div>
            <h2 style={hmSt.osTitle}>ONE-STOP 생산 시스템<span style={{ color: 'var(--gold-2)' }}>.</span></h2>
            <p style={hmSt.osSub}>금형 개발과 사출 생산이 유기적으로 연결된 생산 체계를 바탕으로, 고객 요구에 신속하게 대응하며 안정적인 품질과 납기를 제공합니다.</p>
          </div>

          {/* Process Flow with Dept badges */}
          <div style={hmSt.deptHeads}>
            <div style={{ ...hmSt.deptHead, ...hmSt.deptMold, flex: '4 1 0' }}>
              <span style={hmSt.deptDot} />
              <span style={hmSt.deptLabel}>MOLD DEPT.</span>
              <span style={hmSt.deptKor}>금형부</span>
            </div>
            <div style={{ ...hmSt.deptHead, ...hmSt.deptInj, flex: '3 1 0' }}>
              <span style={{ ...hmSt.deptDot, background: 'var(--gold-2)' }} />
              <span style={hmSt.deptLabel}>INJECTION DEPT.</span>
              <span style={hmSt.deptKor}>사출부</span>
            </div>
          </div>

          <div style={hmSt.flow}>
            {[
              ['01', '설계',     'CAD/CAM · CAE',    'mold'],
              ['02', '기계 가공', 'CNC · 5-Axis · EDM','mold'],
              ['03', '조립',     '수공 정밀 조립',     'mold'],
              ['04', '습합',     '맞춤·조정 작업',     'mold'],
              ['05', '시사출',    'T1 · 검증',         'inj'],
              ['06', '사출 성형', '80~3,000ton 양산',  'inj'],
              ['07', '품질 검사', 'CMM · IATF',       'inj'],
            ].map(([n, h, d, dept], i, arr) => (
              <React.Fragment key={i}>
                <div style={{ ...hmSt.flowStep, ...(dept === 'mold' ? hmSt.flowMold : hmSt.flowInj) }}>
                  <div style={hmSt.flowNum}>{n}</div>
                  <div style={hmSt.flowH}>{h}</div>
                  <div style={hmSt.flowD}>{d}</div>
                </div>
                {i < arr.length - 1 && (
                  <div style={{ ...hmSt.flowArrow, color: arr[i + 1][3] !== dept ? 'var(--gold-2)' : 'rgba(170,196,232,0.4)', fontSize: arr[i + 1][3] !== dept ? 26 : 20 }}>→</div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Certifications */}
          <div style={hmSt.certWrap}>
            <div style={hmSt.certLabel}>
              <span style={{ width: 26, height: 1, background: 'var(--gold-2)' }} />
              CERTIFICATIONS &amp; QUALITY
            </div>
            <div style={hmSt.certRail}>
              {[
                ['SQ Mark · 사출', '현대·기아 최상위 등급'],
                ['SQ Mark · 사출금형', '현대·기아 최상위 등급'],
                ['ISO 9001', '품질경영시스템'],
                ['ISO 14001', '환경경영시스템'],
                ['INNO-BIZ', '기술혁신형 중소기업'],
                ['벤처기업', '기술 보유 인증'],
                ['뿌리기술', '소부장 기업'],
                ['가족친화기업', '여성가족부 인증'],
              ].map(([name, sub], i) => (
                <div key={i} style={hmSt.certBadge}>
                  <div style={hmSt.certName}>{name}</div>
                  <div style={hmSt.certSub}>{sub}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <button style={hmSt.capaBtn} onClick={() => navigate('moldFacility')}>
              설비현황 보기 →
            </button>
          </div>
        </div>
      </section>

      {/* CTA section removed */}
    </div>
  );
}

const hmSt = {
  // hero
  hero: { position: 'relative', minHeight: 'min(820px, 100vh)', height: 'min(820px, 100vh)', overflow: 'hidden', background: 'var(--navy-900)', color: '#fff' },
  // company aerial photo, faint
  heroAerial: { position: 'absolute', inset: 0, backgroundImage: 'url(assets/hero-aerial.jpg)', backgroundSize: 'cover', backgroundPosition: 'center 35%', opacity: 0.38, mixBlendMode: 'luminosity' },
  // navy tint over the photo so text stays legible + brand color holds
  heroAerialTint: { position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(7,20,46,0.82) 0%, rgba(13,32,69,0.62) 45%, rgba(21,48,95,0.42) 100%)' },
  heroBgGrad: { position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 40%, rgba(26,86,160,0.35) 0%, transparent 60%), linear-gradient(135deg, #07142e 0%, #0d2045 50%, #15305f 100%)' },
  heroGrid: { position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '90px 90px' },
  heroSheen: { position: 'absolute', inset: 0, background: 'linear-gradient(105deg, transparent 35%, rgba(212,146,10,0.05) 60%, transparent 70%)' },
  heroBgWord: { position: 'absolute', right: '-3%', bottom: '-12%', fontSize: 'clamp(220px, 30vw, 460px)', fontWeight: 900, color: 'rgba(212,146,10,0.05)', letterSpacing: -8, fontFamily: 'Barlow Condensed, sans-serif', lineHeight: 0.85, whiteSpace: 'nowrap', pointerEvents: 'none' },

  heroLabelBand: { position: 'absolute', top: 110, left: '8%', right: '8%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 18, zIndex: 3, flexWrap: 'wrap' },
  heroLabelMark: { fontSize: 11, letterSpacing: 4, color: 'var(--gold-2)', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700 },
  heroLabel: { fontSize: 11, letterSpacing: 5, color: 'rgba(255,255,255,0.5)', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600 },
  heroLabelDiv: { width: 32, height: 1, background: 'rgba(255,255,255,0.18)' },

  heroVRail: { position: 'absolute', top: '50%', right: 32, transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, zIndex: 3, writingMode: 'vertical-rl' },
  heroVRailMark: { fontSize: 11, letterSpacing: 5, color: 'var(--gold-2)', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700 },
  heroVRailLabel: { fontSize: 10, letterSpacing: 5, color: 'rgba(255,255,255,0.55)', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600 },

  heroInner: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 8%', zIndex: 2 },
  heroSlideLabel: { display: 'flex', alignItems: 'center', gap: 18, marginBottom: 28 },
  heroSlideNum: { fontSize: 13, letterSpacing: 3, color: 'var(--gold-2)', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700 },
  heroSlideTopic: { fontSize: 11, letterSpacing: 4, color: 'rgba(255,255,255,0.55)', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, paddingLeft: 18, borderLeft: '1px solid rgba(255,255,255,0.2)' },
  heroTitle: { fontSize: 'clamp(26px, 3.6vw, 48px)', fontWeight: 600, lineHeight: 1.28, margin: '0 0 22px', letterSpacing: -1.2, whiteSpace: 'pre-line', textShadow: '0 2px 30px rgba(0,0,0,0.35)' },
  heroSub: { fontSize: 'clamp(15px, 1.4vw, 19px)', color: 'rgba(220,232,250,0.78)', marginBottom: 44, lineHeight: 1.7, maxWidth: 600, whiteSpace: 'pre-line' },
  heroBtns: { display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' },
  heroBtnPrimary: { background: 'var(--gold-2)', color: 'var(--navy-900)', border: 'none', padding: '17px 32px', fontSize: 14, fontWeight: 800, cursor: 'pointer', letterSpacing: 2, display: 'inline-flex', alignItems: 'center', gap: 14, transition: 'all 0.2s', textTransform: 'uppercase' },
  heroBtnArrow: { transition: 'transform 0.2s', display: 'inline-block' },
  heroBtnGhost: { background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.4)', padding: '16px 28px', fontSize: 13, fontWeight: 700, cursor: 'pointer', letterSpacing: 2, transition: 'all 0.2s', textTransform: 'uppercase' },

  heroControls: { position: 'absolute', bottom: 56, left: '8%', right: '8%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 3 },
  heroDots: { display: 'flex', gap: 8 },
  heroSlideCount: { fontFamily: 'Barlow Condensed, sans-serif', fontSize: 18, fontWeight: 700, letterSpacing: 2 },
  heroScroll: { position: 'absolute', right: 32, bottom: 56, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 3 },

  // stats
  stats: { background: 'var(--navy-900)', borderTop: '1px solid rgba(212,146,10,0.18)', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#fff' },
  statsInner: { maxWidth: 1240, margin: '0 auto', padding: '52px 40px', display: 'flex', alignItems: 'center', gap: 60, flexWrap: 'wrap' },
  statsLabel: { display: 'flex', alignItems: 'center', gap: 14, fontSize: 11, letterSpacing: 5, color: 'var(--gold-2)', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, flex: '0 0 auto' },
  statsGrid: { flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 0 },
  statCell: { padding: '0 24px', textAlign: 'left', borderLeft: '1px solid rgba(255,255,255,0.08)' },
  statNum: { fontSize: 'clamp(38px, 3.7vw, 52px)', fontWeight: 700, color: '#fff', fontFamily: 'Barlow Condensed, sans-serif', lineHeight: 1, letterSpacing: -0.5 },
  statLabel: { fontSize: 12, color: 'rgba(170,196,232,0.7)', marginTop: 8, letterSpacing: 1.5 },

  // about
  about: { background: 'var(--paper)', padding: '110px 40px' },
  aboutInner: { maxWidth: 1240, margin: '0 auto', display: 'flex', gap: 80, flexWrap: 'wrap', alignItems: 'stretch' },
  aboutImgFrame: { position: 'relative', boxShadow: '0 30px 60px rgba(7,20,46,0.16)', minHeight: 460 },
  aboutImgBadge: { position: 'absolute', top: -28, right: -28, background: 'var(--navy-900)', color: '#fff', padding: '24px 26px', borderTop: '3px solid var(--gold-2)', boxShadow: '0 14px 40px rgba(7,20,46,0.3)' },
  aboutQuote: { fontSize: 22, color: 'var(--navy-700)', lineHeight: 1.5, marginTop: 0, marginBottom: 24, paddingLeft: 18, borderLeft: '2px solid var(--gold-2)' },
  aboutText: { fontSize: 16, color: '#444', lineHeight: 1.95, marginBottom: 36 },
  aboutPoints: { display: 'flex', flexDirection: 'column', gap: 22, marginBottom: 40, paddingTop: 28, borderTop: '1px solid var(--line)' },
  aboutPoint: { display: 'flex', gap: 22, alignItems: 'flex-start' },
  aboutPointNum: { fontSize: 14, fontWeight: 800, fontFamily: 'Barlow Condensed, sans-serif', color: 'var(--gold)', letterSpacing: 2, paddingTop: 4, flex: '0 0 30px' },
  aboutPointHead: { fontSize: 17, fontWeight: 800, color: 'var(--navy-800)', marginBottom: 6 },
  aboutPointDesc: { fontSize: 14.5, color: '#5a6577', lineHeight: 1.7 },
  outlineBtn: { background: 'none', border: '1.5px solid var(--navy-800)', color: 'var(--navy-800)', padding: '14px 30px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: 2, transition: 'all 0.2s', textTransform: 'uppercase' },

  // business
  biz: { background: 'var(--navy-50)', padding: '110px 40px', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' },
  bizInner: { maxWidth: 1240, margin: '0 auto' },
  bizGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28 },
  bizCard: { background: '#fff', cursor: 'pointer', transition: 'all 0.3s', borderTop: '3px solid transparent', boxShadow: '0 6px 20px rgba(7,20,46,0.05)', display: 'flex', flexDirection: 'column' },
  bizCardHead: { padding: '22px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  bizCardNum: { fontSize: 13, color: 'var(--gold)', fontWeight: 800, letterSpacing: 3, fontFamily: 'Barlow Condensed, sans-serif' },
  bizCardEng: { fontSize: 10, color: 'var(--steel)', letterSpacing: 3, fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600 },
  bizCardImg: { padding: '20px 28px 0' },
  bizCardBody: { padding: '24px 28px 32px' },
  bizCardTitle: { fontSize: 22, fontWeight: 800, color: 'var(--navy-800)', margin: '0 0 12px', letterSpacing: -0.4 },
  bizCardDesc: { fontSize: 14.5, color: '#5a6577', lineHeight: 1.7, marginBottom: 22 },
  bizCardLink: { display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 11, color: 'var(--gold)', fontWeight: 800, letterSpacing: 3, fontFamily: 'Barlow Condensed, sans-serif' },

  // capabilities
  capa: { background: 'var(--navy-900)', color: '#fff', padding: '110px 40px', position: 'relative', overflow: 'hidden' },
  capaInner: { maxWidth: 1240, margin: '0 auto', display: 'flex', gap: 80, flexWrap: 'wrap', alignItems: 'flex-start' },
  capaLabel: { display: 'inline-flex', alignItems: 'center', gap: 12, fontSize: 11, letterSpacing: 5, color: 'var(--gold-2)', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, marginBottom: 22 },
  capaTitle: { fontSize: 'clamp(30px, 3.4vw, 44px)', fontWeight: 800, lineHeight: 1.2, margin: '0 0 22px', letterSpacing: -0.6 },
  capaSub: { fontSize: 16, color: 'rgba(220,232,250,0.7)', lineHeight: 1.8, marginBottom: 32, maxWidth: 380 },
  capaBtn: { background: 'transparent', border: '1px solid var(--gold-2)', color: 'var(--gold-2)', padding: '14px 28px', fontSize: 13, fontWeight: 700, cursor: 'pointer', letterSpacing: 2, fontFamily: 'inherit', textTransform: 'uppercase' },

  // one-stop section
  osInner: { maxWidth: 1240, margin: '0 auto' },
  osHead: { textAlign: 'center', marginBottom: 64 },
  osTitle: { fontSize: 'clamp(30px, 3.4vw, 46px)', fontWeight: 700, lineHeight: 1.2, margin: '0 0 22px', letterSpacing: -0.6, whiteSpace: 'nowrap' },
  osSub: { fontSize: 16, color: 'rgba(220,232,250,0.75)', lineHeight: 1.8, margin: '0 auto', maxWidth: 560 },

  // process flow
  flow: { display: 'flex', alignItems: 'stretch', justifyContent: 'flex-start', gap: 0, flexWrap: 'nowrap', marginBottom: 90, overflowX: 'auto' },
  flowStep: { flex: '1 1 0', minWidth: 124, padding: '24px 12px', textAlign: 'center', border: '1px solid', borderColor: 'rgba(255,255,255,0.08)' },
  flowMold: { background: 'rgba(56,108,180,0.08)', borderColor: 'rgba(94,148,220,0.28)' },
  flowInj:  { background: 'rgba(212,146,10,0.07)', borderColor: 'rgba(212,146,10,0.32)' },
  flowNum: { fontSize: 11, color: 'var(--gold-2)', letterSpacing: 3, fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, marginBottom: 10 },
  flowH: { fontSize: 16, fontWeight: 800, color: '#fff', marginBottom: 5, letterSpacing: -0.3 },
  flowD: { fontSize: 11.5, color: 'rgba(170,196,232,0.7)', lineHeight: 1.4 },
  flowArrow: { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px', flexShrink: 0, fontWeight: 300 },

  // dept heads
  deptHeads: { display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' },
  deptHead: { display: 'flex', alignItems: 'center', gap: 12, padding: '12px 18px', minWidth: 200 },
  deptMold: { background: 'rgba(56,108,180,0.12)', borderLeft: '3px solid #5e94dc' },
  deptInj:  { background: 'rgba(212,146,10,0.12)', borderLeft: '3px solid var(--gold-2)' },
  deptDot: { width: 8, height: 8, borderRadius: '50%', background: '#5e94dc', flexShrink: 0 },
  deptLabel: { fontSize: 11, letterSpacing: 3, color: 'rgba(255,255,255,0.6)', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700 },
  deptKor: { fontSize: 13, fontWeight: 800, color: '#fff', letterSpacing: 0.5, marginLeft: 'auto' },

  // certifications
  certWrap: { borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 56 },
  certLabel: { display: 'inline-flex', alignItems: 'center', gap: 12, fontSize: 11, letterSpacing: 5, color: 'var(--gold-2)', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, marginBottom: 28 },
  certRail: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 14 },
  certBadge: { padding: '22px 20px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,146,10,0.22)', textAlign: 'center' },
  certName: { fontSize: 16, fontWeight: 800, color: '#fff', marginBottom: 6, letterSpacing: -0.2 },
  certSub: { fontSize: 12, color: 'rgba(170,196,232,0.7)', letterSpacing: 0.5 },

  // clients
  clients: { background: 'var(--paper)', padding: '110px 40px' },
  clientsInner: { maxWidth: 1240, margin: '0 auto', textAlign: 'center' },
  clientsRail: { display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' },
  clientChip: { padding: '14px 26px', background: '#fff', border: '1px solid var(--line)', fontSize: 14, fontWeight: 600, color: 'var(--navy-800)', letterSpacing: 0.5, transition: 'all 0.2s' },
  linkBtn: { background: 'none', border: 'none', color: 'var(--navy-800)', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: 2, textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 10 },

  // cta
  cta: { background: 'var(--navy-900)', color: '#fff', padding: '90px 40px', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(212,146,10,0.18)' },
  ctaBgWord: { position: 'absolute', right: -10, top: '50%', transform: 'translateY(-50%)', fontSize: 'clamp(120px, 16vw, 220px)', fontWeight: 900, color: 'rgba(212,146,10,0.05)', letterSpacing: -4, fontFamily: 'Barlow Condensed, sans-serif', pointerEvents: 'none' },
  ctaInner: { maxWidth: 1240, margin: '0 auto', position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' },
  ctaLabel: { display: 'inline-flex', alignItems: 'center', gap: 12, fontSize: 11, letterSpacing: 5, color: 'var(--gold-2)', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, marginBottom: 16 },
  ctaTitle: { fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 800, lineHeight: 1.3, margin: '0 0 12px', letterSpacing: -0.4 },
  ctaSub: { fontSize: 15, color: 'rgba(220,232,250,0.7)', lineHeight: 1.7 },
  ctaActions: { display: 'flex', gap: 14, flexWrap: 'wrap' },
  ctaBtnPri: { background: 'var(--gold-2)', color: 'var(--navy-900)', border: 'none', padding: '17px 36px', fontSize: 14, fontWeight: 800, cursor: 'pointer', letterSpacing: 2, fontFamily: 'inherit', textTransform: 'uppercase' },
  ctaBtnSec: { background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.4)', padding: '16px 30px', fontSize: 13, fontWeight: 700, cursor: 'pointer', letterSpacing: 2, fontFamily: 'inherit', textTransform: 'uppercase' },
};

Object.assign(window, { HomePage });
