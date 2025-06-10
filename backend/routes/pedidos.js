const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.post('/', (req, res) => {
  const { usuario_id, itens, total } = req.body;
  const data = new Date().toISOString();
  const status = 'Pendente'; // Status inicial do pedido

  db.run(`INSERT INTO pedidos (usuario_id, total, data, status) VALUES (?, ?, ?, ?)`,
    [usuario_id, total, data, status],
    function (err) {
      if (err) return res.status(500).json({ erro: 'Erro ao criar pedido' });

      const pedidoId = this.lastID;

      const stmt = db.prepare(`INSERT INTO itens_pedido (pedido_id, produto_id, quantidade) VALUES (?, ?, ?)`);
      itens.forEach(item => {
        stmt.run(pedidoId, item.produto_id, item.quantidade);
      });
      stmt.finalize();

      res.status(201).json({ mensagem: 'Pedido criado com sucesso', pedido_id: pedidoId });
    }
  );
});

router.get('/usuario/:id', (req, res) => {
  const usuarioId = req.params.id;

  const query = `
    SELECT
        p.id,
        p.total,
        p.data,
        p.status,
        r.id as restaurante_id,
        r.nome as restaurante_nome,
        GROUP_CONCAT(pr.nome || ' (' || ip.quantidade || 'x)') as itens
    FROM pedidos p
    JOIN itens_pedido ip ON p.id = ip.pedido_id
    JOIN produtos pr ON ip.produto_id = pr.id
    JOIN restaurantes r ON pr.restaurante_id = r.id
    WHERE p.usuario_id = ?
    GROUP BY p.id, r.id, r.nome
    ORDER BY p.data DESC
  `;

  db.all(query, [usuarioId], (err, rows) => {
    if (err) return res.status(500).json({ erro: 'Erro ao listar pedidos' });
    res.json(rows);
  });
});

module.exports = router;
