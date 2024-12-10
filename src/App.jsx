import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import Dashboard from './assets/pages/Dashboard';
import ErrorPage from './assets/pages/Error/ErrorPage';
import Ventas from './assets/pages/Ventas/Ventas';
import Compras from './assets/pages/Compras/Compras';
import Produccion from './assets/pages/Produccion/Produccion';
import Usuarios from './assets/pages/Usuarios/Users';
import Configuracion from './assets/pages/Configuracion/Config';
import Cliente from './assets/pages/Cliente/Cliente';
import Carrito from './assets/pages/Carrito/Carrito';
import Pedidos from './assets/pages/Pedidos/Pedidos';
import Categorias from './assets/pages/Categorias/Categorias';
import Productos from './assets/pages/Productos/Productos';
import Login from './assets/pages/Acceso/Login';
import Register from './assets/pages/Acceso/Register';
import RecoverPassword from './assets/pages/Acceso/Recovery';
import EditProfile from './assets/pages/Acceso/EditProfile';
import ProtectedRoute from './components/ProtectedRoute';
import ClientView from './assets/pages/HomePage';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="ventas" element={<Ventas />} />
            <Route path="venta/pedidos" element={<Pedidos />} />
            <Route path="venta/clientes" element={<Cliente />} />
            <Route path="venta/carrito" element={<Carrito />} />
            <Route path="compras" element={<Compras />} />
            <Route path="produccion" element={<Produccion />} />
            <Route path="categorias" element={<Categorias />} />
            <Route path="productos" element={<Productos />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="configuracion" element={<Configuracion />} />
            <Route path="editProfile" element={<EditProfile />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={<ClientView />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recovery" element={<RecoverPassword />} />
      </Routes>
    </Router>

  );
}

