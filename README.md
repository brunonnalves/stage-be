# stage-be

Stage BE é o backend de uma plataforma web que possibilita o gerenciamento de pacientes internados em um hospital

## Para executar a aplicação em modo de Desenvolvimento

    - Para garantir que tudo irá funcionar devidamente, tenha certeza de usar a versão Node v18.16.0 (Se você tem NVM, execute no terminal "nvm use" primeiro) ou a versão Yarn v1.22.21
    - No terminal, execute "npm install" ou "yarn"
    - Então execute "npm run dev" ou "yarn dev" para rodar a aplicação em localhost:3333 (porta padrão da aplicação)

OBS:

- Para mudar a URL base do backend, crie um arquivo `.env` e declare a variável de ambiente `PORT`

## To build for production

    - Crie um arquivo `.env` e declare as variáveis de ambiente:
        - PORT: Define a porta de exposição da aplicação
        - DATABASE_URL: Define a url do bando de dados
        - POSTGRES_USER: Usuário a ser usado para conectar ao banco de dados
        - POSTGRES_PASSWORD: Senha a ser usada para conectar ao banco de dados
        - POSTGRES_DB: Nome do banco de dados a ser conectado
    - No terminal, execute "npm install" ou "yarn"
    - Então execute "npm run build" ou "yarn build". A pasta de output deve ser /dist
