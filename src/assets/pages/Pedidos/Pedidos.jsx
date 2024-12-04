import { useState } from "react";
import Swal from "sweetalert2";
import { columns } from "./constantes";
import CustomTable from "../../../components/Table";
import PedidoAgregar from "./ModalPedido";
import { data3000 as Clientes } from "../Cliente/constantes";
import "./Pedidos.css";

const Pedidos = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
    const [pedidos, setPedidos] = useState([
        {
            idPedidos: 1,
            fecha: "2024-12-01",
            nombre: "Ruben Dario Llanes Silva",
            direccion: 'Calle siempre viva',
            clienteDocumento: "96546765",
            estadoPedidos: "Pendiente",
            total: 150.0,
            products: [
                { id: 5657, name: "Producto A", price: 50, quantity: 1, total: 50 },
                { id: 8667, name: "Producto B", price: 100, quantity: 1, total: 100 },
            ],
        },
        {
            idPedidos: 2,
            fecha: "2024-12-01",
            nombre: "Carmen Beatriz Quiroz",
            direccion: 'Calle siempre viva',
            clienteDocumento: "1040789678",
            estadoPedidos: "Pendiente",
            total: 150.0,
            products: [
                { id: 4545, name: "Producto A", price: 50, quantity: 1, total: 50 },
                { id: 8989, name: "Producto B", price: 100, quantity: 1, total: 100 },
            ],
        },
        {
            idPedidos: 3,
            fecha: "2024-12-01",
            nombre: "Carlos Arvey Rúa Perez",
            direccion: 'Calle siempre viva',
            clienteDocumento: "1017198864",
            estadoPedidos: "Pendiente",
            total: 150.0,
            products: [
                { id: 6357, name: "Producto A", price: 50, quantity: 1, total: 50 },
                { id: 1434, name: "Producto B", price: 100, quantity: 1, total: 100 },
            ],
        },
    ]);
    const [nextId, setNextId] = useState(4); // Start from 4 since we have 3 initial orders

    const handleOpenModal = () => {
        setPedidoSeleccionado(null);
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setPedidoSeleccionado(null);
        setIsOpen(false);
    };

    const handleGuardarPedido = (productosSeleccionados, selectedClient, isEditing = false) => {
        const cliente = Clientes.find((c) => c.documento === selectedClient);

        if (!cliente) {
            Swal.fire("Error", "Cliente no encontrado", "error");
            return;
        }

        const total = productosSeleccionados.reduce(
            (acc, prod) => acc + prod.price * prod.quantity, 
            0
        );

        const pedidoData = {
            fecha: new Date().toISOString().split("T")[0],
            nombre: `${cliente.nombre} ${cliente.apellido}`,
            direccion: cliente.direccion,
            clienteDocumento: selectedClient,
            estadoPedidos: "Pendiente",
            total,
            products: productosSeleccionados.map(prod => ({
                ...prod,
                total: prod.price * prod.quantity
            }))
        };

        if (isEditing && pedidoSeleccionado) {
            // Update existing order
            setPedidos(prevPedidos => 
                prevPedidos.map(pedido => 
                    pedido.idPedidos === pedidoSeleccionado.idPedidos
                        ? { ...pedidoData, idPedidos: pedido.idPedidos }
                        : pedido
                )
            );
            Swal.fire("Éxito", "Pedido actualizado correctamente", "success");
        } else {
            // Create new order
            const nuevoPedido = {
                ...pedidoData,
                idPedidos: nextId
            };
            setPedidos(prevPedidos => [...prevPedidos, nuevoPedido]);
            setNextId(prevId => prevId + 1);
            Swal.fire("Éxito", "Pedido agregado correctamente", "success");
        }

        handleCloseModal();
    };

    const handleEditarPedido = (pedido) => {
        setPedidoSeleccionado(pedido);
        setIsOpen(true);
    };

    const handleEliminarPedido = (pedido) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setPedidos(prevPedidos => 
                    prevPedidos.filter(p => p.idPedidos !== pedido.idPedidos)
                );
                Swal.fire(
                    'Eliminado',
                    'El pedido ha sido eliminado.',
                    'success'
                );
            }
        });
    };

    return (
        <div className="pedidos-container">
            <div className="pedidos-header">
                <h1 className="pedidos-title">Gestión de Pedidos</h1>
            </div>
            <div className="pedidos-filters-container">
                <div className="pedidos-filters">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="search-input"
                    />
                    <button className="btn btn-primary">Buscar</button>
                </div>
                <div className="pedidos-actions">
                    <button onClick={handleOpenModal} className="btn btn-primary">
                        Agregar
                    </button>
                </div>
            </div>
            <CustomTable
                columns={columns}
                data={pedidos}
                actions={[
                    {
                        label: "Editar",
                        className: "btn-primary",
                        onClick: handleEditarPedido,
                    },
                    {
                        label: "Eliminar",
                        className: "btn-danger",
                        onClick: handleEliminarPedido,
                    },
                ]}
            />
            <PedidoAgregar
                show={isOpen}
                handleClose={handleCloseModal}
                handleGuardar={handleGuardarPedido}
                pedidoEditable={pedidoSeleccionado}
            />
        </div>
    );
};

export default Pedidos;