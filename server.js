
const express = require("express");
const connect = require("./src/configs/db");


const productControler = require("./src/controllers/product.controler");


const app = express();
app.use(express.json());

app.use("/products", productControler);


app.listen(3000, async function () {
  await connect();
  console.log("Port is Running Again." );
});
