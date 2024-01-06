import express from "express";
import cors from "cors";
import initRouter from "./src/routes";
import connectDatabase from "./src/config/connectDatabase";
import generateDate from "../server/src/utlis/generateDate";
require("dotenv").config();

const app = express();
app.use(
   cors({
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST", "PUT", "DELETE"],
   })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

initRouter(app);
connectDatabase();

const port = process.env.PORT;

app.listen(port, () => {
   console.log(`Server is running on port http://localhost:${port}`);
});
