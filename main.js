import { Hono } from "hono"
import { registerRoutes } from "./src/app.js";



const createApp = () => {
  return new Hono()
}

const main = () => {
  const app = createApp();
  registerRoutes(app);
  Deno.serve({ port: 8000 }, app.fetch)
}

main();