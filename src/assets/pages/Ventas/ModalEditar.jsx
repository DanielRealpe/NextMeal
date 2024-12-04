import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

const ModalEditar = ({ show, handleClose, venta, onSave }) => {
    const [editedVenta, setEditedVenta] = useState({});

    useEffect(() => {
        if (venta) {
            setEditedVenta({ ...venta });
        }
    }, [venta]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedVenta(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        // Validaciones básicas
        if (!editedVenta.empleado || !editedVenta.cliente) {
            Swal.fire("Error", "Empleado y Cliente son campos obligatorios", "error");
            return;
        }

        onSave(editedVenta);
        handleClose();
    };

    if (!venta) return null;

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Editar Venta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>ID de Venta</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={editedVenta.id || ''} 
                            readOnly 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control 
                            type="date" 
                            name="fecha"
                            value={editedVenta.fecha || ''} 
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Empleado</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="empleado"
                            value={editedVenta.empleado || ''} 
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Cliente</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="cliente"
                            value={editedVenta.cliente || ''} 
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Estado de Venta</Form.Label>
                        <Form.Control 
                            as="select" 
                            name="estadoVenta"
                            value={editedVenta.estadoVenta || ''} 
                            onChange={handleChange}
                        >
                            <option value="Pagada">Pagada</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Anulada">Anulada</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Guardar Cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEditar;