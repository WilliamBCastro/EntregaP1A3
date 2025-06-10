# Quick Launch - Projeto de Delivery de Comida (A3)

## 📝 Descrição do Projeto

**Quick Launch** é um MVP (Minimum Viable Product) de uma aplicação web de delivery de comida, desenvolvido como projeto final para a UC Usabilidade, Desenvolvimento Web, Mobile e Jogos. O sistema foi construído com foco em uma experiência de usuário limpa, intuitiva e responsiva, permitindo que os clientes naveguem por restaurantes, montem seus pedidos e finalizem a compra de forma eficiente.

---

## 👨‍💻 Integrantes do Grupo

* William Bitencourt de Castro - 12723115263
* Marcos Leones Leite Souza – 1272312642
* Adailson Souza da Cunha - 1272319876

---

## ✨ Funcionalidades Implementadas

* **Autenticação de Usuário:** Cadastro, Login e Recuperação de Senha.
* **Navegação por Restaurantes:** Listagem de restaurantes e visualização de cardápios detalhados com imagens.
* **Carrinho de Compras:** Adição de produtos, visualização do carrinho e cálculo do total.
* **Finalização de Pedido:** Fluxo de checkout com verificação de endereço cadastrado.
* **Perfil do Usuário:** Visualização de dados, cadastro/edição de endereço e logout.
* **Histórico de Pedidos:** Tela para o usuário consultar seus pedidos anteriores.
* **Avaliação de Restaurantes:** Sistema de avaliação com 10 estrelas e comentários.
* **Layout Responsivo:** A interface se adapta a telas de desktop e mobile, com um botão para alternar a visualização manualmente.

---

## 🛠️ Tecnologias Utilizadas

* **Frontend:**
    * **React.js:** Biblioteca para construção da interface de usuário.
    * **React Router:** Para gerenciamento de rotas (SPA).
    * **Axios:** Para realizar as chamadas à API do backend.
    * **Context API:** Para gerenciamento do estado de visualização (Desktop/Mobile).
* **Backend:**
    * **Node.js:** Ambiente de execução do servidor.
    * **Express.js:** Framework para criação da API RESTful.
    * **SQLite:** Banco de dados relacional.
* **Ferramentas:**
    * **Git & GitHub:** Para versionamento e entrega do código.

---

## 🚀 Como Executar o Projeto

**Pré-requisitos:** É necessário ter o **Node.js** instalado.

### 1. Backend

```bash
# Navegue até a pasta do backend
cd backend

# Instale as dependências (apenas na primeira vez)
npm install

# O banco de dados 'app.db' será criado e populado automaticamente.
# Caso precise repopular, apague o arquivo 'app.db' e rode o seed:
# node seed.js

# Inicie o servidor
node app.js

# O backend estará rodando em http://localhost:3001

2. Frontend

# Abra um NOVO terminal e navegue até a pasta do frontend
cd frontend

# Instale as dependências (apenas na primeira vez)
npm install

# Inicie a aplicação React
npm start

# O site abrirá automaticamente em http://localhost:3000

---

#### **Passo 4: Enviando para o GitHub**

Com a estrutura de pastas e os arquivos prontos, siga estes comandos no terminal, a partir da **pasta raiz** do seu projeto.

1.  **Crie um novo repositório** no site do GitHub (ex: `QuickLauch_A3`). Não adicione `README` ou `.gitignore` pela interface do site. Copie a URL do seu novo repositório (ex: `https://github.com/seu-usuario/QuickLauch_A3.git`).

2.  **Execute os comandos do Git:**

    ```bash
    # 1. Inicia um repositório Git na sua pasta
    git init

    # 2. Adiciona todos os arquivos (exceto os ignorados pelo .gitignore)
    git add .

    # 3. Cria o primeiro "commit" (um snapshot do seu projeto)
    git commit -m "Versão inicial do projeto para entrega final"

    # 4. (Opcional, mas boa prática) Renomeia a branch principal para "main"
    git branch -M main

    # 5. Conecta seu projeto local ao repositório remoto no GitHub
    # Lembre-se de substituir a URL pela URL do SEU repositório
    git remote add origin https://github.com/seu-usuario/QuickLauch_A3.git

    # 6. Envia seu código para o GitHub
    git push -u origin main
    ```

#### **Passo 5: Criar a Tag de Entrega**

O professor pediu uma tag específica para a entrega.

```bash
# 1. Cria a tag no seu último commit
git tag EntregaFinalA3

# 2. Envia a tag para o repositório no GitHub
git push origin EntregaFinalA3
