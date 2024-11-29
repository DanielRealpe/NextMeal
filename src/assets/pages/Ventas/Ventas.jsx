import React from 'react';
import { useState, useEffect } from 'react';
import './Ventas.css';
import { columns, data, actions } from './constantes';
import CustomTable from '../../../components/Table';

function Ventas() {
    const [datas, setDatas] = useState(data);
    const [searchTerm, setSearchTerm] = useState('');

    const Search = () => {
        setDatas(data.filter((item) => item.id.toString().includes(searchTerm) || item.empleado.toLowerCase().includes(searchTerm.toLowerCase()) || item.cliente.toLowerCase().includes(searchTerm.toLowerCase()) || item.estado.toLowerCase().includes(searchTerm.toLowerCase())));
        console.log(datas);
    }

    useEffect(() => {
        if(searchTerm != '') {
            return;
        }
        if(searchTerm == '') {
            setDatas(data);
        }
    }, [searchTerm]);

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
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={Search} className="btn btn-primary">Buscar</button>
                </div>
                <div className="ventas-actions">
                    <button className="btn btn-primary">Agregar</button>
                    <button className="btn btn-secondary">Exportar</button>
                </div>
            </div>
            <CustomTable
                columns={columns}
                data={datas}
                actions={actions}
                onRowClick={(row) => console.log("Row clicked:", row)}
            />
        </div>
    );
}

export default Ventas;