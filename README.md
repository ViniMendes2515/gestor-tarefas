# TaskFlow Manager

Sistema para gestão de projetos, tarefas e usuários, com backend em Node.js/Express e frontend em Angular.

## Funcionalidades

- **Autenticação JWT** (login, registro, logout)
- **Gestão de usuários** (admin pode criar, editar permissões e remover usuários)
- **Gestão de projetos** (criação, edição, remoção, atribuição de dono)
- **Gestão de tarefas** (criação, edição, remoção, atribuição de responsável, status)
- **Permissões**:  
  - Admin: acesso total  
  - Colaborador: visualiza e atualiza apenas suas tarefas
- **Painel de dashboard**

## Como rodar

### Backend

1. Instale as dependências:
   ```sh
   cd backend
   npm install
   ```
2. Rode o seed para criar o banco e dados iniciais:
   ```sh
   node seed.js
   ```
3. Inicie o servidor:
   ```sh
   node src/presentation/server.js
   ```
   O backend estará em `http://localhost:3000/`

### Frontend

1. Instale as dependências:
   ```sh
   cd frontend
   npm install
   ```
2. Inicie o servidor Angular:
   ```sh
   npm start
   ```
   O frontend estará em `http://localhost:4200/`

## Usuários iniciais

- **Admin:**  
  Email: `admin@email.com`  
  Senha: `admin123`
- **Colaborador:**  
  Email: `colab@email.com`  
  Senha: `colab123`

## Scripts úteis

- Rodar seed: `node backend/seed.js`
- Iniciar backend: `node backend/src/presentation/server.js`
- Iniciar frontend: `npm start` dentro da pasta `frontend`

## Tecnologias

- **Backend:** Node.js, Express, SQLite, JWT, bcryptjs
- **Frontend:** Angular 19, RxJS

## Observações

- O backend precisa estar rodando antes do frontend.
- O frontend se comunica com o backend em `http://localhost:3000/`.
- 
---

Feito por Vinicius MEndes
