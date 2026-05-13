import { useCallback, useMemo, useRef, useState } from 'react';
import { publicAPI } from '../services/api';
import { NO_AUTO_REFRESH_INTERVAL_MS, useAutoRefresh } from '../utils/liveUpdates';
import {
  readCachedPublicInitData,
  readCachedPublicSettings,
  writeCachedPublicInitData,
  writeCachedPublicSettings,
} from '../utils/publicSettings';

const EMPTY_ARRAY = [];
const PUBLIC_UPDATE_CHECK_INTERVAL_MS = 15000;
const PUBLIC_UPDATE_ALLOWED_SCOPES = ['global', 'settings', 'candidates', 'partners'];

const MOCK_CANDIDATES = [
  {
    public_uid: 'sophie-akpo',
    first_name: 'Sophie',
    last_name: 'AKPO',
    category: { name: 'Miss' },
    university: 'Université de Kétou',
    votes_count: 2847,
    public_number: 1,
    slug: null,
    photo_url: null,
    photo_urls: {},
  },
  {
    public_uid: 'marie-dossa',
    first_name: 'Marie',
    last_name: 'DOSSA',
    category: { name: 'Miss' },
    university: 'Université de Parakou',
    votes_count: 2312,
    public_number: 2,
    slug: null,
    photo_url: null,
    photo_urls: {},
  },
  {
    public_uid: 'grace-hounkanrin',
    first_name: 'Grâce',
    last_name: 'HOUNKANRIN',
    category: { name: 'Miss' },
    university: 'Université d\'Abomey-Calavi',
    votes_count: 1956,
    public_number: 3,
    slug: null,
    photo_url: null,
    photo_urls: {},
  },
  {
    public_uid: 'fiona-agossa',
    first_name: 'Fiona',
    last_name: 'AGOSSA',
    category: { name: 'Miss' },
    university: 'Université de Lomé',
    votes_count: 1723,
    public_number: 4,
    slug: null,
    photo_url: null,
    photo_urls: {},
  },
  {
    public_uid: 'estelle-gbaguidi',
    first_name: 'Estelle',
    last_name: 'GBAGUIDI',
    category: { name: 'Miss' },
    university: 'Université de Kétou',
    votes_count: 1589,
    public_number: 5,
    slug: null,
    photo_url: null,
    photo_urls: {},
  },
  {
    public_uid: 'benedicte-tchibozo',
    first_name: 'Bénédicte',
    last_name: 'TCHIBOZO',
    category: { name: 'Miss' },
    university: 'Université de Porto-Novo',
    votes_count: 1345,
    public_number: 6,
    slug: null,
    photo_url: null,
    photo_urls: {},
  },
  {
    public_uid: 'auriane-zossou',
    first_name: 'Auriane',
    last_name: 'ZOSSOU',
    category: { name: 'Miss' },
    university: 'Université de Cotonou',
    votes_count: 1128,
    public_number: 7,
    slug: null,
    photo_url: null,
    photo_urls: {},
  },
  {
    public_uid: 'charlotte-djossou',
    first_name: 'Charlotte',
    last_name: 'DJOSSOU',
    category: { name: 'Miss' },
    university: 'Université de Kétou',
    votes_count: 987,
    public_number: 8,
    slug: null,
    photo_url: null,
    photo_urls: {},
  },
];

const MOCK_PARTNERS = [
  { name: 'Mairie de Kétou', logo_url: null, website_url: null },
  { name: 'MTN Bénin', logo_url: null, website_url: null },
  { name: 'Bénin Télécoms', logo_url: null, website_url: null },
];

const MOCK_STATS = {
  totalCandidates: 8,
  totalVotes: 13887,
  totalUsers: 542,
  totalUniversities: 5,
};

const MOCK_SETTINGS = {
  site_name: 'Miss Kétou LA REINE',
  edition: '2026',
  vote_end_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
  vote_start_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  results_public: true,
  countdown_paused: false,
};

export const usePublicBootstrapData = () => {
  const cachedInitData = useMemo(() => readCachedPublicInitData(), []);
  const cachedSettings = useMemo(
    () => cachedInitData?.settings || readCachedPublicSettings(),
    [cachedInitData],
  );
  const cachedUpdateSignal = useMemo(() => {
    const signal = cachedInitData?.meta?.update_signal || {};

    return {
      version: Number(signal?.version || 0),
      timestamp: Number(signal?.timestamp || 0),
    };
  }, [cachedInitData]);

  const [publicSettings, setPublicSettings] = useState(cachedSettings || null);
  const [publicCandidates, setPublicCandidates] = useState(
    Array.isArray(cachedInitData?.candidates) ? cachedInitData.candidates : EMPTY_ARRAY,
  );
  const [publicStats, setPublicStats] = useState(cachedInitData?.stats || null);
  const [publicPartners, setPublicPartners] = useState(
    Array.isArray(cachedInitData?.partners) ? cachedInitData.partners : EMPTY_ARRAY,
  );
  const [bootstrapLoading, setBootstrapLoading] = useState(!cachedInitData);
  const [bootstrapError, setBootstrapError] = useState(null);
  const lastUpdateRef = useRef(cachedUpdateSignal);
  const bootstrapRequestRef = useRef(null);

  const applyBootstrapPayload = useCallback((payload = {}) => {
    const nextSettings = payload?.settings || null;
    const nextCandidates = Array.isArray(payload?.candidates) ? payload.candidates : EMPTY_ARRAY;
    const nextStats = payload?.stats || null;
    const nextPartners = Array.isArray(payload?.partners) ? payload.partners : EMPTY_ARRAY;
    const nextUpdateSignal = {
      version: Number(payload?.meta?.update_signal?.version || 0),
      timestamp: Number(payload?.meta?.update_signal?.timestamp || 0),
    };

    setPublicSettings(nextSettings);
    setPublicCandidates(nextCandidates);
    setPublicStats(nextStats);
    setPublicPartners(nextPartners);
    setBootstrapError(null);
    setBootstrapLoading(false);
    lastUpdateRef.current = nextUpdateSignal;

    if (nextSettings) {
      writeCachedPublicSettings(nextSettings);
    }

    writeCachedPublicInitData({
      settings: nextSettings,
      candidates: nextCandidates,
      stats: nextStats,
      partners: nextPartners,
      meta: {
        update_signal: nextUpdateSignal,
      },
    });
  }, []);

  const fetchPublicBootstrap = useCallback(async () => {
    if (bootstrapRequestRef.current) {
      return bootstrapRequestRef.current;
    }

    bootstrapRequestRef.current = (async () => {
      try {
        const payload = await publicAPI.getInitData();
        applyBootstrapPayload(payload);
      } catch (error) {
        setBootstrapError(error);
        setBootstrapLoading(false);
        console.error('Erreur chargement bootstrap public:', error);

        if (!publicSettings && publicCandidates.length === 0) {
          setPublicSettings(MOCK_SETTINGS);
          setPublicCandidates(MOCK_CANDIDATES);
          setPublicStats(MOCK_STATS);
          setPublicPartners(MOCK_PARTNERS);
        }
      } finally {
        bootstrapRequestRef.current = null;
      }
    })();

    return bootstrapRequestRef.current;
  }, [applyBootstrapPayload]);

  useAutoRefresh(fetchPublicBootstrap, {
    intervalMs: NO_AUTO_REFRESH_INTERVAL_MS,
    minGapMs: 30000,
    refreshOnFocus: false,
    refreshOnLiveUpdate: false,
    refreshOnStorage: false,
  });

  const checkForPublicUpdate = useCallback(async () => {
    if (typeof document !== 'undefined' && document.hidden) {
      return;
    }

    try {
      const signal = await publicAPI.getLastUpdate();
      const nextVersion = Number(signal?.version || 0);
      const nextTimestamp = Number(signal?.timestamp || 0);

      if (
        nextVersion !== Number(lastUpdateRef.current?.version || 0)
        || nextTimestamp !== Number(lastUpdateRef.current?.timestamp || 0)
      ) {
        await fetchPublicBootstrap();
      }
    } catch (error) {
      console.error('Erreur vérification mise à jour publique:', error);
    }
  }, [fetchPublicBootstrap]);

  useAutoRefresh(checkForPublicUpdate, {
    intervalMs: PUBLIC_UPDATE_CHECK_INTERVAL_MS,
    minGapMs: 10000,
    runOnMount: false,
    refreshOnFocus: false,
    refreshOnLiveUpdate: true,
    refreshOnStorage: true,
    allowedScopes: PUBLIC_UPDATE_ALLOWED_SCOPES,
  });

  return useMemo(() => ({
    publicSettings,
    publicCandidates,
    publicStats,
    publicPartners,
    bootstrapLoading,
    bootstrapError,
    refreshPublicBootstrap: fetchPublicBootstrap,
  }), [
    bootstrapError,
    bootstrapLoading,
    fetchPublicBootstrap,
    publicCandidates,
    publicPartners,
    publicSettings,
    publicStats,
  ]);
};
