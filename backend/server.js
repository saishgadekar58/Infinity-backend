import express from "express";
import mongoose from "mongoose";
import data from "./data.js";
import userRouter from "./routers/userRouter.js";
const app = express();
const DB =
  "mongodb+srv://saishgadekar58:35059076@cluster0.a3d81.mongodb.net/infinty-shop?retryWrites=true&w=majority";
mongoose
  .connect(process.env.MONGODB_URL || DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connection succesful");
  })
  .catch((error) => {
    console.error(error);
  });
const port = process.env.PORT || 5000;

app.get("/api/products", (req, res) => {
  res.send(data.products);
});
app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "product not found" });
  }
});

app.use("/api/users", userRouter);

// app.get("/", (req, res) => {
//   res.send("server is ready");
// });

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
  next();
});

app.listen(port, () => {
  console.log(`running at ${port}`);
});
