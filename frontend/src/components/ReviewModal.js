import React, { useState } from 'react';
import axios from 'axios';
import StarRating from './StarRating';

const ReviewModal = ({ order, onClose }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = () => {
        if (rating === 0) {
            alert('Por favor, selecione uma nota (de 1 a 5 estrelas).');
            return;
        }

        const storedUser = JSON.parse(localStorage.getItem('usuario'));
        const reviewData = {
            usuario_id: storedUser.id,
            restaurante_id: order.restaurante_id,
            nota: rating,
            comentario: comment,
        };

        axios.post('http://localhost:3001/avaliacoes', reviewData)
            .then(() => {
                alert('Avaliação enviada com sucesso!');
                onClose(true); 
            })
            .catch(err => {
                console.error('Erro ao enviar avaliação:', err);
                alert('Não foi possível enviar a avaliação.');
                onClose();
            });
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Avaliar Pedido</h2>
                <p>O que você achou do seu pedido no <strong>{order.restaurante_nome}</strong>?</p>
                
                <label>Sua nota:</label>
                <StarRating rating={rating} setRating={setRating} />

                <label style={{marginTop: '1rem'}}>Seu comentário (opcional):</label>
                <textarea
                    rows="4"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Ex: A comida estava ótima e chegou rápido!"
                ></textarea>

                <div className="modal-actions">
                    <button type="button" onClick={() => onClose()} className="button-secondary">Fechar</button>
                    <button type="button" onClick={handleSubmit}>Enviar Avaliação</button>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;
