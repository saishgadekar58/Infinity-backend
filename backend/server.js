import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
  next();
});

app.listen(port, () => {
  console.log(`running at ${port}`);
});
