#### BOV MANAGER
Este repositório possui o código para o desenvolvimento do back-end, da aplicação onde atualmente possui o apenas o  cadastro de usuário:

__Tarefa__ - crie um CRUD para o projeto de gestão de uma propriedade rural, abaixo temos alguns exemplos de cadastros possíveis: 
- CRUD Funcionário
- CRUD Propriedade
- CRUD Animais
- CRUD Estoque
- CRUD Setores de Manejo
- .... 

1. Para execução da tarefa crie uma branch da seguinte forma:

```sh
  git checkout -b crud/nome_do_crud
```

troque nome do crud por fazeda, caso esteja realizando o cadastro de uma fazenda.

1. Execução do projeto 

criar o arquivo `.env` dentro do projeto usando como base o `.env.template`.

```sh
DATABASE_URL= # url da base de dados
PORT=         # porta que o servidor irá subir
EXPIRESIN=    # tempo em segundos para que o jwt expire 
SECRETKEY=    # senha utilizada para assinar o token do jwt
```

primeiro rode o comando `npm i` dentro deste diretório para instalar as dependências

após  rode o comando `npm run start:dev` para inicializad o servidor de aplicação do nests

1. Estrutura do Projeto

```sh
.
├── prism/a           # contém o schema.prisma e as migrations
├── src/              # armazena de fato o código do projeto
├── test/             # código de configuração do jest
├── .env.template    # template o arquivo .env que deve ser criado
├── .gitignore       # Tools and utilities
├── package.json     # contém as dependências do projeto
├── tslint.json      # auxilia na verificação de algumas normas de códigos, neste arquivo se define as regras
├── tsconfig.json    # define como irá realizar a compilação do typescript para javascript.
└── README.md
```

```sh
 .
    ├── ...
    ├── src/                   
    │   ├── auth/          # realiza a autenticação no sistema.
    │   ├── core/          # código para filtrar a exceção e adicionar mais informação
    │   ├── prisma/        # realiza a configuração inicial do prisma e também encerra o mesmo
    │   ├── user/          # possui os serviços para cadastrar um usuário
    │   ├── app.module.ts  # módulo que carrega todos os outros e será chamado pelo main.ts
    │   └── main.ts        # inicializa o servidor de aplicação de acordo com a configuração informada.
    └── ...

```

1. Alterando o modelo

Lembrando que para adicionar um novo modelo no projeto tem que adicionar a configuração dentro do __schema.prisma__

após rodar o comando  `prisma migrate dev --name nome_do_crud`, trocar o nome do CRUD pelo 

1. Adicionado uma rota bloqueada pela autenticação, para realizar o bloqueio de requisição não autorizadas temos que colocar a seguinte anotação dentro do controller.

```js
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
```

1 Alguns comandos nest

- Criação do módulo: `nest g module nome`
- Criação do serviço: `nest g service nome`
- Criação do controlador: `nest g controller nome`

1. Material de apoio
[CRUD Prisma](https://www.prisma.io/docs/concepts/components/prisma-client/crud)
[Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate)