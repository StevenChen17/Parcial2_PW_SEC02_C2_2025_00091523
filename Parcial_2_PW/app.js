const express = require('express');
const cuentas = require('./cuentas.json'); 

const app = express();
app.use(express.json());

const PORT = 3130;

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

app.get("/cuentas", (req, res) => {
  res.send({
    count: cuentas.length,
    data: cuentas
  });
});
