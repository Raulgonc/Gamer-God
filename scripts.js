// ===============================
// CONFIGURAÇÃO INICIAL
// ===============================

const botao = document.querySelector(".botao-gerar")
const caixaTexto = document.querySelector(".caixa-texto")
const respostaDiv = document.querySelector(".resposta")


// ===============================
// FUNÇÃO PRINCIPAL
// ===============================

async function gerartexto() {

    let textousuario = caixaTexto.value.trim()

    // Verifica se o usuário digitou algo
    if (!textousuario) {
        respostaDiv.value = "Digite uma pergunta primeiro 🎮"
        return
    }

    // Ativa animação
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
                        content: "Você é um assistente especialista em jogos que ajuda gamers com estratégias, builds e dicas."
                    },
                    {
                        role: "user",
                        content: textousuario
                    }
                ]
            })
        })

        // Se a API falhar
        if (!resposta.ok) {

            respostaDiv.classList.remove("loading")

            respostaDiv.value = "Erro ao consultar a IA 😢"

            return
        }

        let dados = await resposta.json()

        let textoIA = dados.choices[0].message.content

        // Remove animação
        respostaDiv.classList.remove("loading")

        respostaDiv.value = textoIA

    } catch (erro) {

        console.error("Erro:", erro)

        respostaDiv.classList.remove("loading")

        respostaDiv.value = "Erro inesperado 😵"
    }
}


// ===============================
// EVENTOS
// ===============================

// Clique no botão
botao.addEventListener("click", gerartexto)


// Enter na caixa de texto
caixaTexto.addEventListener("keydown", function(event) {

    if (event.key === "Enter" && !event.shiftKey) {

        event.preventDefault()

        gerartexto()
    }

})