## Gerenciamento de Clientes

Este repositório contém o código-fonte de uma aplicação web para gerenciamento de clientes . A aplicação é desenvolvida usando React.js para o frontend e Node.js para o backend.

## Como rodar localmente

### Pré-requisitos
 1.  Antes de prosseguir, você precisará ter o Node.js e o PostgreSQL instalados em sua máquina.

- Node.js: [Download Node.js](https://nodejs.org/en)
- PostgreSQL: [Download PostgreSQL](https://www.postgresql.org/)

## Passos para executar o backend:
Clone o repositório do backend:

2.Abra o cmd e insira o seguinte codigo
````bash
git clone https://github.com/MaikeSouzaL/api_Residencias
````
3.Navegue até o diretório onde foi salvo arquivo:
- Instale as dependências:
```bash
 yarn install
 ```
4.Execute o servidor:
```bash
yarn dev
```
### O servidor estará rodando em http://localhost:3080.

# Passos para executar o frontend:
1. Clone o repositório do frontend:
```bash
git clone https://github.com/MaikeSouzaL/clientmapapp
```
2. Navegue até o diretório do frontend:
- Instale as dependências:
```bash
yarn install
```
3. Execute o aplicativo React:
```bash
yarn start
```
- O aplicativo estará rodando em http://localhost:3000.

# Configurações do Banco de Dados
- <p>Certifique-se de configurar corretamente as credenciais do banco de dados PostgreSQL no arquivo de configuração do backend.</p>
```bash
javascript
// Arquivo de configuração do banco de dados (backend/config/db.config.js)

const { Pool } = require('pg');

const pool = new Pool({
user: 'postgres',
password: 'admin',
host: 'localhost',
database: 'facilita_juridico',
port: 5433,
});

module.exports = pool;
```
-  DDL do Banco de Dados

- Aqui estão os scripts SQL para criar o banco de dados e as tabelas necessárias:

- [x] Se tiver o postgres intalado em sua máquina abra-o va ele vai te pedir para cria um user e senha
no nosso cado criamos como senha admin
Ao abrir crie uma nova database e de o nome de facilita_juridico

1. Criar o banco de dados
```bash
CREATE DATABASE facilita_juridico;
```
- Usar o banco de dados facilita_juridico
```
\c facilita_juridico;
```

2. Criar a tabela 'clientes'
```bash
CREATE TABLE clientes (
id SERIAL PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL,
telefone VARCHAR(20) NOT NULL,
servico_realizado BOOLEAN NOT NULL DEFAULT false
);
```

3. Criar a tabela 'coordenadas'
```bash
CREATE TABLE coordenadas (
id SERIAL PRIMARY KEY,
cliente_id INTEGER REFERENCES clientes(id),
coordenada_x DOUBLE PRECISION NOT NULL,
coordenada_y DOUBLE PRECISION NOT NULL
);
```
- Contribuindo
Contribuições são bem-vindas! Se você quiser contribuir com este projeto, por favor abra uma issue para discutir a alteração que você gostaria de fazer.

### Licença
Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para obter mais detalhes.
 


https://github.com/MaikeSouzaL/clientmapapp/assets/131722275/c99e7706-1304-4f5e-8702-fc09ebd06cd4

