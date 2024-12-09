import React, { useState, useEffect } from 'react';
import '../../../styles/Modal.css';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const FormModal = ({ show, handleClose, handleSubmit, initialData = {} }) => {
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const privileges = [
        'Dashboard',
        'Ventas',
        'Clientes',
        'Compras',
        'Produccion',
        'Usuarios',
        'Configuracion'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const handlePrivilegeChange = (privilege) => {
        setFormData((prev) => ({
            ...prev,
            privilegios: {
                ...prev.privilegios,
                [privilege]: !prev.privilegios?.[privilege]
            }
        }));
    };

    const validateField = (fieldName, value) => {
        let error = "";

        switch (fieldName) {
            case "rol":
                if (!value) {
                    error = "El nombre del rol es obligatorio.";
                }
                break;
            case "descripcion":
                if (!value) {
                    error = "La descripción es obligatoria.";
                }
                break;
            default:
                break;
        }

        setErrors((prev) => ({ ...prev, [fieldName]: error }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.rol) {
            newErrors.rol = "El nombre del rol es obligatorio.";
        }
        if (!formData.descripcion) {
            newErrors.descripcion = "La descripción es obligatoria.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        if (Object.keys(initialData).length === 0) {
            setFormData({
                estado: 'Activo',
                privilegios: {}
            });
            setErrors({});
        } else {
            setFormData(initialData);
            setErrors({});
        }
    }, [show, initialData]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            handleSubmit(formData, initialData);
            handleClose();
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
                <Modal.Title>{initialData.id ? 'Editar Rol' : 'Agregar Rol'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Rol</Form.Label>
                        <Form.Control
                            type="text"
                            name="rol"
                            value={formData.rol || ''}
                            onChange={handleChange}
                            placeholder="Ingrese el nombre del rol"
                            isInvalid={!!errors.rol}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.rol}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="descripcion"
                            value={formData.descripcion || ''}
                            onChange={handleChange}
                            placeholder="Ingrese su descripción"
                            isInvalid={!!errors.descripcion}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.descripcion}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPrivileges">
                        <Form.Label>Permisos</Form.Label>
                        {privileges.map((privilege) => (
                            <Form.Check
                                key={privilege}
                                type="switch"
                                id={`privilege-${privilege}`}
                                label={privilege}
                                checked={formData.privilegios?.[privilege] || false}
                                onChange={() => handlePrivilegeChange(privilege)}
                            />
                        ))}
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
        </Modal>
    );
};

export default FormModal;

