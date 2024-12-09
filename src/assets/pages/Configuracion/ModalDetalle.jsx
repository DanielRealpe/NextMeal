import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';
import '../../../styles/Modal.css';

const ViewRoleModal = ({ show, handleClose, roleData }) => {
    return (
        <Modal
            show={show}
            onHide={handleClose}
            className="modal-wrapper role-details-modal"
            centered
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Detalles del Rol</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <ListGroup variant="flush" className="role-details-list">
                    <ListGroup.Item className="role-detail-item">
                    <span className="detail-label">ID:</span> 
                    <span className="detail-value">{roleData.id}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="role-detail-item">
                    <span className="detail-label">Rol:</span> 
                    <span className="detail-value">{roleData.rol}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="role-detail-item">
                    <span className="detail-label">Descripción:</span> 
                    <span className="detail-value">{roleData.descripcion}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="role-detail-item">
                    <span className="detail-label">Estado:</span> 
                        <span className={`detail-value ${roleData.estado === 'Activo' ? 'text-success' : 'text-danger'}`}>
                            {roleData.estado}
                        </span>
                    </ListGroup.Item>
                    <ListGroup.Item className="role-detail-item">
                        <strong>Permisos:</strong>
                        <ul>
                            {Object.entries(roleData.privilegios || {}).map(([privilege, value]) => (
                                <li key={privilege}>
                                    {privilege}: {value ? 'Sí' : 'No'}
                                </li>
                            ))}
                        </ul>
                    </ListGroup.Item>
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ViewRoleModal;

