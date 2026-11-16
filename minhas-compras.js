
const informacoesUsuario =
    document.getElementById("informacoesUsuario");

const listaPedidos =
    document.getElementById("listaPedidos");

const botaoSair =
    document.getElementById("botaoSair");

async function carregarCompras() {
    // Verifica quem está conectado
    const { data: dadosLogin, error: erroLogin } =
        await supabaseClient.auth.getUser();

    if (erroLogin || !dadosLogin.user) {
        window.location.href = "login.html";
        return;
    }

    const usuario = dadosLogin.user;

    informacoesUsuario.textContent =
        "Conta: " + usuario.email;

    // Busca somente os pedidos desse cliente
    const { data: pedidos, error: erroPedidos } =
        await supabaseClient
            .from("pedidos")
            .select("id, quantidade_ingressos, valor_total, status, criado_em")
            .order("criado_em", { ascending: false });

    if (erroPedidos) {
        console.error(erroPedidos);

        listaPedidos.textContent =
            "Não foi possível carregar suas compras. Tente novamente.";

        return;
    }

    if (!pedidos || pedidos.length === 0) {
        listaPedidos.textContent =
            "Você ainda não tem compras registradas.";

        return;
    }

    listaPedidos.innerHTML = "";

    pedidos.forEach(function (pedido) {
        const cartao = document.createElement("article");
        const titulo = document.createElement("h2");
        const quantidade = document.createElement("p");
        const valor = document.createElement("p");
        const status = document.createElement("p");
        const data = document.createElement("p");

        titulo.textContent = "Pedido";
        quantidade.textContent =
            "Ingressos: " + pedido.quantidade_ingressos;

        valor.textContent =
            "Total: R$ " +
            Number(pedido.valor_total).toFixed(2).replace(".", ",");

        const nomesStatus = {
            aguardando_pix: "Aguardando pagamento via PIX",
            comprovante_enviado: "Comprovante enviado",
            confirmado: "Compra confirmada",
            recusado: "Pagamento recusado"
        };

        status.textContent =
            "Situação: " +
            (nomesStatus[pedido.status] || pedido.status);

        data.textContent =
            "Data: " +
            new Date(pedido.criado_em).toLocaleDateString("pt-BR");

        cartao.append(titulo, quantidade, valor, status, data);
        listaPedidos.appendChild(cartao);
    });
}

botaoSair.addEventListener("click", async function () {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
        alert("Não foi possível sair da conta.");
        console.error(error);
        return;
    }

    window.location.href = "login.html";
});

carregarCompras();
