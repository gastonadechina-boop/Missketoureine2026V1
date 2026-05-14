import { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import PartnerShowcase from '../components/PartnerShowcase';
import Loader from '../components/Loader';
import WhatsAppIcon from '../components/WhatsAppIcon';
import sessionHero from '../assets/session_hero.png';
import sessionMobile from '../assets/session_mobil.png';
import sessionMobileAlt from '../assets/session_mobil.png';
import initiatorVisual from '../assets/logo.png';
import { getCandidatePublicPath } from '../utils/candidatePublic';
import { PARTNER_WHATSAPP_URL, PROJECT_PHONE_DISPLAY } from '../utils/siteContact';
import { getVotingWindowSnapshot } from '../utils/publicSettings';
import './Home.css';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
});

const buildRevealProps = (index = 0, distance = 38) => {
  const variant = index % 3;
  const initial = variant === 0
    ? { opacity: 0, x: -distance, y: 26, scale: 0.94, filter: 'blur(10px)' }
    : variant === 1
      ? { opacity: 0, y: distance, scale: 0.94, filter: 'blur(10px)' }
      : { opacity: 0, x: distance, y: 26, scale: 0.94, filter: 'blur(10px)' };

  return {
    initial,
    whileInView: { opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' },
    viewport: { once: false, amount: 0.16 },
    transition: {
      duration: 0.78,
      delay: Math.min(index * 0.06, 0.24),
      ease: [0.22, 1, 0.36, 1],
    },
  };
};

const heroVisualMotion = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: [0, -10, 0] },
  transition: {
    opacity: { duration: 0.6, delay: 0.2, ease: 'easeOut' },
    y: { duration: 6, delay: 0.2, repeat: Infinity, ease: 'easeInOut' },
  },
};

const getCountdownState = (remainingSeconds = 0, totalSeconds = 0) => {
  const remaining = Math.max(0, Number.isFinite(remainingSeconds) ? remainingSeconds : 0);
  const total = Math.max(0, Number.isFinite(totalSeconds) ? totalSeconds : 0);

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remaining / (1000 * 60)) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);
  const percentLeft = total > 0 ? Math.max(0, Math.min(100, (remaining / total) * 100)) : 0;

  return {
    days,
    hours,
    minutes,
    seconds,
    percentLeft: Math.round(percentLeft),
  };
};

const HERO_TITLE_LINES = [
  { text: 'MISS KÉTOU', className: 'hero-title-line-primary' },
  { text: 'LA REINE 2026', className: 'hero-title-line-secondary' },
];
const OFFICIAL_MARKERS = [
  {
    value: 'Juin',
    accent: '2026',
    label: 'Période de mise en œuvre',
    detail: 'Le projet Miss Kétou LA REINE se déroulera durant tout le mois de juin 2026.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    value: 'Kétou',
    accent: 'Bénin',
    label: 'Lieu de l’événement',
    detail: 'Toutes les phases du concours se dérouleront dans la commune de Kétou.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.9"/>
      </svg>
    ),
  },
  {
    value: 'Impact',
    accent: 'Durable',
    label: 'Objectif du projet',
    detail: 'Valoriser le leadership féminin, l’intelligence et la culture des filles de Kétou.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7H14.5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    value: 'Reine',
    accent: 'Ketoise',
    label: 'Identité culturelle',
    detail: 'Mettre en avant la culture, les traditions et l’identité profonde de la cité des Ala-Kétou.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M3 5h18v14H3z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round"/>
        <path d="M8 9h8M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const HOME_OVERVIEW = [
  {
            title: 'Valorisation de la femme ketoise',
            description: 'Une plateforme dédiée à révéler le leadership, l\'intelligence et l\'élégance des jeunes filles de la commune de Kétou.',
            badge: 'Vision du projet',
            icon: (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round"/>
              </svg>
            ),
  },
  {
    title: 'Leadership et Éducation',
    description: 'Renforcer les capacités des participantes en développement personnel, entrepreneuriat et citoyenneté active.',
    badge: 'Formation',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
            title: 'Identité et Traditions',
            description: 'Sauvegarder et promouvoir le patrimoine culturel de Kétou à travers les expressions artistiques des candidates.',
            badge: 'Culture',
            icon: (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round"/>
              </svg>
            ),
  },
  {
    title: 'Impact Socio-économique',
    description: 'Créer des opportunités d’autonomisation économique et de réseautage pour les lauréates et la communauté.',
    badge: 'Durabilité',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M8.5 14.5l-1.2 1.2a3.5 3.5 0 01-4.95-4.95l3-3a3.5 3.5 0 014.95 0l1.1 1.1" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const PROGRAM_STEPS = [
  {
    step: '01',
    title: 'Sensibilisation et Recrutement des Facilitateurs Universitaires et des Ambassadeurs',
    desc: 'Campagnes de sensibilisation et recrutement des facilitateurs et ambassadeurs dans les arrondissements.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 11l8-8 8 8-8 8-8-8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M12 3v18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  },
  {
    step: '02',
    title: 'Appel à Candidatures des Miss et Casting',
    desc: 'Lancement des inscriptions et sélection des candidates par casting.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="1.8"/><path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  },
  {
    step: '03',
    title: 'Formation et Encadrement des Candidates',
    desc: 'Ateliers de formation en leadership, communication, culture générale et encadrement personnalisé.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 11l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 22a10 10 0 100-20 10 10 0 000 20z" stroke="currentColor" strokeWidth="1.8"/></svg>,
  },
  {
    step: '04',
    title: 'Divertissement, Rencontres et Visites Touristiques',
    desc: 'Activités récréatives, rencontres inter-universitaires et découverte touristique de Kétou.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  },
  {
    step: '05',
    title: 'Phase Challenge et Vote en Ligne',
    desc: 'Défis thématiques et vote du public en ligne pour soutenir les candidates.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  },
  {
    step: '06',
    title: 'Grande Finale et Couronnement',
    desc: 'Soirée de gala, prestations artistiques et couronnement de Miss Kétou LA REINE.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  },
];

const INITIATOR_PILLARS = [
  'Valoriser la femme ketoise comme actrice majeure du développement local.',
  'Promouvoir le leadership, la confiance en soi et l’identité culturelle.',
  'Créer des opportunités d’autonomisation économique pour les candidates.',
];

const AnimatedHeroTitle = () => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setKey(prev => prev + 1), 10000);
    return () => clearInterval(interval);
  }, []);

  const lineStarts = HERO_TITLE_LINES.reduce(
    (acc, line) => [...acc, acc[acc.length - 1] + line.text.length],
    [0]
  );

  return (
    <div className="hero-title-container">
      <div className="hero-title-sweep" aria-hidden="true" />
      <div className="hero-title-particles" aria-hidden="true">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="htp" style={{
            left: `${5 + i * 10}%`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${3.5 + (i % 4) * 1.2}s`,
          }} />
        ))}
      </div>

      <motion.h1
        key={key}
        className="hero-title"
        aria-label="MISS KÉTOU LA REINE"
      >
        {HERO_TITLE_LINES.map((line, lineIndex) => (
          <span
            key={line.text}
            className={`hero-title-line ${line.className}`}
          >
            {Array.from(line.text).map((char, charIndex) => {
              const globalIndex = lineStarts[lineIndex] + charIndex;
              return (
                <motion.span
                  key={`${charIndex}-${char}`}
                  className={`hero-title-char ${char === ' ' ? 'is-space' : ''} ${lineIndex === 0 ? 'htc-primary' : 'htc-secondary'}`}
                  initial={{ opacity: 0, y: 50, scale: 0.25, filter: 'blur(20px)' }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.6, delay: globalIndex * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  style={{ '--wave-delay': `${globalIndex * 0.12}s` }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              );
            })}
          </span>
        ))}
      </motion.h1>
    </div>
  );
};

const Home = () => {
  const [countdown, setCountdown] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0, percentLeft: 0,
  });
  const [showIntro, setShowIntro] = useState(true);
  const {
    publicSettings = null,
    publicCandidates = [],
    publicStats = null,
    bootstrapLoading = false,
    votingBlocked = false,
  } = useOutletContext() || {};
  const resultsPublicEnabled = Boolean(publicSettings?.results_public);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setShowIntro(false);
    }, 1800);

    return () => window.clearTimeout(timerId);
  }, []);

  useEffect(() => {
    if (!publicSettings?.vote_end_at) {
      setCountdown(getCountdownState());
      return;
    }

    const { remainingMs, totalMs } = getVotingWindowSnapshot(publicSettings || {});
    const countdownPaused = Boolean(publicSettings?.countdown_paused);

    if (Number.isFinite(remainingMs) && Number.isFinite(totalMs) && totalMs > 0) {
      const initialRemaining = Math.max(0, remainingMs);
      const total = Math.max(0, totalMs);

      setCountdown(getCountdownState(initialRemaining, total));

      if (countdownPaused || initialRemaining <= 0) {
        return;
      }

      const startedAt = Date.now();
      const tick = () => {
        const elapsedSeconds = Math.floor((Date.now() - startedAt) / 1000);
        const remaining = Math.max(0, initialRemaining - (elapsedSeconds * 1000));
        setCountdown(getCountdownState(remaining, total));
      };

      const id = setInterval(tick, 1000);
      return () => clearInterval(id);
    }

    const start = publicSettings?.vote_start_at_iso
      ? new Date(publicSettings.vote_start_at_iso)
      : publicSettings?.vote_start_at
        ? new Date(`${publicSettings.vote_start_at}T00:00:00`)
        : new Date();
    const end = publicSettings?.vote_end_at_effective_iso
      ? new Date(publicSettings.vote_end_at_effective_iso)
      : publicSettings?.vote_end_at_iso
        ? new Date(publicSettings.vote_end_at_iso)
        : new Date(`${publicSettings.vote_end_at}T23:59:59`);

    const compute = () => {
      const now = new Date();

      const total = Math.max(0, end - start);
      const remaining = Math.max(0, end - now);

      const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((remaining / (1000 * 60)) % 60);
      const seconds = Math.floor((remaining / 1000) % 60);
      const percentLeft = total > 0 ? Math.max(0, Math.min(100, (remaining / total) * 100)) : 0;

      setCountdown({ days, hours, minutes, seconds, percentLeft: Math.round(percentLeft) });
    };

    compute();
    const id = setInterval(compute, 1000);
    return () => clearInterval(id);
  }, [publicSettings]);

  const hasCountdown = Boolean(publicSettings?.vote_end_at);
  const paddedHours = String(countdown.hours).padStart(2, '0');
  const paddedMinutes = String(countdown.minutes).padStart(2, '0');
  const paddedSeconds = String(countdown.seconds).padStart(2, '0');
  const countdownProgress = hasCountdown ? countdown.percentLeft : 100;
  const stats = publicStats || {
    totalCandidates: 0,
    totalVotes: 0,
    totalUsers: 0,
    totalUniversities: 0,
  };
  const candidateList = Array.isArray(publicCandidates) ? publicCandidates : [];
  const loading = bootstrapLoading && candidateList.length === 0 && !publicStats;
  const topCandidates = [...candidateList]
    .sort((a, b) => (b.votes_count || 0) - (a.votes_count || 0))
    .slice(0, 6);

  return (
  <div className="home-page">
    <div className="scroll-progress" />
    <div className="section-markers" aria-hidden="true">
      {[1,2,3,4,5,6,7,8,9].map(n => (
        <span key={n} className="sm-item" data-section={n}>{`0${n}`.slice(-2)}</span>
      ))}
    </div>
    <AnimatePresence>
      {showIntro && (
        <motion.div
          className="home-intro-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Loader
            size="medium"
            color="secondary"
            text="MISS KÉTOU LA REINE 2026"
            subtext="Veuillez patienter..."
            fullScreen
          />
        </motion.div>
      )}
    </AnimatePresence>

    {/* ══════════════════════════════════════════ HERO */}
    <section className="hero-section">
      <div className="hero-media" aria-hidden="true">
        <img
          src={sessionHero}
          alt=""
          className="hero-media-desktop"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="hero-media-mobile">
          <img
            src={sessionMobile}
            alt=""
            className="hero-media-mobile-image is-primary"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <img
            src={sessionMobileAlt}
            alt=""
            className="hero-media-mobile-image is-secondary"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
      <div className="hero-bloom" aria-hidden="true" />
      <div className="hero-particles" aria-hidden="true">
        {[...Array(10)].map((_, i) => <div key={i} className="gp" />)}
      </div>
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-orb orb-1" />
        <div className="hero-orb orb-2" />
        <div className="hero-orb orb-3" />
        <div className="hero-grid-lines" />
      </div>

      <div className="container hero-content">
        <motion.div className="hero-text" {...fadeUp(0)}>
          <div translate="no" className="notranslate">
            <AnimatedHeroTitle />
          </div>

          <p className="hero-subtitle">
            Plus qu'un simple concours de beauté, une plateforme d'expression, de formation et de transformation sociale, visant à révéler des modèles féminins inspirants pour la jeunesse de Kétou.
          </p>

          <motion.div className="hero-countdown-inline" {...heroVisualMotion}>
            {loading ? (
              <div className="hcs-loading">
                <Loader
                  size="small"
                  color="secondary"
                  text="MISS KÉTOU LA REINE 2026"
                  subtext="Veuillez patienter..."
                />
              </div>
            ) : (
              <div className="hcs-inner">
                <div className="hcs-aura" aria-hidden="true" />
                <div className="hcs-particles-container" aria-hidden="true">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="hcs-p" style={{
                      left: `${5 + i * 8}%`,
                      animationDelay: `${i * 0.35}s`,
                      animationDuration: `${3.5 + (i % 5) * 0.4}s`,
                    }} />
                  ))}
                </div>

                <div className="hcs-header">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{flexShrink: 0}}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#D4AF37" strokeWidth="1.5" fill="rgba(212,175,55,0.12)" />
                  </svg>
                  <span>Temps restant avant la cloture des votes </span>
                </div>

                <div className="hcs-row">
                  {[
                    { label: 'Jours', value: hasCountdown ? String(countdown.days).padStart(2, '0') : '00' },
                    { label: 'Heures', value: hasCountdown ? paddedHours : '00' },
                    { label: 'Minutes', value: hasCountdown ? paddedMinutes : '00' },
                    { label: 'Secondes', value: hasCountdown ? paddedSeconds : '00' },
                  ].map((unit) => (
                    <motion.div className="hcs-card" key={unit.label} whileHover={{ scale: 1.06, y: -6 }}>
                      <div className="hcs-card-border" aria-hidden="true" />
                      <div className="hcs-card-bg" aria-hidden="true" />
                      <div className="hcs-card-digit-wrap">
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={unit.value}
                            className="hcs-card-digit"
                            initial={{ y: -18, opacity: 0, filter: 'blur(6px)' }}
                            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                            exit={{ y: 18, opacity: 0, filter: 'blur(6px)' }}
                            transition={{ duration: 0.22, ease: 'easeOut' }}
                          >
                            {unit.value}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                      <span className="hcs-card-label">{unit.label}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="hcs-energy">
                  <div className="hcs-energy-track">
                    <motion.div
                      className="hcs-energy-fill"
                      initial={false}
                      animate={{ width: `${countdownProgress}%` }}
                      transition={{ duration: 0.85, ease: 'easeOut' }}
                    />
                    <div className="hcs-energy-beam" aria-hidden="true" />
                  </div>
                  <div className="hcs-energy-meta">
                    <span className="hcs-energy-pct">{countdownProgress}%</span>
                    <span className="hcs-energy-label">du temps de vote écoulé</span>
                  </div>
                </div>

                <div className="hcs-footer">
                  <div className="hcs-avatars">
                    {candidateList.slice(0, 4).map((c, i) => (
                      <div key={c.public_uid || c.slug || c.public_number || i} className="hcs-avatar" style={{ zIndex: 4 - i, marginLeft: i > 0 ? '-10px' : '0' }}>
                        {`${c.first_name} ${c.last_name}`.charAt(0)}
                      </div>
                    ))}
                    {candidateList.length > 4 && (
                      <span className="hcs-avatar-more">+{candidateList.length - 4}</span>
                    )}
                  </div>
                  <span className="hcs-count">{candidateList.length} candidate{candidateList.length !== 1 ? 's' : ''} inscrite{candidateList.length !== 1 ? 's' : ''}</span>
                </div>
              </div>
            )}
          </motion.div>

          <div className="hero-actions">
            <motion.a
              className="btn-hero-primary"
              href={PARTNER_WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <WhatsAppIcon width={18} height={18} />
              Devenir partenaire
            </motion.a>
            <Link to="/about">
              <motion.button className="btn-hero-secondary" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                En savoir plus
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </Link>
          </div>

          <div className="hero-badges">
            {/* <div className="hero-badge">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
              Concours national
            </div>
            <div className="hero-badge"><div className="hero-badge">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
              Concours national
            </div>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              Inscription gratuite
            </div>
            <div className="hero-badge">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
              Édition inaugurale 2026
            </div>
            {/* {publicSettings?.vote_end_at && (
              <div className="hero-badge">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                {countdown.percentLeft}% du temps de vote restant
              </div>
            )} */}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div className="hero-scroll" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12l7 7 7-7" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </section>

  

    {/* ══════════════════════════════════════════ CONCOURS EN BREF */}
    <section className="home-overview section">
      <div className="container">
        <motion.div
          className="section-header text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
        >
        
          <h2>Le concours <span className="text-gold">en quelques repères</span></h2>
          <div className="section-divider centered" />
          <p className="section-lead">
            MISS KÉTOU – LA REINE met en lumière les candidates les plus méritantes, bien au-delà de l’apparence physique, en valorisant leur intelligence, leur leadership, leur éloquence et leur engagement social.
            Ce concours communal offre une plateforme unique permettant aux jeunes filles de révéler leur potentiel, de développer leurs compétences et de porter des projets à impact au service de la communauté.

            À travers un processus structuré et équitable, il vise à former et promouvoir une nouvelle génération de leaders féminines, capables de représenter dignement la cité des Ala-Kétou et de contribuer au développement du Bénin.
          </p>
        </motion.div>

        <div className="home-overview-grid">
          {HOME_OVERVIEW.map((card, i) => (
            <motion.article
              key={card.title}
              className={`home-overview-card ${i === 0 || i === 1 ? 'card-large' : 'card-small'}`}
              {...buildRevealProps(i)}
              whileHover={{ y: -6 }}
            >
              <span className="home-overview-number">{`0${i + 1}`.slice(-2)}</span>
              <div className="home-overview-top">
                <span className="home-overview-badge">{card.badge}</span>
                <div className="home-overview-icon" aria-hidden="true">{card.icon}</div>
              </div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    <section className="home-initiator section">
      <div className="container">
        <div className="initiator-wrapper">
          <div className="initiator-divider" aria-hidden="true" />
          <motion.div
            className="initiator-copy"
            initial={{ opacity: 0, x: -42, y: 18 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-eyebrow">Vision de l’initiateur</span>
            <h2>Un concours qui fait <span className="text-gold">rayonner la jeunesse ketoise ainsi que sa riche culture</span></h2>
            <div className="section-divider" />
            <p>
              À l’origine de MISS KÉTOU – LA REINE, il y a une volonté claire :
              offrir à Kétou et au Bénin un cadre sérieux, inspirant et structuré où les jeunes filles peuvent
              être révélées pour leurs idées, leur leadership, leur culture et leur capacité
              à porter des actions utiles à la société.
            </p>
            <p>
              les jeunes filles qui sont les representatrices des valeurs culturelles de la ville de Kétou, et qui sont les ambassadrices de la ville.
            </p>

            <div className="initiator-points" aria-label="Axes portés par l’initiateur du projet">
              {INITIATOR_PILLARS.map((point) => (
                <div key={point} className="initiator-point">
                  <span className="initiator-point-icon" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span>{point}</span>
                </div>
              ))}
            </div>

           
          </motion.div>

          <motion.div
            className="initiator-visual"
            initial={{ opacity: 0, x: 42, y: 18 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.72, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="initiator-visual-card">
              <div className="initiator-visual-orb" aria-hidden="true" />
              <div className="initiator-corner-frame" aria-hidden="true">
                <div className="icf-corner tl" />
                <div className="icf-corner tr" />
                <div className="icf-corner bl" />
                <div className="icf-corner br" />
              </div>
              <img
                src={initiatorVisual}
                alt="Identité visuelle officielle du projet Miss Kétou LA REINE"
                className="initiator-image"
                loading="lazy"
                decoding="async"
              />
              <div className="initiator-visual-badge">
                <span className="initiator-badge-label">Initiateur</span>
                <strong> Rodrigue ALLALE </strong>
              </div>
              <div className="initiator-quote-card">
                <p>
                  <span className="text-gold">MISS KÉTOU – LA REINE</span> est une plateforme créée pour révéler et révéler le talent de la jeunesse béninoise  et promouvoir la culture de la beauté et du leadership féminin. 
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    <div className="section-divider-gold" />

       {/* ══════════════════════════════════════════ STATS */}
    <section className="home-stats section">
      <div className="container">
        <motion.div
          className="section-header text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <span className="section-eyebrow">Repères officiels</span>
          <h2>Une plateforme qui présenter le <span className="text-gold"> Miss Kétou</span></h2>
          <div className="section-divider centered" />
          <p className="section-lead">
            MISS KÉTOU – LA REINE n’est pas uniquement un espace de vote :
            c’est la vitrine officielle de la première édition d’un concours
            d’excellence féminine, éducatif, culturel et citoyen.
          </p>
        </motion.div>

        <div className="stats-grid">
          {OFFICIAL_MARKERS.map((stat, i) => (
            <motion.div key={i} className="stat-card"
              {...buildRevealProps(i)}
              whileHover={{ y: -6 }}>
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value stat-value-text">
                <span className="stat-value-part">{stat.value}</span>
                <span className="stat-value-part">{stat.accent}</span>
              </div>
              <p className="stat-label">{stat.label}</p>
              <p className="stat-detail">{stat.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

     <section className="home-discover section">
      <div className="container">
        <motion.div
          className="home-discover-card"
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.18 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="home-discover-copy">
            <span className="section-eyebrow">Candidates retenues</span>
            <h2>Découvrir les candidates</h2>
            <p>
              Consultez les profils officiels, les arrondissements représentés et les parcours
              des candidates qualifiées pour cette édition inaugurale.
            </p>
           
         
          </div>

          <Link to="/candidates" className="home-discover-action">
            <motion.button className="btn-gold" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              Découvrir les candidates
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>

    

    

   

    {/* ══════════════════════════════════════════ TOP CANDIDATS */}
    {resultsPublicEnabled && (
      <section className="home-top-candidates section">
        <div className="container">
          <motion.div className="section-header text-center"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }}>
            <span className="section-eyebrow">Classement en direct</span>
            <h2>Top <span className="text-gold">Candidates</span></h2>
            <div className="section-divider centered" />
          </motion.div>

          <div className="top-cand-grid">
            {topCandidates.map((c, i) => (
              <motion.div key={c.public_uid || c.slug || c.public_number || i} className={`top-cand-card ${i === 0 ? 'podium-1' : i === 1 ? 'podium-2' : i === 2 ? 'podium-3' : ''}`}
                {...buildRevealProps(i)}
                whileHover={{ y: -8 }}>
                <div className="tc-rank">
                  {i === 0
                    ? <svg width="20" height="20" viewBox="0 0 24 24" fill="#D4AF37"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    : `#${i + 1}`}
                </div>
                {i < 3 && (
                  <div className={`tc-crown ${i === 0 ? 'gold' : i === 1 ? 'silver' : 'bronze'}`}>
                    <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
                      <path d="M50 15L56 32L74 36L62 50L66 70L50 60L34 70L38 50L26 36L44 32L50 15Z" fill="currentColor" opacity="0.9"/>
                      <path d="M50 15L56 32L74 36L62 50L66 70L50 60L34 70L38 50L26 36L44 32L50 15Z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                )}
                <div className="tc-avatar">{`${c.first_name} ${c.last_name}`.charAt(0)}</div>
                <div className="tc-info">
                  <h3>{`${c.first_name} ${c.last_name}`}</h3>
                  <div className="tc-meta">
                    <span className="tc-univ">{c.university || 'Arrondissement'}</span>
                  </div>
                </div>
                <div className="tc-votes">
                  <strong>{(c.votes_count || 0).toLocaleString('fr-FR')}</strong>
                  <span>votes</span>
                </div>
                {votingBlocked ? (
                  <span className="tc-vote-btn tc-vote-btn-disabled">Vote bloqué</span>
                ) : (
                  <Link to={getCandidatePublicPath(c)} className="tc-vote-btn">Voter</Link>
                )}
              </motion.div>
            ))}
          </div>

          <div className="section-cta">
            <Link to="/candidates">
              <motion.button className="btn-gold" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                Voir toutes les candidates
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    )}

    {/* ══════════════════════════════════════════ COMMENT VOTER */}
    {/* <section className="home-how section">
      <div className="container">
        <motion.div className="section-header text-center"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }}>
          <h2>Le <span className="text-gold">parcours</span> du concours <span className="text-gold">(phase de pré-sélection)</span></h2>
          <div className="section-divider centered" />
        </motion.div>

        <div className="steps-timeline">
          <div className="timeline-dots">
            {PROGRAM_STEPS.map((s, i) => (
              <div key={i} className="timeline-dot-wrapper">
                <div className="timeline-dot" />
                {i < PROGRAM_STEPS.length - 1 && <div className="timeline-connector" />}
              </div>
            ))}
          </div>
          <div className="timeline-cards">
            {PROGRAM_STEPS.map((s, i) => (
              <motion.div key={i} className="step-card"
                {...buildRevealProps(i)}
                whileHover={{ y: -6 }}>
                <div className="step-num">{s.step}</div>
                <div className="step-header">
                  <span className="step-step-label">{s.step}</span>
                  <div className="step-icon">{s.icon}</div>
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section> */}

    {/* ══════════════════════════════════════════ MOBILE MONEY */}
    {/* <section className="home-mm section">
      <div className="container">
        <motion.div className="mm-box"
          initial={{ opacity: 0, y: 30, scale: 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: false, amount: 0.18 }} transition={{ duration: 0.72 }}>
          <div className="mm-float-coin" aria-hidden="true">✦</div>
          <div className="mm-float-coin" aria-hidden="true">✦</div>
          <div className="mm-float-coin" aria-hidden="true">✦</div>
          <div className="mm-float-coin" aria-hidden="true">✦</div> 
          <div className="mm-right">
            <div className="mm-phone-frame">
              <div className="mm-phone-card">
              <div className="mm-phone-header">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="11" width="18" height="10" rx="2" stroke="#D4AF37" strokeWidth="1.8"/>
                  <path d="M9 11V7a3 3 0 016 0v4" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                Simulateur de vote
              </div>
              <div className="mm-phone-body">
                <div className="mm-sim-row"><span>Candidate</span><strong>Sophie AKAKPO</strong></div>
                <div className="mm-sim-row"><span>Nombre de votes</span><strong className="text-gold">10</strong></div>
                <div className="mm-sim-row"><span>Opérateur</span><strong>MTN MoMo</strong></div>
                <div className="mm-sim-row"><span>Numéro</span><strong>+229 97 ••• ••• </strong></div>
                <div className="mm-sim-divider" />
                <div className="mm-sim-row total"><span>Total</span><strong>1 000 FCFA</strong></div>
              </div>
              <div className="mm-phone-footer">
                <div className="mm-sim-btn">Confirmer le paiement</div>
              </div>
            </div>
          </div>
          </div>
        </motion.div>
      </div>
    </section> */}

      <PartnerShowcase
  
      title="Nos partenaires"
      description="Découvrez les institutions, entreprises et médias qui accompagnent cette édition de MISS KÉTOU LA REINE."
      contactTitle="Vous souhaitez devenir partenaire ?"
      contactDescription="Envoyez un message WhatsApp au comité organisateur pour proposer votre collaboration et faire apparaître votre logo dans le carrousel public."
      contactButtonLabel="Contacter l’équipe"
      contactButtonVariant="gold"
    />


    {/* ══════════════════════════════════════════ CTA FINAL */}
    <section className="home-cta section">
      <div className="cta-orbs" aria-hidden="true">
        <div className="cta-orb" />
        <div className="cta-orb" />
        <div className="cta-orb" />
      </div>
      <div className="cta-burst" aria-hidden="true" />
      <div className="container">
        <motion.div className="cta-final"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.18 }}>
          <div className="cta-final-orb" aria-hidden="true" />
          <span className="section-eyebrow">Première édition 2026</span>
          <h2>Rejoignez<br /><span className="text-gold">l’aventure</span></h2>
          <p>La plateforme officielle du concours réunit les jeunes filles de Kétou autour de la culture, du leadership et de l’engagement citoyen.</p>
          <div className="cta-final-actions">
            <Link to="/candidates">
              <motion.button className="btn-hero-primary" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                Découvrir les candidates
              </motion.button>
            </Link>
            <motion.a
              className="btn-hero-secondary"
              href={PARTNER_WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <WhatsAppIcon width={16} height={16} />
              Devenir partenaire
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>

  </div>
  );
};

export default Home;
