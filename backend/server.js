const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const rtAuth = require('./routes/auth.js');
const rtForn = require('./routes/fornecedores.js');
const rtMate = require('./routes/materiais.js');
const rtPess = require('./routes/pessoas.js');
const rtUser = require('./routes/users.js');
const rtComp = require('./routes/compras.js');
const rtDash = require('./routes/dashboards.js');

app.use("/api/auth", rtAuth);

app.use("/api/fornecedores", rtForn);

app.use("/api/materiais", rtMate);

app.use("/api/pessoas", rtPess);

app.use("/api/users", rtUser);

app.use("/api/compras", rtComp);

app.use("/api/dashboards", rtDash);


app.listen(process.env.PORT, () => console.log(`Listening to port ${process.env.PORT}`));