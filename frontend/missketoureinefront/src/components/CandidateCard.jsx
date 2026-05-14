import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCandidateImageSources } from '../utils/candidateImage';
import { formatCandidatePublicNumber, getCandidatePublicPath } from '../utils/candidatePublic';
import './CandidateCard.css';

const CandidateCard = ({ candidate, votingBlocked = false }) => {
  const transformedCandidate = {
    publicPath: getCandidatePublicPath(candidate),
    name: `${candidate.first_name} ${candidate.last_name}`,
    category: candidate.category?.name || 'Unknown',
    university: candidate.university || 'Non spécifié',
    votes: candidate.votes_count || 0,
    number: formatCandidatePublicNumber(candidate.public_number),
  };

  const { publicPath, number, name, category, university, votes } = transformedCandidate;
  const [photoFailed, setPhotoFailed] = useState(false);
  const photo = getCandidateImageSources(candidate, 'medium');
  const backdrop = photo.backdrop || photo.src;

  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x: y * -8, y: x * 8 });
    setShinePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setShinePos({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={cardRef}
      className="candidate-card"
      initial={{ opacity: 0, y: 30, scale: 0.96, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: false, amount: 0.16 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)' : 'transform 0.08s ease-out',
      }}
    >
      <div className="cc-shine" style={{ background: `radial-gradient(circle at ${shinePos.x}% ${shinePos.y}%, rgba(212,175,55,0.08), transparent 60%)` }} />

      <div className="cc-border-glow" />

      {/* Photo */}
      <div className="cc-photo-wrap">
        {!photoFailed && photo.src
          ? <>
              {backdrop ? (
                <img
                  src={backdrop}
                  alt=""
                  aria-hidden="true"
                  className="cc-photo cc-photo-bg"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : null}
              <div className="cc-photo-overlay" aria-hidden="true" />
              <div className="cc-photo-rim" aria-hidden="true" />
              <motion.div
                className="cc-photo-float"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <img
                  src={photo.src}
                  srcSet={photo.srcSet}
                  sizes="(max-width: 600px) calc(100vw - 2rem), (max-width: 1100px) calc(50vw - 2rem), 320px"
                  alt={name}
                  className="cc-photo cc-photo-main"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  onError={(e) => {
                    e.currentTarget.removeAttribute('srcset');
                    setPhotoFailed(true);
                  }}
                />
              </motion.div>
            </>
          : (
            <div className="cc-photo-placeholder">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="rgba(212,175,55,0.3)" strokeWidth="1.5"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="rgba(212,175,55,0.3)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          )
        }
        <div className="cc-number-badge">
          <span className="cc-number-badge-glow" />
          N°{number}
        </div>
        
      </div>

      {/* Infos */}
      <div className="cc-body">
        <h3 className="cc-name">{name}</h3>
        <div className="cc-meta">
          <span className="cc-univ">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
            </svg>
            {university}
          </span>
        </div>

        {/* Votes */}
        <div className="cc-votes-row">
          <div className="cc-votes-info">
            <span className="cc-votes-num">{votes.toLocaleString('fr-FR')}</span>
            <span className="cc-votes-label">votes</span>
          </div>
          <div className="cc-votes-bar-wrap">
            <motion.div
              className="cc-votes-bar"
              initial={{ width: 0 }}
              whileInView={{ width: `${Math.min((votes / 2000) * 100, 100)}%` }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
            <div className="cc-votes-glow" />
            <div className="cc-votes-particles" aria-hidden="true">
              {[...Array(6)].map((_, i) => (
                <span key={i} className={`cc-vote-particle p-${i}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="cc-footer">
        {votingBlocked ? (
          <button type="button" className="cc-btn-vote cc-btn-vote-blocked" disabled>
            Vote bloqué
          </button>
        ) : (
          <motion.div
            className="cc-btn-vote-wrap"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Link to={publicPath} className="cc-btn-vote">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="11" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M9 11V7a3 3 0 016 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="16" r="1.5" fill="currentColor"/>
              </svg>
              Voter
            </Link>
          </motion.div>
        )}
        <Link to={publicPath} className="cc-btn-profile">
          Profil
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

export default CandidateCard;
