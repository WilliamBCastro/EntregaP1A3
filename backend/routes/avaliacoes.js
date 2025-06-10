const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.post('/', (req, res) => {
  const { usuario_id, restaurante_id, nota, comentario } = req.body;
  const query = `
    INSERT INTO avaliacoes (usuario_id, restaurante_id, nota, comentario)
    VALUES (?, ?, ?, ?)
  `;
  db.run(query, [usuario_id, restaurante_id, nota, comentario], function (err) {
    if (err) return res.status(500).json({ erro: 'Erro ao enviar avaliação' });
    res.status(201).json({ mensagem: 'Avaliação registrada' });
  });
});

router.get('/:restaurante_id', (req, res) => {
  const query = `
    SELECT a.nota, a.comentario, u.nome
    FROM avaliacoes a
    JOIN usuarios u ON a.usuario_id = u.id
    WHERE restaurante_id = ?
  `;
  db.all(query, [req.params.restaurante_id], (err, rows) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar avaliações' });
    res.json(rows);
  });
});

module.exports = router;
