const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/:usuario_id', (req, res) => {
    const { usuario_id } = req.params;
    const responseData = {};

    const userQuery = `SELECT id, nome, email FROM usuarios WHERE id = ?`;
    db.get(userQuery, [usuario_id], (err, user) => {
        if (err || !user) return res.status(404).json({ erro: "Usuário não encontrado." });
        responseData.usuario = user;

        const addressQuery = `SELECT * FROM enderecos WHERE usuario_id = ?`;
        db.get(addressQuery, [usuario_id], (err, address) => {
            responseData.endereco = address || null;
            
            res.json(responseData);
        });
    });
});

router.post('/endereco', (req, res) => {
    const { usuario_id, rua, bairro, cidade, uf, cep } = req.body;
    const query = `
        INSERT INTO enderecos (usuario_id, rua, bairro, cidade, uf, cep)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(usuario_id) DO UPDATE SET
            rua = excluded.rua,
            bairro = excluded.bairro,
            cidade = excluded.cidade,
            uf = excluded.uf,
            cep = excluded.cep;
    `;
    db.run(query, [usuario_id, rua, bairro, cidade, uf, cep], function(err) {
        if (err) return res.status(500).json({ erro: 'Erro ao salvar endereço.' });
        res.status(201).json({ mensagem: 'Endereço salvo com sucesso.' });
    });
});

module.exports = router;
