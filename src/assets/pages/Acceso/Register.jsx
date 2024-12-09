import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from "react-bootstrap"
import Swal from 'sweetalert2';
import logoImage from '../../images/Logo Next Meal.png'; // Adjust the path to your logo
import './Auth.css';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    React.useEffect(() => {
        document.body.classList.add('register-page');
        return () => {
            document.body.classList.remove('register-page');
        };
    }, []);

    const validateField = (name, value) => {
        let error = "";

        switch (name) {
            case "username":
                if (!value) {
                    error = "El usuario es obligatorio.";
                } else if (value.length < 3) {
                    error = "El usuario debe tener al menos 3 caracteres.";
                }
                break;
            case "email":
                if (!value) {
                    error = "El correo electrónico es obligatorio.";
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    error = "El correo electrónico no es válido.";
                }
                break;
            case "password":
                if (!value) {
                    error = "La contraseña es obligatoria.";
                } else if (value.length < 8 || !/\d/.test(value) || !/[A-Z]/.test(value) || !/[a-z]/.test(value)) {
                    error = "Al menos 8 caracteres, un número, una mayúscula y una minúscula.";
                }
                break;
            case "confirmPassword":
                if (!value) {
                    error = "La confirmación de contraseña es obligatoria.";
                } else if (value !== formData.password) {
                    error = "Las contraseñas no coinciden.";
                }
                break;
            default:
                break;
        }

        setErrors(prev => ({ ...prev, [name]: error }));

        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) {
                isValid = false;
                newErrors[key] = error;
            }
        });

        setErrors(newErrors); // Actualiza todos los errores al final
        return isValid;
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log('Usuario registrado:', formData);
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: 'El usuario ha sido registrado correctamente.',
            })
            navigate('/login');
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Registro fallido',
                text: 'Por favor, corrija los errores en el formulario.',
            });
        }
    };


    return (
        <div className="register-container">
            <Form onSubmit={handleSubmit}>
                <div className="header-img-container">
                    <img src={logoImage} alt="Company Logo" />
                </div>
                <h2>Registro</h2>
                <Row>
                    {/* Columna izquierda */}
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Nombre de usuario</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                placeholder="Usuario"
                                value={formData.username}
                                onChange={handleChange}
                            />
                            {errors.username && <Form.Text className="text-danger">{errors.username}</Form.Text>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Contraseña"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
                        </Form.Group>

                    </Col>

                    {/* Columna derecha */}
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Correo electrónico"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="confirmPassword">
                            <Form.Label>Confirmar contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirmar contraseña"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            {errors.confirmPassword && <Form.Text className="text-danger">{errors.confirmPassword}</Form.Text>}
                        </Form.Group>
                    </Col>
                </Row>

                <Button variant="primary" type="submit" className="w-100">
                    Registrar
                </Button>

                <p className="forgot-password" onClick={() => navigate('/login')} style={{ cursor: 'pointer', color: '#C55400' }}>
                    ¿Ya tienes una cuenta? Inicia sesión
                </p>
            </Form>
        </div>
    );
}