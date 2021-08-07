import { Request, Response, NextFunction } from "express";
import { Controller, Get, Use } from "./decorators";

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session?.loggedIn) {
    next();
    return;
  }

  res.status(403).send("Not permitted");
}

@Controller("")
class RootController {
  @Get("/")
  getRoot(req: Request, res: Response): void {
    if (req.session?.loggedIn) {
      res.send(`
        <div>
          <div>You are logged in</div>
          <a href="/protected">Protected</a>
          <a href="/auth/logout">Logout</a>
        </div>
    `);
    } else {
      res.send(`
      <div>
        <div>You are not logged in</div>
        <a href="/auth/login">Login</a>
      </div>
  `);
    }
  }

  @Get("/protected")
  @Use(requireAuth)
  getProtected(req: Request, res: Response): void {
    res.send("Welcome to a protected route");
  }
}
