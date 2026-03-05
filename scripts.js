
// ===============================
// EVENTO DO BOTÃO
// ===============================



async function gerartexto() {

    let textousuario = caixaTexto.value.trim()

    if (!textousuario) {
        respostaDiv.value = "Digite uma pergunta primeiro 🎮"
        return
    }

    // animação
    respostaDiv.classList.add("loading")
    respostaDiv.value = "Pensando... 🤖"

    try {

        let resposta = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                messages: [
                    {
                        role: "system",
                        content: "Você é um assistente especialista em jogos."
                    },
                    {
                        role: "user",
                        content: textousuario
                    }
                ]
            })
        })

        if (!resposta.ok) {
            respostaDiv.classList.remove("loading")
            respostaDiv.value = "Erro ao consultar a IA 😢"
            return
        }

        let dados = await resposta.json()

        let textoIA = dados.choices[0].message.content

        respostaDiv.classList.remove("loading")

        respostaDiv.value = textoIA

    } catch (erro) {

        respostaDiv.classList.remove("loading")

        respostaDiv.value = "Erro inesperado 😵"
    }
}
botao.addEventListener("click", gerartexto)