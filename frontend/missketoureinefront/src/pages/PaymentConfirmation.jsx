import { useEffect, useMemo, useState } from 'react';
import { Link, useOutletContext, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { paymentAPI } from '../services/api';
import { getCandidatePublicPath } from '../utils/candidatePublic';
import { broadcastLiveUpdate } from '../utils/liveUpdates';
import paymentHero from '../assets/payment_hero.svg';
import paymentMobil from '../assets/payment_mobil.svg';
import './PaymentConfirmation.css';

const SYNCABLE_STATES = new Set(['success', 'processing', 'pending', 'opening', 'initiated', 'failed']);

const parseAmount = (value) => {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : 0;
};

const parseQuantity = (value) => {
  const quantity = Number(value);
  return Number.isFinite(quantity) && quantity > 0 ? Math.round(quantity) : 1;
};

const parseVoteTotal = (value) => {
  const total = Number(value);
  return Number.isFinite(total) && total >= 0 ? Math.round(total) : null;
};

const formatVoteLabel = (value) => {
  const quantity = parseQuantity(value);
  return `${quantity.toLocaleString('fr-FR')} vote${quantity > 1 ? 's' : ''}`;
};

const formatAmountLabel = (amount, currency) => {
  if (amount > 0) {
    return `${amount.toLocaleString('fr-FR')} ${currency}`;
  }

  return `-- ${currency}`;
};

const buildStateFromStatuses = (paymentStatus, voteStatus, fallback = 'processing') => {
  if (paymentStatus === 'succeeded' && voteStatus === 'confirmed') {
    return 'success';
  }

  if (paymentStatus === 'failed' || voteStatus === 'failed') {
    return 'failed';
  }

  if (['initiated', 'processing', 'pending', 'succeeded'].includes(paymentStatus) || voteStatus === 'pending') {
    return 'processing';
  }

  return fallback;
};

const PaymentConfirmation = () => {
  const [searchParams] = useSearchParams();
  const reference = (searchParams.get('reference') || '').trim();
  const queryStatus = (searchParams.get('status') || 'processing').trim().toLowerCase();
  const [paymentDetails, setPaymentDetails] = useState({
    candidateName: 'cette candidate',
    candidatePublicId: (searchParams.get('candidate') || '').trim(),
    amount: 0,
    quantity: 1,
    currency: 'XOF',
  });

  const [paymentState, setPaymentState] = useState(() => (
    queryStatus === 'success' ? 'success' : (queryStatus === 'failed' ? 'failed' : 'processing')
  ));
  const [message, setMessage] = useState('Vérification de la confirmation FedaPay…');
  const [candidateTotalVotes, setCandidateTotalVotes] = useState(null);
  const [isSyncing, setIsSyncing] = useState(SYNCABLE_STATES.has(queryStatus) && reference !== '');
  const { refreshPublicBootstrap } = useOutletContext() || {};
  const candidateName = paymentDetails.candidateName;
  const amount = paymentDetails.amount;
  const quantity = paymentDetails.quantity;
  const currency = paymentDetails.currency;
  const formattedAmount = formatAmountLabel(amount, currency);
  const candidateLink = paymentDetails.candidatePublicId
    ? getCandidatePublicPath({ public_uid: paymentDetails.candidatePublicId })
    : '/candidates';

  const statusNotice = useMemo(() => {
    if (paymentState === 'success') {
      return {
        tone: 'success',
        label: 'Vote confirmé',
        body: candidateTotalVotes !== null
          ? `Votre vote pour ${candidateName} a été enregistré (${candidateTotalVotes.toLocaleString('fr-FR')} votes au total). Merci pour votre soutien.`
          : `Votre vote pour ${candidateName} a été enregistré. Merci pour votre soutien.`,
      };
    }

    if (paymentState === 'failed') {
      return {
        tone: 'failed',
        label: 'Vote annulé',
        body: `Tentative de vote pour ${candidateName} (${formatVoteLabel(quantity)}) annulée : paiement non confirmé.`,
      };
    }

    return {
      tone: 'processing',
      label: 'Suivi automatique',
      body: message,
    };
  }, [candidateName, candidateTotalVotes, message, paymentState, quantity]);

  const stateCopy = useMemo(() => {
    if (paymentState === 'success') {
      return {
        eyebrow: 'Paiement confirmé',
        title: 'Votre vote a bien été validé',
        subtitle: `Vote en faveur de ${candidateName} enregistré avec succès.`,
        detail: 'Le compteur de la candidate est mis à jour automatiquement.',
      };
    }

    if (paymentState === 'failed') {
      return {
        eyebrow: 'Paiement non confirmé',
        title: 'Vote non comptabilisé',
        subtitle: 'Aucune confirmation de paiement reçue.',
        detail: 'Vous pouvez relancer l’opération à tout moment.',
      };
    }

    return {
      eyebrow: 'Confirmation en cours',
      title: 'Vérification du paiement',
      subtitle: 'Attente de la confirmation FedaPay côté serveur.',
      detail: 'Mise à jour automatique de la page.',
    };
  }, [candidateName, paymentState]);

  useEffect(() => {
    if (!reference || !SYNCABLE_STATES.has(queryStatus)) {
      return undefined;
    }

    let cancelled = false;
    let attempts = 0;
    let timerId = null;

    const stopPolling = () => {
      if (timerId) {
        window.clearTimeout(timerId);
        timerId = null;
      }
    };

    const scheduleNext = () => {
      timerId = window.setTimeout(() => {
        void syncPayment();
      }, 2500);
    };

    const syncPayment = async () => {
      if (cancelled) {
        return;
      }

      attempts += 1;
      setIsSyncing(true);

      try {
        const payload = await paymentAPI.syncPublic(reference);
        const paymentStatus = String(payload?.payment_status || '').toLowerCase();
        const voteStatus = String(payload?.vote_status || '').toLowerCase();
        const nextState = buildStateFromStatuses(paymentStatus, voteStatus, 'processing');
        const nextTotalVotes = parseVoteTotal(
          payload?.candidate_votes_count ?? payload?.votes_count ?? payload?.votes
        );
        setPaymentDetails({
          candidateName: String(payload?.candidate_name || 'cette candidate').trim() || 'cette candidate',
          candidatePublicId: String(payload?.candidate_public_uid || payload?.candidate_slug || '').trim(),
          amount: parseAmount(payload?.amount),
          quantity: parseQuantity(payload?.quantity),
          currency: (String(payload?.currency || 'XOF').trim() || 'XOF'),
        });

        if (cancelled) {
          return;
        }

        if (nextState === 'success') {
          setPaymentState('success');
          if (nextTotalVotes !== null) {
            setCandidateTotalVotes(nextTotalVotes);
          }
          setMessage('Paiement confirmé. Mise à jour du compteur…');
          broadcastLiveUpdate('votes');
          try {
            await refreshPublicBootstrap?.();
          } catch {
            // Ignore bootstrap refresh failures: the confirmation message already reflects the new total.
          }
          setIsSyncing(false);
          stopPolling();
          return;
        }

        if (nextState === 'failed') {
          setPaymentState('failed');
          setMessage('Paiement non confirmé. Aucun vote comptabilisé.');
          broadcastLiveUpdate('votes');
          setIsSyncing(false);
          stopPolling();
          return;
        }

        setPaymentState('processing');
        setMessage('Confirmation en cours. Mise à jour automatique…');

        if (attempts < 12) {
          scheduleNext();
        } else {
          setIsSyncing(false);
          setMessage('Transaction en attente côté serveur.');
        }
      } catch (error) {
        if (cancelled) {
          return;
        }

        if (attempts < 12) {
          setPaymentState('processing');
          setMessage('Nouvelle vérification automatique…');
          scheduleNext();
        } else {
          setIsSyncing(false);
          setPaymentState('processing');
          setMessage(error?.message || 'Vérification impossible pour le moment.');
        }
      }
    };

    void syncPayment();

    return () => {
      cancelled = true;
      stopPolling();
    };
  }, [queryStatus, reference]);

  return (
    <div className="payment-confirmation-page">
      <section className="payment-confirmation-hero">
        <div className="payment-hero-media" aria-hidden="true">
          <img src={paymentHero} alt="" className="payment-hero-media-desktop" loading="eager" decoding="async" fetchPriority="high" />
          <div className="payment-hero-media-mobile">
            <img src={paymentMobil} alt="" className="payment-hero-media-mobile-image is-primary" loading="eager" decoding="async" fetchPriority="high" />
            <img src={paymentMobil} alt="" className="payment-hero-media-mobile-image is-secondary" loading="eager" decoding="async" />
          </div>
        </div>
        <div className="payment-confirmation-bg" aria-hidden="true">
          <div className="payment-confirmation-orb orb-1" />
          <div className="payment-confirmation-orb orb-2" />
          <div className="payment-confirmation-grid" />
        </div>

        <div className="container">
          <motion.div
            className={`payment-confirmation-shell is-${paymentState}`}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <span className="payment-confirmation-pill">{stateCopy.eyebrow}</span>

            <div className="payment-confirmation-top">
              <div className={`payment-confirmation-icon is-${paymentState}`} aria-hidden="true">
                {paymentState === 'success' ? (
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : paymentState === 'failed' ? (
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                    <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                ) : (
                  <div className="payment-confirmation-spinner" />
                )}
              </div>

              <div className="payment-confirmation-copy">
                <h1>{stateCopy.title}</h1>
                <p className="payment-confirmation-lead">{stateCopy.subtitle}</p>
                <div className={`payment-confirmation-alert is-${statusNotice.tone}`}>
                  <span className="payment-confirmation-alert-label">{statusNotice.label}</span>
                  <p className="payment-confirmation-message">{statusNotice.body}</p>
                </div>
                <p className="payment-confirmation-detail">{stateCopy.detail}</p>
              </div>
            </div>

            <div className="payment-confirmation-meta">
              <article className="payment-meta-card">
                <span>Reference</span>
                <strong>{reference || 'En attente'}</strong>
              </article>
              <article className="payment-meta-card">
                <span>Candidate</span>
                <strong>{candidateName}</strong>
              </article>
              <article className="payment-meta-card">
                <span>Votes</span>
                <strong>{quantity}</strong>
              </article>
              <article className="payment-meta-card">
                <span>Montant</span>
                <strong>{formattedAmount}</strong>
              </article>
            </div>

            <div className="payment-confirmation-actions">
              <Link to={candidateLink} className="payment-action-primary">
                {paymentState === 'success' ? 'Soutenir encore cette candidate' : 'Retour à la candidate'}
              </Link>
              <Link to="/candidates" className="payment-action-secondary">
                Découvrir les candidates
              </Link>
            </div>

            {paymentState === 'success' ? (
              <div className="payment-confirmation-note">Vote confirmé. Merci pour votre soutien.</div>
            ) : null}

            {paymentState === 'processing' && isSyncing ? (
              <div className="payment-confirmation-note">Confirmation automatique en cours…</div>
            ) : null}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PaymentConfirmation;
