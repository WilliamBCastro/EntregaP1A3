import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import axios from 'axios';

function RestauranteDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const { restaurante } = location.state;
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/produtos?restaurante_id=${id}`)
      .then(res => {
        setProdutos(res.data);
      })
      .catch(err => alert('Erro ao carregar os produtos.'));
  }, [id]);

  const handleAddToCart = (produto) => {
    const usuarioString = localStorage.getItem('usuario');
    if (!usuarioString) {
      alert('Você precisa estar logado para adicionar itens ao carrinho!');
      return;
    }
    const usuario = JSON.parse(usuarioString);
    const dadosCarrinho = {
      usuario_id: usuario.id,
      produto_id: produto.id,
      quantidade: 1
    };
    axios.post('http://localhost:3001/carrinho', dadosCarrinho)
      .then(res => alert(`${produto.nome} foi adicionado ao carrinho com sucesso!`))
      .catch(err => {
        console.error("Erro ao adicionar ao carrinho:", err);
        alert('Ocorreu um erro ao adicionar o item ao carrinho.');
      });
  };

  return (
    <div className="container-wide">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <h2>{restaurante.nome}</h2>
        <Link to="/carrinho"><button style={{width: 'auto', padding: '0.7rem 1.2rem'}}>Ver Carrinho</button></Link>
      </div>
      <p style={{marginBottom: '2rem', textAlign: 'center'}}>{restaurante.descricao}</p>
      
      <h3 style={{textAlign: 'center'}}>Cardápio</h3>
      <div style={{width: '100%'}}>
        {produtos.map(p => (
          <div key={p.id} className="product-item">
            <img src={p.imagem} alt={p.nome} className="product-image" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x100/D32F2F/FFF?text=Item'; }} />
            <div className="product-info">
              <h4>{p.nome}</h4>
              <p>R$ {p.preco.toFixed(2)}</p>
            </div>
            <div className="product-action">
              <button onClick={() => handleAddToCart(p)}>Adicionar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestauranteDetailPage;
