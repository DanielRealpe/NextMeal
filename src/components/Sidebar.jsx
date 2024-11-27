import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";
import Logo from "../assets/images/Logo Next Meal.png";

export function Sidebar() {
    const [ventasOpen, setVentasOpen] = useState(false);

    const menuOptions = [
        { name: "Dashboard", path: "/" },
        { name: "Ventas", path: "/ventas" },
        { name: "Compras", path: "/compras" },
        { name: "Produccion", path: "/produccion" },
        { name: "Usuarios", path: "/usuarios" },
        { name: "Configuracion", path: "/configuracion" },
    ];

    const ventasSubOptions = [
        { name: "G. Ventas", path: "/ventas" },
        { name: "Pedidos", path: "/ventas/pedidos" },
        { name: "Clientes", path: "/ventas/clientes" },
        { name: "Carrito", path: "/ventas/carrito" },
    ];

    const toggleVentas = () => setVentasOpen(!ventasOpen);

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <div className="header-img-container">
                    <img src={Logo} alt="Next Meal Logo" />
                </div>
                <h1 className="header-title">NextMeal</h1>
            </div>
            <nav>
                <ul className="menu">
                    {menuOptions.map((option, index) => (
                        <li key={index}>
                            {option.name === "Ventas" ? (
                                <>
                                    <div
                                        className="menu-link ventas-toggle"
                                        onClick={toggleVentas}
                                    >
                                        {option.name}
                                    </div>
                                    <ul
                                        className={`submenu ${
                                            ventasOpen ? "submenu-open" : ""
                                        }`}
                                    >
                                        {ventasSubOptions.map((subOption, subIndex) => (
                                            <li key={subIndex}>
                                                <NavLink
                                                    to={subOption.path}
                                                    className={({ isActive }) =>
                                                        isActive ? "active" : ""
                                                    }
                                                >
                                                    {subOption.name}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            ) : (
                                <NavLink
                                    to={option.path}
                                    className={({ isActive }) => (isActive ? "active" : "")}
                                >
                                    {option.name}
                                </NavLink>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="sidebar-footer">© 2024 Mi Empresa</div>
        </div>
    );
}
