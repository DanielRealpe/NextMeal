import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

export default function ViewDetailModal({ show, handleClose, formData }) {
    return (
        <Modal
            show={show}
            onHide={handleClose}
            className="modal-wrapper"
            centered
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Detalles del Perfil</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={formData.nombre || ""}
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formLastName">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={formData.apellido || ""}
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Row>
                                <Col md={3}>
                                    <Form.Group className="mb-3" controlId="formDocumentType">
                                        <Form.Label>Tipo. Doc</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={formData.tipoDocumento || ""}
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={9}>
                                    <Form.Group className="mb-3" controlId="formDocument">
                                        <Form.Label>Documento</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={formData.documento || ""}
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="formRol">
                                        <Form.Label>Rol</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={formData.rol || ""}
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="formPhone">
                                        <Form.Label>Teléfono</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={formData.telefono || ""}
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={9}>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Correo</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={formData.correo || ""}
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                        <Form.Group className="mb-3" controlId="formStatus">
                                <Form.Label>Estado</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={formData.estado || ""}
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
