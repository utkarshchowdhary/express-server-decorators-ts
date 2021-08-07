import express from "express";
import cookieSession from "cookie-session";
import { Router } from "./Router";
import "./controllers/RootController";
import "./controllers/AuthController";

const app = express();

app.use(express.urlencoded({ extended: true })); // parsing form bodies

app.use(cookieSession({ keys: ["secret"] }));

app.use(Router.getInstance());

app.listen(3000, () => {
  console.log("server running");
});
