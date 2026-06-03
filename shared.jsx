// ─── Shared: Nav, Footer, PageWrapper, SectionTitle, Placeholder ─────────────
const { useState, useEffect, useRef } = React;

// ── Popup ────────────────────────────────────────────────────────────────────
function Popup({ t, onClose }) {
  const [dontShow, setDontShow] = useState(false);
  const key = 'iantech_popup_hide';
  if (typeof window !== 'undefined' && localStorage.getItem(key) === 'true') return null;
  function handleClose() {
    if (dontShow) localStorage.setItem(key, 'true');
    onClose();
  }
  return (
    <div style={popupSt.overlay}>
      <div style={popupSt.box}>
        <div style={popupSt.header}>
          <span style={{ fontSize: 11, letterSpacing: 4, color: 'var(--gold-soft)' }}>NOTICE</span>
          <span style={popupSt.headerTitle}>{t.popup.title}</span>
          <button style={popupSt.xBtn} onClick={handleClose}>✕</button>
        </div>
        <div style={popupSt.body}>
          {t.popup.content.split('\n').map((line, i) => (
            <p key={i} style={{ margin: '6px 0', lineHeight: 1.8 }}>{line}</p>
          ))}
        </div>
        <div style={popupSt.footer}>
          <label style={popupSt.checkLabel}>
            <input type="checkbox" checked={dontShow} onChange={e => setDontShow(e.target.checked)} style={{ marginRight: 6 }} />
            {t.popup.close}
          </label>
          <button style={popupSt.confirmBtn} onClick={handleClose}>{t.popup.confirm}</button>
        </div>
      </div>
    </div>
  );
}

const popupSt = {
  overlay: { position: 'fixed', inset: 0, background: 'rgba(7,20,46,0.72)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 },
  box: { background: '#fff', width: 480, maxWidth: '94vw', overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.4)', border: '1px solid rgba(13,32,69,0.12)' },
  header: { background: 'var(--navy-800)', color: '#fff', padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 14 },
  headerTitle: { fontSize: 16, fontWeight: 700, letterSpacing: 1, flex: 1 },
  xBtn: { background: 'none', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer', padding: '0 4px' },
  body: { padding: '26px 26px 18px', fontSize: 14, color: '#333', lineHeight: 1.8 },
  footer: { padding: '12px 26px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  checkLabel: { fontSize: 13, color: '#555', cursor: 'pointer', display: 'flex', alignItems: 'center' },
  confirmBtn: { background: 'var(--navy-800)', color: '#fff', border: 'none', padding: '10px 26px', fontSize: 13, fontWeight: 600, cursor: 'pointer', letterSpacing: 1 },
};

// ── Nav ──────────────────────────────────────────────────────────────────────
function Nav({ t, lang, setLang, navigate, currentPage }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const menus = [
    { key: 'company',  label: t.nav.company,  items: t.nav.companyItems,  pages: ['ceo', 'philosophy', 'history', 'org', 'location'] },
    { key: 'business', label: t.nav.business, items: t.nav.businessItems, pages: ['mold', 'injection', 'products', 'clients'] },
    { key: 'facility', label: t.nav.facility, items: t.nav.facilityItems, pages: ['moldFacility', 'injFacility', 'factory'] },
    { key: 'esg',      label: t.nav.esg,      items: t.nav.esgItems || [], pages: ['quality', 'esg', 'cert'] },
    { key: 'contact',  label: t.nav.contact,  items: [], pages: ['contact'] },
  ];

  const isHome = currentPage === 'home';
  const navBg = scrolled || !isHome ? 'rgba(7,20,46,0.97)' : 'transparent';
  const navBorder = scrolled || !isHome ? '1px solid rgba(212,146,10,0.18)' : '1px solid rgba(255,255,255,0.06)';

  return (
    <nav style={{ ...navSt.nav, background: navBg, borderBottom: navBorder }}>
      <div style={navSt.logo} onClick={() => { navigate('home'); setMobileOpen(false); }}>
        <div style={navSt.logoMark}>
          <img src="assets/logo-white.png" alt="I&TECH" style={navSt.logoImg} />
          <span style={navSt.logoBar} />
          <span style={navSt.logoSince}>EST. 1992</span>
        </div>
        <span style={navSt.logoSub}>아이앤테크 · I&amp;TECH CO., LTD.</span>
      </div>

      <div style={navSt.menuWrap} data-desktop-menu="true">
        {menus.map(menu => (
          <div key={menu.key} style={navSt.menuItem}
            onMouseEnter={() => menu.items.length && setActiveMenu(menu.key)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button
              style={{ ...navSt.menuBtn, color: menu.pages.includes(currentPage) ? 'var(--gold-2)' : '#fff' }}
              onClick={() => { if (!menu.items.length) navigate(menu.pages[0]); }}
            >
              {menu.label}
            </button>
            {menu.items.length > 0 && activeMenu === menu.key && (
              <div style={navSt.dropdown}>
                {menu.items.map((item, i) => (
                  <button key={i} style={{ ...navSt.dropItem, color: currentPage === menu.pages[i] ? 'var(--gold)' : 'var(--navy-800)' }}
                    onClick={() => { navigate(menu.pages[i]); setActiveMenu(null); }}>
                    <span style={{ ...navSt.dropNum }}>0{i+1}</span>{item}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        <div style={navSt.langToggle}>
          <button style={{ ...navSt.langBtn, color: lang === 'ko' ? 'var(--gold-2)' : '#aaa', fontWeight: lang === 'ko' ? 700 : 400 }}
            onClick={() => setLang('ko')}>KOR</button>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>/</span>
          <button style={{ ...navSt.langBtn, color: lang === 'en' ? 'var(--gold-2)' : '#aaa', fontWeight: lang === 'en' ? 700 : 400 }}
            onClick={() => setLang('en')}>ENG</button>
        </div>
      </div>

      <button data-hamburger="true" style={navSt.hamburger} onClick={() => setMobileOpen(!mobileOpen)}>
        <span style={{ ...navSt.bar, transform: mobileOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }}></span>
        <span style={{ ...navSt.bar, opacity: mobileOpen ? 0 : 1 }}></span>
        <span style={{ ...navSt.bar, transform: mobileOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }}></span>
      </button>

      {mobileOpen && (
        <div style={navSt.mobileMenu}>
          <div style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'center', gap: 16 }}>
            <button style={{ ...navSt.langBtn, color: lang === 'ko' ? 'var(--gold-2)' : '#aaa' }} onClick={() => setLang('ko')}>KOR</button>
            <button style={{ ...navSt.langBtn, color: lang === 'en' ? 'var(--gold-2)' : '#aaa' }} onClick={() => setLang('en')}>ENG</button>
          </div>
          {menus.map(menu => (
            <div key={menu.key}>
              {menu.items.length === 0 ? (
                <button style={navSt.mobileItem} onClick={() => { navigate(menu.pages[0]); setMobileOpen(false); }}>{menu.label}</button>
              ) : (
                <>
                  <div style={navSt.mobileCat}>{menu.label}</div>
                  {menu.items.map((item, i) => (
                    <button key={i} style={navSt.mobileSubItem}
                      onClick={() => { navigate(menu.pages[i]); setMobileOpen(false); }}>
                      {item}
                    </button>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}

const navSt = {
  nav: { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, transition: 'background 0.4s, border 0.4s', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: 78, backdropFilter: 'blur(8px)' },
  logo: { cursor: 'pointer', display: 'flex', flexDirection: 'column', lineHeight: 1.05, flexShrink: 0, gap: 6 },
  logoMark: { display: 'flex', alignItems: 'center', gap: 12 },
  logoImg: { height: 32, width: 'auto', display: 'block' },
  logoMain: { fontSize: 24, fontWeight: 900, color: '#fff', letterSpacing: 3, fontFamily: 'Barlow Condensed, sans-serif' },
  logoBar: { width: 1, height: 14, background: 'rgba(212,146,10,0.6)' },
  logoSince: { fontSize: 10, color: 'var(--gold-2)', letterSpacing: 3, fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600 },
  logoSub: { fontSize: 9.5, color: 'rgba(170,196,232,0.7)', letterSpacing: 2 },
  menuWrap: { display: 'flex', alignItems: 'center', gap: 0, flex: 1, justifyContent: 'flex-end' },
  menuItem: { position: 'relative' },
  menuBtn: { background: 'none', border: 'none', padding: '0 20px', height: 78, fontSize: 14, fontWeight: 600, cursor: 'pointer', letterSpacing: 0.5, transition: 'color 0.2s', fontFamily: 'inherit' },
  dropdown: { position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', background: '#fff', boxShadow: '0 18px 50px rgba(7,20,46,0.18)', minWidth: 220, borderTop: '2px solid var(--gold-2)', zIndex: 999 },
  dropItem: { display: 'flex', alignItems: 'center', gap: 12, width: '100%', background: 'none', border: 'none', padding: '14px 22px', fontSize: 13, textAlign: 'left', cursor: 'pointer', transition: 'background 0.15s, color 0.15s', fontFamily: 'inherit', fontWeight: 600 },
  dropNum: { fontFamily: 'Barlow Condensed, sans-serif', fontSize: 11, color: 'var(--gold-2)', letterSpacing: 2 },
  langToggle: { display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, paddingLeft: 24, marginLeft: 12, borderLeft: '1px solid rgba(255,255,255,0.18)' },
  langBtn: { background: 'none', border: 'none', fontSize: 12, cursor: 'pointer', padding: '4px 2px', letterSpacing: 1.5, fontFamily: 'Barlow Condensed, sans-serif' },
  hamburger: { display: 'none', flexDirection: 'column', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 8 },
  bar: { display: 'block', width: 24, height: 2, background: '#fff', transition: 'all 0.3s' },
  mobileMenu: { position: 'fixed', top: 78, left: 0, right: 0, background: 'var(--navy-900)', overflowY: 'auto', maxHeight: 'calc(100vh - 78px)', zIndex: 998 },
  mobileItem: { display: 'block', width: '100%', background: 'none', border: 'none', color: '#fff', padding: '18px 26px', fontSize: 15, textAlign: 'left', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.06)', fontFamily: 'inherit', fontWeight: 600 },
  mobileCat: { padding: '14px 26px 8px', fontSize: 11, color: 'var(--gold-2)', letterSpacing: 3, fontWeight: 700 },
  mobileSubItem: { display: 'block', width: '100%', background: 'none', border: 'none', color: '#ccd9ed', padding: '12px 26px 12px 40px', fontSize: 14, textAlign: 'left', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.04)', fontFamily: 'inherit' },
};

// ── Footer ───────────────────────────────────────────────────────────────────
function Footer({ t, navigate }) {
  return (
    <footer style={ftSt.footer}>
      <div style={ftSt.top}>
        <div style={ftSt.inner}>
          <div style={ftSt.brand}>
            <div style={ftSt.logoBlock}>
              <div style={ftSt.logoMain}>I&amp;TECH</div>
              <div style={ftSt.logoSince}>SINCE 1992</div>
            </div>
            <div style={ftSt.logoSub}>{t.footer.company}</div>
            <div style={{ width: 36, height: 2, background: 'var(--gold-2)', margin: '20px 0' }} />
            <p style={ftSt.info}>{t.footer.biz}</p>
            <p style={ftSt.info}>{t.footer.addr}</p>
            <p style={ftSt.info}>{t.footer.tel} &nbsp;|&nbsp; {t.footer.fax}</p>
            <p style={ftSt.info}>{t.footer.email}</p>
          </div>
          <div style={ftSt.links}>
            {[
              [t.nav.company, ['ceo','philosophy','history','org','location'], t.nav.companyItems],
              [t.nav.business, ['mold','injection','products','clients'], t.nav.businessItems],
              [t.nav.facility, ['moldFacility','injFacility','factory'], t.nav.facilityItems],
              [t.nav.esg, ['quality','esg','cert'], t.nav.esgItems || []],
            ].map(([cat, pages, items]) => (
              <div key={cat} style={ftSt.col}>
                <div style={ftSt.colTitle}>{cat}</div>
                {items.map((item, i) => (
                  <button key={i} style={ftSt.link} onClick={() => navigate(pages[i])}>{item}</button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={ftSt.bottom}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span>{t.footer.copy}</span>
          <button style={ftSt.privacyBtn} onClick={() => alert('개인정보처리방침 준비 중입니다.')}>{t.footer.privacy}</button>
        </div>
      </div>
    </footer>
  );
}

const ftSt = {
  footer: { background: 'var(--navy-900)', color: '#8a9ab8', borderTop: '1px solid rgba(212,146,10,0.16)' },
  top: { padding: '72px 0 48px' },
  inner: { maxWidth: 1240, margin: '0 auto', padding: '0 40px', display: 'flex', gap: 60, flexWrap: 'wrap' },
  brand: { flex: '0 0 300px' },
  logoBlock: { display: 'flex', alignItems: 'baseline', gap: 12 },
  logoMain: { fontSize: 30, fontWeight: 900, color: '#fff', letterSpacing: 3, fontFamily: 'Barlow Condensed, sans-serif' },
  logoSince: { fontSize: 11, color: 'var(--gold-2)', letterSpacing: 3, fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600 },
  logoSub: { fontSize: 12, color: '#aac4e8', letterSpacing: 3, marginTop: 4 },
  info: { fontSize: 13, lineHeight: 2, margin: 0 },
  links: { flex: 1, display: 'flex', gap: 40, flexWrap: 'wrap' },
  col: { display: 'flex', flexDirection: 'column', minWidth: 130 },
  colTitle: { fontSize: 12, fontWeight: 700, color: '#fff', marginBottom: 18, letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'Barlow Condensed, sans-serif' },
  link: { background: 'none', border: 'none', color: '#8a9ab8', fontSize: 13, textAlign: 'left', cursor: 'pointer', padding: '5px 0', lineHeight: 1.7, fontFamily: 'inherit', transition: 'color 0.2s' },
  bottom: { borderTop: '1px solid rgba(255,255,255,0.06)', padding: '20px 0', fontSize: 12 },
  privacyBtn: { background: 'none', border: 'none', color: '#8a9ab8', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' },
};

// ── PageWrapper ──────────────────────────────────────────────────────────────
function PageWrapper({ title, subtitle, children, hero, kicker }) {
  return (
    <div style={{ paddingTop: 78 }}>
      {hero || (
        <div style={pwSt.hero} className="pw-hero">
          {/* large display kicker (English) behind */}
          <div style={pwSt.heroBgWord}>{subtitle}</div>
          <div style={pwSt.heroInner}>
            <div style={pwSt.heroSub}>
              <span style={{ width: 26, height: 1, background: 'var(--gold-2)' }} />
              {kicker || subtitle}
            </div>
            <h1 style={pwSt.heroTitle}>{title}</h1>
          </div>
        </div>
      )}
      <div style={pwSt.body} className="pw-body">{children}</div>
    </div>
  );
}

const pwSt = {
  hero: { position: 'relative', background: 'linear-gradient(135deg, var(--navy-900) 0%, var(--navy-700) 100%)', color: '#fff', padding: '88px 40px 80px', overflow: 'hidden', borderBottom: '1px solid rgba(212,146,10,0.18)' },
  heroInner: { maxWidth: 1240, margin: '0 auto', position: 'relative', zIndex: 2 },
  heroBgWord: { position: 'absolute', right: -10, bottom: -36, fontSize: 'clamp(120px, 18vw, 240px)', fontWeight: 900, color: 'rgba(212,146,10,0.06)', letterSpacing: -2, fontFamily: 'Barlow Condensed, sans-serif', lineHeight: 0.9, textTransform: 'uppercase', whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 1 },
  heroSub: { display: 'inline-flex', alignItems: 'center', gap: 12, fontSize: 11, letterSpacing: 5, color: 'var(--gold-2)', marginBottom: 20, fontFamily: 'Barlow Condensed, sans-serif', textTransform: 'uppercase', fontWeight: 700 },
  heroTitle: { fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, margin: 0, lineHeight: 1.2, letterSpacing: -0.5 },
  body: { maxWidth: 1240, margin: '0 auto', padding: '80px 40px 100px' },
};

// ── SectionTitle ─────────────────────────────────────────────────────────────
function SectionTitle({ label, title, sub, center }) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left', marginBottom: 56 }}>
      {label && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 11, letterSpacing: 5, color: 'var(--gold)', marginBottom: 14, textTransform: 'uppercase', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700 }}>
          <span style={{ width: 22, height: 1, background: 'var(--gold)' }} />
          {label}
          <span style={{ width: 22, height: 1, background: 'var(--gold)', display: center ? 'inline-block' : 'none' }} />
        </div>
      )}
      <h2 style={{ fontSize: 'clamp(26px, 2.6vw, 34px)', fontWeight: 800, color: 'var(--navy-800)', margin: '0 0 14px', lineHeight: 1.25, letterSpacing: -0.4 }}>{title}</h2>
      {sub && <p style={{ fontSize: 15, color: '#5a6577', lineHeight: 1.85, marginTop: 12, maxWidth: center ? 720 : 760, marginLeft: center ? 'auto' : 0, marginRight: center ? 'auto' : 0, whiteSpace: 'pre-line' }}>{sub}</p>}
    </div>
  );
}

// ── PlaceholderImg (subtle striped industrial) ───────────────────────────────
function PlaceholderImg({ label, width, height, style, dark, thin }) {
  const baseDark = dark
    ? { background: 'repeating-linear-gradient(45deg, #142a4f, #142a4f 10px, #1a3360 10px, #1a3360 20px)', color: '#7a9ac4' }
    : { background: 'repeating-linear-gradient(45deg, #e8edf5, #e8edf5 10px, #f0f4fa 10px, #f0f4fa 20px)', color: '#7a8aaa' };
  return (
    <div style={{
      width: width || '100%', height: height || 200,
      ...baseDark,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: thin ? 11 : 12, fontFamily: 'monospace', textAlign: 'center',
      padding: 12, boxSizing: 'border-box', position: 'relative', overflow: 'hidden',
      ...style,
    }}>
      <div style={{ position: 'absolute', top: 8, left: 10, fontSize: 9, letterSpacing: 2, opacity: 0.55 }}>[ IMG ]</div>
      <div style={{ position: 'absolute', bottom: 8, right: 10, fontSize: 9, letterSpacing: 2, opacity: 0.55 }}>placeholder</div>
      <span style={{ background: 'rgba(255,255,255,0.7)', padding: '4px 10px', borderRadius: 0 }}>{label}</span>
    </div>
  );
}

// ── small bits ───────────────────────────────────────────────────────────────
function GoldRule({ w = 44, c = 'center' }) {
  return <div style={{ width: w, height: 2, background: 'var(--gold-2)', margin: c === 'center' ? '0 auto' : 0 }} />;
}

Object.assign(window, { Popup, Nav, Footer, PageWrapper, SectionTitle, PlaceholderImg, GoldRule });
