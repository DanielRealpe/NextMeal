import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import PrimarySearchAppBar from './Navegation';
import '../styles/Sidebar.css';
import '../styles/Layout.css';

export function Layout() {
    const location = useLocation();
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    if (location.pathname === '/login' || !isAuthenticated) {
        return <Outlet />;
    }

    if (!isAuthenticated) {
        return null; // No mostrar nada si no hay autenticación
    }

    return (
        <div className="layout-container">
            <Sidebar />
            <div className="content-container">
                <PrimarySearchAppBar />
                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}