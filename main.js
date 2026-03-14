import { Hono } from "hono"
import { registerRoutes } from "./src/app.js";

const main = () => {
  const app = new Hono()
  registerRoutes(app);
  Deno.serve({ port: 8000 }, app.fetch)
}

main();