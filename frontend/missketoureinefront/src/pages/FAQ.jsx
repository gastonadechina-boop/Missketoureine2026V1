import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqAPI } from '../services/api';
import faqHero from '../assets/faq_hero.svg';
import faqMobil from '../assets/faq_mobil.svg';
import './FAQ.css';

const FaqItem = ({ faq, isOpen, onToggle }) => (
  <div className={`faq-item ${isOpen ? 'open' : ''}`}>
    <button className="faq-question" onClick={onToggle} aria-expanded={isOpen}>
      <span>{faq.q}</span>
      <motion.span
        className="faq-chevron"
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.25 }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.span>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          className="faq-answer"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <p>{faq.a}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FAQ = () => {
  const [openKey, setOpenKey] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Tout');
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await faqAPI.getAll();
        const data = response?.data || [];
        const grouped = data.reduce((acc, faq) => {
          const cat = faq.category || 'General';
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push({ q: faq.question, a: faq.answer });
          return acc;
        }, {});
        setFaqs(Object.entries(grouped).map(([category, items]) => ({ category, items })));
      } catch {
        setFaqs([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const categories = ['Tout', ...faqs.map(g => g.category)];

  const filtered = faqs.filter(g => activeCategory === 'Tout' || g.category === activeCategory);

  const toggle = key => setOpenKey(prev => (prev === key ? null : key));

  return (
    <div className="faq-page">

      {/* ── HERO ── */}
      <section className="faq-hero">
        <div className="faq-hero-media" aria-hidden="true">
          <img src={faqHero} alt="" className="faq-hero-media-desktop" loading="eager" decoding="async" fetchPriority="high" />
          <div className="faq-hero-media-mobile">
            <img src={faqMobil} alt="" className="faq-hero-media-mobile-image is-primary" loading="eager" decoding="async" fetchPriority="high" />
            <img src={faqMobil} alt="" className="faq-hero-media-mobile-image is-secondary" loading="eager" decoding="async" />
          </div>
        </div>
        <div className="faq-hero-bg" aria-hidden="true">
          <div className="faq-orb orb-1" />
          <div className="faq-orb orb-2" />
        </div>
        <div className="container">
          <motion.div className="faq-hero-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="section-eyebrow">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Centre d'aide
            </span>
            <h1>Questions <span className="text-gradient-gold">Fréquentes</span></h1>
            <p>Retrouvez toutes les réponses à vos questions sur le concours, le vote et les paiements.</p>
          </motion.div>
        </div>
      </section>

      {/* ── CONTENU ── */}
      <section className="faq-content section">
        <div className="container">
          <div className="faq-layout">

            {/* Sidebar catégories */}
            <motion.aside className="faq-sidebar" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <p className="sidebar-label">Catégories</p>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`sidebar-cat ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}

              {/* Contact rapide */}
              <div className="sidebar-contact">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                </svg>
                <p>Vous n'avez pas trouvé votre réponse ?</p>
                <a href="/contact" className="btn-gold-sm">Nous contacter</a>
              </div>
            </motion.aside>

            {/* Liste des FAQs */}
            <div className="faq-main">
              {loading && <p style={{ textAlign: 'center', color: 'var(--ag-text-3)', padding: '2rem' }}>Chargement des FAQ...</p>}
              {!loading && filtered.length === 0 && <p style={{ textAlign: 'center', color: 'var(--ag-text-3)', padding: '2rem' }}>Aucune FAQ trouvée pour cette catégorie.</p>}
              {filtered.map((group, gi) => (
                <motion.div
                  key={group.category}
                  className="faq-group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: gi * 0.1 }}
                >
                  <h3 className="faq-group-title">
                    <span>{group.category}</span>
                    <span className="faq-count">{group.items.length}</span>
                  </h3>
                  <div className="faq-list">
                    {group.items.map((faq, fi) => {
                      const key = `${gi}-${fi}`;
                      return (
                        <FaqItem
                          key={key}
                          faq={faq}
                          isOpen={openKey === key}
                          onToggle={() => toggle(key)}
                        />
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;