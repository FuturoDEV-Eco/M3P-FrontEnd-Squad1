# Projeto Recicla 365

O Recicla365 é uma plataforma que facilita o gerenciamento de resíduos e o acesso a pontos
de coleta de materiais recicláveis. Os usuários podem cadastrar novos pontos de coleta,
encontrar pontos próximos em um mapa interativo (ou lista), visualizar informações sobre os
materiais aceitos em cada ponto e registrar suas próprias contribuições para a reciclagem.

![PrintDashboard](https://prnt.sc/DWjkm9sGLo7u)

## Stack utilizada

**Front-end:** React, MaterialUI

**Back-end:** Utilizado Json-server para simular a API

## Dependencias

- Material UI

- Emotion
- React hook form
- React Leaftlet
- React router dom
- React toastify

## Dev Dependencias

- Json server
- vite

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/andreluizamorimdev/Recicla365_Projeto.git
```

Entre no diretório do projeto

```bash
  cd Recicla365_Projeto
```

Instale as dependências

```bash
  npm install
```

Abra mais um terminal no vscode

Inicie o projeto

```bash
  npm run dev
```

Inicie o json-server

```bash
  npm run server
```

## Melhorias

Melhorias que podem ser aplicadas são:

- Melhorias no tema (adicionar mudança de tema dark/light)
- Implementar as funcionalidades de editar e deletar usuario em uma pagina de perfil
- Melhorar os mapas criados com o React Leaftlet para que desempenhe melhor em todos os tamanhos de telas.
- Tornar alguns componentes mais reutilizaveis tornando facilitada a manutenção do código
