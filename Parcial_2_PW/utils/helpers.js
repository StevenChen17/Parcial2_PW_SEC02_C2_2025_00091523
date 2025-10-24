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

module.exports = { cuentaExiste, accountBalance };