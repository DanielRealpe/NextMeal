import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalDetalle = ({ show, handleClose, venta }) => {
    if (!venta) return null;

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Detalle de Venta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-6">
                        <h5>Información de Venta</h5>
                        <p><strong>ID:</strong> {venta.id}</p>
                        <p><strong>Fecha:</strong> {venta.fecha}</p>
                        <p><strong>Empleado:</strong> {venta.empleado}</p>
                        <p><strong>Cliente:</strong> {venta.cliente}</p>
                        <p><strong>Estado:</strong> {venta.estadoVenta}</p>
                    </div>
                    <div className="col-md-6">
                        <h5>Pagos</h5>
                        {venta.pagos && venta.pagos.length > 0 ? (
                            venta.pagos.map((pago, index) => (
                                <div key={index} className="mb-2">
                                    <p><strong>Método:</strong> {pago.metodoPago}</p>
                                    <p><strong>Fecha:</strong> {pago.fecha}</p>
                                </div>
                            ))
                        ) : (
                            <p>No hay pagos registrados</p>
                        )}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalDetalle;