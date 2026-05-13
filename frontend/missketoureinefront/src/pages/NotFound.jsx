import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '2rem',
    }}>
      <div aria-hidden="true" style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: `
          radial-gradient(circle at 30% 20%, rgba(212,175,55,0.08) 0%, transparent 40%),
          radial-gradient(circle at 70% 80%, rgba(212,175,55,0.04) 0%, transparent 40%)
        `,
      }} />
      {[...Array(40)].map((_, i) => (
        <div key={i} aria-hidden="true" style={{
          position: 'fixed',
          width: '2px', height: '2px',
          background: 'rgba(212,175,55,0.3)',
          borderRadius: '50%',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `particleFloat ${5 + Math.random() * 10}s linear infinite`,
          animationDelay: `${Math.random() * 5}s`,
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 0,
        }} />
      ))}
      <motion.div
        className="glass-card"
        style={{
          position: 'relative', zIndex: 1,
          maxWidth: 600, width: '100%',
          padding: '4rem 3rem',
          textAlign: 'center',
        }}
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span
          className="section-eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ marginBottom: '1.5rem' }}
        >
          Erreur 404
        </motion.span>
        <motion.h1
          className="text-gradient-gold"
          style={{ fontSize: 'clamp(4rem, 12vw, 8rem)', lineHeight: 1, marginBottom: '1rem', textTransform: 'none', letterSpacing: '8px' }}
          initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          404
        </motion.h1>
        <div className="section-divider centered" style={{ marginBottom: '1.5rem' }} />
        <motion.p
          style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: 400, margin: '0 auto 2rem', lineHeight: 1.8 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Le lien que vous avez ouvert n&apos;existe plus ou n&apos;est plus disponible.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link to="/" className="btn btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Retour à l&apos;accueil
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
