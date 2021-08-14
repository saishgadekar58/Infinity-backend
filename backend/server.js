// require("dotenv").config();
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import path from "path";
const __dirname = path.resolve();
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";
import payRouter from "./routers/payRouter.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const DB = process.env.MONGO_URI;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connection succesful");
  })
  .catch((error) => {
    console.error(error);
  });
const port = process.env.PORT;

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/config", payRouter);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
  next();
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("running");
  });
}

app.listen(port, () => {
  console.log(`running at ${port}`);
});
