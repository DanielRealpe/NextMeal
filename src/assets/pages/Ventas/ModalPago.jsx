import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { pedidos } from './constantes';

const PaymentModal = ({ show, handleClose, onSave, editData }) => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState();
    const [receipt, setReceipt] = useState(null);
    const [employee, setEmployee] = useState('');
    const [details, setDetails] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOrders, setFilteredOrders] = useState(pedidos);

    useEffect(() => {
        if (show) {
            if (editData) {
                setSelectedOrder(editData.order);   
                setPaymentMethod(<option value="tarjeta">{editData.metodoPago}</option>);
                console.log(editData.metodoPago);
                setEmployee(editData.empleado);
                setDetails(editData.details);
            } else {
                resetForm();
            }
        }
    }, [show, editData]);

    useEffect(() => {
        const filtered = pedidos.filter(order => 
            order.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.idPedidos.toString().includes(searchTerm)
        );
        setFilteredOrders(filtered);
    }, [searchTerm]);

    const resetForm = () => {
        setSelectedOrder(null);
        setPaymentMethod('');
        setReceipt(null);
        setEmployee('');
        setDetails('');
        setSearchTerm('');
    };

    const validateForm = () => {
        if (!selectedOrder) {
            Swal.fire('Error', 'Debe seleccionar un pedido', 'error');
            return false;
        }
        if (!paymentMethod) {
            Swal.fire('Error', 'Debe seleccionar un método de pago', 'error');
            return false;
        }
        if (!employee.trim()) {
            Swal.fire('Error', 'Debe ingresar el nombre del empleado', 'error');
            return false;
        }
        return true;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        const paymentData = {
            id: editData?.id || Date.now(),
            orderId: selectedOrder.idPedidos,
            order: selectedOrder,
            paymentMethod,
            employee,
            details,
            amount: selectedOrder.total,
            date: new Date().toISOString(),
            receipt: receipt ? URL.createObjectURL(receipt) : null
        };

        onSave(paymentData, !!editData);
        handleClose();
        resetForm();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                Swal.fire('Error', 'El archivo debe ser una imagen', 'error');
                return;
            }
            setReceipt(file);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    {editData ? 'Editar Pago' : 'Nuevo Pago'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!selectedOrder && (
                    <div className="mb-4">
                        <Form.Group>
                            <Form.Label>Buscar Pedido</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Buscar por nombre o ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Form.Group>
                        
                        <Table striped bordered hover className="mt-3">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Cliente</th>
                                    <th>Total</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map(order => (
                                    <tr key={order.idPedidos}>
                                        <td>{order.idPedidos}</td>
                                        <td>{order.nombre}</td>
                                        <td>${order.total.toLocaleString()}</td>
                                        <td>
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                onClick={() => setSelectedOrder(order)}
                                            >
                                                Seleccionar
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                )}

                {selectedOrder && (
                    <>
                        <div className="selected-order-info mb-4">
                            <h5>Detalles del Pedido</h5>
                            <Table bordered>
                                <tbody>
                                    <tr>
                                        <th>ID Pedido</th>
                                        <td>{selectedOrder.idPedidos}</td>
                                    </tr>
                                    <tr>
                                        <th>Cliente</th>
                                        <td>{selectedOrder.nombre}</td>
                                    </tr>
                                    <tr>
                                        <th>Total</th>
                                        <td>${selectedOrder.total.toLocaleString()}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>

                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Empleado</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nombre del empleado"
                                    value={employee}
                                    onChange={(e) => setEmployee(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Método de Pago</Form.Label>
                                <Form.Select
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                >
                                    <option value="">Seleccione un método</option>
                                    <option value="efectivo">Efectivo</option>
                                    <option value="tarjeta">Tarjeta</option>
                                    <option value="transferencia">Transferencia</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Detalles Adicionales</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={details}
                                    onChange={(e) => setDetails(e.target.value)}
                                    placeholder="Detalles adicionales del pago..."
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Comprobante de Pago</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </Form.Group>
                        </Form>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                {selectedOrder && (
                    <Button 
                        variant="secondary" 
                        onClick={() => setSelectedOrder(null)}
                        className="me-auto"
                    >
                        Cambiar Pedido
                    </Button>
                )}
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    {editData ? 'Actualizar' : 'Guardar'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PaymentModal;