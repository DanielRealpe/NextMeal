import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../../images/Logo Next Meal.png'; // Adjust the path to your logo
import './Login.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    React.useEffect(() => {
        document.body.classList.add('login-page');
        return () => {
            document.body.classList.remove('login-page');
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí normalmente harías una llamada a la API para verificar las credenciales
        if (username === 'admin' && password === '123') {
            localStorage.setItem('isAuthenticated', 'true');
            const origin = '/';
            navigate(origin);
        } else {
            setMessage('Credenciales inválidas');
            setUsername('');
            setPassword('');
            // alert('Credenciales inválidas');
        }
    };

    const handleRegister = () => {
        navigate('/register');
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <div className="header-img-container">
                    <img src={logoImage} alt="Company Logo" />
                </div>
                <h2>Iniciar sesión</h2>
                {message && <p className="error-message">{message}</p>}
                <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Iniciar sesión</button>
                <button type="button" onClick={handleRegister}>Registrarse</button>
                <p className="forgot-password" onClick={() => navigate('/recovery')}>
                    ¿Olvidaste tu contraseña?
                </p>
            </form>
        </div>
    );
}