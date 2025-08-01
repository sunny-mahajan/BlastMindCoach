import asyncComponent from "../utils/asyncComponent";

export const authRouter = [
  {
    path: "/signin",
    component: asyncComponent(() => import("../pages/Auth/SigninPage")),
  },
  {
    path: "/signup",
    component: asyncComponent(() => import("../pages/Auth/SignupPage")),
  },
];

export const userRouter = [
  {
    path: "/",
    component: asyncComponent(() => import("../pages/Home/index")),
  },
  {
    path: "/browse",
    component: asyncComponent(() => import("../pages/Browse/index")),
  },
];
