require("dotenv").config();
const chartController = require('./controller/chartController');
const userController = require('./controller/userController');
const authController = require('./controller/authController');
const apiController = require('./controller/apiController');

/* Conecta ao BD mongo */
require("./config/database").connect();

/* Configuração básica do Express */
const express = require("express");

const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

/* Configura o APP com os Controllers das Rotas */
app.use('/', chartController);
app.use('/', userController);
app.use('/', authController);
app.use('/', apiController);

module.exports = app;
