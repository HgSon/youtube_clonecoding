import express from "express";
import routes from "../routes"; //파일 하나 밖
import { home, search } from "../controller/videoController";
import {
  getJoin,
  getLogin,
  postJoin,
  postLogin,
  logout,
  githubLogin,
  postGithubLogin,
  postGithubLoginRedirect,
  getMe,
  fbLogin,
  postFbLogin,
} from "../controller/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";
import passport from "passport";

const globalRouter = express.Router();

//join
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

//login
globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home); //auto import
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.me, getMe);

//github login
globalRouter.get(routes.gitHub, githubLogin);
globalRouter.get(
  routes.githubCallback,
  postGithubLogin,
  postGithubLoginRedirect
);
// /auth/github으로 가면 process에서 만든 github stratage에따라 auth. 정책에 /callback으로 보내는 주소있으므로
//아래것 실행

//facebook login
globalRouter.get(routes.faceBook, fbLogin);
globalRouter.get(
  routes.fbCallback,
  passport.authenticate(
    "facebook",
    { failureRedirect: routes.login },
    postFbLogin
  )
);

export default globalRouter;
