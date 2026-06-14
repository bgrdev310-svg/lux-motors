import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import './admin.css';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    closeSidebar();
  }, [location.pathname]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeSidebar();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="admin-dashboard-container">
      <div 
        className={`admin-sidebar-backdrop ${sidebarOpen ? 'visible' : ''}`} 
        onClick={closeSidebar} 
      />

      <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />
      
      <div className="admin-main-wrapper">
        <TopNavbar toggleSidebar={toggleSidebar} />
        
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
