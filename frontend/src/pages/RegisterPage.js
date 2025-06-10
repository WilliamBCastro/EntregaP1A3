import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!nome || !email || !senha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    axios.post('http://localhost:3001/auth/register', { nome, email, senha })
      .then(res => {
        alert('Cadastro realizado com sucesso! Você já pode fazer o login.');
        navigate('/'); 
      })
      .catch(err => {
        console.error("Erro no cadastro:", err);
        alert('Erro ao realizar o cadastro. O e-mail já pode estar em uso.');
      });
  };

  return (
    <div className="container">
      <h2>Criar Conta</h2>
      <div className="form-group">
        <input type="text" placeholder="Nome completo" value={nome} onChange={e => setNome(e.target.value)} />
      </div>
      <div className="form-group">
        <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
      </div>
      <button onClick={handleRegister}>Cadastrar</button>
      <p style={{ marginTop: '1rem' }}>
        Já tem uma conta? <Link to="/">Faça o login</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
