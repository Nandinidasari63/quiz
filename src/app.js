import { serveStatic } from "hono/deno";
import { logger } from "hono/logger";
import { calculateScore, getQuestions } from "./quiz_backend.js";

export const registerRoutes = (app) => {
  app.use(logger());
  app.get("*", serveStatic({ root: "./public" }));
  app.get("/api/questions", getQuestions);
  app.post("/api/submit", calculateScore);
};
