![Logo do Projeto](assets/img/library.png)
-----

# API de Gerenciamento de Biblioteca

## 📖 Visão Geral do Projeto

Este projeto consiste no desenvolvimento de uma API RESTful para o gerenciamento completo de uma biblioteca, focada nas entidades de **Livros**, **Autores** e **Empréstimos**. O objetivo é cumprir os requisitos de graduação definidos nos **Conceitos C, B e A**, demonstrando um sólido conhecimento em operações CRUD, modelagem de dados, segurança de APIs e deploy em nuvem.

## 🎯 Requisitos e Nível de Entrega

Abaixo estão listados os requisitos organizados por conceito. Utilize as checkboxes para acompanhar o progresso do desenvolvimento.

### Conceito C (Base e Persistência)

  - [ ] **Apresentação do projeto** de forma clara.
  - [ ] **API RESTful com dois CRUDs** completos e funcionando, com persistência de dados (Ex: Livros e Autores).
  - [ ] Utilização de **Git** e **GitHub** (ou Bitbucket) para controle de versão.
  - [ ] **Colaboração evidenciada** no histórico de commits do controle de versão (em caso de dupla).
  - [ ] **Modelagem apropriada do REST**:
      - [ ] Definição correta dos endpoints (URLs).
      - [ ] Retorno correto dos status codes HTTP (2xx, 4xx, 5xx).
  - [ ] **Testes das APIs** realizados corretamente com Insomnia, Postman ou similar.

### Conceito B (Lógica de Negócio e Docker)

  - [ ] Realizar todos os requisitos para o **Conceito C**.
  - [ ] Implementar uma funcionalidade que **manipule duas entidades simultaneamente** (Ex: Criar um Empréstimo, que utiliza Livro e Leitor).
  - [ ] Implementar uma funcionalidade com mapeamento **1-1** ou **Many-1** (duas, se for em dupla).
  - [ ] **Tratamento de erros e validações** robusto, utilizando a camada de negócio (Service).
  - [ ] **Modelagem apropriada do REST**:
      - [ ] Retorno de `400 Bad Request` em erros de validação.
      - [ ] Retorno de `404 Not Found` para recursos não encontrados.
  - [ ] Utilização de **Docker** para containerizar a aplicação.

### Conceito A (Avançado e Deploy)

  - [ ] Aplicação completa, realizando todas as funcionalidades do **Conceito B**.
  - [ ] Aplicação de **regras de negócio** complexas e corretamente implementadas.
  - [ ] Implementar uma funcionalidade que utilize mapeamento **Many-Many** (Ex: Livro e Leitor na entidade Empréstimo) ou que trabalhe com mais de duas entidades.
  - [ ] Utilizar **recursos de mídias** (upload de imagem, áudio ou outro) em um dos endpoints (Ex: Imagem de capa do Livro).
  - [ ] Utilizar **autenticação nas APIs** aplicando padrões de segurança:
      - [ ] Implementação de **OAuth** e/ou **JWT** (JSON Web Tokens).
  - [ ] **Implantar (deploy)** a API em um servidor na nuvem (AWS, Azure, Heroku, etc.).
  - [ ] Utilizar **CI/CD** (Continuous Integration/Continuous Delivery) no deploy (de preferência com GitHub Actions).

## 🌐 Estrutura da API e Endpoints

A API é estruturada em torno de quatro recursos principais. O prefixo base para todos os endpoints é `/api`.

### Recursos Principais

| Recurso (Entidade) | Relações Típicas | Endpoint Base | CRUD (Verbos) |
| :--- | :--- | :--- | :--- |
| **Livro** | Many-to-One (Autor) | `/livros` | `GET`, `POST`, `PUT`, `DELETE` |
| **Autor** | One-to-Many (Livro) | `/autores` | `GET`, `POST`, `PUT`, `DELETE` |
| **Leitor** | Base para autenticação | `/leitores` | `GET`, `POST` (Registro), `PUT` |
| **Empréstimo** | Many-to-Many (Livro, Leitor) | `/emprestimos` | `GET`, `POST` (Novo), `PUT` (Dev.) |

### Exemplos de Endpoints de Ação/Relacionamento

| Ação / Requisito | Verbo | Endpoint | Status Code (Sucesso) |
| :--- | :--- | :--- | :--- |
| Novo Empréstimo (Conceito B) | `POST` | `/emprestimos` | `201 Created` |
| Devolver Livro (Conceito B) | `PUT` | `/emprestimos/{id}/devolver` | `200 OK` |
| Listar Livros por Autor | `GET` | `/autores/{autorId}/livros` | `200 OK` |
| Login/Autenticação (Conceito A) | `POST` | `/auth/login` | `200 OK` (retorna JWT) |

## 📂 Estrutura de Diretórios (Padrão de Camadas)

A organização do código-fonte segue o padrão de arquitetura em camadas para garantir a clareza, manutenibilidade e separação de responsabilidades (requisito do Conceito B).

```bash
src/
├── controller/   # Recebe as requisições HTTP, chama os services e retorna a resposta
├── service/      # Contém a lógica de negócio, regras e validações do sistema
├── repository/   # Responsável pela comunicação com o banco de dados (queries, ORM)
├── routes/       # Define as rotas da aplicação e as associa aos controllers
├── entity/       # Modelos de dados / entidades (Livro, Autor, Leitor, Empréstimo)
└── utils/        # Funções utilitárias, middlewares, helpers (opcional)
```