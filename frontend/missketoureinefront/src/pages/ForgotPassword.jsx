import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authAPI } from '../services/api';
import logo from '../assets/logo.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) { setError('Veuillez entrer votre email'); return; }
    setLoading(true);
    setError('');
    try {
      await authAPI.forgotPassword({ email });
      setSent(true);
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'envoi');
    } finally {
      setLoading(false);
    }
  };

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
          <div className="auth-form-card" style={{ textAlign: 'center' }}>
            <div className="auth-brand" style={{ justifyContent: 'center', marginBottom: 24 }}>
              <div className="auth-logo">
                <img src={logo} alt="Miss Kétou logo" className="auth-logo-image" />
              </div>
            </div>
            <div className="auth-form-header">
              <h2>Mot de passe oublié</h2>
              <p>{sent ? 'Un email de réinitialisation vous a été envoyé.' : 'Entrez votre email pour recevoir un lien de réinitialisation.'}</p>
            </div>

            {error && (
              <motion.div className="auth-alert error" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                {error}
              </motion.div>
            )}

            {sent ? (
              <div className="auth-alert success" style={{ padding: '1rem', marginTop: '1rem' }}>
                <p>Si un compte existe avec cette adresse, vous recevrez un email sous quelques minutes.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="lf-group">
                  <label htmlFor="reset-email">Adresse email</label>
                  <div className="lf-input-wrap">
                    <input id="reset-email" type="email" value={email}
                      onChange={e => { setEmail(e.target.value); setError(''); }}
                      placeholder="votre@email.com" autoComplete="email" disabled={loading} />
                  </div>
                </div>
                <motion.button type="submit" className="lf-submit" disabled={loading}
                  whileHover={!loading ? { scale: 1.02 } : {}} whileTap={!loading ? { scale: 0.98 } : {}}>
                  {loading ? 'Envoi...' : 'Envoyer le lien'}
                </motion.button>
              </form>
            )}

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

export default ForgotPassword;
