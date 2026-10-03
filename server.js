const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Substitua pelas credenciais reais do seu agente no Foundry
const API_KEY = "";
const AGENT_ENDPOINT = "?api-version=v1"; // Coloque a URL completa do endpoint aqui

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch(AGENT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": API_KEY
      },
      body: JSON.stringify({
        input: message
      })
    });

    const data = await response.json();
    console.log("Resposta da IA:", data);

    const resposta =
      data?.output?.[0]?.content?.[0]?.text ||
      "Não foi possível gerar uma resposta.";

    res.json({
      response: resposta
    });

  } catch (error) {
    console.error("Erro na comunicação com a IA:", error);
    res.status(500).json({
      response: "Erro ao consultar a SkillForge AI."
    });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log("");
  console.log("🚀 Servidor Backend (SkillForge AI) Online!");
  console.log(`📡 Escutando conexões em: http://localhost:${PORT}`);
  console.log("⚠️ Lembre-se de configurar sua API_KEY e AGENT_ENDPOINT no arquivo server.js");
  console.log("");
});
