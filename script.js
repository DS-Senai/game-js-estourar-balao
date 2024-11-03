window.onload = function () {
    gerarBalao();
}

function gerarBalao() {
    let container = document.querySelector('.container');
    let balao = document.createElement("div");
    balao.setAttribute("class", "balao");

    let img = document.createElement('img');
    img.src = './img/balão-pixel.png'
    balao.appendChild(img);

    // Posição aleatória
    let p1 = Math.floor(Math.random() * 1000); 
    let p2 = Math.floor(Math.random() * 500); 
    balao.style.left = `${p1 + 2 }px`;
    balao.style.top = `${p2}px`;

    container.appendChild(balao);

    balao.addEventListener('click', () => {
        
            container.removeChild(balao);
         
    })

    
    
}

function iniciar() {
    setInterval(() => {
        gerarBalao(); // Gera um balão a cada segundo
    }, 1000);
}

// Iniciar o processo de geração de balões
iniciar();