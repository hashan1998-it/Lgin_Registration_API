const express = require("express");
const app = express();
const PORT = process.env.port || 3000;
const router = require("./routes/auth");
require("./db/db");

app.use(express.json());
app.use("/api/v1", router); // localhost:3000/api/v1/login or localhost:3000/api/v1

//Listing to the server
app.listen(PORT, () => {
  console.log(`Web Server is listening at port ${PORT}`);
});
