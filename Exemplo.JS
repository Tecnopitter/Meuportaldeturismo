const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const API_KEY =
  "SUA_CHAVE_API";

const AGENT_ENDPOINT =
  "?api-version=v1";

app.post("/chat", async (req, res) => {

  try {

    const { message } = req.body;

    const response = await fetch(
      AGENT_ENDPOINT,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "api-key": API_KEY
        },

        body: JSON.stringify({
          input: message
        })
      }
    );

    const data = await response.json();

    console.log(data);

    const resposta =
      data?.output?.[1]?.content?.[0]?.text ||
      "Não foi possível gerar uma resposta.";

    res.json({
      response: resposta
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      response:
        "Erro ao consultar a SkillForge AI."
    });

  }

});

app.listen(3000, () => {

  console.log("");
  console.log("🚀 SkillForge AI Online");
  console.log("http://localhost:3000");
  console.log("");

});