const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db/database'); 

const authRoutes = require('./routes/auth');
const restauranteRoutes = require('./routes/restaurantes');
const produtoRoutes = require('./routes/produtos');
const carrinhoRoutes = require('./routes/carrinho');
const pedidoRoutes = require('./routes/pedidos');
const avaliacaoRoutes = require('./routes/avaliacoes');
const pagamentoRoutes = require('./routes/pagamentos');
const perfilRoutes = require('./routes/perfil');

const app = express();

app.use(cors()); 
app.use(bodyParser.json()); 

app.get('/', (req, res) => {
  res.send('API do Quick Launch funcionando!');
});

app.use('/auth', authRoutes);
app.use('/restaurantes', restauranteRoutes);
app.use('/produtos', produtoRoutes);
app.use('/carrinho', carrinhoRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/avaliacoes', avaliacaoRoutes);
app.use('/pagamentos', pagamentoRoutes);
app.use('/perfil', perfilRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
});
