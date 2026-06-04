import { useState, useEffect } from 'react';
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/Home/Home';
import Fleet from './pages/Fleet/Fleet';

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
      return <Fleet />;
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

