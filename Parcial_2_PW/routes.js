const express = require('express');
const router = express.Router();
const cuentas = require('./cuentas.json');
const { cuentaExiste, accountBalance } = require('./utils/helpers');

router.get("/cuentas", (req, res) => {
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

  res.send(response);
});


router.get("/cuenta/:id", (req, res) => {
  const cuentaId = req.params.id;
  const cuenta = cuentas.find(c => c._id === cuentaId);

  res.send({
    find: cuentaExiste(cuenta),
    account: cuenta
  });
});


router.get("/cuentasBalance", (req, res) => {
  const total = accountBalance(cuentas);
  const status = total > 0;

  res.send({
    status,
    accountBalance: total
  });
});

module.exports = router;