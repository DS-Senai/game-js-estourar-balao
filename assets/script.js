const corpo = document.querySelector("body"); // selecionando o body
const jogo = corpo.querySelector(".bolinhas");  // procurando a div bolinhas

const raking = document.querySelector('#raking'); // DIV onde esta o raking de jogadores
const lista = raking.querySelector('ul'); // cada jogador é um ul, um elemento da lista


let intervalo = 500;  // intervalo inicial do jogo
let contadorDe10 =0; // conta quantas baloes foram estourados de 10 em 10
var bolasEstouradas = 0; // quantidade de bolas estouradas = score




function addBola() {
	var bola = document.createElement("div"); /*Cria um elemento e armazena na variavel bola*/	
	bola.setAttribute("class", "bola"); /*Adiciona o atributo class no bola*/
	var p1 = Math.floor(Math.random() * 500); /* Irá gera um numero aleatorio, multiplicando por 500 vai gerar um numero de 0 a 500 decimal, para transforma o numero inteiro utilizar o flooor */	
	var p2 = Math.floor(Math.random() * 400); /* Irá gera um numero aleatorio, multiplicando por 500 vai gerar um numero de 0 a 500 decimal, para transforma o numero inteiro utilizar o flooor */
	
	bola.setAttribute("style", "left:"+p1+"px;top:"+p2+"px;"); /*Inserir valores do p1 e p2 na div bola*/
	bola.setAttribute("onclick", "estourar(this)"); /*Criar a ação de click*/ /*this - É o proprio elemento como parametro*/ /*Colocar na tela*/
	
	jogo.appendChild(bola); /*Pegar conteudo do site e adicionar um elemento novo*/	
	console.log(jogo.children.length) // os "filhos do jogo" sao os baloes que estao criados na tela
	if(jogo.children.length>9){  // se a quantidade de bolas na tela for maior que 9 o jogo acaba
		gameOver();
	}
}

function estourar(elemento) { /*SEGUNDA PARTE: Função pra Estourar*/
	bolasEstouradas++; // score
	contadorDe10++;
	if(contadorDe10 == 10){
		clearInterval(intervaloId) // limpa o intervalo
		contadorDe10 = 0; // zera o contador
		intervalo-=25; // diminui o intervalo
		intervaloId = setInterval(addBola, intervalo);// chama a funçao de adicionar bola com um intervalo menor
	}
	console.log("Bola estouradas: "+ bolasEstouradas)
	jogo.removeChild(elemento); /*Remove o elementoo na tela*/
}

	
function iniciar() { /* De tempo em tempo executara função*/

	let name = document.createElement("li");
	name.innerHTML = String(prompt("Nickname:"));
	
	lista.appendChild(name);
	intervaloId = setInterval(addBola, intervalo);
}

	setInterval(addBola, 1000); /*1000 = 1 Segundo*/


	// function pontos(){ // FUNÇÃO DE SOMAR PONTOS
//     if(estourar == TRUE){
//        let pontuçao = bolasEstouradas * 5
        
//  } 
//  }


let pontosPorBola = 5; // Pontos por bola estourada

// Função para atualizar os pontos
function atualizarPontos() {
    bolasEstouradas += pontosPorBola; // Incrementa a pontuação com base nos pontos por bola
    console.log("Pontos: " + bolasEstouradas);
}

function gameOver(){
	clearInterval(intervaloId) // limpa o intervalo
	intervalo = 500;  // intervalo inicial do jogo
   while(jogo.children.length> 0){
	   jogo.removeChild(jogo.children[0])
   }
	alert("GAME OVER\nOK para recomeçar");
   
	iniciar()
   }

