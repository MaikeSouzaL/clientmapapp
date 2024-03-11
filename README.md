Gerenciamento de Clientes
Este repositório contém o código-fonte de uma aplicação web para gerenciamento de clientes . A aplicação é desenvolvida usando React.js para o frontend e Node.js para o backend.

Como rodar localmente
Pré-requisitos
Antes de prosseguir, você precisará ter o Node.js e o PostgreSQL instalados em sua máquina.

Node.js: Download Node.js
PostgreSQL: [Download PostgreSQL](https://nodejs.org/en)
Passos para executar o backend:
Clone o repositório do backend:

Abra o cmd e insira o seguinte codigo
git clone https://github.com/MaikeSouzaL/api_Residencias
Navegue até o diretório onde foi salvo arquivo:
Instale as dependências:

yarn install
Execute o servidor:
yarn dev
O servidor estará rodando em http://localhost:3080.

Passos para executar o frontend:
Clone o repositório do frontend:
git clone https://github.com/MaikeSouzaL/clientmapapp
Navegue até o diretório do frontend:
Instale as dependências:
yarn install
Execute o aplicativo React:
yarn start
O aplicativo estará rodando em http://localhost:3000.



Configurações do Banco de Dados
Certifique-se de configurar corretamente as credenciais do banco de dados PostgreSQL no arquivo de configuração do backend.
 

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
DDL do Banco de Dados
Aqui estão os scripts SQL para criar o banco de dados e as tabelas necessárias:

Se tiver o postgres intalado em sua máquina abra-o va  ele vai te pedir para cria um user e senha 
no nosso cado criamos como senha admin
Ao abrir crie uma nova database e de o nome de facilita_juridico


-- Criar o banco de dados
CREATE DATABASE facilita_juridico;

-- Usar o banco de dados facilita_juridico
\c facilita_juridico;

-- Criar a tabela 'clientes'
CREATE TABLE clientes (
id SERIAL PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL,
telefone VARCHAR(20) NOT NULL,
servico_realizado BOOLEAN NOT NULL DEFAULT false
);

-- Criar a tabela 'coordenadas'
CREATE TABLE coordenadas (
id SERIAL PRIMARY KEY,
client_id INTEGER REFERENCES clientes(id),
coordenada_x DOUBLE PRECISION NOT NULL,
coordenada_y DOUBLE PRECISION NOT NULL
);

Contribuindo
Contribuições são bem-vindas! Se você quiser contribuir com este projeto, por favor abra uma issue para discutir a alteração que você gostaria de fazer.

Licença
Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para obter mais detalhes.
 
