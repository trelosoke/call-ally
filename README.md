<h1 align="center">CallAlly</h1>
 
<p align="center">CallAlly is a task management tool where you can organize tickets using tags and see updates reflected immediately on the interface.</p>

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
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" width="40" height="40" />
</p>

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

### Running the Frontend

Start the development server:

```bash
npm run dev
```

The application will be available at [`http://localhost:5173`](http://localhost:5173).

### Testing the Application

- Open your browser and navigate to `http://localhost:5173`
- Create a new call by filling in the form and clicking **Criar Chamado**
- Add tags using the tag input and the color picker
- Verify that new calls appear instantly in the list below

> **Note:** The current version uses a mock in-memory service for testing, so data is lost on page refresh. A backend with persistent storage is coming soon.

---

## Features

- **Create calls** — Add a new call with title, description, due date, priority, and tags.
- **Tag management** — Create custom tags with colors to organize your calls.
- **Real-time list updates** — The call list updates instantly as you create or modify items.
- **Priority levels** — Assign low, medium, or high priority to your calls.
- **Responsive layout** *(planned)* — Mobile-first design (in progress).

---

## Project Structure

```
call-ally/
└─ src/                       # Application source code.
   ├─ components/             # Reusable React UI components.
   ├─ services/               # Data access layer (async mock API).
   ├─ styles/                 # Global CSS files.
   ├─ types/                  # Shared domain types.
   ├─ App.tsx                 # Root component with global calls state and page layout.
   ├─ main.tsx                # React entry point that renders <App />.
   └─ vite-env.d.ts           # Vite type declarations.
├─ .gitignore                 # Lists files and folders ignored by Git.
├─ index.html                 # Entry HTML file with the #root mount point.
├─ package-lock.json          # Locks the exact versions of installed dependencies.
├─ package.json               # Project metadata, scripts and dependencies.
├─ README.md                  # Project documentation.
├─ tsconfig.json              # TypeScript compiler configuration.
├─ vite.config.js             # Vite configuration (dev server and build).
```

### Folder descriptions

| Folder        | Description |
|---------------|-------------|
| `src/`        | All application source code lives here. |
| `src/components/` | Reusable React UI pieces. Each component receives data via props and manages its own local state. |
| `src/services/`   | Data access layer that abstracts where data comes from. UI never touches the source directly. Currently a mock with `setTimeout`; in the future it will use `fetch` against the backend. |
| `src/styles/`     | Global CSS shared by the whole app. |
| `src/types/`      | Domain types used everywhere. They define the contract between frontend and the future backend, so their shape must match what the API returns. |

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

> Replace the in-memory array with a real Node.js server and PostgreSQL database. Quality and documentation tasks are being handled in parallel throughout this milestone. Due **Sep 21, 2026**.

- [ ] [#7](https://github.com/trelosoke/call-ally/issues/7) Establish a Server with Basic Routing
- [ ] [#8](https://github.com/trelosoke/call-ally/issues/8) Connect the Frontend to the Real Server
- [ ] [#9](https://github.com/trelosoke/call-ally/issues/9) Introduce Persistent Data Storage
- [ ] [#10](https://github.com/trelosoke/call-ally/issues/10) Migrate Read Operations to Persistent Storage
- [ ] [#11](https://github.com/trelosoke/call-ally/issues/11) Migrate Write Operations to Persistent Storage
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
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" width="40" height="40" />
</p>

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

#### Executando o Frontend

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em [`http://localhost:5173`](http://localhost:5173).

#### Testando a Aplicação

- Abra o navegador e acesse `http://localhost:5173`
- Crie um novo chamado preenchendo o formulário e clicando em **Criar Chamado**
- Adicione tags usando o campo de texto e o seletor de cores
- Verifique se novos chamados aparecem imediatamente na lista abaixo

> **Nota:** A versão atual utiliza um serviço mock em memória para testes, portanto os dados são perdidos ao atualizar a página. Um backend com armazenamento persistente está em desenvolvimento.

---

### Recursos

- **Criar chamados** — Adicione um novo chamado com título, descrição, data de vencimento, prioridade e tags.
- **Gerenciamento de tags** — Crie tags personalizadas com cores para organizar seus chamados.
- **Atualização da lista em tempo real** — A lista de chamados é atualizada instantaneamente ao criar ou modificar itens.
- **Níveis de prioridade** — Atribua prioridade baixa, média ou alta aos seus chamados.
- **Layout responsivo** *(planejado)* — Design mobile-first (em andamento).

---

### Estrutura do Projeto

```
call-ally/
└─ src/                       # Código-fonte da aplicação.
   ├─ components/             # Componentes reutilizáveis de interface (React).
   ├─ services/               # Camada de acesso a dados (API mock assíncrona).
   ├─ styles/                 # Arquivos de CSS globais.
   ├─ types/                  # Tipos de domínio compartilhados.
   ├─ App.tsx                 # Componente raiz com o estado global dos chamados e o layout da página.
   ├─ main.tsx                # Ponto de entrada do React que renderiza <App />.
   └─ vite-env.d.ts           # Declarações de tipos do Vite.
├─ .gitignore                 # Lista arquivos e pastas ignorados pelo Git.
├─ index.html                 # Arquivo HTML de entrada com o ponto de montagem #root.
├─ package-lock.json          # Fixa as versões exatas das dependências instaladas.
├─ package.json               # Metadados, scripts e dependências do projeto.
├─ README.md                  # Documentação do projeto.
├─ tsconfig.json              # Configuração do compilador TypeScript.
├─ vite.config.js             # Configuração do Vite (servidor de desenvolvimento e build).
```

#### Descrição das pastas

| Pasta           | Descrição |
|-----------------|-----------|
| `src/`          | Todo o código-fonte da aplicação fica aqui. |
| `src/components/` | Componentes reutilizáveis de interface (React). Cada componente recebe dados via props e gerencia seu próprio estado local. |
| `src/services/`   | Camada de acesso a dados que abstrai a origem dos dados. A interface nunca acessa a origem diretamente. Atualmente usa um mock com `setTimeout`; no futuro usará `fetch` contra o backend. |
| `src/styles/`     | CSS global compartilhado por toda a aplicação. |
| `src/types/`      | Tipos de domínio usados em toda a aplicação. Eles definem o contrato entre o frontend e o futuro backend, portanto sua forma deve corresponder ao que a API retorna. |

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

> Substituir o array em memória por um servidor Node.js real e um banco de dados PostgreSQL. As tarefas de qualidade e documentação são tratadas em paralelo ao longo deste marco. Prazo: **21 de set de 2026**.

- [ ] [#7](https://github.com/trelosoke/call-ally/issues/7) Criar um servidor com roteamento básico
- [ ] [#8](https://github.com/trelosoke/call-ally/issues/8) Conectar o frontend ao servidor real
- [ ] [#9](https://github.com/trelosoke/call-ally/issues/9) Introduzir armazenamento persistente de dados
- [ ] [#10](https://github.com/trelosoke/call-ally/issues/10) Migrar as operações de leitura para o armazenamento persistente
- [ ] [#11](https://github.com/trelosoke/call-ally/issues/11) Migrar as operações de escrita para o armazenamento persistente
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