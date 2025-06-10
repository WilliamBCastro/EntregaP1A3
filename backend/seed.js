const db = require('./db/database');

function seed() {
  const restaurantes = [
    ['Pizzaria do Marcão', 'Pizzas artesanais com massa fresca e ingredientes selecionados.', 4.5, '/images/Pizzaria.png'],
    ['Hamburgueria 24h - By Adailson', 'Lanches rápidos e gostosos para qualquer hora do dia.', 4.8, '/images/Hamburgeria.png'],
    ['Sushi House - Fishing with Will', 'Comida japonesa com peixes frescos e qualidade garantida.', 4.7, '/images/Sushi_house.png'],
  ];
  restaurantes.forEach(r => {
    db.run(`INSERT OR IGNORE INTO restaurantes (nome, descricao, avaliacao, imagem) VALUES (?, ?, ?, ?)`, r);
  });

  const pagamentos = ['Crédito', 'Débito', 'Pix'];
  pagamentos.forEach(p => {
    db.run(`INSERT OR IGNORE INTO pagamentos (tipo) VALUES (?)`, [p]);
  });

  const produtos = [
    ['Pizza Margherita', 39.90, 1, '/images/Pizza_Marguerita.jpg'],
    ['Pizza Calabresa', 42.90, 1, '/images/Pizza_Calabresa.png'],
    ['Pizza Portuguesa', 45.00, 1, '/images/Pizza_portuguesa.png'],
    ['X-Burguer', 29.90, 2, '/images/Xburger.png'],
    ['X-Salada', 31.90, 2, '/images/Xsalada.png'],
    ['Cheeseburguer', 28.90, 2, '/images/Cheeseburguer.png'],
    ['Combo Sushi 1', 49.90, 3, '/images/Combo_Sushi.png'],
    ['Combo Sushi 2', 59.90, 3, '/images/Combo_Sushi_2.png'],
    ['Temaki Salmão', 27.90, 3, '/images/Temaki_Salmão.png'],
    ['Hot Roll', 32.00, 3, '/images/HotRoll.png'],
  ];
  produtos.forEach(p => {
    db.run(`INSERT OR IGNORE INTO produtos (nome, preco, restaurante_id, imagem) VALUES (?, ?, ?, ?)`, p);
  });

  console.log('✅ Dados de exemplo com caminhos de imagens locais inseridos.');
}

seed();
