import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function ForgotPasswordPage() {
  const [step, setStep] = useState('email'); 
  const [email, setEmail] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailSubmit = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setStep('code');
  };

  const handleCodeVerification = () => {
    if (inputCode === generatedCode) {
      setStep('reset');
    } else {
      alert('Código inválido. Tente novamente.');
    }
  };

  const handlePasswordReset = () => {
    axios.post('http://localhost:3001/auth/reset-password', { email, senha: newPassword })
      .then(res => {
        alert('Senha alterada com sucesso!');
        navigate('/');
      })
      .catch(err => {
        console.error("Erro ao alterar senha:", err);
        alert('Não foi possível alterar a senha. Verifique o e-mail e tente novamente.');
      });
  };

  return (
    <div className="container">
      {step === 'email' && (
        <>
          <h2>Recuperar Senha</h2>
          <p>Digite seu e-mail para receber o código de verificação.</p>
          <div className="form-group">
            <input type="email" placeholder="Seu e-mail" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <button onClick={handleEmailSubmit}>Enviar Código</button>
        </>
      )}

      {step === 'code' && (
        <>
          <h2>Verificação</h2>
          <p>Um código foi gerado. Por favor, digite-o abaixo.</p>
          <div style={{ background: '#eee', padding: '1rem', borderRadius: '8px', margin: '1rem 0', fontSize: '2rem', letterSpacing: '0.5rem' }}>
            <strong>{generatedCode}</strong>
          </div>
          <div className="form-group">
            <input type="text" placeholder="Digite o código de 6 dígitos" value={inputCode} onChange={e => setInputCode(e.target.value)} maxLength="6" />
          </div>
          <button onClick={handleCodeVerification}>Verificar Código</button>
        </>
      )}

      {step === 'reset' && (
        <>
          <h2>Nova Senha</h2>
          <p>Digite sua nova senha para o e-mail: {email}</p>
          <div className="form-group">
            <input type="password" placeholder="Digite a nova senha" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
          </div>
          <button onClick={handlePasswordReset}>Alterar Senha</button>
        </>
      )}

      <p style={{ marginTop: '1rem' }}>
        Lembrou a senha? <Link to="/">Voltar para o Login</Link>
      </p>
    </div>
  );
}

export default ForgotPasswordPage;
