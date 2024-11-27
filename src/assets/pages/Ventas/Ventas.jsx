import React from 'react';
import './Ventas.css';
import { columns, data, actions } from './constantes';
import CustomTable from '../../../components/Table';

function Ventas() {
    return (
        <div className="ventas-container">
            <div className="ventas-header">
                <h1 className="ventas-title">Gestión de Ventas</h1>
            </div>
            <div className="ventas-filters-container">
                <div className="ventas-filters">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="search-input"
                    />
                    <button className="btn btn-primary">Buscar</button>
                </div>
                <div className="ventas-actions">
                    <button className="btn btn-primary">Agregar</button>
                    <button className="btn btn-secondary">Exportar</button>
                </div>
            </div>
            <CustomTable
                columns={columns}
                data={data}
                actions={actions}
                onRowClick={(row) => console.log("Row clicked:", row)}
            />
        </div>
    );
}

export default Ventas;