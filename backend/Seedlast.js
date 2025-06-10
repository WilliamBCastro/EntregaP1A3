const db = require('./db/database');

function seed() {
  const restaurantes = [
    ['Pizzaria do Marcão', 'Pizzas artesanais com massa fresca e ingredientes selecionados.', 4.5, 'https://drive.google.com/file/d/1eOFyquvxiyd_scgaStRg6W1TKQZ6F1EZ/view?usp=sharing'],
    ['Hamburgueria 24h - By Adailson', 'Lanches rápidos e gostosos para qualquer hora do dia.', 4.8, 'https://drive.google.com/file/d/1bTQd-XmmQ-KKaEowM_aM9fY4lLuvgdJu/view?usp=sharing'],
    ['Sushi House - Fishing with Will', 'Comida japonesa com peixes frescos e qualidade garantida.', 4.7, 'https://drive.google.com/file/d/1UL8PGqO5ZPI6HJbN3XgLFP7pRIS9WzZ7/view?usp=sharing'],
  ];
  restaurantes.forEach(r => {
    db.run(`INSERT OR IGNORE INTO restaurantes (nome, descricao, avaliacao, imagem) VALUES (?, ?, ?, ?)`, r);
  });

  const pagamentos = ['Crédito', 'Débito', 'Pix'];
  pagamentos.forEach(p => {
    db.run(`INSERT OR IGNORE INTO pagamentos (tipo) VALUES (?)`, [p]);
  });

  const produtos = [
    ['Pizza Margherita', 39.90, 1, 'https://drive.google.com/file/d/1Br6d760UclxLkbKJsHAMU23KYyjfRtci/view?usp=sharing'],
    ['Pizza Calabresa', 42.90, 1, 'https://drive.google.com/file/d/1MUmsPGf0uFpQFSvGdPU0OM1cyb-wcM8D/view?usp=drive_link'],
    ['Pizza Portuguesa', 45.00, 1, 'https://drive.google.com/file/d/1SOeiNB-nc2oWvDO66lhT_6mROZTsRQGL/view?usp=sharing'],
    ['X-Burguer', 29.90, 2, 'https://drive.google.com/file/d/1iG-oZIwx6OJCDuZYh0Rhpdkfp_XHrVsU/view?usp=sharing'],
    ['X-Salada', 31.90, 2, 'https://drive.google.com/file/d/1WInckcE-W1obcn6ceIFtmVbT0TEVPhyk/view?usp=sharing'],
    ['Cheeseburguer', 28.90, 2, 'https://drive.google.com/file/d/1gXs9tT0CysyMXYp530oKMUIfvGWS-cqO/view?usp=sharing'],
    ['Combo Sushi 1', 49.90, 3, 'https://drive.google.com/file/d/1qVZ7RmW-fyyI-wSOedLkZSFe6NRzGgNG/view?usp=sharing'],
    ['Combo Sushi 2', 59.90, 3, 'https://drive.google.com/file/d/1GpowH44-sBykS-RgsS1BAa4b1r5empW8/view?usp=sharing'],
    ['Temaki Salmão', 27.90, 3, 'https://drive.google.com/file/d/1k7c81IIBeFaaKj-E_WGEnuXs_xk9CSI7/view?usp=sharing'],
    ['Hot Roll', 32.00, 3, 'https://drive.google.com/file/d/1hqOFwnamCtRJHwtflvb_-ikS_VFSMsd2/view?usp=sharing'],
  ];
  produtos.forEach(p => {
    db.run(`INSERT OR IGNORE INTO produtos (nome, preco, restaurante_id, imagem) VALUES (?, ?, ?, ?)`, p);
  });

  console.log('✅ Dados de exemplo inseridos.');
}

seed();