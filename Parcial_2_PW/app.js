const express = require('express');
const cuentas = require('./cuentas.json');

const app = express();
app.use(express.json());

const PORT = 3130;

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

const cuentaExiste = (cuenta) => cuenta !== null && cuenta !== undefined;

function accountBalance(cuentas, total = 0) {
  cuentas.forEach(cuenta => {
    if (cuenta.isActive) {
      const balanceNum = parseFloat(cuenta.balance.replace(/[^0-9.-]+/g, ""));
      total += balanceNum;
    }
  });
  return total;
}


app.get("/cuentas", (req, res) => {
  const { id, nombre, genero } = req.query;

  let resultado = cuentas;

  if (id) {
    resultado = resultado.filter(c => c._id === id)
  }

  if (nombre) {
    const partes = nombre.toLowerCase().split(" ");
    resultado = resultado.filter(c =>
      partes.every(p => c.client.toLowerCase().includes(p))
    );
  }

  if (genero) {
    resultado = resultado.filter(c => c.gender === genero)
  }

  const size = resultado.length;
  const response = {}

  // Solo incluir count si NO hay filtros activos
  const sinFiltros = Object.keys(req.query).length === 0;
  if (sinFiltros) {
    response.count = cuentas.length;
  }

  if (size === 1) {
    response.finded = true;
    response.account = resultado[0];
  } else if (size > 1) {
    response.data = resultado;
  } else {
    response.finded = false;
  }

  res.send({
    response
  });
});


app.get("/cuenta/:id", (req, res) => {
  const cuentaId = req.params.id;
  const cuenta = cuentas.find(c => c._id === cuentaId);

  res.send({
    find: cuentaExiste(cuenta),
    account: cuenta
  });
});


app.get("/cuentasBalance", (req, res) => {
  const cuenta = cuentas.find(c => c.isActive === true);
  const total = accountBalance(cuentas);

  res.send({
    status: cuentaExiste(cuenta),
    accountBalance: total
  });
});
