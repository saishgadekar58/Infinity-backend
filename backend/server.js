import express from "express";
import data from "./data.js";
const app = express();
const port = process.env.PORT || 5000;

app.get("/api/products", (req, res) => {
  res.send(data.products);
});
app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  }
  res.status(404).send({ message: "product not found" });
});

app.get("/", (req, res) => {
  res.send("server is ready");
});

app.listen(port, () => {
  console.log(`running at ${port}`);
});