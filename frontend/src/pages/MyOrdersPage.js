import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewModal from '../components/ReviewModal'; 

function MyOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const fetchOrders = () => {
        const storedUser = JSON.parse(localStorage.getItem('usuario'));
        if (storedUser) {
            axios.get(`http://localhost:3001/pedidos/usuario/${storedUser.id}`)
                .then(res => setOrders(res.data))
                .catch(err => console.error("Erro ao buscar pedidos:", err))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleOpenModal = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const handleCloseModal = (reviewSubmitted) => {
        setIsModalOpen(false);
        setSelectedOrder(null);
        if (reviewSubmitted) {
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    };

    if (loading) return <div className="container-wide"><p>Carregando seus pedidos...</p></div>;

    return (
        <>
            <div className="container-wide">
                <h2 style={{ textAlign: 'center' }}>Meus Pedidos</h2>
                {orders.length === 0 ? (
                    <p style={{ textAlign: 'center' }}>Você ainda não fez nenhum pedido.</p>
                ) : (
                    <div className="order-list">
                        {orders.map(order => (
                            <div key={order.id} className="order-card">
                                <div className="order-header">
                                    <h3>Pedido #{order.id} - {order.restaurante_nome}</h3>
                                    <span className={`status-badge status-${order.status.toLowerCase()}`}>{order.status}</span>
                                </div>
                                <div className="order-body">
                                    <p><strong>Data:</strong> {formatDate(order.data)}</p>
                                    <p><strong>Itens:</strong> {order.itens.replace(/,/g, ', ')}</p>
                                    <p><strong>Total:</strong> R$ {order.total.toFixed(2)}</p>
                                </div>
                                <div className="order-footer">
                                    <button onClick={() => handleOpenModal(order)}>Avaliar Pedido</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {isModalOpen && <ReviewModal order={selectedOrder} onClose={handleCloseModal} />}
        </>
    );
}

export default MyOrdersPage;
