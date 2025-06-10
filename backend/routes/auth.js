const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.post('/register', (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
  }
  const query = `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`;
  db.run(query, [nome, email, senha], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ erro: 'Erro ao cadastrar usuário. O e-mail pode já estar em uso.' });
    }
    res.status(201).json({ id: this.lastID, nome, email });
  });
});

router.post('/login', (req, res) => {
  const { email, senha } = req.body;
  const query = `SELECT * FROM usuarios WHERE email = ? AND senha = ?`;
  db.get(query, [email, senha], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
    if (!row) {
      return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
    }
    const { senha: _, ...usuarioSemSenha } = row;
    res.json({ mensagem: 'Login bem-sucedido', usuario: usuarioSemSenha });
  });
});

router.post('/reset-password', (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ erro: 'E-mail e nova senha são obrigatórios.' });
  }
  const query = `UPDATE usuarios SET senha = ? WHERE email = ?`;
  db.run(query, [senha, email], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ erro: 'Erro ao alterar a senha.' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado com este e-mail.' });
    }
    res.json({ mensagem: 'Senha alterada com sucesso.' });
  });
});


module.exports = router;
