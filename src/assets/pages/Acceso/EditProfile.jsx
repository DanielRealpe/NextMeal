import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import './Edit.css';

export default function EditProfile() {
    const [formData, setFormData] = useState({
        username: 'UsuarioEjemplo',
        email: 'usuario@ejemplo.com',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        document.body.classList.add('edit-profile-page');
        return () => {
            document.body.classList.remove('edit-profile-page');
        };
    }, []);

    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'username':
                if (value.length < 3) {
                    error = 'El usuario debe tener al menos 3 caracteres.';
                }
                break;
            case 'email':
                if (!/\S+@\S+\.\S+/.test(value)) {
                    error = 'El correo electrónico no es válido.';
                }
                break;
            case 'password':
                if (value && (value.length < 8 || !/\d/.test(value) || !/[A-Z]/.test(value) || !/[a-z]/.test(value))) {
                    error = 'Al menos 8 caracteres, un número, una mayúscula y una minúscula.';
                }
                break;
            case 'confirmPassword':
                if (value && value !== formData.password) {
                    error = 'Las contraseñas no coinciden.';
                }
                break;
            default:
                break;
        }

        setErrors((prev) => ({ ...prev, [name]: error }));
        return error; // Devuelve el error para uso en handleSubmit
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) {
                newErrors[key] = error;
            }
        });

        if (Object.keys(newErrors).length === 0) {
            // Aquí iría la lógica para actualizar el perfil
            Swal.fire({
                title: 'Actualizar Perfil',
                text: '¿Estás seguro de actualizar el perfil?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, actualizar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Aquí iría la lógica para actualizar el perfil
                    Swal.fire('Actualizado', 'El perfil ha sido actualizado', 'success');
                }
            });
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="edit-profile-container">
            <h1 className="edit-profile-header">Editar Perfil</h1>
            <Form className="edit-profile-form" onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="username">
                            <Form.Label>Nombre de Usuario</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                isInvalid={!!errors.username}
                            />
                            <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="email">
                            <Form.Label>Correo Electrónico</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="password">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="confirmPassword">
                            <Form.Label>Confirmar Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                isInvalid={!!errors.confirmPassword}
                            />
                            <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <div className="edit-profile-actions mt-4">
                    <Button type="submit" variant="primary" className="save-button me-2">
                        Guardar Cambios
                    </Button>
                    {/* <Button type="button" variant="secondary" className="cancel-button">
                        Cancelar
                    </Button> */}
                </div>
            </Form>
        </div>
    );
}
