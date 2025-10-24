const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.json());
app.use("/", routes); 

const PORT = 3130;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


