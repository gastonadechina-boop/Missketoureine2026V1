import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { adminAPI } from '../../services/api';
import logo from '../../assets/logo.png';
import Loader from '../../components/Loader';
import { NO_AUTO_REFRESH_INTERVAL_MS, useAutoRefresh } from '../../utils/liveUpdates';
import './AdminDashboard.css';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
});

const OP_COLOR = { MTN: '#FFD700', Moov: '#0066CC', Flooz: '#FF6B00' };
const RECENT_STATUS_LABELS = {
  confirmed: { label: 'V', color: '#22c55e', title: 'Validé' },
  cancelled: { label: 'X', color: '#ef4444', title: 'Annulé' },
  pending: { label: 'En attente', color: '#f59e0b', title: 'En attente' },
  suspect: { label: 'Suspect', color: '#f59e0b', title: 'Suspect' },
  failed: { label: 'Échoué', color: '#ef4444', title: 'Échoué' },
};

const EMPTY_STATS = {
  votes: 0,
  candidates: 0,
  users: 0,
  revenue: 0,
  top_candidates: [],
};

const extractCollectionRows = (payload) => {
  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  return Array.isArray(payload) ? payload : [];
};

const formatCurrencyAmount = (value) => {
  const numericValue = Number(value || 0);
  const safeValue = Number.isFinite(numericValue) ? numericValue : 0;
  return safeValue.toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentVotes, setRecentVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(true);
  const hasLoadedRef = useRef(false);

  const fetchDashboardData = async () => {
    const isInitialLoad = !hasLoadedRef.current;

    try {
      if (isInitialLoad) {
        setLoading(true);
      }

      setError(null);
      const [statsResult, votesResult] = await Promise.allSettled([
        adminAPI.getStats(),
        adminAPI.getVotes({ status: 'confirmed', per_page: 5 }),
      ]);

      const nextStats = statsResult.status === 'fulfilled'
        ? {
            ...EMPTY_STATS,
            ...(statsResult.value && typeof statsResult.value === 'object' ? statsResult.value : {}),
            top_candidates: Array.isArray(statsResult.value?.top_candidates) ? statsResult.value.top_candidates : [],
          }
        : null;
      const nextRecentVotes = votesResult.status === 'fulfilled'
        ? extractCollectionRows(votesResult.value)
          .filter((vote) => !vote.payment?.status || vote.payment?.status === 'succeeded')
          .slice(0, 5)
        : null;

      if (nextStats) {
        setStats(nextStats);
      }

      if (nextRecentVotes) {
        setRecentVotes(nextRecentVotes);
      }

      setAutoRefreshEnabled(true);

      if (!nextStats && !nextRecentVotes && isInitialLoad) {
        const statsError = statsResult.status === 'rejected' ? statsResult.reason : null;
        const votesError = votesResult.status === 'rejected' ? votesResult.reason : null;
        setAutoRefreshEnabled(false);
        setError(
          statsError?.message
          || votesError?.message
          || 'Erreur lors du chargement des données'
        );
        return;
      }

      hasLoadedRef.current = true;
    } catch (err) {
      if (err?.isSessionExpired) {
        return;
      }

      setAutoRefreshEnabled(false);

      if (isInitialLoad) {
        setError(err.message || 'Erreur lors du chargement des données');
      }
    } finally {
      if (isInitialLoad) {
        hasLoadedRef.current = true;
        setLoading(false);
      }
    }
  };

  useAutoRefresh(fetchDashboardData, {
    intervalMs: NO_AUTO_REFRESH_INTERVAL_MS,
    enabled: autoRefreshEnabled,
    refreshOnFocus: false,
    refreshOnLiveUpdate: false,
    refreshOnStorage: false,
  });

  const retryFetchDashboard = async () => {
    hasLoadedRef.current = false;
    setAutoRefreshEnabled(true);
    await fetchDashboardData();
  };

  if (loading) {
    return (
      <div className="admin-page adash">
        <div className="loading-container">
          <Loader />
          <p>Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-page adash">
        <div className="error-container">
          <h3>Erreur de chargement</h3>
          <p>{error}</p>
          <button className="btn-gold" onClick={retryFetchDashboard}>
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  const dashboardStats = stats || EMPTY_STATS;
  const topCandidates = Array.isArray(dashboardStats.top_candidates) ? dashboardStats.top_candidates : [];

  return (
    <div className="admin-page adash">

      {/* ── PAGE HEADER ── */}
      <motion.div className="adash-page-header" {...fadeUp(0)}>
        <div className="adash-page-header-left">
          <div className="adash-geo-badge">
            <img src={logo} alt="Miss Kétou logo" className="adash-header-logo" />
          </div>
          <div>
            <h1>Tableau de bord</h1>
            <p>Vue d'ensemble du concours en temps réel</p>
          </div>
        </div>
        <div className="adash-date">
          <span className="adash-live-dot" />
          {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
      </motion.div>

      {/* ── STAT CARDS ── */}
      <div className="adash-stats-grid">
        {[
          { label: 'Total votes', value: dashboardStats.votes || 0, suffix: '', color: '#D4AF37' },
          { label: 'Candidats', value: dashboardStats.candidates || 0, suffix: '', color: '#F4D03F' },
          { label: 'Utilisateurs', value: dashboardStats.users || 0, suffix: '', color: '#C17F24' },
          { label: 'Revenus (FCFA)', value: formatCurrencyAmount(dashboardStats.revenue || 0), suffix: '', color: '#B8960C' },
        ].map((s, i) => (
          <motion.div key={i} className="adash-stat-card" {...fadeUp(0.08 * i)} whileHover={{ y: -4 }}>
            <div className="adash-stat-top">
              <span className="adash-stat-label">{s.label}</span>
            </div>
            <div className="adash-stat-value" style={{ color: s.color }}>
              {typeof s.value === 'number' ? s.value.toLocaleString('fr-FR') : s.value}{s.suffix}
            </div>
            <div className="adash-stat-shine" />
          </motion.div>
        ))}
      </div>

      {/* ── GRILLE BASSE ── */}
      <div className="adash-lower-grid">

        {/* Top 5 candidats */}
        <motion.div className="ag-card adash-top-card" {...fadeUp(0.3)}>
          <div className="ag-card-header">
            <h3>Top 5 Candidats</h3>
            <Link to="/admin/candidates" className="ag-btn ag-btn-ghost" style={{ fontSize: '0.78rem', padding: '5px 12px' }}>
              Voir tout
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
          <div className="ag-card-body adash-top-body">
            {topCandidates.length > 0 ? (
              topCandidates.map((c, i) => (
                <motion.div key={c.candidate_id} className="adash-top-row"
                  initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + i * 0.07 }}>
                  <span className="adash-medal"><span className="adash-rank">#{i + 1}</span></span>
                  <div className="adash-top-info">
                    <span className="adash-top-name">
                      {c.candidate ? `${c.candidate.first_name} ${c.candidate.last_name}` : 'Candidat inconnu'}
                    </span>
                    <div className="adash-top-meta">
                      <span className={`ag-badge ${c.candidate?.category === 'Miss' ? 'adash-miss' : 'adash-miss'}`}>
                        {c.candidate?.category || 'Unknown'}
                      </span>
                      <span className="adash-top-univ">{c.candidate?.university || 'N/A'}</span>
                    </div>
                  </div>
                  <div className="adash-top-votes-wrap">
                    <div className="adash-top-bar-bg">
                      <motion.div className="adash-top-bar-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((c.votes / (topCandidates[0]?.votes || 1)) * 100, 100)}%` }}
                        transition={{ duration: 0.9, delay: 0.4 + i * 0.07, ease: 'easeOut' }}
                      />
                    </div>
                    <span className="adash-top-votes-num">{c.votes.toLocaleString('fr-FR')}</span>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="no-data">Aucun vote enregistré</p>
            )}
          </div>
        </motion.div>

        {/* Votes récents */}
        <motion.div className="ag-card adash-recent-card" {...fadeUp(0.35)}>
          <div className="ag-card-header">
            <h3>Votes récents</h3>
            <Link to="/admin/votes" className="ag-btn ag-btn-ghost" style={{ fontSize: '0.78rem', padding: '5px 12px' }}>
              Voir tout
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
          <div className="adash-recent-list">
            {recentVotes && recentVotes.length > 0 ? (
              recentVotes.map((v, i) => (
                <motion.div key={v.id} className="adash-recent-row"
                  initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.06 }}>
                  <div className="adash-recent-left">
                    <div className="adash-voter-avatar">
                      {v.user?.name?.charAt(0)?.toUpperCase() || v.user?.email?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="adash-voter-name">{v.user?.name || v.user?.email || 'Utilisateur inconnu'}</p>
                      <p className="adash-voter-cand">
                        → {v.candidate ? `${v.candidate.first_name} ${v.candidate.last_name}` : 'Candidat inconnu'}
                      </p>
                    </div>
                  </div>
                  <div className="adash-recent-right">
                    <span className="adash-recent-amount">{v.amount} F</span>
                    <span
                      className="adash-recent-status"
                      title={RECENT_STATUS_LABELS[v.status]?.title || v.status}
                      style={{
                        borderColor: RECENT_STATUS_LABELS[v.status]?.color || '#f59e0b',
                        color: RECENT_STATUS_LABELS[v.status]?.color || '#f59e0b',
                      }}
                    >
                      {RECENT_STATUS_LABELS[v.status]?.label || v.status}
                    </span>
                    <span className="adash-recent-date">
                      {new Date(v.created_at).toLocaleDateString('fr-FR', { 
                        day: 'numeric', 
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="no-data">Aucun vote récent</p>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default AdminDashboard;
