import React, { useState, useEffect } from 'react';
import '../../../styles/Modal.css';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { FaEyeSlash, FaEye } from "react-icons/fa";

const FormModal = ({ show, handleClose, handleSubmit, initialData = {} }) => {
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({}); // Estado para los mensajes de error
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
                } else if (value.length < 3) {
                    error = "El nombre debe tener al menos 3 caracteres.";
                } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                    error = "El nombre solo puede contener letras y espacios.";
                }
                break;
            case "apellido":
                // Validar el campo apellido
                if (!value) {
                    error = "El apellido es obligatorio.";
                } else if (/\d/.test(value)) {
                    error = "El apellido no puede contener números.";
                }
                break;
            case "direccion":
                // Validar el campo direccion
                if (!value) {
                    error = "La direccion es obligatoria.";
                }
                break;
            case "telefono":
                // Validar el campo telefono
                if (!value) {
                    error = "El telefono es obligatorio.";
                } else if (/\D/.test(value)) {
                    error = "El telefono solo puede contener números.";
                }
                break;
            case "documento":
                // Validar el campo documento
                if (!value) {
                    error = "El documento es obligatorio.";
                } else if (/\D/.test(value)) {
                    error = "El documento solo puede contener números.";
                } else if (formData.documento !== value) {
                    error = "El documento debe ser único.";
                }
                break;
            case "contrasena":
                // Validar el campo contrasena
                if (!value) {
                    error = "La contraseña es obligatoria.";
                } else if (value.length < 8 || !/\d/.test(value) || !/[A-Z]/.test(value) || !/[a-z]/.test(value)) {
                    error = "Al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.";

                }
                break;
            case "confirmarContrasena":
                // Validar el campo confirmarContrasena
                if (!value) {
                    error = "La confirmación de contraseña es obligatoria.";
                } else if (value !== formData.contrasena) {
                    error = "Las contraseñas no coinciden.";
                }
            // Agrega más validaciones según los campos
            default:
                break;
        }

        setErrors((prev) => ({ ...prev, [fieldName]: error }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.nombre || formData.nombre.length < 3) {
            newErrors.nombre = "El nombre debe tener al menos 3 caracteres.";
        }
        if (!formData.apellido || /\d/.test(formData.apellido)) {
            newErrors.apellido = "El apellido es obligatorio.";
        }
        if (!formData.direccion) {
            newErrors.direccion = "La direccion es obligatoria.";
        }
        if (!formData.telefono || /\D/.test(formData.telefono)) {
            newErrors.telefono = "El telefono es obligatorio.";
        }
        if (!formData.documento || /\D/.test(formData.documento)) {
            newErrors.documento = "El documento es obligatorio.";
        }
        if (!formData.contrasena || formData.contrasena.length < 8 || !/\d/.test(formData.contrasena) || !/[A-Z]/.test(formData.contrasena) || !/[a-z]/.test(formData.contrasena)) {
            newErrors.contrasena = "La contraseña es obligatoria.";
        }
        if (!formData.confirmarContrasena || formData.confirmarContrasena !== formData.contrasena) {
            newErrors.confirmarContrasena = "Las contraseñas no coinciden.";
        }
        // Agrega validaciones para otros campos
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
    };

    useEffect(() => {
        if (Object.keys(initialData).length === 0) {
            setFormData({
                estado: 'Activo',
                tipoDocumento: 'CC',
            });
            setErrors({});
            setShowPassword(false);
            setShowConfirmPassword(false);
        } else {
            setFormData(initialData);
            setErrors({});
            setShowPassword(false);
            setShowConfirmPassword(false);
        }
    }, [show, initialData]);

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
                <Modal.Title>Formulario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Row className="mb-3">
                        <Col md={6}>
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
                            <Form.Group className="mb-3" controlId="formAddress">
                                <Form.Label>Direccion</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="direccion"
                                    value={formData.direccion || ''}
                                    onChange={handleChange}
                                    placeholder="Ingrese su direccion"
                                    isInvalid={!!errors.direccion}
                                // required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.direccion}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formLastName">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="apellido"
                                    value={formData.apellido || ''}
                                    onChange={handleChange}
                                    placeholder="Ingrese su apellido"
                                    isInvalid={!!errors.apellido}
                                // required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.apellido}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPhone">
                                <Form.Label>Telefono</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="telefono"
                                    value={formData.telefono || ''}
                                    onChange={handleChange}
                                    placeholder="Ingrese su telefono"
                                    isInvalid={!!errors.telefono}
                                // required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.telefono}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Row>
                                <Col md={3}>
                                    <Form.Group className="mb-3" controlId="formDocumentType">
                                        <Form.Label>Tipo. Doc</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="tipoDocumento"
                                            value={formData.tipoDocumento || ''}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="CC">CC</option>
                                            <option value="CE">CE</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col md={9}>
                                    <Form.Group className="mb-3" controlId="formDocument">
                                        <Form.Label>Documento</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="documento"
                                            value={formData.documento || ''}
                                            onChange={handleChange}
                                            placeholder="Documento"
                                            isInvalid={!!errors.documento}
                                        // required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.documento}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Contraseña</Form.Label>
                                <div className="input-group">
                                    <Form.Control
                                        type={showPassword ? "text" : "password"}
                                        name="contrasena"
                                        value={formData.contrasena || ''}
                                        onChange={handleChange}
                                        placeholder="Ingrese su contraseña"
                                        isInvalid={!!errors.contrasena}
                                    />
                                    <span
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="input-group-text" // Este se puede quitar si no deseas ningún estilo extra
                                        style={{ cursor: 'pointer' }} // Esto hace que sea clickeable
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Ícono sin contorno de botón */}
                                    </span>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.contrasena}
                                    </Form.Control.Feedback>
                                </div>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Confirmar Contraseña</Form.Label>
                                <div className="input-group">
                                    <Form.Control
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmarContrasena"
                                        value={formData.confirmarContrasena || ''}
                                        onChange={handleChange}
                                        placeholder="Confirme su contraseña"
                                        isInvalid={!!errors.confirmarContrasena}
                                    // required
                                    />
                                    <span
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="input-group-text" // Este se puede quitar si no deseas ningún estilo extra
                                        style={{ cursor: 'pointer' }} // Esto hace que sea clickeable
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} {/* Ícono sin contorno de botón */}
                                    </span>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.confirmarContrasena}
                                    </Form.Control.Feedback>
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
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

