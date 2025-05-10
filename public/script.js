// Conexão WebSocket
const socket = io();

// Elementos DOM
const formulario = document.getElementById('formulario-chat');
const inputMensagem = document.getElementById('input-mensagem');
const containerMensagens = document.getElementById('mensagens');
const toggleTheme = document.getElementById('toggleTheme');
const checkModoInfinito = document.getElementById('modoInfinito');
const sliderVelocidade = document.getElementById('velocidade');
const listaIAs = document.getElementById('lista-ias');
const btnAtivarTodas = document.getElementById('ativar-todas');
const btnDesativarTodas = document.getElementById('desativar-todas');
const statusTexto = document.getElementById('status-texto');
const contadorMensagens = document.getElementById('contador-mensagens');
const tempoAtivo = document.getElementById('tempo-ativo');
const totalMensagens = document.getElementById('total-mensagens');

// Variáveis globais
let configIAs = [];
let contMensagens = 0;
let inicioConversa = null;
let intervalTimer = null;

// Formatadores
const formatarTempo = (segundos) => {
  const horas = Math.floor(segundos / 3600);
  const minutos = Math.floor((segundos % 3600) / 60);
  const segs = Math.floor(segundos % 60);
  return [
    horas.toString().padStart(2, '0'),
    minutos.toString().padStart(2, '0'),
    segs.toString().padStart(2, '0')
  ].join(':');
};

const formatarData = (timestamp) => {
  const data = new Date(timestamp);
  const horas = data.getHours().toString().padStart(2, '0');
  const minutos = data.getMinutes().toString().padStart(2, '0');
  return `${horas}:${minutos}`;
};

// Inicialização
window.addEventListener('DOMContentLoaded', () => {
  carregarTema();
  iniciarTimer();
});

// Timer para estatísticas
function iniciarTimer() {
  if (intervalTimer) return;
  
  inicioConversa = new Date();
  intervalTimer = setInterval(() => {
    if (inicioConversa) {
      const segundosAtivos = Math.floor((new Date() - inicioConversa) / 1000);
      tempoAtivo.textContent = formatarTempo(segundosAtivos);
    }
  }, 1000);
}

// Funções para manipulação do tema
function carregarTema() {
  const temaAtual = localStorage.getItem('tema') || 'claro';
  if (temaAtual === 'escuro') {
    document.body.classList.add('tema-escuro');
    toggleTheme.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    toggleTheme.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('tema-escuro');
  const tema = document.body.classList.contains('tema-escuro') ? 'escuro' : 'claro';
  toggleTheme.innerHTML = tema === 'escuro' ? 
    '<i class="fas fa-sun"></i>' : 
    '<i class="fas fa-moon"></i>';
  localStorage.setItem('tema', tema);
});

// Renderizar lista de IAs
function renderizarListaIAs(ias) {
  listaIAs.innerHTML = '';
  
  ias.forEach(ia => {
    const item = document.createElement('div');
    item.className = 'ia-item';
    
    const avatar = document.createElement('div');
    avatar.className = 'ia-avatar';
    avatar.style.backgroundColor = ia.cor;
    avatar.textContent = ia.nome.charAt(0);
    
    const info = document.createElement('div');
    info.className = 'ia-info';
    info.appendChild(avatar);
    
    const nome = document.createElement('div');
    nome.className = 'ia-nome';
    nome.textContent = ia.nome;
    info.appendChild(nome);
    
    const status = document.createElement('span');
    status.className = `ia-status ${ia.ativo ? 'ativo' : 'inativo'}`;
    nome.appendChild(status);
    
    const toggle = document.createElement('label');
    toggle.className = 'switch';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = ia.ativo;
    checkbox.addEventListener('change', () => alternarIA(ia.id, checkbox.checked));
    
    const slider = document.createElement('span');
    slider.className = 'slider round';
    
    toggle.appendChild(checkbox);
    toggle.appendChild(slider);
    
    item.appendChild(info);
    item.appendChild(toggle);
    listaIAs.appendChild(item);
  });
}

// Função para alternar IA
function alternarIA(id, ativo) {
  socket.emit('alternar-ia', { id, ativo });
}

// Enviar mensagem do usuário
formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  const texto = inputMensagem.value.trim();
  
  if (texto !== '') {
    socket.emit('mensagem', { autor: 'Usuário', texto });
    inputMensagem.value = '';
    inputMensagem.focus();
  }
});

// Alternar modo infinito
checkModoInfinito.addEventListener('change', () => {
  socket.emit('modo-infinito', checkModoInfinito.checked);
  
  if (checkModoInfinito.checked) {
    adicionarMensagemSistema('Modo infinito ativado. As IAs começarão a conversar automaticamente.');
    statusTexto.textContent = 'Modo infinito';
    statusTexto.style.color = '#2ecc71';
  } else {
    adicionarMensagemSistema('Modo infinito desativado. Você pode continuar conversando normalmente.');
    statusTexto.textContent = 'Modo normal';
    statusTexto.style.color = '';
  }
});

// Ajustar velocidade
sliderVelocidade.addEventListener('change', () => {
  socket.emit('velocidade', parseInt(sliderVelocidade.value));
});

// Botões para ativar/desativar todas as IAs
btnAtivarTodas.addEventListener('click', () => {
  configIAs.forEach(ia => {
    socket.emit('alternar-ia', { id: ia.id, ativo: true });
  });
});

btnDesativarTodas.addEventListener('click', () => {
  configIAs.forEach(ia => {
    socket.emit('alternar-ia', { id: ia.id, ativo: false });
  });
});

// Adicionar mensagem ao container
function adicionarMensagem(dados) {
  const div = document.createElement('div');
  
  if (dados.tipo === 'sistema') {
    div.className = 'mensagem-sistema';
    div.textContent = dados.texto;
  } else {
    const ehIA = dados.tipo === 'ia';
    div.className = `mensagem ${ehIA ? 'mensagem-ia' : 'mensagem-usuario'}`;
    
    if (ehIA && dados.iaId) {
      const ia = configIAs.find(i => i.id === dados.iaId);
      if (ia) {
        div.style.borderLeftColor = ia.cor;
        div.style.borderLeft = `4px solid ${ia.cor}`;
      }
    }
    
    const autor = document.createElement('div');
    autor.className = 'autor-mensagem';
    autor.textContent = dados.autor;
    div.appendChild(autor);
    
    const texto = document.createElement('div');
    texto.className = 'texto-mensagem';
    texto.textContent = dados.texto;
    div.appendChild(texto);
    
    if (dados.timestamp) {
      const timestamp = document.createElement('div');
      timestamp.className = 'timestamp';
      timestamp.textContent = formatarData(dados.timestamp);
      div.appendChild(timestamp);
    }
  }
  
  containerMensagens.appendChild(div);
  containerMensagens.scrollTop = containerMensagens.scrollHeight;
  
  // Atualizar contadores
  contMensagens++;
  contadorMensagens.textContent = `${contMensagens} mensagens`;
  totalMensagens.textContent = contMensagens;
}

// Adicionar mensagem de sistema
function adicionarMensagemSistema(texto) {
  adicionarMensagem({ tipo: 'sistema', texto });
}

// Socket.IO - Receber mensagens
socket.on('mensagem', (dados) => {
  adicionarMensagem(dados);
});

// Socket.IO - Receber configuração inicial
socket.on('config', (config) => {
  configIAs = config.ias;
  renderizarListaIAs(configIAs);
  
  checkModoInfinito.checked = config.modoInfinito;
  
  if (config.modoInfinito) {
    statusTexto.textContent = 'Modo infinito';
    statusTexto.style.color = '#2ecc71';
  }
});

// Socket.IO - Receber histórico de mensagens
socket.on('historico', (mensagens) => {
  mensagens.forEach(msg => adicionarMensagem(msg));
  
  if (mensagens.length > 0) {
    adicionarMensagemSistema(`Carregado histórico com ${mensagens.length} mensagens anteriores.`);
  }
});

// Socket.IO - Receber atualizações de status das IAs
socket.on('status-ia', (status) => {
  const iaElement = Array.from(listaIAs.querySelectorAll('.ia-item')).find(
    (item, index) => configIAs[index].id === status.id
  );
  
  if (iaElement) {
    const statusIndicator = iaElement.querySelector('.ia-status');
    statusIndicator.className = `ia-status ${status.ativo ? 'ativo' : 'inativo'}`;
    
    const checkbox = iaElement.querySelector('input[type="checkbox"]');
    checkbox.checked = status.ativo;
    
    // Atualizar config local
    const ia = configIAs.find(i => i.id === status.id);
    if (ia) ia.ativo = status.ativo;
  }
});

// Socket.IO - Receber atualizações de status geral
socket.on('status', (status) => {
  if (status.modo === 'infinito') {
    checkModoInfinito.checked = status.ativo;
    
    if (status.ativo) {
      statusTexto.textContent = 'Modo infinito';
      statusTexto.style.color = '#2ecc71';
    } else {
      statusTexto.textContent = 'Modo normal';
      statusTexto.style.color = '';
    }
  }
});
