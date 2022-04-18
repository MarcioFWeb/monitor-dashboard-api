const express = require("express");
const apiController = express.Router();

const auth = require("../middleware/auth");

/* ROTAS PADRÃO E TESTE */
apiController.get("/welcome", auth, (_, res) => {
  res.status(200).send("Olá, bem vinda(o). Você está autenticada(o)!");
});

apiController.get("/ping", (_, res) => {
  res.status(200).send("pong");
});

apiController.use("*", (_, res) => {
  res.status(404).json({
    success: "false",
    message: "Não contrado",
    error: {
      statusCode: 404,
      message: "Você tentou usar uma rota não definida nesta API",
    },
  });
});

module.exports = apiController;
