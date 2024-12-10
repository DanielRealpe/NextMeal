import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const ProductEditModal = ({
    show,
    onClose,
    onSave,
    product
}) => {
    const [formData, setFormData] = useState({
        nombre: '',
        stock: '',
        precio: '',
        estado: 'Activo',
        categoria: '',
        descripcion: '',
        preparacion: '',
        img: '',
        ingredientes: [{ ingrediente: '', cantidad: '' }]
    });

    useEffect(() => {
        if (product) {
            setFormData({
                ...product,
                ingredientes: product.ingredientes || [{ ingrediente: '', cantidad: '' }]
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleIngredienteChange = (index, e) => {
        const { name, value } = e.target;
        const newIngredientes = [...formData.ingredientes];
        newIngredientes[index][name] = value;
        setFormData(prev => ({
            ...prev,
            ingredientes: newIngredientes
        }));
    };

    const addIngrediente = () => {
        setFormData(prev => ({
            ...prev,
            ingredientes: [...prev.ingredientes, { ingrediente: '', cantidad: '' }]
        }));
    };

    const removeIngrediente = (index) => {
        const newIngredientes = formData.ingredientes.filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            ingredientes: newIngredientes
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <Modal
            show={show}
            onHide={onClose}
            className="modal-wrapper"
            size="lg"
            centered
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Editar Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Row>
                                <Col md={8}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Precio</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="precio"
                                            value={formData.precio}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={3} className="d-flex align-items-center">
                                    <Form.Group className="mb-3" controlId="formStatus">
                                        <Form.Label>Estado</Form.Label>
                                        <Form.Check
                                            type="switch"
                                            name="estado"
                                            id="custom-switch"
                                            label={formData.estado === 'Activo' ? 'Activo' : 'Inactivo'}
                                            checked={formData.estado === 'Activo'}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    estado: e.target.checked ? 'Activo' : 'Inactivo',
                                                }))
                                            }
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formRol">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="categoria"
                                    value={formData.categoria || ''}
                                    onChange={handleChange}
                                required
                                >
                                    {formData.categoria !== '' ?? <option value={formData.categoria}>{formData.categoria}</option>}
                                    <option value="">Seleccione un categoria</option>
                                    <option value="Hamburguesa">Hamburguesa</option>
                                    <option value="Salchipapas">Salchipapas</option>
                                    <option value="Pizzas">Pizzas</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Subir Imagen</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*" // Solo permite subir imágenes
                                    onChange={(e) => {
                                        const file = e.target.files[0]; // Obtén el primer archivo seleccionado
                                        if (file) {
                                            const reader = new FileReader(); // Crea un lector de archivos
                                            reader.onload = () => {
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    img: reader.result, // Establece el contenido base64 como el src
                                                }));
                                            };
                                            reader.readAsDataURL(file); // Lee el archivo como una URL de datos
                                        }
                                    }}
                                />
                            </Form.Group>


                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="descripcion"
                                    value={formData.descripcion}
                                    onChange={handleChange}
                                    rows={3}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Preparación</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="preparacion"
                                    value={formData.preparacion}
                                    onChange={handleChange}
                                    rows={3}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <div className="privileges-table mb-3">
                                <div className="privileges-header">
                                    <div className="privileges-column">Ingrediente</div>
                                    <div className="privileges-column">Cantidad</div>
                                    <div className="privileges-column">Acciones</div>
                                </div>
                                {formData.ingredientes.map((ingrediente, index) => (
                                    <div key={index} className="privileges-row">
                                        <div className="privileges-column">
                                            <Form.Control
                                                type="text"
                                                name="ingrediente"
                                                value={ingrediente.ingrediente}
                                                onChange={(e) => handleIngredienteChange(index, e)}
                                                placeholder="Ingrediente"
                                            />
                                        </div>
                                        <div className="privileges-column">
                                            <Form.Control
                                                type="text"
                                                name="cantidad"
                                                value={ingrediente.cantidad}
                                                onChange={(e) => handleIngredienteChange(index, e)}
                                                placeholder="Cantidad"
                                            />
                                        </div>
                                        <div className="privileges-column">
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => removeIngrediente(index)}
                                            >
                                                Eliminar
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                <div className="privileges-row">
                                    <div className="privileges-column" colSpan="3">
                                        <Button
                                            variant="secondary"
                                            onClick={addIngrediente}
                                        >
                                            Añadir Ingrediente
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button type="submit" variant="primary">
                            Guardar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ProductEditModal;