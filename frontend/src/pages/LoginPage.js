import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3001/auth/login', { email, senha });
      localStorage.setItem('usuario', JSON.stringify(res.data.usuario));
      navigate('/restaurantes');
    } catch (error) {
      alert('Falha no login. Verifique seu e-mail e senha.');
    }
  };

  return (
    <div className="container">
      <h2>Entrar</h2>
      <div className="form-group">
        <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Entrar</button>

      <div style={{ marginTop: '1.5rem', width: '100%', textAlign: 'center' }}>
        <p>
          <Link to="/forgot-password">Esqueceu a senha?</Link>
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          Não tem uma conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
