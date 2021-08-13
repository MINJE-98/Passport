import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { Header } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthenticatedGuard, GithubGuard } from "./guards/github.auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get("github")
  @UseGuards(GithubGuard)
  login() {
    return;
  }

  @Get("github/callback")
  @UseGuards(GithubGuard)
  callback(@Res() res) {
    res.redirect("http://localhost:8080");
  }
  @Get("status")
  status(@Req() req) {
    console.log(req.user);
    return req.user;
  }
  @Get("logout")
  logout(@Req() req, @Res() res) {
    req.session.destroy((err) => {
      if (err) {
        return console.log(err);
      }
      res.redirect("http://localhost:8080/");
    });
  }
}
