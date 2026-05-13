import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', minHeight: '100vh', background: '#0a0a0a',
          color: '#d4af37', fontFamily: 'sans-serif', textAlign: 'center', padding: '2rem'
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Une erreur est survenue</h1>
          <p style={{ color: '#999', marginBottom: '2rem' }}>
            Veuillez rafraîchir la page ou réessayer plus tard.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#d4af37', color: '#0a0a0a', border: 'none',
              padding: '0.75rem 2rem', borderRadius: '4px', fontSize: '1rem',
              cursor: 'pointer', fontWeight: 600
            }}
          >
            Rafraîchir
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
