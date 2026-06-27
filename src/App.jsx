import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './components/admin/AdminLayout';
import Home from './pages/Home/Home';

const Fleet = lazy(() => import('./pages/Fleet/Fleet'));
const FAQPage = lazy(() => import('./pages/FAQ/FAQPage'));
const ContactPage = lazy(() => import('./pages/Contact/ContactPage'));
const AboutPage = lazy(() => import('./pages/About/AboutPage'));
const GalleryPage = lazy(() => import('./pages/Gallery/GalleryPage'));
const LoginPage = lazy(() => import('./pages/Login/LoginPage'));
const CarDetailsPage = lazy(() => import('./pages/CarDetails/CarDetailsPage'));
const DestinationsPage = lazy(() => import('./pages/Destinations/DestinationsPage'));
const BlogPage = lazy(() => import('./pages/Blog/BlogPage'));
const BlogArticlePage = lazy(() => import('./pages/Blog/BlogArticlePage'));
const RequestStatusPage = lazy(() => import('./pages/Garage/RequestStatusPage'));
const SystemMapPage = lazy(() => import('./pages/SystemMap/SystemMapPage'));

const DashboardPage = lazy(() => import('./pages/admin/DashboardPage'));
const AnalyticsPage = lazy(() => import('./pages/admin/AnalyticsPage'));
const HomepageManager = lazy(() => import('./pages/admin/HomepageManager'));
const FAQManager = lazy(() => import('./pages/admin/FAQManager'));
const CalendarPage = lazy(() => import('./pages/admin/CalendarPage'));
const ContactManager = lazy(() => import('./pages/admin/ContactManager'));
const RequestsPage = lazy(() => import('./pages/admin/RequestsPage'));
const SettingsPage = lazy(() => import('./pages/admin/SettingsPage'));
const FleetManagerPage = lazy(() => import('./pages/admin/FleetManagerPage'));
const RolesManager = lazy(() => import('./pages/admin/RolesManager'));

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

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/fleet/:slug" element={<CarDetailsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogArticlePage />} />
          <Route path="/garage" element={<RequestStatusPage />} />
          <Route path="/system-map" element={<SystemMapPage />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="fleet" element={<FleetManagerPage />} />
          <Route path="homepage-manager" element={<HomepageManager />} />
          <Route path="faq-manager" element={<FAQManager />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="contact-manager" element={<ContactManager />} />
          <Route path="requests" element={<RequestsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="roles" element={<RolesManager />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  );
}
