const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
  const restauranteId = req.query.restaurante_id;
  if (!restauranteId) return res.status(400).json({ erro: 'restaurante_id é obrigatório' });

  const query = `SELECT * FROM produtos WHERE restaurante_id = ?`;
  db.all(query, [restauranteId], (err, rows) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar produtos' });
    res.json(rows);
  });
});

router.post('/', (req, res) => {
    const { nome, preco, restaurante_id, imagem } = req.body;
    const query = `INSERT INTO produtos (nome, preco, restaurante_id, imagem) VALUES (?, ?, ?, ?)`;
    db.run(query, [nome, preco, restaurante_id, imagem], function(err) {
        if (err) return res.status(500).json({ erro: 'Erro ao adicionar produto' });
        res.status(201).json({ id: this.lastID });
    });
});

router.put('/:id', (req, res) => {
    const { nome, preco, imagem } = req.body;
    const query = `UPDATE produtos SET nome = ?, preco = ?, imagem = ? WHERE id = ?`;
    db.run(query, [nome, preco, imagem, req.params.id], function(err) {
        if (err) return res.status(500).json({ erro: 'Erro ao atualizar produto' });
        res.json({ mensagem: 'Produto atualizado com sucesso' });
    });
});

router.delete('/:id', (req, res) => {
    const query = `DELETE FROM produtos WHERE id = ?`;
    db.run(query, [req.params.id], function(err) {
        if (err) return res.status(500).json({ erro: 'Erro ao excluir produto' });
        res.json({ mensagem: 'Produto excluído com sucesso' });
    });
});

module.exports = router;
