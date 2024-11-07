const jogo = document.querySelector("#areaJogo");
const placar = document.querySelector("#pontos");
const tempoRestanteDisplay = document.querySelector("#tempoRestante");
const listaJogadores = document.querySelector("#listaJogadores");

let intervaloId;
let tempoRestante = 30;
let bolasEstouradas = 0;
let pontosPorBola = 5;
let intervalo = 1000; // Intervalo para aparecer balões
let timerId;

function iniciar() {
    const nickname = prompt("Digite seu nickname:");
    const jogador = document.createElement("li");
    jogador.textContent = nickname + " - Pontuação: 0";
    jogador.setAttribute("data-nickname", nickname);
    listaJogadores.appendChild(jogador);

    intervaloId = setInterval(addBola, intervalo);
    timerId = setInterval(atualizarTempo, 1000);
}

function addBola() {
    const bola = document.createElement("div");
    bola.classList.add("bola");
    bola.style.left = `${Math.random() * 90}%`;
    bola.style.top = `${Math.random() * 90}%`;
    bola.onclick = () => estourar(bola);
    jogo.appendChild(bola);

    if (jogo.children.length > 10) {
        gameOver();
    }
}

function estourar(bola) {
    bolasEstouradas += pontosPorBola;
    atualizarPlacar();
    jogo.removeChild(bola);
}

function atualizarPlacar() {
    placar.textContent = bolasEstouradas;
}

function atualizarTempo() {
    tempoRestante--;
    tempoRestanteDisplay.textContent = tempoRestante;
    if (tempoRestante <= 0) {
        gameOver();
    }
}

function gameOver() {
    clearInterval(intervaloId);
    clearInterval(timerId);
    jogo.innerHTML = ""; // Limpa os balões restantes

    alert(`Tempo esgotado! Sua pontuação: ${bolasEstouradas}`);

    // Atualiza o ranking do jogador
    const nickname = document.querySelector(`li[data-nickname]`).getAttribute("data-nickname");
    document.querySelector(`li[data-nickname="${nickname}"]`).textContent = `${nickname} - Pontuação: ${bolasEstouradas}`;

    // Reseta o jogo para recomeçar
    resetarJogo();
}

function resetarJogo() {
    bolasEstouradas = 0;
    tempoRestante = 30;
    atualizarPlacar();
    tempoRestanteDisplay.textContent = tempoRestante;
    iniciar();
}
