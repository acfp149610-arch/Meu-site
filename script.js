



/* =========================================
   LAJ — SISTEMA DE CÁLCULO DE INGRESSOS
   ========================================= */


/* 1. PREÇOS DOS PACOTES */

const precoIndividual = 45;
const precoDupla = 85;
const precoTriplo = 120;


/* 2. ENCONTRAR OS ELEMENTOS DO HTML */

const campoQuantidade = document.getElementById("quantidadeCompra");

const botaoCalcular = document.getElementById("adicionarCarrinho");

const quantidadeElemento = document.getElementById("quantidade");

const promocaoElemento = document.getElementById("promocao");

const totalElemento = document.getElementById("total");


/* 3. VERIFICAR SE OS ELEMENTOS EXISTEM NA PÁGINA */

if (
    campoQuantidade &&
    botaoCalcular &&
    quantidadeElemento &&
    promocaoElemento &&
    totalElemento
) {

    /* 4. QUANDO O CLIENTE CLICAR NO BOTÃO */

    botaoCalcular.addEventListener("click", function () {

        /* Ler a quantidade digitada */

        const quantidade = Number(campoQuantidade.value);


        /* 5. VALIDAR A QUANTIDADE */

        if (
            !Number.isInteger(quantidade) ||
            quantidade < 1
        ) {
            alert("Digite uma quantidade válida de ingressos.");
            return;
        }


        /* 6. CALCULAR OS PACOTES */

        const trios = Math.floor(quantidade / 3);

        const restante = quantidade % 3;


        /* 7. CALCULAR O VALOR TOTAL */

        let total = trios * precoTriplo;


        if (restante === 2) {

            total += precoDupla;

        } else if (restante === 1) {

            total += precoIndividual;

        }


        /* 8. IDENTIFICAR A PROMOÇÃO */

        let promocao = "";


        if (quantidade === 1) {

            promocao = "Ingresso individual";

        } else if (quantidade === 2) {

            promocao = "Dupla Face";

        } else if (quantidade === 3) {

            promocao = "Tríptico";

        } else {

            promocao = trios + " pacote(s) de 3 ingressos";


            if (restante === 1) {

                promocao += " + 1 ingresso individual";

            } else if (restante === 2) {

                promocao += " + 1 pacote de 2 ingressos";

            }

        }


        /* 9. ATUALIZAR O CARRINHO NA TELA */

        quantidadeElemento.textContent = quantidade;

        promocaoElemento.textContent = promocao;

        totalElemento.textContent =
            total.toFixed(2).replace(".", ",");

    });


const botaoFinalizar = document.getElementById("finalizarCompra");
const mensagemCompra = document.getElementById("mensagemCompra");

if (botaoFinalizar && mensagemCompra) {
    botaoFinalizar.addEventListener("click", function () {
        const quantidade = Number(campoQuantidade.value);

        if (!Number.isInteger(quantidade) || quantidade < 1) {
            alert("Escolha uma quantidade válida de ingressos.");
            return;
        }

        // Calcula novamente o valor usando os preços definidos
        const trios = Math.floor(quantidade / 3);
        const restante = quantidade % 3;

        let total = trios * precoTriplo;

        if (restante === 2) {
            total += precoDupla;
        } else if (restante === 1) {
            total += precoIndividual;
        }

        let promocao;

        if (quantidade === 1) {
            promocao = "Ingresso individual";
        } else if (quantidade === 2) {
            promocao = "Dupla Face";
        } else if (quantidade === 3) {
            promocao = "Tríptico";
        } else {
            promocao = trios + " pacote(s) de 3";

            if (restante === 1) {
                promocao += " + 1 ingresso individual";
            } else if (restante === 2) {
                promocao += " + 1 pacote de 2";
            }
        }

        // Guarda os dados temporariamente no navegador
        const carrinho = {
            quantidade: quantidade,
            promocao: promocao,
            total: total
        };

        sessionStorage.setItem(
            "carrinhoLAJ",
            JSON.stringify(carrinho)
        );

        // Encaminha para o login
        window.location.href = "login.html";
    });
}

}


