![Logo do Projeto](assets/img/library.png)

API de Gerenciamento de Biblioteca
📖 Visão Geral do Projeto
Este projeto consiste no desenvolvimento de uma API RESTful para gerenciamento de uma biblioteca, focada em Livros, Autores e Empréstimos. O objetivo é cumprir os requisitos de graduação definidos nos Conceitos C, B e A, demonstrando conhecimento em CRUD, modelagem de dados, segurança e deploy.

🎯 Requisitos e Nível de Entrega
Abaixo estão listados os requisitos organizados por conceito. Use as checkboxes para acompanhar o progresso.

Conceito C (Base e Persistência)
[ ] Apresentação do projeto de forma clara.

[ ] API RESTful com dois CRUDs completos e funcionando, com persistência (Ex: Livros e Autores).

[ ] Utilização de Git e GitHub (ou Bitbucket).

[ ] Colaboração evidenciada no controle de versão (em caso de dupla).

[ ] Modelagem apropriada do REST:

[ ] Definição correta dos endpoints (URLs).

[ ] Retorno correto dos status codes HTTP (2xx, 4xx, 5xx).

[ ] Testes das APIs corretamente realizados (com Insomnia, Postman ou similar).

Conceito B (Lógica de Negócio e Docker)
[ ] Realizar todos os requisitos para o Conceito C.

[ ] Implementar uma funcionalidade que manipule duas entidades simultaneamente (Ex: Criar Empréstimo, que usa Livro e Leitor).

[ ] Implementar uma funcionalidade com mapeamento 1-1 ou Many-1 (duas, se for em dupla).

[ ] Tratamento de erros e validações robusto, utilizando a camada de negócio (Service).

[ ] Modelagem apropriada do REST:

[ ] Retorno de 400 (Bad Request) em validações/erros.

[ ] Retorno de 404 (Not Found) para recursos inexistentes.

[ ] Utilização de Docker (containerização da aplicação).

Conceito A (Avançado e Deploy)
[ ] Aplicação completa, realizando todas as funcionalidades do Conceito B.

[ ] Aplicação de regras/funcionalidades de negócio corretamente.

[ ] Implementar uma funcionalidade que utilize mapeamento Many-Many (Ex: Livro e Leitor na entidade Empréstimo) ou trabalhe com mais de duas entidades.

[ ] Utilizar recursos de mídias (imagem, áudio, ou outro) em um dos endpoints (Ex: Imagem de capa do Livro).

[ ] Utilizar autenticação nas APIs aplicando padrões de segurança:

[ ] Implementação de OAuth e/ou JWT (JSON Web Tokens).

[ ] Implantar (deploy) a API em um servidor na nuvem.

[ ] Utilizar CI/CD (Continuous Integration/Continuous Delivery) no deploy (de preferência com GitHub Actions).

🌐 Estrutura da API e Endpoints
A API é estruturada em torno de quatro recursos principais. O prefixo é api/.

Recursos Principais
Recurso (Entidade)	Relações Típicas	Endpoint Base	CRUD (Verbos)
Livro	Many-to-One (Autor)	/livros	GET, POST, PUT, DELETE
Autor	One-to-Many (Livro)	/autores	GET, POST, PUT, DELETE
Leitor	Base para autenticação	/leitores	GET, POST (Registro), PUT
Empréstimo	Many-to-Many (Livro, Leitor)	/emprestimos	GET, POST (Novo), PUT (Dev.)

Exportar para as Planilhas
Exemplos de Endpoints de Ação/Relacionamento
Ação/Requisito	Verbo	Endpoint	Status Code (Sucesso)
Novo Empréstimo (Conceito B)	POST	/emprestimos	201 Created
Devolver Livro (Conceito B)	PUT	/emprestimos/{id}/devolver	200 OK
Listar Livros por Autor	GET	/autores/{autorId}/livros	200 OK
Login/Autenticação (Conc. A)	POST	/auth/login	200 OK (retorna JWT)

Exportar para as Planilhas
📂 Estrutura de Diretórios (Padrão de Camadas)
A organização do código deve seguir o padrão de camadas para garantir a clareza e separação de responsabilidades (requisito B):

Bash

src/
├── controller/   # Recebe as requisições HTTP, chama os services e retorna a resposta
├── service/      # Lógica de negócio, regras e validações do sistema
├── repository/   # Comunicação com o banco de dados (queries, ORM, persistência)
├── routes/       # Define rotas da aplicação e associa controllers
├── entity/       # Modelos de dados / entidades (Livro, Autor, Leitor, Empréstimo)
└── utils/        # Funções utilitárias, middlewares, helpers (opcional)
