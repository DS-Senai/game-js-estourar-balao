const areaJogo = document.getElementById("areaJogo");
const pontosDisplay = document.getElementById("pontos");
const tempoRestanteDisplay = document.getElementById("tempoRestante");
const listaJogadores = document.getElementById("listaJogadores");

let intervaloCriacaoBalas;
let intervaloTempo;
let tempoRestante;
let pontos;
let nomeJogador;

// Função para iniciar o jogo
function iniciar() {
    // Reseta variáveis
    pontos = 0;
    tempoRestante = 15;
    
    // Atualiza exibição inicial de pontos e tempo
    pontosDisplay.textContent = pontos;
    tempoRestanteDisplay.textContent = tempoRestante;

    // Limpa a área de jogo
    areaJogo.innerHTML = "";

    // Obtém o nome do jogador e inicia o jogo se o nome for válido
    nomeJogador = prompt("Digite seu nome:");
    if (!nomeJogador) {
        alert("Por favor, insira um nome para jogar.");
        return;
    }

    // Inicia a criação de balões e o cronômetro
    intervaloCriacaoBalas = setInterval(adicionarBalao, 500);
    intervaloTempo = setInterval(atualizarTempo, 1000);
}

// Função para adicionar balões à tela
function adicionarBalao() {
    const balao = document.createElement("div");
    balao.classList.add("bola");

    // Define posição aleatória dentro da área do jogo
    const x = Math.floor(Math.random() * (areaJogo.offsetWidth - 50));
    const y = Math.floor(Math.random() * (areaJogo.offsetHeight - 50));
    balao.style.left = `${x}px`;
    balao.style.top = `${y}px`;

    // Evento de clique para estourar o balão
    balao.addEventListener("click", () => {
        pontos++;
        pontosDisplay.textContent = pontos;
        balao.remove();
    });

    areaJogo.appendChild(balao);

    // Limita a quantidade de balões na tela
    if (areaJogo.childElementCount > 15) {
        encerrarJogo();
    }
}

// Função para atualizar o tempo
function atualizarTempo() {
    tempoRestante--;
    tempoRestanteDisplay.textContent = tempoRestante;

    if (tempoRestante <= 0) {
        encerrarJogo();
    }
}

// Função para encerrar o jogo
function encerrarJogo() {
    clearInterval(intervaloCriacaoBalas);
    clearInterval(intervaloTempo);

    // Remove todos os balões da tela
    while (areaJogo.firstChild) {
        areaJogo.removeChild(areaJogo.firstChild);
    }

    // Exibe pontuação final e adiciona ao ranking
    alert(`Fim de jogo para ${nomeJogador}! Pontuação final: ${pontos}`);
    atualizarRanking(nomeJogador, pontos);

    // Exibe botão para reiniciar o jogo
    let botaoReiniciar = document.getElementById("botaoReiniciar");
    if (!botaoReiniciar) {
        botaoReiniciar = document.createElement("button");
        botaoReiniciar.id = "botaoReiniciar";
        botaoReiniciar.textContent = "Reiniciar Jogo";
        botaoReiniciar.addEventListener("click", reiniciarJogo);
        document.body.appendChild(botaoReiniciar);
    }
}

// Função para adicionar o jogador ao ranking
function atualizarRanking(nome, pontos) {
    const itemLista = document.createElement("li");
    itemLista.textContent = `${nome}: ${pontos} pontos`;
    listaJogadores.appendChild(itemLista);
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    // Remove o botão de reiniciar
    const botaoReiniciar = document.getElementById("botaoReiniciar");
    if (botaoReiniciar) {
        botaoReiniciar.remove();
    }

    // Inicia um novo jogo
    iniciar();
}

// Garantir que o jogo comece ao carregar a página
window.onload = iniciar;
