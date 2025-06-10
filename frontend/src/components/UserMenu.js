import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserMenu = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('usuario');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('usuario');
        setUser(null);
        navigate('/');
    };

    if (!user) return null;

    return (
        <div className="user-menu">
            <span>Olá, {user.nome.split(' ')[0]}</span>
            <div className="user-menu-dropdown">
                <Link to="/perfil">Meu Perfil</Link>
                <Link to="/meus-pedidos">Meus Pedidos</Link> {/* Link adicionado */}
                <button onClick={handleLogout} className="logout-button">Sair</button>
            </div>
        </div>
    );
};

export default UserMenu;
