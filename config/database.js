const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = () => {
  // Conectando ao mongodb
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("Conexão com banco de dados ok.");
    })
    .catch((error) => {
      console.log("Conexão com banco de dados falhou. encerrando...");
      console.error(error);
      process.exit(1);
    });
};
