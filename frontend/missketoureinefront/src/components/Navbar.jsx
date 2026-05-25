import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { authAPI } from '../services/api';
import logoSrc from '../assets/logo.png';
import './Navbar.css';

const BASE_NAV_LINKS = [
  { to: '/',           label: 'Accueil' },
  { to: '/candidates', label: 'Candidates' },
  { to: '/gallery',    label: 'Galerie' },
  { to: '/about',      label: 'À propos' },
  { to: '/faq',        label: 'FAQ' },
  { to: '/contact',    label: 'Contact' },
];

const SHOW_PUBLIC_AUTH_NAV_LINKS = false;

const Navbar = ({ votingBlocked = false }) => {
  const location  = useLocation();
  const navigate  = useNavigate();
  const [scrolled,        setScrolled]        = useState(false);
  const [menuOpen,        setMenuOpen]        = useState(false);
  const [userMenuOpen,    setUserMenuOpen]    = useState(false);
  const [logoutConfirm,   setLogoutConfirm]   = useState(false);

  const token = localStorage.getItem('authToken');
  const user  = (() => { try { return JSON.parse(localStorage.getItem('user')); } catch { return null; } })();
  const isAuthenticated = Boolean(token && user && user.role !== 'admin' && user.role !== 'superadmin');
  const publicAuthLinks = SHOW_PUBLIC_AUTH_NAV_LINKS
    ? [{ to: '/login', label: 'Se connecter' }, { to: '/register', label: "S'inscrire" }]
    : [];
  const navLinks = isAuthenticated
    ? BASE_NAV_LINKS
    : [...BASE_NAV_LINKS, ...publicAuthLinks];

  const isCandidate = isAuthenticated && user.role === 'candidate';

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setUserMenuOpen(false); }, [location]);

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      navigate('/');
      setUserMenuOpen(false);
      setLogoutConfirm(false);
    }
  };

  const isActive = to => to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  const linkItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.06, duration: 0.35 }
    }),
    exit: { opacity: 0, y: 30, transition: { duration: 0.2 } }
  };

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-glow" />
        <div className="navbar-inner">

          <Link to="/" className="navbar-logo" translate="no">
            <div className="logo-icon">
              <motion.div
                className="logo-orbit-ring ring-outer"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              />
              <motion.div
                className="logo-orbit-ring ring-inner"
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
              />
              <img src={logoSrc} alt="Miss Kétou LA REINE logo" className="navbar-logo-image" height="150" width="150" />
            </div>
          </Link>

          <nav className="navbar-links" aria-label="Navigation principale">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} className={`nav-link ${isActive(link.to) ? 'active' : ''}`}>
                <span className="nav-link-text">{link.label}</span>
                <span className="nav-link-underline" />
                {isActive(link.to) && <motion.div className="nav-link-dot" layoutId="nav-dot" />}
              </Link>
            ))}
          </nav>

          <div className="navbar-actions">
            {votingBlocked ? (
              <button className="btn-nav-vote btn-nav-vote-blocked" type="button" disabled>
                Vote bloqué
              </button>
            ) : (
              <Link to="/candidates">
                <motion.button className="btn-nav-vote" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <span className="vote-glow-ring" />
                  <span className="vote-shine" />
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Voter
                </motion.button>
              </Link>
            )}

            {isAuthenticated && (
              <div className="user-menu-wrap">
                <button className="user-menu-btn" onClick={() => setUserMenuOpen(p => !p)} aria-expanded={userMenuOpen}>
                  <div className="user-avatar">{user.name?.charAt(0) ?? 'C'}</div>
                  <span className="user-name">{user.name?.split(' ')[0]}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={`user-chevron ${userMenuOpen ? 'open' : ''}`}>
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div className="user-dropdown"
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.18 }}>
                      <div className="user-dropdown-header">
                        <p className="ud-name">{user.name}</p>
                        <p className="ud-email">{user.email}</p>
                      </div>
                      <div className="user-dropdown-body">
                        {isCandidate && (
                          <Link to="/dashboard" className="ud-item">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                              <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8"/>
                              <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8"/>
                              <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8"/>
                              <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8"/>
                            </svg>
                            Mon espace candidat
                          </Link>
                        )}
                        {isAuthenticated && !isCandidate && (
                          <Link to="/profile" className="ud-item">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8"/>
                              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                            </svg>
                            Mon profil
                          </Link>
                        )}
                      </div>
                      <div className="user-dropdown-footer">
                        <button className="ud-logout" onClick={() => setLogoutConfirm(true)}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Se déconnecter
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <button className="navbar-burger" onClick={() => setMenuOpen(p => !p)} aria-label="Menu" aria-expanded={menuOpen}>
              <motion.span
                className="burger-inner"
                animate={menuOpen ? { rotate: 90 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className={`burger-line ${menuOpen ? 'open' : ''}`} />
                <span className={`burger-line ${menuOpen ? 'open' : ''}`} />
                <span className={`burger-line ${menuOpen ? 'open' : ''}`} />
              </motion.span>
            </button>
          </div>
        </div>

      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.nav
              className="mobile-menu-content"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <div className="mobile-menu-links">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    custom={i}
                    variants={linkItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Link
                      to={link.to}
                      className={`mobile-nav-link ${isActive(link.to) ? 'active' : ''}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span className="mobile-nav-link-index">0{i + 1}</span>
                      <span className="mobile-nav-link-label">{link.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mobile-menu-divider" />

              <div className="mobile-menu-actions">
                {votingBlocked ? (
                  <button className="mobile-vote-btn mobile-vote-btn-blocked" type="button" disabled>
                    Vote bloqué
                  </button>
                ) : (
                  <Link to="/candidates" className="mobile-vote-btn" onClick={() => setMenuOpen(false)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                    Voter maintenant
                  </Link>
                )}

                {isAuthenticated && (
                  <>
                    {isCandidate && (
                      <Link to="/dashboard" className="mobile-nav-link dashboard-link" onClick={() => setMenuOpen(false)}>
                        Mon espace candidat
                      </Link>
                    )}
                    <button className="mobile-logout" onClick={() => { setMenuOpen(false); setLogoutConfirm(true); }}>
                      Se déconnecter
                    </button>
                  </>
                )}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {logoutConfirm && (
          <motion.div className="confirm-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="confirm-modal" initial={{ scale: 0.92, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 20, opacity: 0 }}>
              <div className="confirm-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Confirmer la déconnexion</h3>
              <p>Vous serez redirigé vers l&apos;accueil.</p>
              <div className="confirm-actions">
                <button className="confirm-btn ghost" onClick={() => setLogoutConfirm(false)}>Annuler</button>
                <button className="confirm-btn danger" onClick={handleLogout}>Se déconnecter</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
