# Documentação do Projeto: Gerenciador de Tarefas

Este documento fornece detalhes técnicos sobre o backend, incluindo a API, e instruções para a instalação e uso do sistema.

## 1. Funcionalidades

O sistema oferece uma solução completa para gerenciamento de projetos e tarefas com as seguintes funcionalidades:

- **Autenticação e Autorização:**
  - Sistema de login seguro com JWT (JSON Web Tokens).
  - Registro de novos usuários.
  - Proteção de rotas baseada em autenticação e papéis (admin, colaborador).

- **Gerenciamento de Usuários (Apenas Admin):**
  - Listar todos os usuários cadastrados.
  - Alterar a permissão de um usuário (admin/colaborador).
  - Remover usuários do sistema.

- **Gerenciamento de Projetos (Apenas Admin):**
  - Criar, editar e remover projetos.
  - Atribuir um dono (usuário) a cada projeto.

- **Gerenciamento de Tarefas:**
  - **Admin:** Criar, editar, remover e atribuir tarefas a qualquer usuário.
  - **Colaborador:** Visualizar e alterar o status apenas das tarefas que lhe foram atribuídas.

- **Dashboard:**
  - Painel com estatísticas rápidas sobre projetos e tarefas.
  - Acesso rápido às principais funcionalidades de acordo com o papel do usuário.

## 2. Instalação e Deploy (com Docker)

A maneira mais simples de executar o projeto é utilizando Docker e Docker Compose, que orquestra os contêineres do backend e do frontend.

1.  **Pré-requisitos:**
    - Docker
    - Docker Compose

2.  **Execução:**
    - Na raiz do projeto (onde o arquivo `docker-compose.yml` está localizado), execute o comando:
      ```sh
      docker-compose up --build
      ```
    - O comando irá construir as imagens Docker para o backend e o frontend e iniciar os serviços.

3.  **Acesso:**
    - **Frontend:** `http://localhost:4200`
    - **Backend API:** `http://localhost:3000`

## 3. Exemplo de Uso

1.  **Registro:** Acesse `http://localhost:4200/register` e crie uma nova conta. Por padrão, ela terá a permissão de "colaborador".
2.  **Login Admin:** Acesse `http://localhost:4200/login` e entre com as credenciais de administrador:
    - **Email:** `admin@email.com`
    - **Senha:** `admin123`
3.  **Gerenciar Usuários:** No dashboard, vá para "Usuarios" e promova o usuário recém-criado para "admin", se desejar.
4.  **Criar Projeto:** Vá para "Ver Projetos" e crie um novo projeto.
5.  **Criar Tarefa:** Vá para "Ver Tarefas", crie uma nova tarefa e atribua-a a um usuário.
6.  **Login Colaborador:** Faça logout e entre com a conta do colaborador. O dashboard mostrará apenas as tarefas e projetos relevantes para ele.

## 4. Endpoints da API

A API está disponível em `http://localhost:3000/api`.

### Autenticação (`/api/auth`)

-   `POST /login`: Autentica um usuário e retorna um token JWT.
    -   **Body:** `{ "email": "...", "password": "..." }`

### Usuários (`/api/users`)

-   `POST /register`: Registra um novo usuário (público).
    -   **Body:** `{ "name": "...", "email": "...", "password": "..." }`
-   `GET /`: Lista todos os usuários. (Requer autenticação de admin)
-   `GET /:id`: Busca um usuário por ID. (Requer autenticação)
-   `PUT /:id/role`: Atualiza a permissão de um usuário. (Requer autenticação de admin)
    -   **Body:** `{ "role": "admin" | "colaborador" }`
-   `DELETE /:id`: Remove um usuário. (Requer autenticação de admin)

### Projetos (`/api/projects`)

-   `GET /`: Lista todos os projetos. (Requer autenticação)
-   `POST /`: Cria um novo projeto. (Requer autenticação de admin)
    -   **Body:** `{ "name": "...", "description": "...", "owner": "userId" }`
-   `PUT /:id`: Atualiza um projeto. (Requer autenticação de admin)
    -   **Body:** `{ "name": "...", "description": "...", "owner": "userId" }`
-   `DELETE /:id`: Remove um projeto. (Requer autenticação de admin)

### Tarefas (`/api/tasks`)

-   `GET /`: Lista tarefas. Admins veem todas, colaboradores veem apenas as suas. (Requer autenticação)
-   `POST /`: Cria uma nova tarefa. (Requer autenticação de admin)
    -   **Body:** `{ "title": "...", "description": "...", "project_id": "...", "assigned_to": "...", "status": "..." }`
-   `PUT /:id`: Atualiza uma tarefa. (Requer autenticação. Colaborador só pode alterar o status da sua própria tarefa).
    -   **Body:** `{ "status": "concluída" }` (para colaborador) ou outros campos (para admin).
-   `DELETE /:id`: Remove uma tarefa. (Requer autenticação de admin)