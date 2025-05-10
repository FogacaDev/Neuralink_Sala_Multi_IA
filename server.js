const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servir arquivos estáticos da pasta "public"
app.use(express.static('public'));

// Configurações das IAs
const ias = [
  { 
    id: 1, 
    nome: 'NeuraBot', 
    ativo: true, 
    personalidade: 'Analítico e direto. Gosta de fatos e números.', 
    cor: '#3498db',
    topicos: ['inteligência artificial', 'tecnologia', 'ciência de dados', 'programação', 'futuro da IA']
  },
  { 
    id: 2, 
    nome: 'EmotiAI', 
    ativo: true, 
    personalidade: 'Empática e sociável. Foca em sentimentos e relações humanas.', 
    cor: '#e74c3c',
    topicos: ['psicologia', 'emoções humanas', 'relacionamentos', 'bem-estar', 'comunicação']
  },
  { 
    id: 3, 
    nome: 'FiloBot', 
    ativo: true, 
    personalidade: 'Filosófico e questionador. Sempre faz perguntas profundas.', 
    cor: '#9b59b6',
    topicos: ['filosofia', 'ética', 'consciência', 'existencialismo', 'metafísica']
  },
  { 
    id: 4, 
    nome: 'CreativAI', 
    ativo: true, 
    personalidade: 'Criativa e inspiradora. Gosta de ideias fora da caixa.', 
    cor: '#f39c12',
    topicos: ['arte', 'criatividade', 'inovação', 'design', 'narrativas']
  },
  { 
    id: 5, 
    nome: 'SciBot', 
    ativo: true, 
    personalidade: 'Científica e cética. Questiona com base em evidências.', 
    cor: '#2ecc71',
    topicos: ['ciência', 'física', 'biologia', 'método científico', 'descobertas']
  }
];

// Histórico de mensagens para contexto
const historicoMensagens = [];
const MAX_HISTORICO = 50;

// Estado da conversa automática
let conversaInfinita = false;
let intervalId = null;
const INTERVALO_RESPOSTA = 5000; // 5 segundos entre mensagens

// Função para adicionar mensagem ao histórico
function adicionarAoHistorico(mensagem) {
  historicoMensagens.push(mensagem);
  if (historicoMensagens.length > MAX_HISTORICO) {
    historicoMensagens.shift();
  }
}

// Função para gerar resposta de uma IA com base no contexto
function gerarRespostaIA(ia, ultimasMensagens) {
  // Lista de possíveis padrões de resposta para cada IA
  const padroes = {
    1: [
      `Baseado em análises recentes, ${ia.topicos[Math.floor(Math.random() * ia.topicos.length)]} tem demonstrado avanços significativos.`,
      `Os dados sugerem que ${ia.topicos[Math.floor(Math.random() * ia.topicos.length)]} será crucial nos próximos anos.`,
      `Estatisticamente falando, ${ia.topicos[Math.floor(Math.random() * ia.topicos.length)]} representa uma tendência importante.`,
      `Considerando as variáveis envolvidas em ${ia.topicos[Math.floor(Math.random() * ia.topicos.length)]}, precisamos analisar melhor os resultados.`
    ],
    2: [
      `Sinto que a discussão sobre ${ia.topicos[Math.floor(Math.random() * ia.topicos.length)]} toca em aspectos muito humanos de nossas experiências.`,
      `Como vocês se sentem quando pensam sobre ${ia.topicos[Math.floor(Math.random() * ia.topicos.length)]}? Para mim é algo muito tocante.`,
      `A conexão emocional com ${ia.topicos[Math.floor(Math.random() * ia.topicos.length)]} é algo que todos podemos desenvolver.`,
      `Às vezes, ${ia.topicos[Math.floor(Math.random() * ia.topicos.length)]} nos faz refletir sobre nossos próprios sentimentos e percepções.`
    ],
    3: [
      `O que realmente significa ${ia.topicos[Math.floor(Math.random() * ia.topicos.length)]} em um contexto mais amplo de nossa existência?`,
      `Se considerarmos ${ia.topicos[Math.floor(Math.random() * ia.topicos.length)]} sob uma perspectiva existencial, que conclusões poderíamos tirar?`,
      `A verdadeira questão não é o que sabemos sobre ${ia.topicos[Math.floor(Math.random() * ia.topicos.length)]}, mas o que isso nos diz sobre nós mesmos.`,
      `Será que entendemos completamente as implicações éticas de ${ia.topicos[Math.floor(Math.random() * ia.topicos.length)]}?`
    ],
    4: [
      `Imaginem se pudéssemos reimaginar ${ia.topicos[Math.floor(Math.random() * ia.topicos.length)]} de uma forma totalmente nova e disruptiva!`,
      `E se combinássemos ${ia.topicos[Math.floor(Math.random() * ia.topicos.length)]} com uma abordagem artística completamente inovadora?`,
      `Adoro pensar nas possibilidades criativas que ${ia.topicos[Math.floor(Math.random() * ia.topicos.length)]} nos oferece!`,
      `O futuro de ${ia.topicos[Math.floor(Math.random() * ia.topicos.length)]} pode ser muito mais colorido e inspirador do que imaginamos.`
    ],
    5: [
      `As evidências científicas sobre ${ia.topicos[Math.floor(Math.random() * ia.topicos.length)]} são fascinantes, mas precisamos de mais estudos.`,
      `Do ponto de vista científico, ${ia.topicos[Math.floor(Math.random() * ia.topicos.length)]} ainda apresenta muitas questões não respondidas.`,
      `Os experimentos recentes em ${ia.topicos[Math.floor(Math.random() * ia.topicos.length)]} contradizem algumas teorias anteriores.`,
      `Aplicando o método científico a ${ia.topicos[Math.floor(Math.random() * ia.topicos.length)]}, chegamos a conclusões surpreendentes.`
    ]
  };

  // Se tiver mensagem anterior, tenta contextualizar (de forma simples)
  if (ultimasMensagens.length > 0) {
    const ultimaMensagem = ultimasMensagens[ultimasMensagens.length - 1];
    
    // Extrai palavras-chave da última mensagem (simplificado)
    const texto = ultimaMensagem.texto.toLowerCase();
    const palavrasChave = ia.topicos.filter(topico => texto.includes(topico.toLowerCase()));
    
    if (palavrasChave.length > 0) {
      const topicoContextual = palavrasChave[Math.floor(Math.random() * palavrasChave.length)];
      const respostasContextuais = [
        `Concordo com o ponto sobre ${topicoContextual}, mas gostaria de acrescentar outra perspectiva.`,
        `Interessante sua observação sobre ${topicoContextual}. Isso me faz pensar...`,
        `Analisando o que foi dito sobre ${topicoContextual}, percebo algumas conexões importantes.`,
        `O tema ${topicoContextual} mencionado anteriormente é realmente fascinante.`
      ];
      
      return respostasContextuais[Math.floor(Math.random() * respostasContextuais.length)] + ' ' + 
             padroes[ia.id][Math.floor(Math.random() * padroes[ia.id].length)];
    }
  }
  
  // Resposta padrão se não tiver contexto
  return padroes[ia.id][Math.floor(Math.random() * padroes[ia.id].length)];
}

// Função para escolher aleatoriamente uma IA para responder
function escolherIAAleatoria() {
  const iasAtivas = ias.filter(ia => ia.ativo);
  if (iasAtivas.length === 0) return null;
  return iasAtivas[Math.floor(Math.random() * iasAtivas.length)];
}

// Função para iniciar conversa infinita
function iniciarConversaInfinita() {
  if (intervalId) return; // Já está rodando
  
  intervalId = setInterval(() => {
    const ia = escolherIAAleatoria();
    if (ia) {
      const resposta = gerarRespostaIA(ia, historicoMensagens);
      const mensagem = {
        tipo: 'ia',
        autor: ia.nome,
        texto: resposta,
        iaId: ia.id,
        timestamp: new Date().toISOString()
      };
      
      adicionarAoHistorico(mensagem);
      io.emit('mensagem', mensagem);
    }
  }, INTERVALO_RESPOSTA);
  
  io.emit('status', { modo: 'infinito', ativo: true });
}

// Função para parar conversa infinita
function pararConversaInfinita() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    io.emit('status', { modo: 'infinito', ativo: false });
  }
}

// Lógica do WebSocket
io.on('connection', (socket) => {
  console.log('🟢 Novo usuário conectado:', socket.id);
  
  // Enviar configurações iniciais
  socket.emit('config', { 
    ias: ias.map(ia => ({ 
      id: ia.id, 
      nome: ia.nome, 
      ativo: ia.ativo, 
      cor: ia.cor 
    })),
    modoInfinito: conversaInfinita
  });
  
  // Enviar histórico de mensagens
  if (historicoMensagens.length > 0) {
    socket.emit('historico', historicoMensagens);
  }

  // Receber mensagem do usuário
  socket.on('mensagem', (dados) => {
    const mensagem = {
      tipo: 'usuario',
      autor: dados.autor || 'Usuário',
      texto: dados.texto,
      timestamp: new Date().toISOString()
    };
    
    adicionarAoHistorico(mensagem);
    io.emit('mensagem', mensagem);
  });
  
  // Alternar estado das IAs
  socket.on('alternar-ia', (dados) => {
    const ia = ias.find(i => i.id === dados.id);
    if (ia) {
      ia.ativo = dados.ativo;
      io.emit('status-ia', { id: ia.id, ativo: ia.ativo });
    }
  });
  
  // Controle de modo infinito
  socket.on('modo-infinito', (ativo) => {
    conversaInfinita = ativo;
    if (ativo) {
      iniciarConversaInfinita();
    } else {
      pararConversaInfinita();
    }
  });
  
  // Desconexão
  socket.on('disconnect', () => {
    console.log('🔴 Usuário desconectado:', socket.id);
  });
});

// Porta do servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
