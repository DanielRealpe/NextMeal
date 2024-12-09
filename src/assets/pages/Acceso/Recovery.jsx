import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

export default function RecoverPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    React.useEffect(() => {
        document.body.classList.add('recover-page');
        return () => {
            document.body.classList.remove('recover-page');
        };
    }, []);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar si el correo tiene un formato válido
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setMessage('Por favor, introduce un correo válido.');
            return;
        }

        // Aquí normalmente harías una llamada a la API para procesar la solicitud de recuperación
        console.log('Solicitud de recuperación enviada para:', email);

        // Simular respuesta exitosa
        setMessage('Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.');
    };

    return (
        <div className="recover-password-container">
            <form>
                <h2>Recuperar Contraseña</h2>
                <p>Introduce tu correo electrónico para recibir un enlace de recuperación.</p>
                {message && <p className="info-message">{message}</p>}
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handleSubmit}>Enviar enlace</button>
                <p className="forgot-password" onClick={() => navigate('/login')}>
                    ¿Ya tienes una cuenta? Inicia sesión
                </p>
            </form>
        </div>
    );
}