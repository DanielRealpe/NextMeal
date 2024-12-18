import './Configuracion.css';
import { useState, useMemo, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { data, columns, acionecitas, generateId } from './constantesConfiguracion';
import CustomTable from '../../../components/Table';
import FormModal from './ModalForm';
import ViewRolModal from './ModalDetalle';
import Swal from 'sweetalert2';

function Configuracion() {
    const [searchTerm, setSearchTerm] = useState('');
    const [Data, setData] = useState(data);
    const [datos, setDatos] = useState(data);
    const [formData, setFormData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [curra, setCurra] = useState(0);
    const categoriesPerPage = 5;

    const handleSearch = () => {
        setDatos(Data);
        setData(Data.filter((item) =>
            item.id.toString().includes(searchTerm.toLowerCase()) ||
            item.rol.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
        ));
        setCurra(currentPage)
        setCurrentPage(0);
    };

    // Refrescar la tabla al borrar el filtro
    useEffect(() => {
        if (searchTerm === '') {
            setData(datos);
            setCurrentPage(curra);
        }
    }, [searchTerm]);

    // Lógica para datos filtrados
    const filteredData = useMemo(() => {
        if (!searchTerm) return Data;
        const term = searchTerm.toLowerCase();
        return Data.filter((item) =>
            Object.values(item).some((field) =>
                field.toString().toLowerCase().includes(term)
            )
        );
    }, [Data]);

    // Lógica para paginación
    const paginatedData = useMemo(() => {
        const start = currentPage * categoriesPerPage;
        return filteredData.slice(start, start + categoriesPerPage);
    }, [currentPage, filteredData, categoriesPerPage]);

    // Gestión del cambio de página
    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };
    const handleOpenDetail = (row) => {
        setFormData(row);
        setShowDetail(true);
    };

    const handleDelete = (row) => {
        Swal.fire({
            title: 'Eliminar Rol',
            text: '¿Estás seguro de eliminar el rol?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {

                setData(Data.filter((item) => item.id !== row.id));
                Swal.fire(
                    'Eliminado!',
                    'La rol ha sido eliminado.',
                    'success'
                );
            }
        });
    };

    const handleCloseModal = () => {
        setShowDetail(false);
        setFormData({});
        setShowModal(false);
    };

    const handleEdit = (row) => {
        setFormData(row);
        setShowModal(true);
    }

    const handleSubmit = (formData, initialData) => {
        if (Object.keys(initialData).length === 0) {
            Swal.fire('Agregado', 'El rol ha sido agregada', 'success');
            console.log(formData);
            setData([...Data, { ...formData, id: generateId(Data) }]);
            handleCloseModal();
        } else {
            Swal.fire({
                title: 'Actualizar Rol',
                text: '¿Estás seguro de actualizar el rol?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, actualizar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    setData(Data.map((item) => (item.id === formData.id ? formData : item)));
                    handleCloseModal();
                    Swal.fire('Actualizado', 'El rol ha sido actualizada', 'success');
                }
            })
        }
    };

    const actions = acionecitas(handleEdit, handleDelete, handleOpenDetail);

    const handleStateChange = (id, newState) => {
        Swal.fire({
            title: 'Cambiar Estado',
            text: '¿Estás seguro de cambiar el estado del rol?',
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
                        item.id === id ? { ...item, estado: newState } : item
                    )
                );
                Swal.fire('Estado cambiado!', 'El estado del rol ha sido cambiado.', 'success');
            }
        });
    };

    return (
        <div className="configuracion-container">
            <div className="configuracion-header">
                <h1 className="configuracion-title">Configuración de roles</h1>
            </div>
            <div className="configuracion-filters-container">
                <div className="configuracion-filters">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="search-input"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch} className="configuracion-btn btn-primary">Buscar</button>
                </div>
                <div className="configuracion-actions">
                    <button onClick={handleOpenModal} className="configuracion-btn btn-primary">Agregar</button>
                    <FormModal show={showModal} handleClose={handleCloseModal} handleSubmit={handleSubmit} initialData={formData} />
                    <ViewRolModal show={showDetail} handleClose={handleCloseModal} roleData={formData}/>
                </div>
            </div>
            <CustomTable data={paginatedData} columns={columns} actions={actions} onStateChange={handleStateChange} />
            <ReactPaginate
                previousLabel={"Anterior"}
                nextLabel={"Siguiente"}
                breakLabel={"..."}
                pageCount={Math.ceil(filteredData.length / categoriesPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination-container"}
                activeClassName={"active"}
            />
        </div>
    );
}

export default Configuracion