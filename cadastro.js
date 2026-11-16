
const formulario = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagemCadastro");

formulario.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    mensagem.textContent = "Criando sua conta...";

    const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: senha,
        options: {
            data: {
                nome_completo: nome
            }
        }
    });

    if (error) {
        mensagem.textContent = "Não foi possível criar a conta: " + error.message;
        return;
    }

    if (data.user && !data.session) {
        mensagem.textContent =
            "Cadastro realizado! Confira seu e-mail para confirmar a conta.";
        formulario.reset();
        return;
    }

    mensagem.textContent =
        "Conta criada com sucesso! Você já pode entrar na sua conta.";
    formulario.reset();
});
