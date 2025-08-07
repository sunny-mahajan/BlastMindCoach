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
    component: asyncComponent(() => import("../pages/Home")),
  },
  {
    path: "/manage-profile",
    component: asyncComponent(() => import("../pages/ProfilesPage")),
  },
  {
    path: "/browse",
    component: asyncComponent(() => import("../pages/Browse")),
  },
  {
    path: "/brain-state-assessment",
    component: asyncComponent(() => import("../pages/BrainState")),
  },
];
