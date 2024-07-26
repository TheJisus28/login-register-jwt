console.clear();
import express from "express";
import morgan from "morgan";
import { PORT } from "../config.js";
import userRouter from "./apiV1/routes/user.router.js";
import publicRouter from "../src/apiV1/routes/public.router.js";

const app = express();

// parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public"));

// tracker

app.use(
  morgan((tokens, req, res) => {
    return [
      "Requester IP:",
      tokens["remote-addr"](req, res),
      "Method:",
      tokens.method(req, res),
      "URL:",
      tokens.url(req, res),
    ].join(" ");
  })
);

// routes
app.use("/api/v1/users", userRouter);
app.use("/", publicRouter);

app.listen(PORT, () => {
  console.log("DATABASE CONNECTED SUCCESFULLY");
  console.log(`APP LISTENING AT THE PORT ${PORT}`);
});
