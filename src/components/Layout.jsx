import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import PrimarySearchAppBar from './Navegation';
import '../styles/Sidebar.css';
import '../styles/Layout.css';

export function Layout() {
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