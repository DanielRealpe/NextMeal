import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import '../styles/Sidebar.css';
import '../styles/Layout.css';

export function Layout() {
    return (
        <div className="layout-container">
            <Sidebar />
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
}