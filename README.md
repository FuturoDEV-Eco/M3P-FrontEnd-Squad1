# Recicla365

[![React](https://img.shields.io/badge/React-17.0.2-blue?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/) [![Node.js](https://img.shields.io/badge/Node.js-16.13.1-green?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/) [![JavaScript](https://img.shields.io/badge/JavaScript-ES6-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) [![HTML5](https://img.shields.io/badge/HTML5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML) [![CSS3](https://img.shields.io/badge/CSS3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS) [![Git](https://img.shields.io/badge/Git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)](https://git-scm.com/) [![GitHub](https://img.shields.io/badge/GitHub-%23181717.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com)

## 📚 Introdução

O **Recicla365** é uma plataforma que facilita o gerenciamento de resíduos e o acesso a pontos de coleta de materiais recicláveis. Os usuários podem cadastrar novos pontos de coleta, encontrar locais próximos em um mapa interativo, visualizar informações sobre os materiais aceitos em cada ponto e registrar suas próprias contribuições para a reciclagem.

## 🏆 Squad

- **André Luiz Amorim de Souza** - Project Owner - [GitHub :octocat: ](https://github.com/andreluizamorimdev)

- **Viviani Lorigiola Harima** - [GitHub :octocat: ](https://github.com/vivianiharima)

- **Deyse Aiala Rosa Vieira** - [GitHub :octocat: ](https://github.com/deyseaiala)

- **Lucas Pedro Lopes Corrêa** - [GitHub :octocat: ](https://github.com/lucasplcorrea)

## 📋 Requisitos da Aplicação

A aplicação de Front-End foi desenvolvida utilizando React e contempla os seguintes requisitos:

### Dashboard (página pública)

- Exibir uma visão geral dos locais de coleta de resíduos cadastrados.
- Uso de cards para mostrar a quantidade de usuários ativos e locais cadastrados.
- Listagem dos locais de coleta em forma de lista ou de cards sem as opções de editar e excluir.
- A lista de pontos de coleta é recebida via integração com o back-end e carrega sempre que a página é acessada.

### Login (página pública)

- Acesso às páginas privadas do sistema.

### Cadastro de Usuários (página pública)

Os usuários precisam fornecer:

- Nome
- Sexo
- CPF
- Data de Nascimento
- E-mail
- Senha
- Endereço (usando ViaCEP)

### Cadastro de Locais de Coleta de Resíduos (página privada) 🔒

Cada usuário pode cadastrar um ou mais locais de coleta, fornecendo:

- Nome do local
- Descrição do local
- Identificador do Usuário
- Localização (via ViaCEP)
- Coordenadas geográficas (longitude e latitude)
- Tipos de resíduos aceitos (ex.: Vidro, Metal, Papel, Plástico, Orgânico, Baterias)
- Link do Google Maps apontando para o local cadastrado.

### Listagem de Locais de Coleta de Resíduos (página privada) 🔒

- Tela para listar os locais, com botões para acessar, editar e deletar um local.
- Cada usuário só pode excluir ou editar os pontos de coleta cadastrados por ele. 🔒

## 📊 Critérios de Avaliação

Os critérios de avaliação das funcionalidades especificadas da aplicação de Front-End estão descritos a seguir:

| Nº  | Critério de Avaliação                  | Descrição          |
| --- | -------------------------------------- | ------------------ |
| 1   | Dashboard com cards informativos       | :white_check_mark: |
| 2   | Cadastro de usuários e Login           | :white_check_mark: |
| 3   | Listagem de pontos de coleta           | :white_check_mark: |
| 4   | Função de exclusão de pontos de coleta | :white_check_mark: |
| 5   | Função de edição de pontos de coleta   | :white_check_mark: |
| 6   | Controle de rotas de navegação         | :white_check_mark: |
| 7   | Uso de Context API                     | :white_check_mark: |
| 8   | Integração do Frontend com o Backend   | :white_check_mark: |
| 0   | Deploy na Vercel ou Netlify            | :white_check_mark: |

## 💻 Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **CSS**: Para estilização fina da aplicação.
- **Material UI**: Para estilização avançada da aplicação.
- **HTML**: Estruturação da aplicação web.

## 🚀 Como Executar o Projeto

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/FuturoDEV-Eco/M3P-FrontEnd-Squad1.git
   cd M3P-FrontEnd-Squad1
   ```
2. **Instale as dependências**:
   ```bash
   npm install
   ```
3. **Crie e configure o .env.development conforme o example**:
   ```bash
   cp .env-example .env.development
   ```
4. **Execute a aplicação em modo desenvolvimento**:
   ```bash
   npm run dev
   ```
