// ─── App: routing ─────────────────────────────────────────────────────────
const { useState: useStateA, useEffect: useEffectA } = React;

const PAGE_MAP = {
  home: { comp: 'HomePage' },
  ceo: { comp: 'CeoPage' },
  philosophy: { comp: 'PhilosophyPage' },
  history: { comp: 'HistoryPage' },
  org: { comp: 'OrgPage' },
  location: { comp: 'LocationPage' },
  mold: { comp: 'MoldPage' },
  injection: { comp: 'InjectionPage' },
  products: { comp: 'ProductsPage' },
  clients: { comp: 'ClientsPage' },
  moldFacility: { comp: 'FacilityPage', dataKey: 'moldFacility' },
  injFacility: { comp: 'InjectionFacilityPage' },
  factory: { comp: 'FactoryPage' },
  esg: { comp: 'EsgPage' },
  cert: { comp: 'CertPage' },
  quality: { comp: 'QualityPage' },
  contact: { comp: 'ContactPage' },
};

function App() {
  const [lang, setLang] = useStateA(() => localStorage.getItem('iantech_lang') || 'ko');
  const [page, setPage] = useStateA('home');
  const [showPopup, setShowPopup] = useStateA(() => localStorage.getItem('iantech_popup_hide') !== 'true');
  const t = window.T[lang];

  useEffectA(() => {
    localStorage.setItem('iantech_lang', lang);
    document.documentElement.lang = lang === 'ko' ? 'ko' : (lang === 'ja' ? 'ja' : 'en');
  }, [lang]);

  function navigate(target) {
    setPage(target);
    window.scrollTo(0, 0);
  }

  function renderPage() {
    const info = PAGE_MAP[page] || PAGE_MAP.home;
    switch (info.comp) {
      case 'HomePage':      return <HomePage t={t} navigate={navigate} />;
      case 'CeoPage':       return <CeoPage t={t} />;
      case 'PhilosophyPage': return <PhilosophyPage t={t} />;
      case 'HistoryPage':   return <HistoryPage t={t} />;
      case 'OrgPage':       return <OrgPage t={t} />;
      case 'LocationPage':  return <LocationPage t={t} />;
      case 'MoldPage':      return <MoldPage t={t} />;
      case 'InjectionPage': return <InjectionPage t={t} />;
      case 'ProductsPage':  return <ProductsPage t={t} />;
      case 'ClientsPage':   return <ClientsPage t={t} />;
      case 'FacilityPage':  return <FacilityPage t={t} dataKey={info.dataKey} />;
      case 'InjectionFacilityPage': return <InjectionFacilityPage t={t} />;
      case 'FactoryPage':   return <FactoryPage t={t} />;
      case 'EsgPage':       return <EsgPage t={t} />;
      case 'CertPage':      return <CertPage t={t} />;
      case 'QualityPage':   return <QualityPage t={t} />;
      case 'ContactPage':   return <ContactPage t={t} />;
      default:              return <HomePage t={t} navigate={navigate} />;
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {showPopup && <Popup t={t} onClose={() => setShowPopup(false)} />}
      <Nav t={t} lang={lang} setLang={setLang} navigate={navigate} currentPage={page} />
      <main style={{ flex: 1 }}>{renderPage()}</main>
      <Footer t={t} navigate={navigate} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
