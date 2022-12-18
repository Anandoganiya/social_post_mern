import express, { Application } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

import notFound from "./middleware/notFound";
import errorHandler from "./middleware/errorHandler";
import db from "./connection";
import api from "./api";

require("dotenv").config();

const app: Application = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", api);

app.use(notFound);
app.use(errorHandler);

const port: Number = Number(process.env.PORT) || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  db.connect((err) => {
    if (err) throw err;
    console.log("connected to db");
  });
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
