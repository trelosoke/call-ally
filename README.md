<h1 align="center">CallAlly</h1>
 
<p align="center">CallAlly is a ticket/call management tool where you can organize tasks and issues using tags, with updates reflected immediately on the interface.</p>

<p align="center">Leia este README em <a href="#português">Português</a>.</p>

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [How to View and Test](#how-to-view-and-test)
- [Next Steps](#next-steps)

---

## Tech Stack

### Front-End
<p align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="40" height="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="40" height="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" width="40" height="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="40" height="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="40" height="40" />
</p>

### Backend *(under development)*
<p align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="40" height="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="40" height="40" style="filter: invert(1);" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" width="40" height="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" width="40" height="40" />
</p>

> Now running on a **local server** with **GET** and **POST** working methods, persisting calls in a **SQLite database** via **Prisma**. See [How to View and Test](#how-to-view-and-test) for run instructions.

### Tools & Platforms
<p align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" width="40" height="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" width="40" height="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" width="40" height="40" />
</p>

---

## How to View and Test

### Prerequisites

- [Node.js](https://nodejs.org/) installed (`^20.19.0` or `>=22.12.0`)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/trelosoke/call-ally.git
   cd call-ally
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### ▶️ Running the Full Stack (Backend + Frontend)

The app has two servers: the **backend** (Express API) and the **frontend** (Vite). Run them in **two separate terminals**.

1. **Terminal 1 — Backend:**
   ```bash
   npm run server
   ```
   The server will be available at [`http://localhost:3000`](http://localhost:3000).

2. **Terminal 2 — Frontend:**
   ```bash
   npm run dev
   ```
   The application will be available at [`http://localhost:5173`](http://localhost:5173).

3. Open [`http://localhost:5173`](http://localhost:5173) and use the app.

> **Note:** The frontend uses a Vite proxy (`/api`) that forwards API requests to the backend, so no CORS configuration is needed during development.

### 🗄️ Setting Up the Database *(optional, required for persistence)*

The backend stores calls in a **SQLite** database via **Prisma**. To run the app **with** the database, run these steps **once**:

1. Create the `.env` file from the template:
   ```bash
   cp .env.example .env
   ```
   (On Windows: `copy .env.example .env`)

2. Apply the migrations to create the SQLite database:
   ```bash
   npx prisma migrate dev
   ```

3. Generate the Prisma Client:
   ```bash
   npx prisma generate
   ```

The database file `dev.db` is created at the project root. Without it, the backend starts but cannot serve or store calls — requests return an error.

#### Available scripts

| Script      | Command               | Description |
|-------------|-----------------------|-------------|
| `dev`       | `npm run dev`         | Starts the frontend (Vite) |
| `server`    | `npm run server`      | Runs the backend with `tsx` |
| `pserver`   | `npm run pserver`     | Runs the backend with `tsx` and auto-restart (nodemon) |
| `studio`    | `npm run studio`      | Opens Prisma Studio to browse and edit the database |

---

### 📡 Testing the API (Backend)

You can test the backend endpoints using a REST client (like **Thunder Client** inside VSCode, **Insomnia**, or **Postman**) or using `curl` in the terminal.

#### GET /calls – List all calls

**Thunder Client / Insomnia:**
- Method: `GET`
- URL: `http://localhost:3000/calls`
- No body needed.

**curl:**
```bash
curl http://localhost:3000/calls
```

**Expected response:** A JSON array (even if empty).

---

#### POST /calls – Create a new call

**Thunder Client / Insomnia:**
- Method: `POST`
- URL: `http://localhost:3000/calls`
- Headers: `Content-Type: application/json`
- Body (JSON):
```json
{
  "title": "Test call",
  "smallDesc": "Short description",
  "fullDesc": "Full detailed description",
  "dueDate": "2026-09-15T14:30:00",
  "priority": "high",
  "tags": [{ "name": "Urgent", "color": "#ff0000" }]
}
```

**curl:**
```bash
curl -X POST http://localhost:3000/calls \
  -H "Content-Type: application/json" \
  -d '{"title":"Test call","smallDesc":"Short description","fullDesc":"Full detailed description","dueDate":"2026-09-15T14:30:00","priority":"high","tags":[{"name":"Urgent","color":"#ff0000"}]}'
```

**Expected response:** The created call object, including a generated `id` and the fields you sent.

---

### 🔗 Full Integration Test

1. Run both the frontend (`npm run dev`) and backend (`npm run server`).
2. Open the frontend at `http://localhost:5173`.
3. Create a new call via the form.
4. The call should appear in the list **without** refreshing the page.
5. Refresh the page – the call should **still be there** (because the data comes from the database, not a mock).

> **Note:** The frontend uses a Vite proxy (`/api`) to avoid CORS issues. This means all requests to `/api/calls` are forwarded to `http://localhost:3000/calls`. You don't need to worry about CORS during development.

## Features

- **Create calls** — Add a new call with title, description, due date, priority, and tags.
- **Tag management** — Create custom tags with colors to organize your calls.
- **Real-time list updates** — The call list updates instantly as you create or modify items.
- **Priority levels** — Assign low, medium, or high priority to your calls.
- **Responsive layout** *(planned)* — Mobile-first design (in progress).
- **Functional backend** — Express server exposing `GET` and `POST /calls`, with the frontend connected through a Vite proxy.
- **Database persistence** — Calls are stored in a **SQLite** database via **Prisma ORM**, so data survives server restarts and page refreshes.
- **Migrations** — Schema changes are tracked as migrations in `prisma/migrations` and applied with `npx prisma migrate dev`.
- **Prisma Studio** — Browse and edit the database visually with `npm run studio`.
- **Convenient scripts** — `npm run server` (backend), `npm run pserver` (backend with auto-restart) and `npm run studio` (database UI).

---

## Project Structure

```
call-ally/
├─ .github/workflows/
│  └─ ci.yml                   # CI pipeline (typecheck + build)
├─ .agents/                    # AI agent skills (Prisma, generated by prisma init)
├─ backend/
│  └─ server.ts                # Express server using the Prisma Client
├─ prisma/
│  ├─ schema.prisma            # Prisma schema (Call model and generator)
│  └─ migrations/              # SQL migration history
├─ scripts/
│  └─ prisma-studio.mjs        # Prisma Studio launcher (SQLite file URL)
├─ src/                        # Frontend source code
│  ├─ components/              # Reusable React UI components
│  ├─ services/                # Data access layer (fetch to the backend API)
│  ├─ styles/                  # Global CSS files
│  ├─ types/                   # Shared domain types
│  ├─ App.tsx                  # Root component with global calls state and page layout
│  ├─ main.tsx                 # React entry point that renders <App />
│  └─ vite-env.d.ts            # Vite type declarations
├─ .env.example                # Environment variables template (DATABASE_URL)
├─ .gitignore                  # Lists files and folders ignored by Git
├─ index.html                  # Entry HTML file with the #root mount point
├─ package-lock.json           # Locks the exact versions of installed dependencies
├─ package.json                # Project metadata, scripts and dependencies
├─ prisma.config.ts            # Prisma configuration (datasource URL and migrations path)
├─ README.md                   # Project documentation
├─ tsconfig.json               # TypeScript compiler configuration
└─ vite.config.js              # Vite configuration (dev server and /api proxy)
```

### Folder descriptions

| Folder        | Description |
|---------------|-------------|
| `src/`        | All application source code lives here. |
| `src/components/` | Reusable React UI pieces. Each component receives data via props and manages its own local state. |
| `src/services/`   | Data access layer that abstracts where data comes from. UI never touches the source directly. Currently uses `fetch` to communicate with the backend API. |
| `src/styles/`     | Global CSS shared by the whole app. |
| `src/types/`      | Domain types used everywhere. They define the contract between frontend and the backend, so their shape must match what the API returns. |
| `src/generated/`  | Prisma Client generated by `npx prisma generate`. Git-ignored; regenerate after schema changes. |
| `backend/`        | REST API source code. Contains the Express server, route definitions, and the Prisma Client that persists data in the SQLite database. |
| `prisma/`         | Prisma schema (`schema.prisma`) and the SQL migrations that evolve the database. |
| `scripts/`        | Helper scripts. `prisma-studio.mjs` launches Prisma Studio with the correct SQLite file URL. |
| `.agents/`        | AI agent skills (Prisma CLI/Client documentation) consumed by coding agents. |
| `.github/workflows`        | CI/CD configuration. The `ci.yml` file defines the continuous integration pipeline, which runs type checks and builds on every push or pull request to the `main` branch. |

---

## Next Steps

The roadmap below is organized into milestones. Each one tracks its progress through the [milestones](https://github.com/trelosoke/call-ally/milestones) and [issues](https://github.com/trelosoke/call-ally/issues) opened on this repository.

### ✅ MVP Frontend (React Integration) — *completed*

> A fully functional React interface running in the browser, allowing call creation and listing using the in-memory mock (no backend yet). Due **Aug 30, 2026**.

- [x] [#1](https://github.com/trelosoke/call-ally/issues/1) Implement form submission and reset
- [x] [#2](https://github.com/trelosoke/call-ally/issues/2) Build a call list component
- [x] [#3](https://github.com/trelosoke/call-ally/issues/3) Load the call list on app start
- [x] [#4](https://github.com/trelosoke/call-ally/issues/4) Refresh the list after creating a new call
- [x] [#5](https://github.com/trelosoke/call-ally/issues/5) Note future improvements for date handling
- [x] [#6](https://github.com/trelosoke/call-ally/pull/6) Migrate the frontend from Vanilla TS to React

### 🚧 MVP Full-Stack (Backend + Database) — *in progress*

> Replace the in-memory array with a real Node.js server and SQLite database. Quality and documentation tasks are being handled in parallel throughout this milestone. Due **Sep 21, 2026**.

- [x] [#7](https://github.com/trelosoke/call-ally/issues/7) Establish a Server with Basic Routing
- [x] [#8](https://github.com/trelosoke/call-ally/issues/8) Connect the Frontend to the Real Server
- [x] [#9](https://github.com/trelosoke/call-ally/issues/9) Introduce Persistent Data Storage
- [x] [#10](https://github.com/trelosoke/call-ally/issues/10) Migrate Read Operations to Persistent Storage
- [x] [#11](https://github.com/trelosoke/call-ally/issues/11) Migrate Write Operations to Persistent Storage
- [ ] [#12](https://github.com/trelosoke/call-ally/issues/12) Remove Temporary Storage and Validate the Full System
- [ ] [#20](https://github.com/trelosoke/call-ally/issues/20) Set up Continuous Integration (CI) for the Frontend
- [ ] [#21](https://github.com/trelosoke/call-ally/issues/21) Set up Continuous Integration (CI) for the Backend
- [ ] [#22](https://github.com/trelosoke/call-ally/issues/22) Configure Continuous Deployment (CD) for the Full Stack Application

### 📋 Quality & Documentation — *parallel to backend*

> Documentation, testing, and configuration tasks are being addressed as part of the development process — they are not postponed to the end of the project. Due **Sep 27, 2026**.

- [x] [#13](https://github.com/trelosoke/call-ally/issues/13) Write Frontend README (Current State)
- [ ] [#14](https://github.com/trelosoke/call-ally/issues/14) Maintain and Update README During Backend Development
- [ ] [#15](https://github.com/trelosoke/call-ally/issues/15) Implement Basic Unit Testing
- [ ] [#16](https://github.com/trelosoke/call-ally/issues/16) Implement API Integration Tests
- [ ] [#17](https://github.com/trelosoke/call-ally/issues/17) Standardize Environment Variables and Configuration
- [ ] [#18](https://github.com/trelosoke/call-ally/issues/18) Add API Documentation (OpenAPI / Markdown)
- [ ] [#19](https://github.com/trelosoke/call-ally/issues/19) Implement Structured Logging and Error Handling
- [ ] [#23](https://github.com/trelosoke/call-ally/issues/23) Apply Styling with Tailwind CSS

---

## Português

<h1 align="center">CallAlly</h1>

<p align="center">CallAlly é uma ferramenta de gerenciamento de chamados que permite organizar tarefas e problemas com o uso de tags, refletindo as atualizações imediatamente na interface.</p>

### Índice

- [Stack de Tecnologias](#stack-de-tecnologias)
- [Recursos](#recursos)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Visualizar e Testar](#como-visualizar-e-testar)
- [Próximos Passos](#próximos-passos)

---

### Stack de Tecnologias

#### Front-End

<p align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="40" height="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="40" height="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" width="40" height="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="40" height="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="40" height="40" />
</p>

#### Backend *(em desenvolvimento)*

<p align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="40" height="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="40" height="40" style="filter: invert(1);" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" width="40" height="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" width="40" height="40" />
</p>

> Agora rodando em um *servidor local*, com métodos *GET* e *POST* funcionando e persistindo os chamados em um *banco de dados SQLite* via *Prisma*. Veja [Como Visualizar e Testar](#como-visualizar-e-testar) para saber como rodar.

#### Ferramentas e Plataformas

<p align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" width="40" height="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" width="40" height="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" width="40" height="40" />
</p>

---

### Como Visualizar e Testar

#### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (`^20.19.0` ou `>=22.12.0`)
- [npm](https://www.npmjs.com/) (incluído no Node.js)

#### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/trelosoke/call-ally.git
   cd call-ally
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

#### ▶️ Rodando o Full Stack (Backend + Frontend)

O aplicativo tem dois servidores: o **backend** (API Express) e o **frontend** (Vite). Execute-os em **dois terminais separados**.

1. **Terminal 1 — Backend:**
   ```bash
   npm run server
   ```
   O servidor estará disponível em [`http://localhost:3000`](http://localhost:3000).

2. **Terminal 2 — Frontend:**
   ```bash
   npm run dev
   ```
   A aplicação estará disponível em [`http://localhost:5173`](http://localhost:5173).

3. Abra [`http://localhost:5173`](http://localhost:5173) e use o aplicativo.

> **Nota:** O frontend usa um proxy do Vite (`/api`) que encaminha as requisições da API para o backend, então nenhuma configuração de CORS é necessária durante o desenvolvimento.

#### 🗄️ Configurando o Banco de Dados *(opcional, necessário para persistência)*

O backend armazena chamados em um banco **SQLite** via **Prisma**. Para rodar o aplicativo **com** banco de dados, execute estes passos **uma vez**:

1. Crie o arquivo `.env` a partir do template:
   ```bash
   cp .env.example .env
   ```
   (No Windows: `copy .env.example .env`)

2. Aplique as migrações para criar o banco SQLite:
   ```bash
   npx prisma migrate dev
   ```

3. Gere o Prisma Client:
   ```bash
   npx prisma generate
   ```

O arquivo do banco `dev.db` é criado na raiz do projeto. Sem ele, o backend inicia, mas não consegue servir nem armazenar chamados — as requisições retornam erro.

#### Scripts disponíveis

| Script      | Comando               | Descrição |
|-------------|-----------------------|-----------|
| `dev`       | `npm run dev`         | Inicia o frontend (Vite) |
| `server`    | `npm run server`      | Roda o backend com `tsx` |
| `pserver`   | `npm run pserver`     | Roda o backend com `tsx` e reinício automático (nodemon) |
| `studio`    | `npm run studio`      | Abre o Prisma Studio para navegar e editar o banco |

---

### 📡 Testando a API (Backend)

Você pode testar os endpoints do backend usando um cliente REST (como o **Thunder Client** dentro do VSCode, **Insomnia** ou **Postman**) ou usando `curl` no terminal.

#### GET /calls – Listar todos os chamados

**Thunder Client / Insomnia:**
- Método: `GET`
- URL: `http://localhost:3000/calls`
- Nenhum corpo (body) necessário.

**curl:**
```bash
curl http://localhost:3000/calls
```

**Resposta esperada:** Um array JSON (mesmo que vazio).

---

#### POST /calls – Criar um novo chamado

**Thunder Client / Insomnia:**
- Método: `POST`
- URL: `http://localhost:3000/calls`
- Headers: `Content-Type: application/json`
- Corpo (JSON):
```json
{
  "title": "Chamado de teste",
  "smallDesc": "Descrição curta",
  "fullDesc": "Descrição completa e detalhada",
  "dueDate": "2026-09-15T14:30:00",
  "priority": "high",
  "tags": [{ "name": "Urgente", "color": "#ff0000" }]
}
```

**curl:**
```bash
curl -X POST http://localhost:3000/calls \
  -H "Content-Type: application/json" \
  -d '{"title":"Chamado de teste","smallDesc":"Descrição curta","fullDesc":"Descrição completa e detalhada","dueDate":"2026-09-15T14:30:00","priority":"high","tags":[{"name":"Urgente","color":"#ff0000"}]}'
```

**Resposta esperada:** O objeto do chamado criado, incluindo um `id` gerado e os campos enviados.

---

### 🔗 Teste de Integração Completo

1. Execute tanto o frontend (`npm run dev`) quanto o backend (`npm run server`).
2. Abra o frontend em `http://localhost:5173`.
3. Crie um novo chamado através do formulário.
4. O chamado deve aparecer na lista **sem** recarregar a página.
5. Recarregue a página – o chamado deve **continuar lá** (porque os dados vêm do banco de dados, não do mock).

> **Nota:** O frontend usa um proxy do Vite (`/api`) para evitar problemas de CORS. Isso significa que todas as requisições para `/api/calls` são encaminhadas para `http://localhost:3000/calls`. Você não precisa se preocupar com CORS durante o desenvolvimento.

---

### Recursos

- **Criar chamados** — Adicione um novo chamado com título, descrição, data de vencimento, prioridade e tags.
- **Gerenciamento de tags** — Crie tags personalizadas com cores para organizar seus chamados.
- **Atualização da lista em tempo real** — A lista de chamados é atualizada instantaneamente ao criar ou modificar itens.
- **Níveis de prioridade** — Atribua prioridade baixa, média ou alta aos seus chamados.
- **Layout responsivo** *(planejado)* — Design mobile-first (em andamento).
- **Backend funcional** — Servidor Express expondo `GET` e `POST /calls`, com o frontend conectado através de um proxy do Vite.
- **Persistência no banco de dados** — Os chamados são armazenados em um banco **SQLite** via **Prisma ORM**, então os dados sobrevivem a reinícios do servidor e recarregamentos da página.
- **Migrações** — Mudanças no schema são rastreadas como migrações em `prisma/migrations` e aplicadas com `npx prisma migrate dev`.
- **Prisma Studio** — Navegue e edite o banco visualmente com `npm run studio`.
- **Scripts convenientes** — `npm run server` (backend), `npm run pserver` (backend com reinício automático) e `npm run studio` (interface do banco).

---

### Estrutura do Projeto

```
call-ally/
├─ .github/workflows/
│  └─ ci.yml                   # Pipeline de CI (typecheck e build)
├─ .agents/                    # Skills de agentes de IA (Prisma, geradas pelo prisma init)
├─ backend/
│  └─ server.ts                # Servidor Express usando o Prisma Client
├─ prisma/
│  ├─ schema.prisma            # Schema do Prisma (modelo Call e generator)
│  └─ migrations/              # Histórico de migrações SQL
├─ scripts/
│  └─ prisma-studio.mjs        # Inicializador do Prisma Studio (URL do arquivo SQLite)
├─ src/                        # Código-fonte do frontend
│  ├─ components/              # Componentes reutilizáveis de interface (React)
│  ├─ services/                # Camada de acesso a dados (fetch para a API do backend)
│  ├─ styles/                  # Arquivos de CSS globais
│  ├─ types/                   # Tipos de domínio compartilhados
│  ├─ App.tsx                  # Componente raiz com o estado global dos chamados e o layout da página
│  ├─ main.tsx                 # Ponto de entrada do React que renderiza <App />
│  └─ vite-env.d.ts            # Declarações de tipos do Vite
├─ .env.example                # Template de variáveis de ambiente (DATABASE_URL)
├─ .gitignore                  # Lista arquivos e pastas ignorados pelo Git
├─ index.html                  # Arquivo HTML de entrada com o ponto de montagem #root
├─ package-lock.json           # Fixa as versões exatas das dependências instaladas
├─ package.json                # Metadados, scripts e dependências do projeto
├─ prisma.config.ts            # Configuração do Prisma (URL do datasource e caminho das migrações)
├─ README.md                   # Documentação do projeto
├─ tsconfig.json               # Configuração do compilador TypeScript
└─ vite.config.js              # Configuração do Vite (servidor de desenvolvimento e proxy /api)
```

#### Descrição das pastas

| Pasta           | Descrição |
|-----------------|-----------|
| `src/`          | Todo o código-fonte da aplicação fica aqui. |
| `src/components/` | Peças reutilizáveis da interface React. Cada componente recebe dados via `props` e gerencia seu próprio estado local. |
| `src/services/`   | Camada de acesso a dados que abstrai a origem dos dados. A interface nunca acessa a fonte diretamente. Atualmente usa `fetch` para se comunicar com a API do backend. |
| `src/styles/`     | CSS global compartilhado por toda a aplicação. |
| `src/types/`      | Tipos de domínio usados em toda a aplicação. Eles definem o contrato entre o frontend e o backend, portanto sua estrutura deve corresponder ao que a API retorna. |
| `src/generated/`  | Prisma Client gerado por `npx prisma generate`. Ignorado pelo Git; regenere após mudanças no schema. |
| `backend/`        | Código-fonte da API REST. Contém o servidor Express, as definições de rotas e o Prisma Client que persiste os dados no banco SQLite. |
| `prisma/`         | Schema do Prisma (`schema.prisma`) e as migrações SQL que evoluem o banco de dados. |
| `scripts/`        | Scripts auxiliares. `prisma-studio.mjs` abre o Prisma Studio com a URL correta do arquivo SQLite. |
| `.agents/`        | Skills de agentes de IA (documentação do Prisma CLI/Client) consumidas por agentes de codificação. |
| `.github/workflows` | Configuração de CI/CD. O arquivo `ci.yml` define o pipeline de integração contínua, que executa verificações de tipo e a build a cada `push` ou `pull request` para a branch `main`. |

---

### Próximos Passos

O roadmap abaixo está organizado em marcos (*milestones*). O progresso de cada um é acompanhado pelos [milestones](https://github.com/trelosoke/call-ally/milestones) e pelas [issues](https://github.com/trelosoke/call-ally/issues) abertas neste repositório.

#### ✅ MVP Frontend (Integração React) — *concluído*

> Interface React totalmente funcional rodando no navegador, permitindo criar e listar chamados usando o mock em memória (sem backend ainda). Prazo: **30 de ago de 2026**.

- [x] [#1](https://github.com/trelosoke/call-ally/issues/1) Implementar envio e redefinição do formulário
- [x] [#2](https://github.com/trelosoke/call-ally/issues/2) Criar um componente de lista de chamados
- [x] [#3](https://github.com/trelosoke/call-ally/issues/3) Carregar a lista de chamados na inicialização
- [x] [#4](https://github.com/trelosoke/call-ally/issues/4) Atualizar a lista após criar um novo chamado
- [x] [#5](https://github.com/trelosoke/call-ally/issues/5) Registrar melhorias futuras para o tratamento de datas
- [x] [#6](https://github.com/trelosoke/call-ally/pull/6) Migrar o frontend de Vanilla TS para React

#### 🚧 MVP Full-Stack (Backend + Banco de Dados) — *em andamento*

> Substituir o array em memória por um servidor Node.js real e um banco de dados SQLite. As tarefas de qualidade e documentação são tratadas em paralelo ao longo deste marco. Prazo: **21 de set de 2026**.

- [x] [#7](https://github.com/trelosoke/call-ally/issues/7) Criar um servidor com roteamento básico
- [x] [#8](https://github.com/trelosoke/call-ally/issues/8) Conectar o frontend ao servidor real
- [x] [#9](https://github.com/trelosoke/call-ally/issues/9) Introduzir armazenamento persistente de dados
- [x] [#10](https://github.com/trelosoke/call-ally/issues/10) Migrar as operações de leitura para o armazenamento persistente
- [x] [#11](https://github.com/trelosoke/call-ally/issues/11) Migrar as operações de escrita para o armazenamento persistente
- [ ] [#12](https://github.com/trelosoke/call-ally/issues/12) Remover o armazenamento temporário e validar o sistema completo
- [ ] [#20](https://github.com/trelosoke/call-ally/issues/20) Configurar Integração Contínua (CI) para o frontend
- [ ] [#21](https://github.com/trelosoke/call-ally/issues/21) Configurar Integração Contínua (CI) para o backend
- [ ] [#22](https://github.com/trelosoke/call-ally/issues/22) Configurar Implantação Contínua (CD) para a aplicação full-stack

#### 📋 Qualidade e Documentação — *em paralelo ao backend*

> As tarefas de documentação, testes e configuração são tratadas como parte do processo de desenvolvimento — não são adiadas para o fim do projeto. Prazo: **27 de set de 2026**.

- [x] [#13](https://github.com/trelosoke/call-ally/issues/13) Escrever README do frontend (estado atual)
- [ ] [#14](https://github.com/trelosoke/call-ally/issues/14) Manter e atualizar o README durante o desenvolvimento do backend
- [ ] [#15](https://github.com/trelosoke/call-ally/issues/15) Implementar testes unitários básicos
- [ ] [#16](https://github.com/trelosoke/call-ally/issues/16) Implementar testes de integração da API
- [ ] [#17](https://github.com/trelosoke/call-ally/issues/17) Padronizar variáveis de ambiente e configuração
- [ ] [#18](https://github.com/trelosoke/call-ally/issues/18) Adicionar documentação da API (OpenAPI / Markdown)
- [ ] [#19](https://github.com/trelosoke/call-ally/issues/19) Implementar logging estruturado e tratamento de erros
- [ ] [#23](https://github.com/trelosoke/call-ally/issues/23) Aplicar estilização com Tailwind CSS