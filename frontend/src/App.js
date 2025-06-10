import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import RestaurantesPage from './pages/RestaurantesPage';
import RestauranteDetailPage from './pages/RestauranteDetailPage';
import CarrinhoPage from './pages/CarrinhoPage';
import ConfirmacaoPage from './pages/ConfirmacaoPage';
import ProfilePage from './pages/ProfilePage';
import MyOrdersPage from './pages/MyOrdersPage'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas de autenticação (sem cabeçalho) */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Rotas do aplicativo (com cabeçalho) */}
        <Route element={<Layout />}>
          <Route path="/restaurantes" element={<RestaurantesPage />} />
          <Route path="/restaurante/:id" element={<RestauranteDetailPage />} />
          <Route path="/carrinho" element={<CarrinhoPage />} />
          <Route path="/confirmacao" element={<ConfirmacaoPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/meus-pedidos" element={<MyOrdersPage />} /> {/* 2. Adicionar a rota */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
