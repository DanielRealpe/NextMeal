import React from "react";
import { Modal, Button, Table, Row, Col } from "react-bootstrap";

const ProductModal = ({ show, onClose, product, ingredientes = [] }) => {
    return (
        <Modal
            show={show}
            onHide={onClose}
            className="modal-wrapper"
            size="lg"  // Added to make the modal wider
            centered
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Detalles del Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="mb-4">
                    <Col md={4} className="text-center">
                        <img
                            src={product?.img}
                            alt={product?.nombre}
                            className="img-fluid rounded"
                            style={{
                                Width: "200px",
                                Height: "200px",
                                objectFit: "cover"
                            }}
                        />
                    </Col>
                    <Col md={8}>
                        <div className="role-details-list">
                            <div className="mb-2">
                                <span className="detail-label">Nombre</span>
                                <span className="detail-value">{product?.nombre}</span>
                            </div>
                            <div className="mb-2">
                                <span className="detail-label">Stock</span>
                                <span className="detail-value">{product?.stock} unidades</span>
                            </div>
                            <div className="mb-2">
                                <span className="detail-label">Precio</span>
                                <span className="detail-value">${product?.precio}</span>
                            </div>
                            <div className="mb-2">
                                <span className="detail-label">Estado</span>
                                <span className="detail-value">{product?.estado}</span>
                            </div>
                            <div className="mb-2">
                                <span className="detail-label">Categoria</span>
                                <span className="detail-value">{product?.categoria}</span>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <div className="mb-3">
                            <h6 className="detail-label mb-2">Descripción</h6>
                            <p className="">{product?.descripcion}</p>
                        </div>
                        <div className="mb-3">
                            <h6 className="detail-label mb-2">Preparación</h6>
                            <p className="">{product?.preparacion}</p>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="mb-3">
                            <h6 className="detail-label mb-2">Ingredientes</h6>
                            <div className="privileges-table">
                                <div className="privileges-header">
                                    <div className="privileges-column">Ingrediente</div>
                                    <div className="privileges-column">Cantidad</div>
                                </div>
                                {ingredientes.map((item, index) => (
                                    <div key={index} className="privileges-row">
                                        <div className="privileges-column">{item.ingrediente}</div>
                                        <div className="privileges-column">{item.cantidad}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProductModal;