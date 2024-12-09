import React, { useState, useEffect } from 'react';
import '../../../styles/Modal.css';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const FormModal = ({ show, handleClose, handleSubmit, initialData = {} }) => {
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({}); // Estado para los mensajes de error

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        validateField(name, value); // Validar el campo en tiempo real
    };

    const validateField = (fieldName, value) => {
        let error = "";

        switch (fieldName) {
            case "nombre":
                if (!value) {
                    error = "El nombre es obligatorio.";
                }
                break;
            case "descripcion":
                if (!value) {
                    error = "La descripción es obligatoria.";
                }
                break;
            default:
                break;
        }

        setErrors((prev) => ({ ...prev, [fieldName]: error }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.nombre) {
            newErrors.nombre = "El nombre es obligatorio.";
        }
        if (!formData.descripcion) {
            newErrors.descripcion = "La descripción es obligatoria.";
        }
        // Agrega validaciones para otros campos
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
    };

    useEffect(() => {
        if (Object.keys(initialData).length === 0) {
            setFormData({
                estado: 'Activo',
            });
            setErrors({});
        } else {
            setFormData(initialData);
            setErrors({});
        }
    }, [show]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            handleSubmit(formData, initialData);
            handleClose(); // Cierra el modal si no hay errores
        }
    };

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
                <Modal.Title>{initialData.id ? 'Editar Categoria' : 'Agregar Categoria'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombre"
                            value={formData.nombre || ''}
                            onChange={handleChange}
                            placeholder="Ingrese su nombre"
                            isInvalid={!!errors.nombre}
                        // required
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.nombre}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="descripcion"
                            value={formData.descripcion || ''}
                            onChange={handleChange}
                            placeholder="Ingrese su descripcion"
                            isInvalid={!!errors.descripcion}
                        // required
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.descripcion}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Row>
                        <Col className='text-start'>
                            <Form.Group className="mb-3" controlId="formStatus">
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
                        <Col className="text-end">
                            <Button variant="secondary" onClick={handleClose} className="me-2">
                                Cancelar
                            </Button>
                            <Button variant="primary" type="submit">
                                Guardar
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal >
    );
};

export default FormModal;

