import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("Login", "routes/Login.tsx"),
  route("Register", "routes/Register.tsx"),
  route("MainPage", "routes/MainPage.tsx")
] satisfies RouteConfig;