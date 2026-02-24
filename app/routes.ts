import { type RouteConfig, index, route , layout } from "@react-router/dev/routes";
export default [
  index("routes/login/page.tsx"),
  layout("routes/AuthRoutes.tsx", [
    route("home", "routes/home/page.tsx"),
  ])
] satisfies RouteConfig;