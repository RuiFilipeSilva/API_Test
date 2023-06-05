const express = require("express");
const app = express();
const port = 3030;
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const cors = require('cors');

var allowlist = [
  "http://18.202.191.98",
  "http://localhost:8080",
  "http://52.50.27.66/",
];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = {
      origin: true,
    }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = {
      origin: false,
    }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/apiTest", async (req, res) => {
  console.log("AQUI");
  let object = await readFile("./dbTest.json");
  object = JSON.parse(object);
  console.log(object);
  res.status(200).send({ status: "success", data: object });
});

app.listen(port, () => {
  console.log("Servidor a correr na porta " + port);
});
