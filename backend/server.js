import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
// const path = require("path");
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";
import payRouter from "./routers/payRouter.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const DB = process.env.MONGO_URI;
mongoose
  .connect(DB, {
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
const port = process.env.PORT;
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
  // app.use(express.static("/client/build"));
} else {
  app.get("/", (req, res) => {
    res.send("running");
  });
}
// app.get("/", (req, res) => {
//   res.send("hello im working");
// });

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/config", payRouter);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
  next();
});

app.listen(port, () => {
  console.log(`running at ${port}`);
});
