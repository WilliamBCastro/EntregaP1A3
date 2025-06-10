const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
  db.all(`SELECT * FROM pagamentos`, [], (err, rows) => {
    if (err) return res.status(500).json({ erro: 'Erro ao listar pagamentos' });
    res.json(rows);
  });
});

module.exports = router;
