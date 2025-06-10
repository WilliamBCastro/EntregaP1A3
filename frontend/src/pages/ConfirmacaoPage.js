import React from 'react';
import { Link } from 'react-router-dom';

function ConfirmacaoPage() {
  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <h2>Pedido Realizado com Sucesso!</h2>
      <p>Obrigado pela sua preferência.</p>
      <p>Seu pedido já está sendo preparado pelo restaurante.</p>
      <Link to="/restaurantes">
        <button style={{ marginTop: 20 }}>Voltar para o Início</button>
      </Link>
    </div>
  );
}

export default ConfirmacaoPage;