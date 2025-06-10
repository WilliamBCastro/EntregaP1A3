const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
  const query = `SELECT * FROM restaurantes`;
  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ erro: 'Erro ao listar restaurantes' });
    res.json(rows);
  });
});

router.get('/:id', (req, res) => {
  const query = `SELECT * FROM restaurantes WHERE id = ?`;
  db.get(query, [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar restaurante' });
    if (!row) return res.status(404).json({ erro: 'Restaurante não encontrado' });
    res.json(row);
  });
});

router.post('/', (req, res) => {
  const { nome, descricao, avaliacao, imagem } = req.body;
  const query = `INSERT INTO restaurantes (nome, descricao, avaliacao, imagem) VALUES (?, ?, ?, ?)`;
  db.run(query, [nome, descricao, avaliacao, imagem], function(err) {
    if (err) return res.status(500).json({ erro: 'Erro ao criar restaurante' });
    res.status(201).json({ id: this.lastID });
  });
});

router.put('/:id', (req, res) => {
  const { nome, descricao, avaliacao, imagem } = req.body;
  const query = `UPDATE restaurantes SET nome = ?, descricao = ?, avaliacao = ?, imagem = ? WHERE id = ?`;
  db.run(query, [nome, descricao, avaliacao, imagem, req.params.id], function(err) {
    if (err) return res.status(500).json({ erro: 'Erro ao atualizar restaurante' });
    res.json({ mensagem: 'Restaurante atualizado com sucesso' });
  });
});

router.delete('/:id', (req, res) => {
  db.run(`DELETE FROM produtos WHERE restaurante_id = ?`, [req.params.id], function(err) {
    if (err) return res.status(500).json({ erro: 'Erro ao deletar produtos do restaurante' });

    db.run(`DELETE FROM restaurantes WHERE id = ?`, [req.params.id], function(err) {
      if (err) return res.status(500).json({ erro: 'Erro ao excluir restaurante' });
      res.json({ mensagem: 'Restaurante e seus produtos foram excluídos com sucesso' });
    });
  });
});

module.exports = router;
