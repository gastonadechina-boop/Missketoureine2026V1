import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PartnerShowcase from '../components/PartnerShowcase';
import './About.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' },
  }),
};

const buildRevealProps = (index = 0, distance = 42) => {
  const variant = index % 3;
  const hidden = variant === 0
    ? { opacity: 0, x: -distance, y: 22, scale: 0.94, filter: 'blur(10px)' }
    : variant === 1
      ? { opacity: 0, y: distance, scale: 0.94, filter: 'blur(10px)' }
      : { opacity: 0, x: distance, y: 22, scale: 0.94, filter: 'blur(10px)' };

  return {
    initial: hidden,
    whileInView: { opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' },
    viewport: { once: false, amount: 0.18 },
    transition: {
      duration: 0.78,
      delay: Math.min(index * 0.06, 0.24),
      ease: [0.22, 1, 0.36, 1],
    },
  };
};

const heroStats = [
  { value: '1ère', label: 'Édition officielle', icon: '★' },
  { value: '18-28', label: 'Âge des participants', icon: '◎' },
  { value: 'Nationale', label: 'Portée du concours', icon: '▲' },
];

const pillars = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Leadership Féminin',
    description: 'Valoriser la femme ketoise comme actrice de développement local et promouvoir la confiance en soi.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
    title: 'Autonomisation',
    description: 'Renforcer les capacités en entrepreneuriat, citoyenneté et gestion de projets communautaires.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Culture & Traditions',
    description: 'Mettre en avant la richesse du patrimoine de Kétou et sauvegarder l’identité locale.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Impact Social',
    description: 'Sensibiliser la communauté sur le rôle stratégique de la femme dans le développement.',
  },
];

const programSteps = [
  { step: '01', event: 'Sensibilisation et Recrutement des Facilitateurs Universitaires et des Ambassadeurs', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 11l8-8 8 8-8 8-8-8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg> },
  { step: '02', event: 'Lancement Officiel du Concours', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 21V3h13l-2 5 2 5H4" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"/></svg> },
  { step: '03', event: 'Appel à Candidatures des Miss et Casting', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="1.8"/></svg> },
  { step: '04', event: 'Formation et Encadrement des Candidates', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 11l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg> },
  { step: '05', event: 'Divertissement, Rencontres et Visites Touristiques', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.8"/></svg> },
  { step: '06', event: 'Phase Challenge et Vote en Ligne', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg> },
  { step: '07', event: 'Grande Finale et Couronnement', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.8"/></svg> },
  { step: '08', event: 'Publication des moments forts de l\'événement', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg> },
  { step: '09', event: 'Remerciements des Sponsors et Partenaires', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg> },
  { step: '10', event: 'Officialisation du Mandat de la Miss et ses Dauphine', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M2 19h20M4 19V8l4 4 4-6 4 6 4-4v11" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"/></svg> },
];

const evaluationCards = [
  {
    title: 'Formation des candidates',
    description: 'Leadership, communication, culture générale, civisme, image, discipline et conception de projets sociaux.',
  },
  {
    title: 'Épreuves officielles',
    description: 'Chorégraphie, danse traditionnelle, parade solo, dissertation orale, projet social et question du jury.',
  },
  {
    title: 'Jury pluridisciplinaire',
    description: 'Des personnalités issues de l’enseignement supérieur, des médias, de la culture, de l’entrepreneuriat et de la société civile.',
  },
  {
    title: 'Vote sécurisé',
    description: 'Le vote public en ligne reste encadré par un système clair, sécurisé et pensé pour limiter toute fraude.',
  },
];

const impactCards = [
  {
    title: 'Pour les jeunes filles',
    description: 'Confiance en soi, esprit d’initiative, prise de parole et capacité à représenter leur arrondissement.',
  },
  {
    title: 'Pour les arrondissements',
    description: 'Visibilité nationale, valorisation des talents et mise en avant de la qualité de la formation.',
  },
  {
    title: 'Pour les partenaires',
    description: 'Visibilité, crédibilité institutionnelle et association à un projet citoyen à fort impact.',
  },
  {
    title: 'Pour la jeunesse',
    description: 'Un rendez-vous annuel durable qui encourage l’excellence et l’engagement social.',
  },
];

const About = () => (
  <div className="about-page">
    <section className="about-hero">
      <div className="about-hero-bg" aria-hidden="true">
        <div className="about-orb orb-1" />
        <div className="about-orb orb-2" />
      </div>
      <div className="container">
        <motion.div className="about-hero-content" variants={fadeUp} initial="hidden" animate="visible">
          <span className="section-eyebrow">Qui sommes-nous</span>
          <h1>À propos de <span className="text-gold" translate="no">Miss Kétou LA REINE</span></h1>
          <p className="about-hero-subtitle">
            Une plateforme d’expression et de transformation sociale pour la jeunesse de Kétou,
            au leadership, à la culture, à l’éloquence et à l’engagement social de la jeunesse béninoise.
          </p>

          <div className="about-hero-center">
            {heroStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="hero-stat-item"
                custom={i + 1}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                <span className="hero-stat-icon" aria-hidden="true">{stat.icon}</span>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    <section className="about-mission section">
      <div className="container">
        <div className="mission-grid">
          <motion.div className="mission-text" initial={{ opacity: 0, x: -42, y: 18, scale: 0.95, filter: 'blur(10px)' }} whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }} viewport={{ once: false, amount: 0.18 }} transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}>
        
            <h2>Une plateforme pour révéler les talents <span className="text-gold">universitaires</span></h2>
            <div className="section-divider" />
            <p>
              Dans un contexte où l’éducation, l’excellence académique et l’engagement de la
              jeunesse constituent des leviers essentiels du développement durable, le projet
              MISS KÉTOU – LA REINE crée un cadre d’expression, de valorisation
              et de motivation pour les jeunes filles.
            </p>
            <p>
              Le concours est un événement à caractère éducatif, culturel et social destiné à
              promouvoir l’excellence intellectuelle, le leadership, la citoyenneté et l’image
              positive de l’étudiant béninois.
            </p>
            <p>
              MISS KÉTOU – LA REINE rassemble les arrondissements,
              les entreprises, les institutions et les partenaires sociaux autour d’une vision
              commune : investir dans la jeunesse, soutenir l’éducation et accompagner les talents.
            </p>
            <Link to="/candidates">
              <motion.button className="btn-gold" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" style={{ marginRight: '8px' }}>
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                </svg>
                Voir les candidates
              </motion.button>
            </Link>
          </motion.div>

          <motion.div className="mission-visual" initial={{ opacity: 0, x: 42, y: 18, scale: 0.95, filter: 'blur(10px)' }} whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }} viewport={{ once: false, amount: 0.18 }} transition={{ duration: 0.78, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}>
            <div className="card-stack">
              <div className="stack-card sc-3" />
              <div className="stack-card sc-2" />
              <div className="stack-card sc-1">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    stroke="#D4AF37"
                    strokeWidth="1.5"
                    fill="rgba(212,175,55,0.12)"
                  />
                </svg>
                <h3>MISS KÉTOU<br />– LA REINE</h3>
                <p>Édition inaugurale 2026</p>
                <div className="mission-tags">
                  {['Excellence', 'Leadership', 'Culture', 'Transparence'].map((tag) => (
                    <span key={tag} className="mission-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    <section className="about-values section">
      <div className="container">
        <motion.div className="section-header" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }}>
    
            <h2>Les <span className="text-gold">piliers</span> qui façonnent <span translate="no">MISS KÉTOU – LA REINE</span></h2>
            <div className="section-divider centered" />
          </motion.div>
        <div className="values-grid">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              className="value-card"
              {...buildRevealProps(i)}
              whileHover={{ y: -8 }}
            >
              <div className="value-icon">{pillar.icon}</div>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="about-history section">
      <div className="container">
        <motion.div className="section-header" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }}>
          <span className="section-eyebrow">Parcours du concours</span>
          <h2>Les grandes <span className="text-gold">phases</span></h2>
          <div className="section-divider centered" />
        </motion.div>
        <div className="timeline">
          <div className="timeline-line" />
          {programSteps.map((item, i) => (
            <motion.div
              key={item.step}
              className={`timeline-item ${i % 2 === 0 ? 'tl-left' : 'tl-right'}`}
              {...buildRevealProps(i)}
            >
              <div className="timeline-dot" />
              <div className="timeline-content">
                <span className="timeline-year">{item.step}</span>
                <span className="timeline-icon" aria-hidden="true">{item.icon}</span>
                <p>{item.event}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="about-training section">
      <div className="container">
        <motion.div className="section-header" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }}>
          <span className="section-eyebrow">Formation et épreuves</span>
          <h2>Un processus <span className="text-gold">complet</span> et encadré</h2>
          <div className="section-divider centered" />
        </motion.div>
        <div className="values-grid">
          {evaluationCards.map((card, i) => (
            <motion.div
              key={card.title}
              className="value-card"
              {...buildRevealProps(i)}
            >
              <div className="value-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="about-impact section">
      <div className="container">
        <motion.div className="section-header" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }}>
          
          <h2>Pourquoi le concours <span className="text-gold">compte</span></h2>
          <div className="section-divider centered" />
        </motion.div>
        <div className="values-grid">
          {impactCards.map((card, i) => (
            <motion.div
              key={card.title}
              className="value-card"
              {...buildRevealProps(i)}
              whileHover={{ y: -8 }}
            >
              <div className="value-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <PartnerShowcase
      
      title="Nos partenaires"
      description="Le concours accueille les partenaires qui souhaitent soutenir la jeunesse béninoise tout en gagnant en visibilité et en crédibilité."
      contactTitle="Rejoindre le projet"
      contactDescription="Une entreprise, une école ou une institution peut prendre contact directement avec l’équipe organisatrice sur WhatsApp."
      contactButtonLabel="Nous écrire sur WhatsApp"
      contactButtonVariant="gold"
    />

    <section className="about-cta section">
      <div className="container">
        <motion.div className="cta-box" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }}>
          <span className="section-eyebrow">Prêt à participer ?</span>
          <h2>Rejoignez <span className="text-gold">l’aventure</span></h2>
          <p>
            La plateforme officielle du concours réunit étudiants, arrondissements et partenaires
            autour de l’excellence académique, du leadership et de l’engagement social.
          </p>
          <div className="cta-actions">
            <Link to="/candidates">
              <motion.button className="btn-gold" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                Découvrir les candidates
              </motion.button>
            </Link>
            <Link to="/register">
              <motion.button className="btn-outline" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                Créer un compte
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  </div>
);

export default About;
