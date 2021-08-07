import { Request, Response } from "express";
import { Controller, Get, Post, BodyProps } from "./decorators";

@Controller("/auth")
class AuthController {
  @Get("/login")
  getLogin(req: Request, res: Response): void {
    res.send(`
    <form method="POST">
      <div>
        <label>Email</label>
        <input type="email" name="email" />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" />
      </div>
      <button>Submit</button>
    </form>
  `);
  }

  @Post("/login")
  @BodyProps("email", "password")
  postLogin(req: Request, res: Response): void {
    const { email, password } = req.body;

    if (email === "hi@hi.com" && password === "hi") {
      req.session = { loggedIn: true };
      res.redirect("/");
    } else {
      res.send("Invalid email or password");
    }
  }

  @Get("/logout")
  getlogout(req: Request, res: Response): void {
    req.session = null;
    res.redirect("/");
  }
}
