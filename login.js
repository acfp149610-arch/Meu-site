
const formulario = document.getElementById("formLogin");
const mensagem = document.getElementById("mensagemLogin");

formulario.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    mensagem.textContent = "Entrando na sua conta...";

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: senha
    });

    if (error) {
        mensagem.textContent =
            "Não foi possível entrar. Confira o e-mail, a senha e a confirmação do e-mail.";
        console.error(error);
        return;
    }

    mensagem.textContent = "Login realizado! Redirecionando...";

    const temCarrinho = sessionStorage.getItem("carrinhoLAJ");

if (temCarrinho) {
    window.location.href = "checkout.html";
} else {
    window.location.href = "minhas-compras.html";
}
});
