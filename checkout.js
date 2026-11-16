
const resumoPedido = document.getElementById("resumoPedido");
const mensagemCheckout = document.getElementById("mensagemCheckout");
const botaoConfirmar = document.getElementById("confirmarPedido");

let carrinhoAtual = null;

async function carregarCheckout() {
    // Recupera o carrinho
    const dadosCarrinho = sessionStorage.getItem("carrinhoLAJ");

    if (!dadosCarrinho) {
        resumoPedido.textContent =
            "Seu carrinho está vazio. Volte e escolha seus ingressos.";

        botaoConfirmar.disabled = true;
        return;
    }

    try {
        carrinhoAtual = JSON.parse(dadosCarrinho);
    } catch {
        resumoPedido.textContent =
            "Não foi possível recuperar seu carrinho.";

        botaoConfirmar.disabled = true;
        return;
    }

    // Verifica se o cliente está conectado
    const { data, error } = await supabaseClient.auth.getUser();

    if (error || !data.user) {
        window.location.href = "login.html";
        return;
    }

    // Mostra o resumo do pedido
    resumoPedido.replaceChildren();

    const quantidade = document.createElement("p");
    quantidade.textContent =
        "Quantidade de ingressos: " + carrinhoAtual.quantidade;

    const promocao = document.createElement("p");
    promocao.textContent =
        "Promoção: " + carrinhoAtual.promocao;

    const total = document.createElement("p");
    total.textContent =
        "Total calculado: R$ " +
        Number(carrinhoAtual.total).toFixed(2).replace(".", ",");

    const aviso = document.createElement("p");
    aviso.textContent =
        "O pedido ainda não foi registrado e o pagamento ainda não foi realizado.";

    resumoPedido.append(quantidade, promocao, total, aviso);
}

botaoConfirmar.addEventListener("click", function () {
    if (!carrinhoAtual) {
        mensagemCheckout.textContent =
            "Não há um pedido válido para continuar.";
        return;
    }

    mensagemCheckout.textContent =
        "Dados conferidos! A próxima etapa será registrar o pedido com segurança e preparar o pagamento.";
});

carregarCheckout();
