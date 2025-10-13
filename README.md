![Logo do Projeto](assets/img/library.png)

````markdown
# API de Gerenciamento de Biblioteca


## 📖 Visão Geral do Projeto

Este projeto consiste no desenvolvimento de uma API RESTful para o gerenciamento completo de uma biblioteca, focada nas entidades de **Livros**, **Autores**, **Leitor** e **Empréstimos**. O objetivo é cumprir os requisitos de graduação definidos nos **Conceitos C, B e A**, demonstrando um sólido conhecimento em operações CRUD, modelagem de dados, segurança de APIs e deploy em nuvem.

## 🎯 Requisitos e Nível de Entrega

Abaixo estão listados os requisitos organizados por conceito. Utilize as checkboxes para acompanhar o progresso do desenvolvimento.

### Conceito C (Base e Persistência)

- [ ] **Apresentação do projeto** de forma clara.
- [x] **API RESTful com dois CRUDs** completos e funcionando, com persistência de dados (Ex: Livros e Autores).
- [x] Utilização de **Git** e **GitHub** (ou Bitbucket) para controle de versão.
- [x] **Colaboração evidenciada** no histórico de commits do controle de versão (em caso de dupla).
- [x] **Modelagem apropriada do REST**:
    - [x] Definição correta dos endpoints (URLs).
    - [x] Retorno correto dos status codes HTTP (2xx, 4xx, 5xx).
- [x] **Testes das APIs** realizados corretamente com Insomnia, Postman ou similar.

### Conceito B (Lógica de Negócio e Docker)

- [ ] Realizar todos os requisitos para o **Conceito C**.
- [ ] Implementar uma funcionalidade que **manipule duas entidades simultaneamente** (Ex: Criar um Empréstimo, que utiliza Livro e Leitor).
- [x] Implementar uma funcionalidade com mapeamento **1-1** ou **Many-1** (duas, se for em dupla).
- [x] **Tratamento de erros e validações** robusto, utilizando a camada de negócio (Service).
- [x] **Modelagem apropriada do REST**:
    - [x] Retorno de `400 Bad Request` em erros de validação.
    - [x] Retorno de `404 Not Found` para recursos não encontrados.
- [x] Utilização de **Docker** para containerizar a aplicação.

### Conceito A (Avançado e Deploy)

- [ ] Aplicação completa, realizando todas as funcionalidades do **Conceito B**.
- [ ] Aplicação de **regras de negócio** complexas e corretamente implementadas.
- [ ] Implementar uma funcionalidade que utilize mapeamento **Many-Many** (Ex: Livro e Leitor na entidade Empréstimo) ou que trabalhe com mais de duas entidades.
- [ ] Utilizar **recursos de mídias** (upload de imagem, áudio ou outro) em um dos endpoints (Ex: Imagem de capa do Livro).
- [x] Utilizar **autenticação nas APIs** aplicando padrões de segurança:
    - [x] Implementação de **OAuth** e/ou **JWT** (JSON Web Tokens).
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

## 📦 Modelo de Dados das Entidades

Abaixo está a estrutura de colunas sugerida para cada entidade principal do banco de dados.

### `Autor`

| Nome da Coluna | Tipo de Dado | Descrição / Restrições |
| :--- | :--- | :--- |
| `id` | `BIGINT` / `SERIAL` | Chave Primária (PK), Auto-incremento. |
| `nome` | `VARCHAR(255)` | Nome completo do autor. Obrigatório (`NOT NULL`). |
| `nacionalidade` | `VARCHAR(100)` | País de origem do autor. Opcional. |
| `biografia` | `TEXT` | Breve biografia do autor. Opcional. |

### `Livro`

| Nome da Coluna | Tipo de Dado | Descrição / Restrições |
| :--- | :--- | :--- |
| `id` | `BIGINT` / `SERIAL` | Chave Primária (PK), Auto-incremento. |
| `titulo` | `VARCHAR(255)` | Título do livro. Obrigatório (`NOT NULL`). |
| `ano_publicacao` | `INT` | Ano em que o livro foi publicado. Opcional. |
| `genero` | `VARCHAR(100)` | Gênero literário do livro. Opcional. |
| `quantidade_disponivel` | `INT` | Nº de cópias disponíveis para empréstimo. `DEFAULT 0`. |
| `imagem_capa_url` | `VARCHAR(255)` | URL para a imagem da capa do livro. Opcional. |
| `autor_id` | `BIGINT` | Chave Estrangeira (FK) para a tabela `Autor`. Obrigatório. |

### `Leitor`

| Nome da Coluna | Tipo de Dado | Descrição / Restrições |
| :--- | :--- | :--- |
| `id` | `BIGINT` / `SERIAL` | Chave Primária (PK), Auto-incremento. |
| `nome` | `VARCHAR(255)` | Nome completo do leitor. Obrigatório. |
| `email` | `VARCHAR(255)` | Endereço de e-mail do leitor. Obrigatório e `UNIQUE`. |
| `senha` | `VARCHAR(255)` | Senha criptografada (hash). Obrigatório. |

### `Empréstimo`

| Nome da Coluna | Tipo de Dado | Descrição / Restrições |
| :--- | :--- | :--- |
| `id` | `BIGINT` / `SERIAL` | Chave Primária (PK), Auto-incremento. |
| `livro_id` | `BIGINT` | Chave Estrangeira (FK) para a tabela `Livro`. Obrigatório. |
| `leitor_id` | `BIGINT` | Chave Estrangeira (FK) para a tabela `Leitor`. Obrigatório. |
| `data_emprestimo` | `DATE` | Data em que o empréstimo foi realizado. `DEFAULT NOW()`. |
| `data_prevista_devolucao` | `DATE` | Data limite para a devolução do livro. Obrigatório. |
| `data_devolucao` | `DATE` | Data em que o livro foi efetivamente devolvido. Opcional. |
| `status` | `VARCHAR(50)` | Status do empréstimo ('ATIVO', 'DEVOLVIDO', 'ATRASADO'). |

## 📂 Estrutura de Diretórios (Padrão de Camadas)

```bash
src/
├── controller/   # Recebe as requisições HTTP, chama os services e retorna a resposta
├── service/      # Contém a lógica de negócio, regras e validações do sistema
├── repository/   # Responsável pela comunicação com o banco de dados (queries, ORM)
├── routes/       # Define as rotas da aplicação e as associa aos controllers
├── entity/       # Modelos de dados / entidades (Livro, Autor, Leitor, Empréstimo)
└── utils/        # Funções utilitárias, middlewares, helpers (opcional)
````

-----

## 🛠️ Próximos Passos para Desenvolvimento

Esta seção é dedicada a orientar os próximos desenvolvedores sobre as tarefas prioritárias e o fluxo de trabalho a ser seguido.

### Tarefas Pendentes

1.  **Implementar o CRUD da entidade `Autor`**:

      * **Modelo da Entidade**: Criar a entidade `Autor` seguindo a estrutura definida na seção "Modelo de Dados das Entidades".
      * **Relacionamento**: Estabelecer a relação **One-to-Many** entre `Autor` e `Livro`.
      * **Camadas**: Desenvolver a lógica completa nas camadas `repository`, `service` e `controller`.
      * **Endpoints**: Implementar as rotas (`GET`, `POST`, `PUT`, `DELETE`) para o recurso `/autores`.

2.  **Implementar o CRUD da entidade `Leitor`**:

      * **Modelo da Entidade**: Criar a entidade `Leitor` conforme a estrutura já documentada.
      * **Segurança**: Lembre-se de implementar a criptografia (hashing) para o campo `senha` antes de salvá-lo no banco de dados.
      * **Camadas**: Desenvolver a lógica completa nas camadas `repository`, `service` e `controller`.
      * **Endpoints**: Implementar as rotas (`GET`, `POST` para registro, `PUT`, `DELETE`) para o recurso `/leitores`.

### ❗ Instruções de Git e Fluxo de Trabalho

  * **Branch de Desenvolvimento**: Todo o desenvolvimento **DEVE** ser realizado na branch `develop`.
  * **Não fazer merge na Main**: **NÃO FAÇA** merge direto na branch `main`. A branch `main` deve ser atualizada apenas através de Pull Requests aprovados.

<!-- end list -->

```
```