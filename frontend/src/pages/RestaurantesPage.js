import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function RestaurantesPage() {
  const [restaurantes, setRestaurantes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/restaurantes')
      .then(res => setRestaurantes(res.data))
      .catch(err => alert('Erro ao carregar restaurantes'));
  }, []);

  return (
    <div className="restaurant-list">
      {restaurantes.map(r => (
        <Link to={`/restaurante/${r.id}`} key={r.id} state={{ restaurante: r }} style={{ textDecoration: 'none' }}>
          <div className="card">
            {/* Adiciona a imagem do restaurante */}
            <img src={r.imagem} alt={r.nome} className="card-image" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/D32F2F/FFF?text=Imagem+Indisponível'; }} />
            <div className="card-content">
              <h3>{r.nome}</h3>
              <p>{r.descricao}</p>
              <p style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>Avaliação: {r.avaliacao} ★</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default RestaurantesPage;
