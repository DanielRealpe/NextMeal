import React from 'react';
import './Cliente.css';

function Cliente() {
    return (
        <div className="cliente-container">
            <div className="cliente-header">
                <h1 className="cliente-title">Gestión de Cliente</h1>
            </div>
            <div className="cliente-filters-container">
                <div className="cliente-filters">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="search-input"
                    />
                    <button onClick={Search} className="btn btn-primary">Buscar</button>
                </div>
                <div className="cliente-actions">
                    <button className="btn btn-primary">Agregar</button>
                </div>
            </div>
        </div>
    );
}

export default Cliente