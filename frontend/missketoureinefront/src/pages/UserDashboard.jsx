import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { authAPI, userAPI } from '../services/api';
import Loader from '../components/Loader';
import { NO_AUTO_REFRESH_INTERVAL_MS, useAutoRefresh } from '../utils/liveUpdates';
import './UserDashboard.css';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

const UserDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [canLoad, setCanLoad] = useState(false);
  const hasLoadedRef = useRef(false);

  const loadDashboard = useCallback(async () => {
    const isInitialLoad = !hasLoadedRef.current;
    try {
      if (isInitialLoad) setData(null);
      setError(null);
      const [me, dash] = await Promise.all([
        authAPI.me(),
        userAPI.getDashboard(),
      ]);
      setData({ user: me, dashboard: dash });
      hasLoadedRef.current = true;
    } catch (err) {
      if (err?.isSessionExpired) return;
      if (isInitialLoad) setError(err.message || 'Impossible de charger le tableau de bord');
    }
  }, []);

  useEffect(() => {
    try {
      const token = localStorage.getItem('authToken');
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      if (!token || !user) { navigate('/login'); return; }
      if (user.must_change_password) { navigate('/change-password'); return; }
      setCanLoad(true);
    } catch { navigate('/login'); }
  }, [navigate]);

  useAutoRefresh(loadDashboard, {
    enabled: canLoad,
    intervalMs: NO_AUTO_REFRESH_INTERVAL_MS,
    refreshOnFocus: false,
    refreshOnLiveUpdate: false,
    refreshOnStorage: false,
  });

  if (!data && !error) {
    return (
      <div className="ud-loading">
        <Loader size="medium" color="secondary" text="Mon tableau de bord" subtext="Chargement de vos informations..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="ud-loading">
        <p className="ud-error">{error}</p>
        <button className="btn btn-primary" onClick={() => { hasLoadedRef.current = false; loadDashboard(); }}>Réessayer</button>
      </div>
    );
  }

  const { user, dashboard } = data;
  const userStats = dashboard?.stats || { votes: 0, payments: 0 };
  const votesCount = Number(userStats.votes) || 0;

  return (
    <div className="user-dashboard-page">
      <div className="container">
        <motion.div className="ud-header" {...fadeUp(0)}>
          <div className="ud-identity">
            <div className="ud-avatar">{user.name?.charAt(0)?.toUpperCase() || 'U'}</div>
            <div>
              <span className="section-eyebrow">Espace votant</span>
              <h1 className="text-gradient-gold">{user.name || 'Bienvenue'}</h1>
              <p className="ud-email">{user.email}</p>
            </div>
          </div>
        </motion.div>

        <div className="ud-stats-grid">
          <motion.div className="ud-stat-card" {...fadeUp(0.08)} whileHover={{ y: -4 }}>
            <div className="ud-stat-icon" style={{ background: 'rgba(212,175,55,0.1)', color: '#D4AF37' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M9 11V7a3 3 0 016 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="16" r="1.5" fill="currentColor"/></svg>
            </div>
            <p className="ud-stat-label">Votes émis</p>
            <h3 className="ud-stat-value" style={{ color: '#D4AF37' }}>{votesCount.toLocaleString('fr-FR')}</h3>
            <span className="ud-stat-sub">Total des votes confirmés</span>
          </motion.div>

          <motion.div className="ud-stat-card" {...fadeUp(0.12)} whileHover={{ y: -4 }}>
            <div className="ud-stat-icon" style={{ background: 'rgba(245,197,66,0.1)', color: '#F5C542' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <p className="ud-stat-label">Paiements</p>
            <h3 className="ud-stat-value" style={{ color: '#F5C542' }}>{Number(userStats.payments || 0).toLocaleString('fr-FR')}</h3>
            <span className="ud-stat-sub">Transactions réussies</span>
          </motion.div>

          <motion.div className="ud-stat-card" {...fadeUp(0.16)} whileHover={{ y: -4 }}>
            <div className="ud-stat-icon" style={{ background: 'rgba(255,223,128,0.1)', color: '#FFDF80' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <p className="ud-stat-label">Membre depuis</p>
            <h3 className="ud-stat-value" style={{ color: '#FFDF80', fontSize: '1.1rem' }}>
              {user.created_at ? new Date(user.created_at).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) : '—'}
            </h3>
            <span className="ud-stat-sub">Compte actif</span>
          </motion.div>
        </div>

        <div className="ud-actions-grid">
          <motion.div className="ud-action-card" {...fadeUp(0.2)} whileHover={{ y: -4 }}>
            <div className="ud-action-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M9 11V7a3 3 0 016 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </div>
            <h3>Voter pour une candidate</h3>
            <p>Consultez les profils des candidates et soutenez celle qui vous inspire.</p>
            <Link to="/candidates" className="ud-action-btn">
              Découvrir les candidates
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </motion.div>

          <motion.div className="ud-action-card" {...fadeUp(0.24)} whileHover={{ y: -4 }}>
            <div className="ud-action-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
            </div>
            <h3>Suivre le classement</h3>
            <p>Découvrez le top des candidates et l'évolution du concours en temps réel.</p>
            <Link to="/" className="ud-action-btn">
              Voir le classement
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;