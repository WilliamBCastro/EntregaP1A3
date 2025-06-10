import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useView } from '../context/ViewContext';
import ViewToggleButton from './ViewToggleButton';
import UserMenu from './UserMenu'; 

const Header = () => (
  <header>
    <div className="header-container">
      <Link to="/restaurantes" className="header-content">
        <img src="https://i.ibb.co/HpqLzgkv/Logo-1.jpg" alt="Logotipo da Empresa" />
        <h1>Quick Launch</h1>
      </Link>
      <UserMenu /> {/* Adicionar UserMenu aqui */}
    </div>
  </header>
);

const Layout = () => {
  const { viewMode } = useView();

  return (
    <div className={`app-container ${viewMode}-view`}>
      <Header />
      <main>
        <Outlet />
      </main>
      <ViewToggleButton />
    </div>
  );
};

export default Layout;
	