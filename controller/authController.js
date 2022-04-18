const express = require("express");
const authController = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../model/user");
const userMessagesEnum = require("../valueObjects/userMessagesEnum")

/* AUTH ROUTES */
authController.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Valida os parâmetros
    if (!(email && password)) {
      res.status(400).send(userMessagesEnum.PARAMETROS_USUARIO_OBRIGATORIOS);
    }
    
    // Verifica se existe na base de dados
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Cria o token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "24h",
        }
      );

      // Salva o token do usuário
      user.token = token;
      user.isAuth = true;      

      res.status(200).json(user);
    }
    res.status(400).send(userMessagesEnum.CREDENCIAIS_INVALIDAS);
  } catch (err) {
    console.log(err);
  }
});

module.exports = authController;
