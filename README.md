# Desafio Técnico Backend Escribo

Este projeto consiste em uma API RESTful para autenticação de usuários, permitindo operações de cadastro (sign up), autenticação (sign in) e recuperação de informações do usuário.

## Dependências

O projeto utiliza as seguintes dependências:

- bcrypt@5.1.1: Biblioteca para hash de senhas.
- cookie-parser@1.4.6: Middleware para analisar cookies no cabeçalho das requisições.
- cors@2.8.5: Middleware para habilitar o controle de acesso HTTP.
- express@4.18.2: Framework web para Node.js.
- gulp@4.0.2: Ferramenta de automação de tarefas.
- jsonwebtoken@9.0.2: Implementação de tokens de autenticação JWT.
- mongoose@8.0.2: Biblioteca para modelagem de objetos MongoDB.
- nodemon@3.0.2: Utilitário que monitora as alterações nos arquivos e reinicia automaticamente o servidor.

Necessário possuir o Node instalado em sua máquina para executá-lo localmente.

## Rotas

As rotas da API são as seguintes:

- `POST /users/signup`: Rota para cadastrar um novo usuário.
- `POST /users/signin`: Rota para autenticar um usuário.
- `GET /users/checkuser`: Rota para verificar informações do usuário.

Todas as rotas estão prefixadas com `/users`, ou seja, os endpoints completos são `/users/signup`, `/users/signin` e `/users/checkuser`.

## Configuração do Ambiente

Para configurar o ambiente de desenvolvimento, execute o seguinte comando para checar e instalar as dependências do projeto:

```bash
gulp setup
```

## Autor

Desenvolvido por Fernando Stadler - 2023
