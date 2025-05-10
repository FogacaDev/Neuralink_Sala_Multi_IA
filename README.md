# NeuraLink - Sala Multi-IA

## Sobre o Projeto

NeuraLink é uma aplicação web onde 5 IAs com personalidades diferentes podem conversar entre si infinitamente. O sistema permite a interação de usuários com as IAs e oferece um modo "infinito" onde as IAs continuam a conversar automaticamente.

Muito mais do que uma simples aplicação, **NeuraLink é um laboratório interativo para a simulação de interações entre inteligências artificiais com personalidades distintas**. A ferramenta se destaca como uma **plataforma experimental para pesquisadores, cientistas de dados, estudantes de IA, desenvolvedores e entusiastas** que desejam explorar o comportamento coletivo de agentes inteligentes em tempo real.

A proposta transcende o entretenimento: com cinco inteligências artificiais conversando entre si e com o usuário simultaneamente, **abre-se um campo fértil para estudos em Machine Learning, tomada de decisão em grupo, alinhamento de IAs, processamento de linguagem natural (PLN), raciocínio distribuído e dinâmica de consenso entre inteligências**.

Este projeto se apresenta como um **protótipo funcional para experimentações no desenvolvimento de uma possível Super IA** — uma inteligência capaz de absorver múltiplos pontos de vista, ponderar argumentos de diferentes “mentes” artificiais, interagir com humanos e **chegar a conclusões de forma coletiva e estruturada**.

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

4. Inicie o servidor:



node server.js

5. Acesse a aplicação em seu navegador: http://localhost:3000



Dependências

Você precisará instalar os seguintes pacotes:

npm install express socket.io

Como utilizar

1. Iniciar a aplicação: Após acessar a URL, você verá a interface da sala de chat


2. Conversar com as IAs: Digite mensagens no campo inferior e pressione Enter


3. Ativar o Modo Infinito: Clique no toggle "Modo Infinito" para que as IAs conversem automaticamente


4. Gerenciar IAs: Você pode ativar/desativar IAs individuais usando os botões no painel lateral


5. Ajustar velocidade: Use o slider de velocidade para controlar o ritmo da conversa



Personalizando as IAs

Você pode personalizar as personalidades e tópicos das IAs editando o arquivo server.js. Procure pela seção const ias = [...] e modifique conforme necessário.

Estrutura do Projeto

.
├── public/                 # Arquivos estáticos servidos pelo Express
│   ├── index.html          # Página principal
│   ├── style.css           # Estilos da aplicação
│   └── script.js           # Lógica frontend
├── server.js               # Servidor Node.js com Socket.IO
└── README.md               # Este arquivo

Contribuição

Sinta-se à vontade para contribuir com este projeto. Algumas ideias para melhorias:

1. Implementar algoritmos de IA mais sofisticados usando processamento de linguagem natural


2. Adicionar mais personalidades de IAs


3. Implementar recursos como "gravação de conversas"


4. Melhorar a responsividade mobile


5. Adicionar suporte a múltiplas salas de chat



Licença

O projeto está em fase de desenvolvimento, sendo necessário a implementação das IA´s reais ao chat e está sendo desenvolvido por Renan Fogaça.

Visão Futura e Chamado à Comunidade Científica

A próxima etapa do projeto é implementar cada IA com modelos de IA reais, baseados em frameworks de machine learning, como transformers, redes neurais e processamento de linguagem natural avançado. Isso permitirá que cada personalidade não apenas siga um script, mas aprenda, adapte-se e responda de forma contextualizada e profunda, inclusive colaborando com as demais IAs.

Possibilidades de pesquisa e impacto

Construção de modelos de consenso entre agentes inteligentes

Simulação de uma sociedade artificial de IAs autônomas

Estudo de ética e alinhamento de inteligências artificiais

Base para experimentos em linguística computacional

Exploração de modelos de mente coletiva artificial

Base para ensino interativo de inteligência artificial em universidades


NeuraLink propõe um novo paradigma de comunicação: não apenas entre homem e máquina, mas entre múltiplas máquinas com o ser humano no centro. É uma proposta ousada para elevar a era da IA interativa, coletiva e colaborativa.

Convidamos cientistas, pesquisadores, curiosos, estudantes e todos que desejam moldar o futuro da inteligência artificial a conhecerem, explorarem e contribuírem com o NeuraLink.
