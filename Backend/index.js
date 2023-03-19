const connectToMongo = require("./db");
const express = require("express");
const app = express();
const port = 3002;
var cors = require('cors')
 
connectToMongo();

app.use(cors())
app.use(express.json());

//available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`iNotebook backend Server listening on port ${port}`);
});
