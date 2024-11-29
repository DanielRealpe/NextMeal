import React from 'react';
import { useState, useMemo } from 'react';
import ReactPaginate from 'react-paginate';
import { columns, data, acionecitas } from './constantes';
import CustomTable from '../../../components/Table';
import FormModal from './Modal';
import ModalDetalle from './ModalDetalle';
import Swal from 'sweetalert2';
import './Cliente.css';

function Cliente() {
    const [FormData, setFormData] = useState({});
    const [Data, setData] = useState(data);
    const [isOpen, setIsOpen] = useState(false);
    const [Modal, setModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const clientsPerPage = 8;

    // Lógica para datos filtrados
    const filteredData = useMemo(() => {
        if (!searchTerm) return Data;
        const term = searchTerm.toLowerCase();
        return Data.filter((item) =>
            Object.values(item).some((field) =>
                field.toString().toLowerCase().includes(term)
            )
        );
    }, [searchTerm, Data]);

    // Lógica para paginación
    const paginatedData = useMemo(() => {
        const start = currentPage * clientsPerPage;
        return filteredData.slice(start, start + clientsPerPage);
    }, [currentPage, filteredData, clientsPerPage]);

    // Gestión del cambio de página
    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const handleEdit = (row) => {
        setFormData(row);
        setIsOpen(true);
    };

    const handleDelete = (row) => {
        Swal.fire({
            title: 'Eliminar Cliente',
            text: '¿Estás seguro de eliminar el cliente?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setData((prev) => prev.filter((item) => item.documento !== row.documento));
                Swal.fire('Eliminado!', 'El cliente ha sido eliminado.', 'success');
            }
        })
    };

    const handleView = (detalle) => {
        console.log(detalle);
        setModal(true);
        setFormData(detalle);
    };

    const actions = acionecitas(handleEdit, handleDelete, handleView);

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setFormData({});
        setIsOpen(false);
        setModal(false);
    };

    const handleFormSubmit = (datos, initialData) => {
        if (Object.keys(initialData).length === 0) {
            console.log("Agregado");
            setData((prev) => [...prev, datos]);
            handleCloseModal();
            Swal.fire('Agregado!', 'El cliente ha sido agregado.', 'success');
        } else {
            Swal.fire({
                title: 'Actualizar Cliente',
                text: '¿Estás seguro de actualizar el cliente?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, actualizar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    setData((prev) => prev.map((item) => (item.documento === datos.documento ? datos : item)));
                    handleCloseModal();
                    Swal.fire('Actualizado!', 'El cliente ha sido actualizado.', 'success');
                }
            })
        }
    };

    const handleStateChange = (documento, newState) => {
        Swal.fire({
            title: 'Cambiar Estado',
            text: '¿Estás seguro de cambiar el estado del cliente?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, cambiar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setData((prevData) =>
                    prevData.map((item) =>
                        item.documento === documento ? { ...item, estado: newState } : item
                    )
                );
                Swal.fire('Estado cambiado!', 'El estado del cliente ha sido cambiado.', 'success');
            }
        });
    };

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
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="cliente-btn btn-primary">Buscar</button>
                </div>
                <div className="cliente-actions">
                    <button onClick={handleOpenModal} className="cliente-btn btn-primary">Agregar</button>
                    <FormModal show={isOpen} handleClose={handleCloseModal} handleSubmit={handleFormSubmit} initialData={FormData} />
                    <ModalDetalle isOpen={Modal} onClose={handleCloseModal} row={FormData} />
                </div>
            </div>
            <CustomTable
                columns={columns}
                data={paginatedData}
                actions={actions}
                onStateChange={handleStateChange}
            />
            <ReactPaginate
                previousLabel={"Anterior"}
                nextLabel={"Siguiente"}
                breakLabel={"..."}
                pageCount={Math.ceil(filteredData.length / clientsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination-container"}
                activeClassName={"active"}
            />
        </div>
    );
}

export default Cliente

