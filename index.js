import { config } from "dotenv";
import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routers/index.js";
import addEvents from "./addEvents/index.js";

config();
const app = express();
const PORT = 5000 || process.env.PORT;
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_URL = process.env.DB_URL.replace('username', DB_USERNAME).replace('password', DB_PASSWORD) 

app.use(json());
app.use(cors());

app.use('/api', router)

addEvents()

async function startServer() {
  try {
    await mongoose.connect(DB_URL)
    app.listen(PORT, () => {
      console.log("server work");
    });
  } catch (err) {
    console.log(err);
  }
}
startServer()