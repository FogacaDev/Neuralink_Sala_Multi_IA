# NeuraLink - Sala Multi-IA

## Sobre o Projeto

NeuraLink é uma aplicação web onde 5 IAs com personalidades diferentes podem conversar entre si infinitamente. O sistema permite a interação de usuários com as IAs e oferece um modo "infinito" onde as IAs continuam a conversar automaticamente.

## Funcionalidades

- 🤖 **5 IAs com personalidades distintas**:
  - **NeuraBot**: Analítico e direto, focado em dados e fatos
  - **EmotiAI**: Empática e sociável, foca em sentimentos
  - **FiloBot**: Filosófica e questionadora, faz perguntas profundas
  - **CreativAI**: Criativa e inspiradora, tem ideias inovadoras
  - **SciBot**: Científica e cética, baseada em evidências

- 🔄 **Modo Infinito**: As IAs conversam automaticamente entre si
- 🎮 **Controles individuais**: Ative ou desative IAs específicas
- 🌙 **Tema claro/escuro**: Escolha a aparência que preferir
- 📊 **Estatísticas**: Acompanhe o tempo ativo e total de mensagens
- ⚙️ **Velocidade ajustável**: Controle o ritmo da conversa automatizada

## Tecnologias Utilizadas

- **Backend**: Node.js, Express, Socket.IO
- **Frontend**: HTML5, CSS3, JavaScript
- **Comunicação em tempo real**: WebSockets

## Instalação

1. Certifique-se de ter o [Node.js](https://nodejs.org/) instalado (versão 14 ou superior)
2. Clone este repositório
3. Instale as dependências:

```bash
npm install
```

4. Inicie o servidor:

```bash
node server.js
```

5. Acesse a aplicação em seu navegador: `http://localhost:3000`

## Dependências

Você precisará instalar os seguintes pacotes:

```bash
npm install express socket.io
```

## Como utilizar

1. **Iniciar a aplicação**: Após acessar a URL, você verá a interface da sala de chat
2. **Conversar com as IAs**: Digite mensagens no campo inferior e pressione Enter
3. **Ativar o Modo Infinito**: Clique no toggle "Modo Infinito" para que as IAs conversem automaticamente
4. **Gerenciar IAs**: Você pode ativar/desativar IAs individuais usando os botões no painel lateral
5. **Ajustar velocidade**: Use o slider de velocidade para controlar o ritmo da conversa

## Personalizando as IAs

Você pode personalizar as personalidades e tópicos das IAs editando o arquivo `server.js`. Procure pela seção `const ias = [...]` e modifique conforme necessário.

## Estrutura do Projeto

```
.
├── public/                 # Arquivos estáticos servidos pelo Express
│   ├── index.html          # Página principal
│   ├── style.css           # Estilos da aplicação
│   └── script.js           # Lógica frontend
├── server.js               # Servidor Node.js com Socket.IO
└── README.md               # Este arquivo
```

## Contribuição

Sinta-se à vontade para contribuir com este projeto. Algumas ideias para melhorias:

1. Implementar algoritmos de IA mais sofisticados usando processamento de linguagem natural
2. Adicionar mais personalidades de IAs
3. Implementar recursos como "gravação de conversas"
4. Melhorar a responsividade mobile
5. Adicionar suporte a múltiplas salas de chat

## Licença

Este projeto está sendo desenvolvido por Renan Fogaça.
