//Definir os limites do intervalo e o número máximo de tentativas.
const MIN = 1;
const MAX = 100;
const CHANCES_MAX = 10;

//Capturar os elementos do DOM.
const palpiteInput = document.getElementById("palpite");
const dicaElement = document.getElementById("dica");
const chancesElement =  document.getElementById("chances");

//Gerar um número secreto aleatório entre 1 e 100.
let numeroSecreto = Math.floor(Math.random() * MAX) + MIN;
//Variável para armazenar o número secreto.
let tentativasRestantes = CHANCES_MAX;


// --- 4. FUNÇÕES AUXILIARES ---


//Função para atualizar o número de tentativas restantes.
const atualizarChances = () => {
    chancesElement.textContent = `Tentativas restantes: ${tentativasRestantes}`;
}

  // limpar o input após cada tentativa.
const limparInput = () => {
    palpiteInput.value = "";
    palpiteInput.focus();
}; 

//Validar se o palpite é um número válido entre 1 e 100.
const validarPalpite = (palpite) => {
    if (isNaN(palpite) || palpite < MIN || palpite > MAX) {
        dicaElement.textContent = `Por favor, insira um número válido entre ${MIN} e ${MAX}.`;
        return false;
    }
    return true;
};

// Exibe as chances iniciais logo ao carregar a página
atualizarChances();


//Função principal do jogo.
function jogo() {      
//Capturar o palpite do jogador.
 const palpite = parseInt(palpiteInput.value, 10);

if (!validarPalpite(palpite)) {
        limparInput();
        return;
    }

    // 3. Comparação: Acertou?
    if (palpite === numeroSecreto) {
        dicaElement.textContent = `🎉 Parabéns! Você acertou! O número era ${numeroSecreto}.`;
        palpiteInput.disabled = true; // Desabilita o campo após vencer
        return;
    }

    // 4. Se não acertou, desconta uma tentativa
    tentativasRestantes--;
    atualizarChances();

    // 5. Verifica se as tentativas acabaram
    if (tentativasRestantes === 0) {
        dicaElement.textContent = `💥 Você perdeu! O número secreto era ${numeroSecreto}.`;
        palpiteInput.disabled = true; // Desabilita o campo após perder
        return;
    }

    // 6. Se ainda tem tentativas, dá a dica se é maior ou menor
    if (palpite < numeroSecreto) {
        dicaElement.textContent = "O número secreto é maior!";
    } else {
        dicaElement.textContent = "O número secreto é menor!";
    }

    // 7. Prepara o campo para o próximo palpite
    limparInput();
}