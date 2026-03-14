import { serveStatic } from "hono/deno";
import { logger } from "hono/logger";
import { fetchQuestions, submitQuiz } from "./quiz_service.js";

export const registerRoutes = (app) => {
  app.use(logger());
  app.get("*", serveStatic({ root: "./public" }));
  app.get("/api/questions", fetchQuestions);
  app.post("/api/submit", submitQuiz);
};
