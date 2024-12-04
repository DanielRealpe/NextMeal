import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import { data as Clientes } from "../Cliente/constantes";
import Swal from "sweetalert2";
import "./Pedidos.css";
import "./Modal.css";

const PedidoAgregar = ({ show, handleClose, handleGuardar, pedidoEditable }) => {
    const categories = ["Perro", "Bebidas", "Salchipapas"];
    const productsData = {
        Perro: [
            { id: 1, name: "Perro con queso y tocineta", price: 36000 },
            { id: 2, name: "Perra", price: 10000 },
        ],
        Bebidas: [
            { id: 3, name: "Coca Cola", price: 3500 },
            { id: 4, name: "Sprite", price: 2000 },
        ],
        Salchipapas: [
            { id: 5, name: "Choripapa", price: 5000 },
            { id: 6, name: "SalchiMonster", price: 7000 },
        ],
    };

    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectedClient, setSelectedClient] = useState("");

    useEffect(() => {
        if (show) {
            if (pedidoEditable) {
                setSelectedProducts(pedidoEditable.products || []);
                setSelectedClient(pedidoEditable.clienteDocumento || "");
            } else {
                setSelectedCategory("");
                setSelectedProducts([]);
                setSelectedClient("");
            }
        }
    }, [show, pedidoEditable]);

    const handleAddProduct = (product) => {
        if (selectedProducts.some(p => p.id === product.id)) {
            Swal.fire('Aviso', 'Este producto ya está en la lista', 'info');
            return;
        }
        setSelectedProducts(prev => [...prev, { ...product, quantity: 1 }]);
    };

    const handleRemoveProduct = (id) => {
        setSelectedProducts(prev => prev.filter(item => item.id !== id));
    };

    const handleQuantityChange = (id, quantity) => {
        if (quantity < 1) {
            Swal.fire('Error', 'La cantidad debe ser mayor a 0', 'error');
            return;
        }
        setSelectedProducts(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const handleSave = () => {
        if (!selectedClient) {
            Swal.fire('Error', 'Por favor, seleccione un cliente', 'error');
            return;
        }
        if (selectedProducts.length === 0) {
            Swal.fire('Error', 'Por favor, agregue al menos un producto', 'error');
            return;
        }

        handleGuardar(selectedProducts, selectedClient, !!pedidoEditable);
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered className="modal-wrapper">
            <Modal.Header closeButton>
                <Modal.Title>
                    {pedidoEditable ? 'Editar Pedido' : 'Nuevo Pedido'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Cliente</Form.Label>
                    <Form.Select
                        value={selectedClient}
                        onChange={(e) => setSelectedClient(e.target.value)}
                        className="form-control"
                    >
                        <option value="">Seleccione un cliente</option>
                        {Clientes.map((cliente) => (
                            <option key={cliente.documento} value={cliente.documento}>
                                {cliente.nombre} {cliente.apellido} - {cliente.documento}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Categoría</Form.Label>
                    <Form.Select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="form-control"
                    >
                        <option value="">Seleccione una categoría</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                {selectedCategory && (
                    <div className="mb-4">
                        <h5>Productos disponibles</h5>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productsData[selectedCategory].map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>${product.price.toLocaleString()}</td>
                                        <td>
                                            <Button
                                                variant="primary"
                                                onClick={() => handleAddProduct(product)}
                                            >
                                                Agregar
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                )}

                <div>
                    <h5>Productos seleccionados</h5>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Total</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedProducts.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>${product.price.toLocaleString()}</td>
                                    <td>
                                        <Form.Control
                                            type="number"
                                            min="1"
                                            value={product.quantity}
                                            onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value, 10))}
                                            style={{ width: "80px" }}
                                        />
                                    </td>
                                    <td>${(product.price * product.quantity).toLocaleString()}</td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleRemoveProduct(product.id)}
                                        >
                                            Eliminar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="3" className="text-end"><strong>Total:</strong></td>
                                <td colSpan="2">
                                    <strong>
                                        ${selectedProducts.reduce((sum, product) => 
                                            sum + (product.price * product.quantity), 0
                                        ).toLocaleString()}
                                    </strong>
                                </td>
                            </tr>
                        </tfoot>
                    </Table>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    {pedidoEditable ? 'Actualizar' : 'Guardar'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PedidoAgregar;