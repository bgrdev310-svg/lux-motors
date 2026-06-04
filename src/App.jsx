import { useState, useEffect, lazy, Suspense } from 'react';
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/Home/Home';

// Lazy-load the Fleet page — it's heavy (1100+ lines, many large images)
const Fleet = lazy(() => import('./pages/Fleet/Fleet'));

// Minimal loading spinner for Suspense fallback
function PageLoader() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      color: 'rgba(255,255,255,0.5)',
      fontFamily: 'var(--font-body)',
      fontSize: '0.875rem',
      letterSpacing: '2px',
      textTransform: 'uppercase',
    }}>
      <div style={{
        width: '24px',
        height: '24px',
        border: '2px solid rgba(201,168,76,0.2)',
        borderTopColor: '#c9a84c',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
        marginRight: '12px',
      }} />
      Loading...
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    // Intercept clicks on links that are relative (internal) to change views instantly
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      // Only handle internal absolute-like relative paths (starts with / but not external)
      if (href && href.startsWith('/') && !href.startsWith('//')) {
        // Allow default behavior if it has target="_blank"
        if (anchor.target === '_blank') return;
        
        e.preventDefault();
        
        // Push state if it's a different path/query to avoid history bloat
        if (window.location.pathname + window.location.search !== href) {
          window.history.pushState({}, '', href);
        }
        
        setCurrentPath(window.location.pathname);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    document.addEventListener('click', handleAnchorClick);
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Simple path routing
  const renderPage = () => {
    if (currentPath.startsWith('/fleet')) {
      return (
        <Suspense fallback={<PageLoader />}>
          <Fleet />
        </Suspense>
      );
    }
    // Fallback/Home
    return <Home />;
  };

  return (
    <PublicLayout>
      {renderPage()}
    </PublicLayout>
  );
}

export default App;
