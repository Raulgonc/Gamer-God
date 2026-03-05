// ===============================
// CONFIGURAÇÃO INICIAL
// ===============================

const botao = document.querySelector(".botao-gerar")
const caixaTexto = document.querySelector(".caixa-texto")
const respostaDiv = document.querySelector(".resposta")
const endereco = "api/chat"


// ===============================
// FUNÇÃO PRINCIPAL
// ===============================

async function gerartexto() {

    let textousuario = caixaTexto.value.trim()

    if (!textousuario) {
        respostaDiv.innerText = "Digite uma pergunta primeiro 🎮"
        return
    }

    respostaDiv.innerText = "Pensando... 🤔"

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
                        content: "Você é um assistente especialista em jogos que ajuda gamers com dúvidas, estratégias, builds, walkthroughs e dicas."
                    },
                    {
                        role: "user",
                        content: textousuario
                    }
                ]
            })
        })

        if (!resposta.ok) {
            let erro = await resposta.json()
            console.error("Erro da API:", erro)
            respostaDiv.innerText = "Erro ao consultar a IA 😢"
            return
        }

        let dados = await resposta.json()

        let textoIA = dados.choices[0].message.content

        respostaDiv.innerText = textoIA

    } catch (erro) {
        console.error("Erro inesperado:", erro)
        respostaDiv.innerText = "Erro inesperado 😵"
    }
}


// ===============================
// EVENTO DO BOTÃO
// ===============================

botao.addEventListener("click", gerartexto)