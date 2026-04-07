const app = require("./app");
const statusEmpleado = require('./middleware/statusempleado')
app.use(statusEmpleado);

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000 🚀");
});