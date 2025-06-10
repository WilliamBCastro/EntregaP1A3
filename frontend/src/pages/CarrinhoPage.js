import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function CarrinhoPage() {
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const [total, setTotal] = useState(0);
  const [userAddress, setUserAddress] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('usuario'));
    if (!storedUser) {
      alert('Usuário não encontrado!');
      return;
    }
    const usuario_id = storedUser.id;

    axios.get(`http://localhost:3001/carrinho/${usuario_id}`)
      .then(res => {
        setItensCarrinho(res.data);
        const valorTotal = res.data.reduce((soma, item) => soma + (item.preco * item.quantidade), 0);
        setTotal(valorTotal);
      })
      .catch(err => console.error("Erro ao buscar carrinho:", err));
      
    axios.get(`http://localhost:3001/perfil/${usuario_id}`)
        .then(res => {
            setUserAddress(res.data.endereco);
        })
        .catch(err => console.error("Erro ao buscar perfil:", err));

  }, []);

  const handleFinalizarPedido = () => {
    if (!userAddress) {
        alert('Você precisa cadastrar um endereço no seu perfil antes de finalizar o pedido!');
        navigate('/perfil'); 
        return;
    }

    if (itensCarrinho.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }

    const usuario_id = JSON.parse(localStorage.getItem('usuario')).id;

    const dadosPedido = {
      usuario_id: usuario_id,
      total: total,
      itens: itensCarrinho.map(item => ({
        produto_id: item.produto_id,
        quantidade: item.quantidade
      }))
    };

    axios.post('http://localhost:3001/pedidos', dadosPedido)
      .then(res => {
        return axios.delete(`http://localhost:3001/carrinho/limpar/${usuario_id}`);
      })
      .then(res => {
        navigate('/confirmacao');
      })
      .catch(err => {
        console.error("Erro ao finalizar pedido:", err);
        alert('Ocorreu um erro ao finalizar o seu pedido.');
      });
  };

  return (
    <div className="container-wide">
      <h2 style={{textAlign: 'center'}}>Seu Carrinho de Compras</h2>
      
      <div style={{width: '100%', marginBottom: '1.5rem'}}>
        {itensCarrinho.length === 0 ? (
          <p style={{textAlign: 'center'}}>Seu carrinho está vazio.</p>
        ) : (
          itensCarrinho.map(item => (
            <div key={item.produto_id} className="product-item">
              <img src={item.imagem} alt={item.nome} className="product-image" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x100/D32F2F/FFF?text=Item'; }} />
              <div className="product-info">
                <h4>{item.nome} (x{item.quantidade})</h4>
                <p>R$ {(item.preco * item.quantidade).toFixed(2)}</p>
              </div>
            </div>
          ))
        )}
      </div>
      
      {itensCarrinho.length > 0 && (
        <h3 style={{ alignSelf: 'flex-end', textAlign: 'right', width: '100%' }}>Total: R$ {total.toFixed(2)}</h3>
      )}

      <div style={{ marginTop: '1rem', width: '100%', display: 'flex', gap: '1rem' }}>
        <Link to="/restaurantes" className="button-link">Continuar Comprando</Link>
        <button onClick={handleFinalizarPedido} disabled={itensCarrinho.length === 0}>Finalizar Pedido</button>
      </div>
    </div>
  );
}

export default CarrinhoPage;
