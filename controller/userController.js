const express = require("express");
const userController = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../model/user");
const auth = require("../middleware/auth");

const userMessagesEnum = require("../valueObjects/userMessagesEnum")
const userProtectedIds = require("../valueObjects/userProtectedIds")

/* USER ROUTES */
userController.post("/user/register", async (req, res) => {
  try {
    const { email, role, password } = req.body;

    if (!(email && role && password)) {
      res.status(400).send(userMessagesEnum.PARAMETROS_USUARIO_OBRIGATORIOS);
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send(userMessagesEnum.USUARIO_JA_EXISTE);
    }

    /* mascara senha */
    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({      
      email: email.toLowerCase(),
      role,
      password: encryptedPassword,
    });

    /* cria o token */
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "24h",
      }
    );

    user.token = token;

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

userController.get("/user", auth, async (_, res) => {
  try {        
    
    const listAllReturn = await User.find({});
    
    if (listAllReturn.length < 1) {
      return res.status(409).send(userMessagesEnum.USUARIOS_NAO_LOCALIZADOS);
    }    
        
    res.status(200).json(listAllReturn);
  } catch (err) {
    console.log(err);
  }
});

userController.post("/user/update", auth, async (req, res) => {
  try {
    const { _id, email, role } = req.body;

    if (!(_id && email && role)) {
      res.status(400).send(userMessagesEnum.PARAMETROS_USUARIO_OBRIGATORIOS);
    }
        
    const updateReturn = await User.updateOne({ _id: _id }, { email, role });

    if (updateReturn.n < 1) {
      return res.status(409).send("Usuário não localizado. Atualização não realizada.");
    }    
        
    res.status(200).json(updateReturn);
  } catch (err) {
    console.log(err);
  }
});

userController.delete("/user/delete", auth, async (req, res) => {
  try {
  
    const { _id } = req.body;    

    if (!(_id)) {
      return res.status(400).send(userMessagesEnum.ID_OBRIGADORIO_PARA_DELETAR);
    }

    if (userProtectedIds.includes(_id)) {
      return res.status(400).send(userMessagesEnum.USUARIO_PROTEGIDO);
    }
    
    const deleteReturn = await User.deleteOne({ _id: _id })
    
    if (deleteReturn?.n < 1) {      
      return res.status(409).send(userMessagesEnum.EXCLUSAO_NAO_REALIZADA);
    }    

    return res.status(200).json(deleteReturn);

  } catch (err) {
    console.log(err);
  }
});

module.exports = userController;
