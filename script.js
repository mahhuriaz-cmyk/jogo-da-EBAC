// Definir os limites do intervalo e o número máximo de tentativas.
const MIN = 1;
const MAX = 100;
const CHANCES_MAX = 10;

// Capturar os elementos do DOM.
const palpiteInput = document.getElementById("palpite");
const dicaElement = document.getElementById("dica");
const chancesElement = document.getElementById("chances");
// [AJUSTE]: Capturando também o botão de chutar para poder desabilitá-lo ao encerrar
const btnChutar = document.getElementById("btn-chutar"); 

// Gerar um número secreto aleatório entre 1 e 100.
let numeroSecreto = Math.floor(Math.random() * MAX) + MIN;
let tentativasRestantes = CHANCES_MAX;

// [AJUSTE 1]: Variável de estado para controlar se a partida terminou
let jogoFinalizado = false;


// --- FUNÇÕES AUXILIARES ---

// Função para atualizar o número de tentativas restantes.
const atualizarChances = () => {
    chancesElement.textContent = `Tentativas restantes: ${tentativasRestantes}`;
};

// Limpar o input após cada tentativa.
const limparInput = () => {
    palpiteInput.value = "";
    palpiteInput.focus();
}; 

// Validar se o palpite é um número válido entre 1 e 100.
const validarPalpite = (palpite) => {
    if (isNaN(palpite) || palpite < MIN || palpite > MAX) {
        dicaElement.textContent = `Por favor, insira um número válido entre ${MIN} e ${MAX}.`;
        return false;
    }
    return true;
};

// Exibe as chances iniciais logo ao carregar a página
atualizarChances();


// --- FUNÇÃO PRINCIPAL DO JOGO ---
function jogo() { 
    // [AJUSTE 2]: Verifica se o jogo já terminou. Se sim, bloqueia novas jogadas.
    if (jogoFinalizado) {
        return;
    }

    // Capturar o palpite do jogador.
    const palpite = parseInt(palpiteInput.value, 10);

    // Validação do palpite (não consome tentativas se for inválido)
    if (!validarPalpite(palpite)) {
        limparInput();
        return;
    }

    // [AJUSTE 3]: Desconta e atualiza a tentativa LOGO APÓS validar e ANTES de checar acerto/derrota
    tentativasRestantes--;
    atualizarChances();

    // [AJUSTE 4]: 1º - Verifica se acertou (mesmo que seja a última tentativa!)
    if (palpite === numeroSecreto) {
        dicaElement.textContent = `🎉 Parabéns! Você acertou! O número era ${numeroSecreto}.`;
        encerrarJogo();
        return;
    }

    // [AJUSTE 5]: 2º - Se não acertou, verifica se as tentativas acabaram
    if (tentativasRestantes === 0) {
        dicaElement.textContent = `💥 Você perdeu! O número secreto era ${numeroSecreto}.`;
        encerrarJogo();
        return;
    }

    // 3º - Se ainda tem tentativas e não acertou, dá a dica
    if (palpite < numeroSecreto) {
        dicaElement.textContent = "O número secreto é maior!";
    } else {
        dicaElement.textContent = "O número secreto é menor!";
    }

    // Prepara o campo para o próximo palpite
    limparInput();
}

// [AJUSTE 6]: Função auxiliar para encerrar a partida e desabilitar os controles
function encerrarJogo() {
    jogoFinalizado = true;
    palpiteInput.disabled = true;
    
    // Desabilita o botão de chutar se ele existir no DOM
    if (btnChutar) {
        btnChutar.disabled = true;
    }
}