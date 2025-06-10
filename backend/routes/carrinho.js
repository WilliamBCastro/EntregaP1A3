const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/:usuario_id', (req, res) => {
  const id = req.params.usuario_id;
  const query = `
    SELECT c.produto_id, p.nome, p.preco, p.imagem, c.quantidade
    FROM carrinho c
    JOIN produtos p ON c.produto_id = p.id
    WHERE c.usuario_id = ?
  `;
  db.all(query, [id], (err, rows) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar carrinho' });
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { usuario_id, produto_id, quantidade } = req.body;
  const query = `
    INSERT INTO carrinho (usuario_id, produto_id, quantidade)
    VALUES (?, ?, ?)
    ON CONFLICT(usuario_id, produto_id) DO UPDATE SET quantidade = quantidade + excluded.quantidade
  `;
  db.run(query, [usuario_id, produto_id, quantidade], function (err) {
    if (err) return res.status(500).json({ erro: 'Erro ao adicionar item' });
    res.status(201).json({ mensagem: 'Item adicionado ao carrinho' });
  });
});

router.delete('/', (req, res) => {
  const { usuario_id, produto_id } = req.body;
  const query = `DELETE FROM carrinho WHERE usuario_id = ? AND produto_id = ?`;
  db.run(query, [usuario_id, produto_id], function (err) {
    if (err) return res.status(500).json({ erro: 'Erro ao remover item' });
    res.json({ mensagem: 'Item removido' });
  });
});

router.delete('/limpar/:usuario_id', (req, res) => {
  const query = `DELETE FROM carrinho WHERE usuario_id = ?`;
  db.run(query, [req.params.usuario_id], function (err) {
    if (err) return res.status(500).json({ erro: 'Erro ao limpar carrinho' });
    res.json({ mensagem: 'Carrinho limpo' });
  });
});

module.exports = router;
