import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

export function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="ventas" element={<Ventas />} />
            <Route path="venta/clientes" element={<Cliente />} />
            <Route path="venta/carrito" element={<Carrito />} />
            <Route path="compras" element={<Compras />} />
            <Route path="produccion" element={<Produccion />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="configuracion" element={<Configuracion />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Router>

  );
}

