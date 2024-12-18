# Estacionamento Frontend

**Descrição breve**: Este projeto é o frontend para um sistema de gerenciamento de estacionamento, fornecendo uma interface de usuário para operações como entrada e saída de veículos, visualização de tarifas e disponibilidade de vagas.

## Índice

1. [Visão Geral](#visão-geral)
2. [Funcionalidades](#funcionalidades)
3. [Tecnologias Utilizadas](#tecnologias-utilizadas)
4. [Pré-requisitos](#pré-requisitos)
5. [Instalação](#instalação)
6. [Uso](#uso)
7. [Contribuindo](#contribuindo)
8. [Licença](#licença)

## Visão Geral

O Estacionamento Frontend é responsável por fornecer uma interface amigável para os usuários interagirem com o sistema de gerenciamento de estacionamento. Ele permite:

- Registro de entrada e saída de veículos
- Visualização de tarifas com base no tempo de permanência
- Monitoramento da disponibilidade de vagas
- Acesso a relatórios operacionais

## Funcionalidades

- [x] Interface para registro de entrada de veículos
- [x] Interface para registro de saída de veículos
- [x] Exibição de tarifas calculadas
- [x] Monitoramento em tempo real de vagas disponíveis
- [ ] Geração de relatórios (em desenvolvimento)

## Tecnologias Utilizadas

- **Linguagem**: TypeScript
- **Framework**: React.js
- **Ferramenta de Build**: Vite
- **Estilização**: Tailwind CSS

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/enricomadeu/estacionamento-frontend.git
   ```

2. Acesse o diretório do projeto:

   ```bash
   cd estacionamento-frontend
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

   ou

   ```bash
   yarn install
   ```

## Uso

1. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

   ou

   ```bash
   yarn dev
   ```

2. O frontend estará disponível em `http://localhost:5173`.

3. Certifique-se de que o [backend](https://github.com/enricomadeu/estacionamento-backend) esteja em execução para que o frontend possa se comunicar corretamente com a API.

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e enviar pull requests. Para maiores detalhes, veja [CONTRIBUTING.md](CONTRIBUTING.md).

## Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
