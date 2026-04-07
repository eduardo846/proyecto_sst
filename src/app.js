const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", require("./modules/auth/auth.routes"));
app.use("/empleados", require("./modules/empleados/empleado.routes"));
app.use("/incidentes", require("./modules/incidentes/incidente.routes"));
app.use("/riesgos", require("./modules/riesgos/riesgo.routes"));
app.use("/capacitaciones", require("./modules/capacitaciones/capacitacion.routes"));
app.use("/planes", require("./modules/planes/plan.routes"));
app.use("/examenes", require("./modules/examenes/examen.routes"));
app.use("/documentos", require("./modules/documentos/documento.routes"));
app.use("/notificaciones", require("./modules/notificaciones/notificacion.routes"));


module.exports = app;