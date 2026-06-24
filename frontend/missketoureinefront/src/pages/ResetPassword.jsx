import { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authAPI } from '../services/api';
import { useToast } from '../components/Toast';
import logo from '../assets/logo.png';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const token = searchParams.get('token') || '';
  const email = searchParams.get('email') || '';
  const [formData, setFormData] = useState({ password: '', password_confirmation: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 8) { setError('Minimum 8 caractères'); return; }
    if (formData.password !== formData.password_confirmation) { setError('Les mots de passe ne correspondent pas'); return; }
    setLoading(true);
    setError('');
    try {
      await authAPI.resetPassword({ email, token, password: formData.password, password_confirmation: formData.password_confirmation });
      showToast('Mot de passe réinitialisé ! Vous pouvez vous connecter.', 'success');
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Erreur lors de la réinitialisation');
    } finally {
      setLoading(false);
    }
  };

  if (!token || !email) {
    return (
      <div className="auth-page">
        <div className="auth-container" style={{ justifyContent: 'center' }}>
          <div className="auth-form-card" style={{ textAlign: 'center', padding: '2rem' }}>
            <h2>Lien invalide</h2>
            <p>Ce lien de réinitialisation est invalide ou a expiré.</p>
            <Link to="/forgot-password" className="auth-switch-link">Refaire une demande</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-bg" aria-hidden="true">
        <div className="auth-orb orb-1" />
        <div className="auth-orb orb-2" />
      </div>
      <div className="auth-container">
        <motion.div className="auth-right" style={{ maxWidth: 480, margin: '0 auto' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="auth-form-card">
            <div className="auth-brand" style={{ justifyContent: 'center', marginBottom: 24 }}>
              <div className="auth-logo">
                <img src={logo} alt="Miss Kétou logo" className="auth-logo-image" />
              </div>
            </div>
            <div className="auth-form-header">
              <h2>Nouveau mot de passe</h2>
              <p>Choisissez un mot de passe sécurisé.</p>
            </div>

            {error && (
              <motion.div className="auth-alert error" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="lf-group">
                <label htmlFor="reset-pwd">Nouveau mot de passe</label>
                <div className="lf-input-wrap">
                  <input id="reset-pwd" type="password" value={formData.password}
                    onChange={e => setFormData(f => ({...f, password: e.target.value}))}
                    placeholder="Minimum 8 caractères" autoComplete="new-password" disabled={loading} />
                </div>
              </div>
              <div className="lf-group">
                <label htmlFor="reset-pwd-confirm">Confirmer le mot de passe</label>
                <div className="lf-input-wrap">
                  <input id="reset-pwd-confirm" type="password" value={formData.password_confirmation}
                    onChange={e => setFormData(f => ({...f, password_confirmation: e.target.value}))}
                    placeholder="Confirmer" autoComplete="new-password" disabled={loading} />
                </div>
              </div>
              <motion.button type="submit" className="lf-submit" disabled={loading}
                whileHover={!loading ? { scale: 1.02 } : {}} whileTap={!loading ? { scale: 0.98 } : {}}>
                {loading ? 'Réinitialisation...' : 'Réinitialiser'}
              </motion.button>
            </form>

            <div className="auth-divider"><span>ou</span></div>
            <p className="auth-switch">
              <Link to="/login" className="auth-switch-link">Retour à la connexion</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPassword;
