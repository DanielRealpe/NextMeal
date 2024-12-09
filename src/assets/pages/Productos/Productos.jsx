import './Productos.css';
import { useState, useMemo, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { data, columns, acionecitas, generateId } from './constantesProductos';
import CustomTable from '../../../components/Table';
import ProductAddModal from './AddModal';
import ProductModal from './ModalDetalle';
import ProductEditModal from './EditModal';
import Swal from 'sweetalert2';

function Productos() {
    const [searchTerm, setSearchTerm] = useState('');
    const [Data, setData] = useState(data);
    const [datos, setDatos] = useState(data);
    const [formData, setFormData] = useState(data);
    const [showModal, setShowModal] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [curra, setCurra] = useState(0);
    const categoriesPerPage = 5;

    const handleSearch = () => {
        setDatos(Data);
        setData(Data.filter((item) =>
            item.id.toString().includes(searchTerm.toLowerCase()) ||
            item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.categoria.toLowerCase().includes(searchTerm.toLowerCase())
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
    const handleOpenEdit = (row) => {
        console.log(row.ingredientes);
        setFormData(row);
        setShowEdit(true);
    };

    const handleDelete = (row) => {
        Swal.fire({
            title: 'Eliminar Producto',
            text: '¿Estás seguro de eliminar el producto?',
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
                    'El producto ha sido eliminada.',
                    'success'
                );
            }
        });
    };

    const handleCloseModal = () => {
        setFormData({});
        setShowDetail(false);
        setShowEdit(false);
        setShowModal(false);
    };
    const handleEditSubmit = (formData) => {
        Swal.fire({
            title: 'Actualizar Producto',
            text: '¿Estás seguro de actualizar el producto?',
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
                Swal.fire('Actualizado', 'El producto ha sido actualizado', 'success');
            }
        })
    };

    const handleSubmit = (formData) => {
        Swal.fire('Agregado', 'El producto ha sido agregado', 'success');
        setData([...Data, { ...formData, id: generateId(Data) }]);
        handleCloseModal();
    };

    const actions = acionecitas(handleOpenEdit, handleDelete, handleOpenDetail);

    const handleStateChange = (id, newState) => {
        Swal.fire({
            title: 'Cambiar Estado',
            text: '¿Estás seguro de cambiar el estado de el producto?',
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
                Swal.fire('Estado cambiado!', 'El estado de el producto ha sido cambiado.', 'success');
            }
        });
    };

    return (
        <div className="productos-container">
            <div className="productos-header">
                <h1 className="productos-title">Gestión de Productos</h1>
            </div>
            <div className="productos-filters-container">
                <div className="productos-filters">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="search-input"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch} className="productos-btn btn-primary">Buscar</button>
                </div>
                <div className="productos-actions">
                    <button onClick={handleOpenModal} className="productos-btn btn-primary">Agregar</button>
                    <ProductAddModal show={showModal} onClose={handleCloseModal} onSave={handleSubmit} formData={formData} />
                    <ProductEditModal show={showEdit} onClose={handleCloseModal} onSave={handleEditSubmit} product={formData} />
                    <ProductModal show={showDetail} onClose={handleCloseModal} product={formData} ingredientes={formData.ingredientes} />
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

export default Productos