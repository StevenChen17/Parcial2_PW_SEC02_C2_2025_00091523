const express = require('express');
const cuentas = require('./cuentas.json'); 

const app = express();
app.use(express.json());

const PORT = 3130;

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

app.get("/cuentas", (req, res) => {
  const { id, nombre, genero  } = req.query;

  let resultado = cuentas;

  if(id) {
    resultado = resultado.filter(c => c._id === id)
  }

  if(nombre) {
    const partes = nombre.toLowerCase().split(" ");
    resultado = resultado.filter(c => 
    partes.every(p => c.client.toLowerCase().includes(p))
);

  }

  if(genero) {
    resultado = resultado.filter(c => c.gender === genero)
  }

  res.send({
    count: resultado.length,
    cuentas: resultado
  });
});


const cuentaExiste = (cuenta) => cuenta !== null && cuenta !== undefined;

app.get("/cuentas/:id", (req, res) => {
  const cuentaId = req.params.id;
  const cuenta = cuentas.find(c => c._id === cuentaId);

  res.send({ 
    find: cuentaExiste(cuenta),
    account: cuenta
  });
});

