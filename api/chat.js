export default async function handler(req, res) {
  // 🔒 Permite apenas requisições POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    // 📦 Faz requisição para a API da Groq
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          // 🔐 Token seguro armazenado na Vercel
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: req.body.messages,
          temperature: 0.7,
        }),
      }
    );

    // 📥 Converte a resposta em JSON
    const data = await response.json();

    // ❗ Se a Groq retornar erro, repassa o erro
    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error || "Erro na API da Groq",
      });
    }

    // ✅ Retorna resposta para o frontend
    return res.status(200).json(data);

  } catch (error) {
    // 🚨 Erro interno do servidor
    return res.status(500).json({
      error: "Erro interno no servidor",
    });
  }
}