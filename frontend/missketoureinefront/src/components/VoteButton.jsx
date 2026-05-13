import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './VoteButton.css';

const CrownSpinner = () => (
  <motion.svg
    className="vb-crown-spinner"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    animate={{ rotate: 360 }}
    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
  >
    <path
      d="M2 19l3-12 4 5 3-7 3 7 4-5 3 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" fill="none" opacity="0.3" />
  </motion.svg>
);

const Particle = ({ id, onComplete }) => (
  <motion.span
    className="vb-particle"
    initial={{
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
    }}
    animate={{
      x: (id % 2 === 0 ? 1 : -1) * (30 + Math.random() * 40),
      y: -(40 + Math.random() * 60),
      scale: 0,
      opacity: 0,
    }}
    transition={{ duration: 0.6 + Math.random() * 0.3, ease: 'easeOut' }}
    onAnimationComplete={onComplete}
    style={{
      background: id % 3 === 0 ? '#FFDF80' : id % 3 === 1 ? '#F5C542' : '#D4AF37',
    }}
  />
);

const VoteButton = ({ onClick, isLoading = false, disabled = false, label = 'Voter', size = 'md' }) => {
  const btnRef = useRef(null);
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const particleIdRef = useRef(0);

  const handleMouseMove = useCallback((e) => {
    if (disabled || isLoading) return;
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
    setMagneticOffset({ x, y });
  }, [disabled, isLoading]);

  const handleMouseLeave = useCallback(() => {
    setMagneticOffset({ x: 0, y: 0 });
  }, []);

  const handleClick = useCallback((e) => {
    if (disabled || isLoading) return;
    const newParticles = [];
    for (let i = 0; i < 8; i++) {
      const id = particleIdRef.current++;
      newParticles.push({ id });
    }
    setParticles((prev) => [...prev, ...newParticles]);
    onClick?.(e);
  }, [disabled, isLoading, onClick]);

  const removeParticle = useCallback((id) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <motion.button
      ref={btnRef}
      className={`vote-button size-${size} ${isLoading ? 'loading' : ''}`}
      onClick={handleClick}
      disabled={disabled || isLoading}
      whileHover={!disabled && !isLoading ? { scale: 1.04 } : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.97 } : {}}
      aria-label={isLoading ? 'Vote en cours...' : label}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${magneticOffset.x}px, ${magneticOffset.y}px)`,
        transition: magneticOffset.x === 0 && magneticOffset.y === 0
          ? 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
          : 'transform 0.08s ease-out',
      }}
    >
      <span className="vb-glow-ring" aria-hidden="true" />
      <span className="vb-border-glow" aria-hidden="true" />
      {isLoading ? (
        <>
          <CrownSpinner />
          <span>Traitement...</span>
        </>
      ) : (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="11" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M9 11V7a3 3 0 016 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="16" r="1.5" fill="currentColor"/>
          </svg>
          <span>{label}</span>
        </>
      )}
      {!isLoading && <span className="vb-shine" aria-hidden="true" />}
      <AnimatePresence>
        {particles.map((p) => (
          <Particle key={p.id} id={p.id} onComplete={() => removeParticle(p.id)} />
        ))}
      </AnimatePresence>
    </motion.button>
  );
};

export default VoteButton;
